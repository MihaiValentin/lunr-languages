var test = require('node:test');
var assert = require('assert');
var path = require('path');
var childProcess = require('child_process');

// compiles the declarations and a usage sample with the TypeScript compiler (test/types/tsconfig.json: strict, no emit)
test.describe("Type declarations", function () {
    test.it("should compile types/*.d.ts and test/types/usage.ts with --strict", function () {
        var root = path.join(__dirname, '..', '..');
        var tsc = path.join(root, 'node_modules', 'typescript', 'bin', 'tsc');
        var result = childProcess.spawnSync(process.execPath, [tsc, '-p', path.join(__dirname, '..', 'types'), '--pretty', 'false'], {
            cwd: root,
            encoding: 'utf8'
        });
        assert.equal(result.status, 0, result.stdout + result.stderr);
    });
});
