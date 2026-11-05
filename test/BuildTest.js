var test = require('node:test');
var describe = test.describe;
var it = test.it;
var assert = require('assert');
var fs = require('fs');
var path = require('path');

var root = path.join(__dirname, '..');

describe("Shipped files", function () {
    var acorn = require('acorn');
    var files = fs.readdirSync(root).filter(function (f) { return /^lunr\..+\.js$/.test(f) || f === 'tinyseg.js' || f === 'wordcut.js'; })
        .concat(fs.readdirSync(path.join(root, 'min')).map(function (f) { return 'min/' + f; }));

    files.forEach(function (file) {
        it("should parse " + file + " as ES2022", function () {
            acorn.parse(fs.readFileSync(path.join(root, file), 'utf8'), { ecmaVersion: 2022, sourceType: 'script' });
        });
    });
});
