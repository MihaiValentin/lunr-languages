var test = require('node:test');
var assert = require('assert');
var path = require('path');
var ts = require('typescript');

// compiles the declarations and a usage sample with the TypeScript compiler, without emitting anything
test.describe("Type declarations", function () {
    test.it("should compile types/*.d.ts and test/types/usage.ts with --strict", function () {
        var root = path.join(__dirname, '..');
        var files = ['types/index.d.ts', 'types/plugin.d.ts', 'types/wordcut.d.ts', 'test/types/usage.ts'].map(function (f) {
            return path.join(root, f);
        });
        var program = ts.createProgram(files, {
            strict: true,
            noEmit: true,
            target: ts.ScriptTarget.ES2022,
            lib: ['lib.es2022.d.ts', 'lib.dom.d.ts'],
            types: []
        });
        var messages = ts.getPreEmitDiagnostics(program).map(function (d) {
            var where = d.file ? path.relative(root, d.file.fileName) + ':' + (d.file.getLineAndCharacterOfPosition(d.start).line + 1) + ': ' : '';
            return where + ts.flattenDiagnosticMessageText(d.messageText, '\n');
        });
        assert.deepEqual(messages, []);
    });
});
