var test = require('node:test');
var describe = test.describe;
var it = test.it;
var assert = require('assert');
var fs = require('fs');
var path = require('path');
var acorn = require('acorn');

var root = path.join(__dirname, '..', '..');

// the JavaScript files the npm package ships: the .js entries of "files" in package.json, with * expanded
var files = [];
require('../../package.json').files.filter(function (entry) { return /\.js$/.test(entry); }).forEach(function (entry) {
    var dir = path.posix.dirname(entry);
    var pattern = new RegExp('^' + path.posix.basename(entry).replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*') + '$');
    fs.readdirSync(path.join(root, dir)).filter(function (f) { return pattern.test(f); }).forEach(function (f) {
        files.push(dir === '.' ? f : dir + '/' + f);
    });
});

function parse(file) {
    return acorn.parse(fs.readFileSync(path.join(root, file), 'utf8'), { ecmaVersion: 2022, sourceType: 'script' });
}

// the ES module syntax that a script still parses: dynamic import()
function moduleSyntax(node, found) {
    found = found || [];
    if (node && typeof node.type === 'string') {
        if (node.type === 'ImportExpression') {
            found.push('import() at ' + node.start);
        }
        Object.keys(node).forEach(function (key) {
            var value = node[key];
            (Array.isArray(value) ? value : [value]).forEach(function (child) {
                if (child && typeof child === 'object') {
                    moduleSyntax(child, found);
                }
            });
        });
    }
    return found;
}

describe("Shipped files", function () {
    files.forEach(function (file) {
        it("should parse " + file + " as an ES2022 script", function () {
            parse(file);
        });
    });
});

describe("Shipped files without ES modules", function () {
    // the files load with <script> (also from file://) and with require(), so they must not be or load ES modules
    files.forEach(function (file) {
        it("should not use import, export, import.meta or import() in " + file, function () {
            var ast;
            try {
                ast = parse(file);
            } catch (e) {
                assert.doesNotMatch(e.message, /sourceType: module|import\.meta/, file + ' uses ES module syntax');
                throw e;
            }
            assert.deepEqual(moduleSyntax(ast), []);
        });
    });

    it("should find ES module syntax", function () {
        assert.throws(function () {
            acorn.parse('export default 1;', { ecmaVersion: 2022, sourceType: 'script' });
        }, /sourceType: module/);
        assert.throws(function () {
            acorn.parse('import.meta.url;', { ecmaVersion: 2022, sourceType: 'script' });
        }, /import\.meta/);
        assert.deepEqual(moduleSyntax(acorn.parse('(function () { return import("x"); })();', { ecmaVersion: 2022, sourceType: 'script' })).length, 1);
    });
});
