var assert = require('assert');
var childProcess = require('child_process');

function runNode(args) {
  var result = childProcess.spawnSync(process.execPath, args, {
    cwd: __dirname + '/..',
    encoding: 'utf8'
  });

  assert.equal(result.status, 0, result.stderr || result.stdout);
}

describe('Package module resolution', function() {
  it('supports existing CommonJS subpath imports', function() {
    var script = [
      "var ids = ['lunr-languages/lunr.de', 'lunr-languages/lunr.de.js', 'lunr-languages/min/lunr.de.min', 'lunr-languages/min/lunr.de.min.js', 'lunr-languages/tinyseg'];",
      "ids.forEach(function(id) {",
      "  if (typeof require(id) !== 'function') throw new Error(id);",
      "});"
    ].join('\n');

    runNode([
      '-e',
      script
    ]);
  });

  it('supports ESM subpath imports without file extensions', function() {
    var script = [
      "var ids = ['lunr-languages/lunr.de', 'lunr-languages/lunr.stemmer.support', 'lunr-languages/min/lunr.de.min', 'lunr-languages/tinyseg'];",
      "for (const id of ids) {",
      "  const mod = await import(id);",
      "  if (typeof mod.default !== 'function') throw new Error(id);",
      "}"
    ].join('\n');

    runNode([
      '--input-type=module',
      '-e',
      script
    ]);
  });
});
