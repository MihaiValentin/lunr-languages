var test = require('node:test');
var describe = test.describe;
var it = test.it;
var assert = require('assert');
var fs = require('fs');
var path = require('path');
var vm = require('vm');

var source = function (file) {
  return fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
};
var files = {
  lunr: source('test/lunr/lunr-2.3.5.js'),
  support: source('lunr.stemmer.support.js'),
  zh: source('lunr.zh.js'),
  jieba: source('lunr.zh.jieba.js')
};

function createIntl(segments) {
  function Segmenter(locale, options) {
    this.locale = locale;
    this.options = options;
  }
  Segmenter.prototype.segment = function () {
    return segments;
  };
  return { Segmenter: Segmenter };
}

/*
 * Runs lunr and the given plugin files in one sandbox, like Node (with `require`) or a browser (without),
 * and returns lunr. `steps` are [file, ...plugin arguments] in loading order.
 */
function load(options, steps) {
  var sandbox = { console: console, Intl: options.intl || undefined };
  sandbox.globalThis = sandbox;
  if (options.require) {
    sandbox.require = options.require;
  }
  var context = vm.createContext(sandbox);
  var run = function (code) {
    sandbox.module = { exports: {} };
    sandbox.exports = sandbox.module.exports;
    vm.runInContext(code, context);
    return sandbox.module.exports;
  };
  var lunr = run(files.lunr);
  sandbox.lunr = lunr;
  steps.forEach(function (step) {
    if (options.browser) {
      // a <script> tag: the file applies itself to window.lunr
      delete sandbox.module;
      delete sandbox.exports;
      vm.runInContext(files[step[0]], context);
    } else {
      run(files[step[0]]).apply(null, [lunr].concat(step.slice(1)));
    }
  });
  return lunr;
}

function words(lunr, text) {
  return lunr.zh.tokenizer(text).map(function (token) { return token.toString(); });
}

var bigramIntl = createIntl([
  { segment: '学', index: 0, isWordLike: true },
  { segment: '姐', index: 1, isWordLike: true }
]);

var jiebaV1 = function (calls) {
  return function (name) {
    assert.equal(name, '@node-rs/jieba');
    return {
      loadDict: function (dictionary) { calls.loadDict = dictionary; },
      cut: function (str, searchMode) {
        assert.equal(searchMode, true);
        return [str === '中华人民' ? '中华 人民' : str];
      }
    };
  };
};

describe('Chinese tokenizer selection', function () {
  it('uses Intl.Segmenter plus CJK bigrams by default in Node', function () {
    var lunr = load({ intl: bigramIntl, require: function () { throw new Error('not loaded'); } }, [['support'], ['zh']]);
    assert.equal(lunr.zh.tokenizer.segmenter(), 'Intl.Segmenter');
    assert.deepEqual(words(lunr, '学姐'), ['学', '学姐', '姐']);
  });

  it('uses Intl.Segmenter plus CJK bigrams in browsers', function () {
    var lunr = load({ intl: bigramIntl, browser: true }, [['support'], ['zh']]);
    assert.deepEqual(words(lunr, '学姐'), ['学', '学姐', '姐']);
  });

  it('does not use @node-rs/jieba just because it is installed', function () {
    var calls = {};
    var lunr = load({ intl: bigramIntl, require: jiebaV1(calls) }, [['support'], ['zh']]);
    assert.equal(lunr.zh.tokenizer.segmenter(), 'Intl.Segmenter');
  });

  it('uses @node-rs/jieba v1 when lunr.zh.jieba.js is loaded, before or after lunr.zh.js', function () {
    [[['jieba'], ['support'], ['zh']], [['support'], ['zh'], ['jieba']]].forEach(function (steps) {
      var lunr = load({ intl: bigramIntl, require: jiebaV1({}) }, steps);
      assert.equal(lunr.zh.tokenizer.segmenter(), 'jieba');
      assert.deepEqual(words(lunr, '中华人民'), ['中华', '人民']);
    });
  });

  it('passes a custom dictionary to @node-rs/jieba v1', function () {
    var calls = {};
    load({ intl: bigramIntl, require: jiebaV1(calls) }, [['support'], ['zh'], ['jieba', 'custom-dict']]);
    assert.equal(calls.loadDict, 'custom-dict');
  });

  it('uses @node-rs/jieba v2 with its default dictionary, and a custom one added', function () {
    var requested = [], loaded;
    var require = function (name) {
      requested.push(name);
      if (name === '@node-rs/jieba/dict') return { dict: 'default-dict' };
      return {
        Jieba: {
          withDict: function (dictionary) {
            assert.equal(dictionary, 'default-dict');
            return {
              loadDict: function (custom) { loaded = custom; },
              cut: function () { return ['中华 人民']; }
            };
          }
        }
      };
    };
    var lunr = load({ intl: bigramIntl, require: require }, [['support'], ['zh'], ['jieba', 'custom-dict']]);
    assert.deepEqual(words(lunr, '中华人民'), ['中华', '人民']);
    assert.deepEqual(requested, ['@node-rs/jieba', '@node-rs/jieba/dict']);
    assert.equal(loaded, 'custom-dict');
  });

  it('sets position metadata from jieba\'s words', function () {
    var lunr = load({ intl: bigramIntl, require: jiebaV1({}) }, [['support'], ['zh'], ['jieba']]);
    assert.deepEqual(lunr.zh.tokenizer('中华人民').map(function (t) { return t.metadata.position; }), [[0, 2], [2, 2]]);
  });

  it('fails clearly when lunr.zh.jieba.js is loaded without @node-rs/jieba', function () {
    assert.throws(function () {
      load({ intl: bigramIntl, require: function () { throw new Error('Cannot find module'); } }, [['support'], ['zh'], ['jieba']]);
    }, /needs @node-rs\/jieba: npm install @node-rs\/jieba/);
  });

  it('fails clearly when lunr.zh.jieba.js is loaded in a browser', function () {
    assert.throws(function () {
      load({ intl: bigramIntl, browser: true }, [['support'], ['zh'], ['jieba']]);
    }, /needs Node\.js/);
  });

  it('points a custom dictionary passed to lunr.zh.js to lunr.zh.jieba.js', function () {
    assert.throws(function () {
      load({ intl: bigramIntl, require: jiebaV1({}) }, [['support'], ['zh', 'custom-dict']]);
    }, /lunr-languages\/lunr\.zh\.jieba/);
  });

  it('throws when tokenizing without Intl.Segmenter and jieba', function () {
    var lunr = load({ require: function () { throw new Error('not loaded'); } }, [['support'], ['zh']]);
    assert.throws(function () { words(lunr, '车主'); }, /needs Intl\.Segmenter or lunr\.zh\.jieba\.js/);
  });
});
