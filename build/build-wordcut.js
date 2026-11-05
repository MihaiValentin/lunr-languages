/*
 * Builds lunr.th.wordcut.js from the wordcut package on npm (https://github.com/veer66/wordcut), a
 * dictionary-based Thai word segmenter by Vee Satayamas, LGPL-3.0.
 *
 *   node build/build-wordcut.js
 *
 * - downloads the pinned tarball from the npm registry and checks its integrity
 * - wraps each lib/*.js module unchanged in a small module system, with shims for what it needs from Node and
 *   npm: fs, path and glob only serve the dictionary files (data/tdict-*.txt), which are built in, so it runs
 *   in browsers; underscore only provides clone(); util is unused
 * - the modules run in strict mode; dict.js assigns `words` and `defaultDict` without declaring them, so the
 *   wrapper declares them in the module's scope (they would otherwise become globals)
 * - writes lunr.th.wordcut.js, a lunr-languages plugin that registers wordcut as lunr.segmenters.th, and
 *   licenses/wordcut-LGPL-3.0.txt
 *
 * Requires Node >= 18 (global fetch) and a `tar` on the PATH (Windows 10+, macOS and Linux ship one).
 */
'use strict';

var fs = require('fs');
var os = require('os');
var path = require('path');
var crypto = require('crypto');
var childProcess = require('child_process');

var VERSION = '0.9.1';
var TARBALL_URL = 'https://registry.npmjs.org/wordcut/-/wordcut-' + VERSION + '.tgz';
var INTEGRITY = 'sha512-r7wxFbj3ji638nUYvkDWGJmy1kpqBWQ8W0yH/vRb4I2nXHwlJMClgeJN0FtxTEtbN3tnPhMqMuy/kxfXvCU6UA==';

var ROOT = path.join(__dirname, '..');
var OUT_FILE = path.join(ROOT, 'lunr.th.wordcut.js');
var LICENSE_FILE = path.join(ROOT, 'licenses', 'wordcut-LGPL-3.0.txt');

// the modules of lib/, in no particular order; wordcut.js is the entry
var MODULES = ['acceptors', 'dict', 'latin_rules', 'path_info_builder', 'path_selector', 'prefixtree', 'thai_rules',
    'wordcut_core', 'wordcut'];
// undeclared variables a module assigns to, declared in its scope so strict mode accepts them
var IMPLICIT = { dict: ['words', 'defaultDict'] };

function download(url) {
    return fetch(url).then(function(response) {
        if (!response.ok) {
            throw new Error('Download failed: ' + url + ' (HTTP ' + response.status + ')');
        }
        return response.arrayBuffer();
    }).then(function(buffer) {
        return Buffer.from(buffer);
    });
}

function checkIntegrity(buffer) {
    var actual = 'sha512-' + crypto.createHash('sha512').update(buffer).digest('base64');
    if (actual !== INTEGRITY) {
        throw new Error('wordcut-' + VERSION + '.tgz: integrity mismatch\n  expected ' + INTEGRITY + '\n  got      ' + actual);
    }
}

function extract(tarball) {
    var tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'lunr-wordcut-'));
    try {
        fs.writeFileSync(path.join(tmp, 'wordcut.tgz'), tarball);
        // relative paths keep Git Bash's tar happy on Windows
        childProcess.execFileSync('tar', ['-xzf', 'wordcut.tgz'], { cwd: tmp, stdio: 'inherit' });
        var pkg = path.join(tmp, 'package');
        var read = function(file) { return fs.readFileSync(path.join(pkg, file), 'utf8'); };
        var meta = JSON.parse(read('package.json'));
        if (meta.version !== VERSION) {
            throw new Error('wordcut tarball has version ' + meta.version + ', expected ' + VERSION);
        }
        var modules = {};
        MODULES.forEach(function(name) { modules[name] = read('lib/' + name + '.js'); });
        var data = {};
        fs.readdirSync(path.join(pkg, 'data')).filter(function(f) { return /^tdict-.*\.txt$/.test(f); }).sort().forEach(function(f) {
            data[f] = read('data/' + f);
        });
        var unknown = fs.readdirSync(path.join(pkg, 'lib')).filter(function(f) {
            return MODULES.indexOf(f.replace(/\.js$/, '')) === -1;
        });
        if (unknown.length) {
            throw new Error('wordcut ' + VERSION + ' has modules this build does not know: ' + unknown.join(', '));
        }
        return { modules: modules, data: data, license: read('LICENSE') };
    } finally {
        fs.rmSync(tmp, { recursive: true, force: true });
    }
}

function indent(text, spaces) {
    var pad = new Array(spaces + 1).join(' ');
    return text.split('\n').map(function(line) { return line ? pad + line : line; }).join('\n');
}

function plugin(source) {
    var modules = MODULES.map(function(name) {
        var declare = IMPLICIT[name] ? '\'use strict\';\nvar ' + IMPLICIT[name].join(', ') + ';\n' : '\'use strict\';\n';
        return '    ' + JSON.stringify('./' + name) + ': function(require, module, exports, __dirname) {\n' +
            indent(declare + source.modules[name].replace(/\s+$/, ''), 8) + '\n    }';
    }).join(',\n');
    var dataFiles = Object.keys(source.data).map(function(f) {
        return '    ' + JSON.stringify('/wordcut/data/' + f) + ': ' + JSON.stringify(source.data[f]);
    }).join(',\n');
    var words = Object.keys(source.data).reduce(function(n, f) {
        return n + source.data[f].split(/[\r\n]+/).filter(function(w) { return w.length > 1; }).length;
    }, 0);

    return [
        '/*!',
        ' * Lunr languages, Thai word segmentation with wordcut',
        ' * https://github.com/MihaiValentin/lunr-languages',
        ' *',
        ' * Optional: lunr.th segments with Intl.Segmenter unless this file is loaded.',
        ' */',
        '/*!',
        ' * wordcut ' + VERSION + ' (https://github.com/veer66/wordcut), a dictionary-based Thai word segmenter',
        ' * Copyright Vee Satayamas',
        ' *',
        ' * wordcut is free software: you can redistribute it and/or modify it under the terms of the GNU Lesser',
        ' * General Public License version 3 as published by the Free Software Foundation. It is distributed',
        ' * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR',
        ' * PURPOSE. See licenses/wordcut-LGPL-3.0.txt and licenses/GPL-3.0.txt, which come with this file.',
        ' *',
        ' * Generated by build/build-wordcut.js from the npm package wordcut@' + VERSION + ': its lib/*.js modules',
        ' * unchanged, its dictionary (data/tdict-*.txt, ' + words + ' words) built in.',
        ' */',
        '',
        '/**',
        ' * export the module via AMD, CommonJS or as a browser global',
        ' * Export code from https://github.com/umdjs/umd/blob/master/returnExports.js',
        ' */',
        ';(function (root, factory) {',
        '    if (typeof define === \'function\' && define.amd) {',
        '        // AMD. Register as an anonymous module.',
        '        define(factory)',
        '    } else if (typeof exports === \'object\') {',
        '        // Node and CommonJS-like environments that support module.exports',
        '        module.exports = factory()',
        '    } else {',
        '        // Browser globals (root is window)',
        '        factory()(root.lunr);',
        '    }',
        '}(this, function () {',
        '  // wordcut\'s modules (lib/*.js), unchanged',
        '  var sources = {',
        modules,
        '  };',
        '',
        '  // wordcut\'s dictionary files, which its dict.js reads with fs and glob',
        '  var dataFiles = {',
        dataFiles,
        '  };',
        '',
        '  // what wordcut needs from Node and npm: the dictionary files, clone(); util is unused',
        '  var shims = {',
        '    fs: { readFileSync: function(file) { return dataFiles[file]; } },',
        '    // dict.js finds its dictionary at path.normalize(__dirname + "/..") + "/data/tdict-*.txt"',
        '    path: { normalize: function(p) {',
        '      var parts = [];',
        '      p.split(\'/\').forEach(function(part) {',
        '        if (part === \'..\') parts.pop(); else if (part !== \'.\') parts.push(part);',
        '      });',
        '      return parts.join(\'/\');',
        '    } },',
        '    glob: { sync: function(pattern) {',
        '      var re = new RegExp(\'^\' + pattern.replace(/[.+?^${}()|[\\]\\\\]/g, \'\\\\$&\').replace(/\\*/g, \'.*\') + \'$\');',
        '      return Object.keys(dataFiles).filter(function(f) { return re.test(f); });',
        '    } },',
        '    underscore: { clone: function(o) { return Array.isArray(o) ? o.slice() : Object.assign({}, o); } },',
        '    util: {}',
        '  };',
        '',
        '  var cache = {};',
        '  var requireModule = function(name) {',
        '    if (shims[name]) return shims[name];',
        '    if (!cache[name]) {',
        '      var module = { exports: {} };',
        '      cache[name] = module;',
        '      sources[name](requireModule, module, module.exports, \'/wordcut/lib\');',
        '    }',
        '    return cache[name].exports;',
        '  };',
        '',
        '  var wordcut;',
        '',
        '  /*',
        '   * Registers wordcut as the segmenter of lunr.th, in any order with lunr.th.js (lunr.th uses it from',
        '   * its next tokenization on). Loading it twice registers it once.',
        '   */',
        '  return function(lunr) {',
        '    if (!wordcut) {',
        '      wordcut = requireModule(\'./wordcut\');',
        '      wordcut.init();',
        '      if (!wordcut.acceptors.creators.some(function(c) { return c.dict && c.dict.length; })) {',
        '        throw new Error(\'lunr.th.wordcut.js: wordcut loaded no dictionary words\');',
        '      }',
        '    }',
        '    var hasWordCharacter = /[\\u0e00-\\u0e7f0-9a-z]/;',
        '    lunr.segmenters = lunr.segmenters || {};',
        '    lunr.segmenters.th = {',
        '      name: \'wordcut\',',
        '      // the words of a string with their offsets; spaces and punctuation are dropped',
        '      segment: function(str) {',
        '        var offset = 0;',
        '        return wordcut.cut(str).split(\'|\').map(function(word) {',
        '          var at = offset;',
        '          offset += word.length;',
        '          return { word: word, index: at };',
        '        }).filter(function(w) {',
        '          return hasWordCharacter.test(w.word);',
        '        });',
        '      }',
        '    };',
        '  };',
        '}));',
        ''
    ].join('\n');
}

download(TARBALL_URL).then(function(tarball) {
    checkIntegrity(tarball);
    var source = extract(tarball);
    fs.writeFileSync(OUT_FILE, plugin(source));
    fs.mkdirSync(path.dirname(LICENSE_FILE), { recursive: true });
    fs.writeFileSync(LICENSE_FILE, source.license);
    console.log('Wrote ' + path.relative(ROOT, OUT_FILE) + ' (wordcut ' + VERSION + ') and ' + path.relative(ROOT, LICENSE_FILE));
}).catch(function(err) {
    console.error(err.message);
    process.exitCode = 1;
});
