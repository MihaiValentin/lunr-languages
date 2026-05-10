var assert = require('assert');
var fs = require('fs');
var vm = require('vm');

var zhSource = fs.readFileSync(__dirname + '/../lunr.zh.js', 'utf8');

function createLunr() {
  function Token(token, metadata) {
    this.token = token;
    this.metadata = metadata || {};
  }

  Token.prototype.toString = function() {
    return this.token;
  };

  return {
    version: '2.3.5',
    stemmerSupport: {},
    Token: Token,
    trimmerSupport: {
      generateTrimmer: function() {
        return function(token) {
          return token;
        };
      }
    },
    Pipeline: {
      registerFunction: function() {}
    },
    generateStopWordFilter: function() {
      return function(token) {
        return token;
      };
    }
  };
}

function tokenStrings(tokens) {
  return tokens.map(function(token) {
    return token.toString();
  });
}

function createConsole() {
  return {
    infos: [],
    errors: [],
    info: function(message) {
      this.infos.push(message);
    },
    error: function(message) {
      this.errors.push(message);
    }
  };
}

function createIntl(segments) {
  function Segmenter(locale, options) {
    this.locale = locale;
    this.options = options;
  }

  Segmenter.prototype.segment = function() {
    return segments;
  };

  return {
    Segmenter: Segmenter
  };
}

function loadAsNode(requireFn, intl, consoleStub) {
  var sandbox = {
    module: {
      exports: {}
    },
    exports: {},
    require: requireFn,
    console: consoleStub
  };

  sandbox.Intl = intl || null;
  sandbox.globalThis = sandbox;

  vm.runInNewContext(zhSource, sandbox);

  return sandbox.module.exports;
}

function loadAsBrowser(intl, consoleStub) {
  var sandbox = {
    lunr: createLunr(),
    console: consoleStub
  };

  sandbox.Intl = intl || null;
  sandbox.globalThis = sandbox;

  vm.runInNewContext(zhSource, sandbox);

  return sandbox.lunr;
}

describe('Chinese tokenizer selection', function() {
  it('uses @node-rs/jieba in Node when it is available', function() {
    var loadedDictionary;
    var consoleStub = createConsole();
    var plugin = loadAsNode(function(name) {
      assert.equal(name, '@node-rs/jieba');

      return {
        load: function(dictionary) {
          loadedDictionary = dictionary;
        },
        cut: function(str, searchMode) {
          assert.equal(str, '中华人民');
          assert.equal(searchMode, true);
          return ['中华 人民'];
        }
      };
    }, createIntl([]), consoleStub);
    var lunr = createLunr();

    plugin(lunr, {
      dict: 'custom'
    });

    assert.deepEqual(tokenStrings(lunr.zh.tokenizer('中华人民')), ['中华', '人民']);
    assert.deepEqual(loadedDictionary, {
      dict: 'custom'
    });
    assert.deepEqual(consoleStub.infos, []);
    assert.deepEqual(consoleStub.errors, []);
  });

  it('uses @node-rs/jieba v1 loadDict for custom dictionaries when it is available', function() {
    var loadedDictionary;
    var loadCalled = false;
    var consoleStub = createConsole();
    var plugin = loadAsNode(function(name) {
      assert.equal(name, '@node-rs/jieba');

      return {
        load: function() {
          loadCalled = true;
        },
        loadDict: function(dictionary) {
          loadedDictionary = dictionary;
        },
        cut: function(str, searchMode) {
          assert.equal(str, '中华人民');
          assert.equal(searchMode, true);
          return ['中华 人民'];
        }
      };
    }, createIntl([]), consoleStub);
    var lunr = createLunr();

    plugin(lunr, 'custom-dict');

    assert.deepEqual(tokenStrings(lunr.zh.tokenizer('中华人民')), ['中华', '人民']);
    assert.equal(loadedDictionary, 'custom-dict');
    assert.equal(loadCalled, false);
    assert.deepEqual(consoleStub.infos, []);
    assert.deepEqual(consoleStub.errors, []);
  });

  it('uses @node-rs/jieba v2 with the default dictionary in Node when it is available', function() {
    var requested = [];
    var consoleStub = createConsole();
    var plugin = loadAsNode(function(name) {
      requested.push(name);

      if (name === '@node-rs/jieba') {
        return {
          Jieba: {
            withDict: function(dictionary) {
              assert.equal(dictionary, 'default-dict');

              return {
                cut: function(str, searchMode) {
                  assert.equal(str, '中华人民');
                  assert.equal(searchMode, true);
                  return ['中华 人民'];
                }
              };
            }
          }
        };
      }

      if (name === '@node-rs/jieba/dict') {
        return {
          dict: 'default-dict'
        };
      }

      throw new Error('Unexpected module ' + name);
    }, createIntl([]), consoleStub);
    var lunr = createLunr();

    plugin(lunr);

    assert.deepEqual(tokenStrings(lunr.zh.tokenizer('中华人民')), ['中华', '人民']);
    assert.deepEqual(requested, ['@node-rs/jieba', '@node-rs/jieba/dict']);
    assert.deepEqual(consoleStub.infos, []);
    assert.deepEqual(consoleStub.errors, []);
  });

  it('uses @node-rs/jieba v2 with a custom dictionary in Node when one is provided', function() {
    var loadedDictionary;
    var requested = [];
    var consoleStub = createConsole();
    var plugin = loadAsNode(function(name) {
      requested.push(name);

      if (name === '@node-rs/jieba/dict') {
        return {
          dict: 'default-dict'
        };
      }

      if (name === '@node-rs/jieba') {
        return {
          Jieba: {
            withDict: function(dictionary) {
              assert.equal(dictionary, 'default-dict');

              return {
                loadDict: function(dictionary) {
                  loadedDictionary = dictionary;
                },
                cut: function(str, searchMode) {
                  assert.equal(str, '中华人民');
                  assert.equal(searchMode, true);
                  return ['中华 人民'];
                }
              };
            }
          }
        };
      }

      throw new Error('Unexpected module ' + name);
    }, createIntl([]), consoleStub);
    var lunr = createLunr();

    plugin(lunr, 'custom-dict');

    assert.deepEqual(tokenStrings(lunr.zh.tokenizer('中华人民')), ['中华', '人民']);
    assert.equal(loadedDictionary, 'custom-dict');
    assert.deepEqual(requested, ['@node-rs/jieba', '@node-rs/jieba/dict']);
    assert.deepEqual(consoleStub.infos, []);
    assert.deepEqual(consoleStub.errors, []);
  });

  it('falls back to Intl.Segmenter plus CJK bigrams in Node when @node-rs/jieba is unavailable', function() {
    var consoleStub = createConsole();
    var plugin = loadAsNode(function() {
      throw new Error('Cannot find module');
    }, createIntl([{
      segment: '学',
      index: 0,
      isWordLike: true
    }, {
      segment: '姐',
      index: 1,
      isWordLike: true
    }]), consoleStub);
    var lunr = createLunr();

    plugin(lunr);

    assert.deepEqual(tokenStrings(lunr.zh.tokenizer('学姐')), ['学', '学姐', '姐']);
    assert.equal(consoleStub.infos.length, 1);
    assert.equal(consoleStub.errors.length, 0);
    assert.ok(consoleStub.infos[0].indexOf('@node-rs/jieba') >= 0);
  });

  it('logs when a custom Chinese dictionary is ignored by the Intl.Segmenter fallback', function() {
    var consoleStub = createConsole();
    var plugin = loadAsNode(function() {
      throw new Error('Cannot find module');
    }, createIntl([{
      segment: '车',
      index: 0,
      isWordLike: true
    }, {
      segment: '主',
      index: 1,
      isWordLike: true
    }]), consoleStub);
    var lunr = createLunr();

    plugin(lunr, {
      dict: 'custom'
    });

    assert.deepEqual(tokenStrings(lunr.zh.tokenizer('车主')), ['车', '车主', '主']);
    assert.equal(consoleStub.infos.length, 2);
    assert.ok(consoleStub.infos[1].indexOf('Custom Chinese dictionaries') >= 0);
  });

  it('throws in Node when neither @node-rs/jieba nor Intl.Segmenter is available', function() {
    var consoleStub = createConsole();
    var plugin = loadAsNode(function() {
      throw new Error('Cannot find module');
    }, null, consoleStub);
    var lunr = createLunr();

    plugin(lunr);

    assert.throws(function() {
      lunr.zh.tokenizer('车主');
    }, /requires either @node-rs\/jieba or Intl\.Segmenter support/);
    assert.equal(consoleStub.infos.length, 1);
    assert.equal(consoleStub.errors.length, 1);
  });

  it('uses Intl.Segmenter plus CJK bigrams in browsers', function() {
    var consoleStub = createConsole();
    var lunr = loadAsBrowser(createIntl([{
      segment: '学',
      index: 0,
      isWordLike: true
    }, {
      segment: '姐',
      index: 1,
      isWordLike: true
    }]), consoleStub);

    assert.deepEqual(tokenStrings(lunr.zh.tokenizer('学姐')), ['学', '学姐', '姐']);
    assert.deepEqual(consoleStub.infos, []);
    assert.deepEqual(consoleStub.errors, []);
  });

  it('throws in browsers without Intl.Segmenter', function() {
    var consoleStub = createConsole();
    var lunr = loadAsBrowser(null, consoleStub);

    assert.throws(function() {
      lunr.zh.tokenizer('车主');
    }, /requires a browser with Intl\.Segmenter support/);
    assert.equal(consoleStub.infos.length, 0);
    assert.equal(consoleStub.errors.length, 1);
  });
});
