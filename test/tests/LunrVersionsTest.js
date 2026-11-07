var test = require('node:test');
var describe = test.describe;
var it = test.it;
var assert = require('assert');
var pkg = require('../../package.json');
var versions = require('../lunr-versions');

// a version as [major, minor, patch]
function parse(version) {
    return version.split('.').map(Number);
}

function compare(a, b) {
    for (var i = 0; i < 3; i++) {
        if (a[i] !== b[i]) return a[i] - b[i];
    }
    return 0;
}

// the peer dependency promises what the tests check: its range starts at the oldest tested lunr version
describe("The lunr peer dependency", function () {
    var range = pkg.peerDependencies.lunr;
    var tested = versions.all.map(function (name) {
        return require(name + '/package.json').version;
    }).sort(function (a, b) { return compare(parse(a), parse(b)); });

    it("should be a caret range, ^<major>.<minor>.<patch>", function () {
        assert.match(range, /^\^\d+\.\d+\.\d+$/);
    });

    it("should start at the oldest tested lunr version (" + tested[0] + ")", function () {
        assert.equal(range, '^' + tested[0],
            'peerDependencies.lunr is ' + range + ', but the oldest lunr version in devDependencies is ' + tested[0]);
    });

    it("should include every tested lunr version (" + tested.join(', ') + ")", function () {
        var lower = parse(range.slice(1));
        tested.forEach(function (version) {
            var v = parse(version);
            assert.ok(v[0] === lower[0] && compare(v, lower) >= 0, version + ' is outside ' + range);
        });
    });
});
