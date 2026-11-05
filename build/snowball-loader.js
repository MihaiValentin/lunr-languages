/*
 * Turns the ES modules in build/snowball/ into plain scripts, and loads a stemmer class in Node.
 *
 * The generated files are ES modules (`import B from './base-stemmer.js'`, `export default class`).
 * The lunr-languages output stays a plain UMD script, so the build removes exactly these lines and
 * fails if a future Snowball release changes them.
 */
'use strict';

var fs = require('fs');
var path = require('path');
var vm = require('vm');

var SNOWBALL_DIR = path.join(__dirname, 'snowball');

var BASE_EXPORT = /^export default class BaseStemmer \{$/m;
var IMPORT = /^import B from '\.\/base-stemmer\.js'$/m;
var EXPORT = /^export default class extends B \{$/m;

function replaceOnce(source, pattern, replacement, file) {
    if (!pattern.test(source)) {
        throw new Error(file + ': expected ' + pattern + ', update build/snowball-loader.js');
    }
    return source.replace(pattern, replacement);
}

/* base-stemmer.js as a plain script that declares `class BaseStemmer` */
function baseStemmerSource() {
    var file = 'base-stemmer.js';
    var source = fs.readFileSync(path.join(SNOWBALL_DIR, file), 'utf8');
    return replaceOnce(source, BASE_EXPORT, 'class BaseStemmer {', file);
}

/*
 * <name>-stemmer.js as a function body that expects `BaseStemmer` in scope and returns the class.
 * Its module-level tables (`const a_0 = ...`) stay local to that function.
 */
function stemmerBody(name) {
    var file = name + '-stemmer.js';
    var source = fs.readFileSync(path.join(SNOWBALL_DIR, file), 'utf8');
    source = replaceOnce(source, IMPORT, 'var B = BaseStemmer;', file);
    return replaceOnce(source, EXPORT, 'return class extends B {', file);
}

/* the stemmer class, for build scripts running in Node */
function loadStemmer(name) {
    var script = baseStemmerSource() + '\n(function() {\n' + stemmerBody(name) + '\n})();';
    return vm.runInNewContext(script, { console: console }, { filename: name + '-stemmer.js' });
}

module.exports = {
    SNOWBALL_DIR: SNOWBALL_DIR,
    baseStemmerSource: baseStemmerSource,
    stemmerBody: stemmerBody,
    loadStemmer: loadStemmer
};
