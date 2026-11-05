var test = require('node:test');
var describe = test.describe;
var it = test.it;
var assert = require('assert');
var fs = require('fs');
var path = require('path');

var root = path.join(__dirname, '..');
var foldMaps = require('../build/fold-maps.json');

function freshLunr() {
    delete require.cache[require.resolve('./lunr/lunr-2.3.5')];
    var lunr = require('./lunr/lunr-2.3.5');
    require('../lunr.stemmer.support.js')(lunr);
    return lunr;
}

describe("Shipped files", function () {
    var acorn = require('acorn');
    var files = fs.readdirSync(root).filter(function (f) { return /^lunr\..+\.js$/.test(f); })
        .concat(fs.readdirSync(path.join(root, 'min')).map(function (f) { return 'min/' + f; }));

    files.forEach(function (file) {
        it("should parse " + file + " as ES2022", function () {
            acorn.parse(fs.readFileSync(path.join(root, file), 'utf8'), { ecmaVersion: 2022, sourceType: 'script' });
        });
    });
});

describe("Word characters", function () {
    it("should keep a ZWNJ inside a Persian word (Arabic script has letters outside the BMP)", function () {
        var lunr = freshLunr();
        require('../lunr.fa.js')(lunr);
        var word = 'کتاب‌ها';   // کتاب‌ها
        assert.equal(lunr.fa.trimmer(new lunr.Token('(' + word + ')')).toString(), word);
    });
});

describe("Accent folding of hand-written languages", function () {
    var handWrittenAccentFold = require('../build/build').handWrittenAccentFold;
    var source = '/*!\n * header\n */\n(function () {\n    // build: accentFold\n    old code\n    // build: end accentFold\n})();\n';
    var language = { locale: 'xx', accentFold: { default: true } };
    var maps = { xx: { accentFold: { 'é': 'e' }, map: {}, folded: { map: {} } } };

    it("should write the accent fold, its wildcard normalizer and the CLDR notice", function () {
        var out = handWrittenAccentFold(source, language, maps);
        assert.ok(out.indexOf('old code') === -1);
        assert.ok(out.indexOf('lunr.xx.accentFold = lunr.stemmerSupport.generateAccentFold') !== -1);
        assert.ok(out.indexOf('lunr.xx.accentFold.isDefault = true') !== -1);
        assert.ok(out.indexOf('pipelineFunctionLabel = "trimmer-xx"') !== -1);
        assert.ok(/^\/\*!\n \* header\n \*\/\n\/\*!\n \* The accent folding map is derived from CLDR/.test(out));
    });

    it("should give the same file when it runs again", function () {
        var once = handWrittenAccentFold(source, language, maps);
        assert.equal(handWrittenAccentFold(once, language, maps), once);
    });

    it("should fail without the markers or the map", function () {
        assert.throws(function () { handWrittenAccentFold('/*! x */', language, maps); }, /build: accentFold/);
        assert.throws(function () { handWrittenAccentFold(source, language, {}); }, /no accent fold map/);
    });
});

describe("Fold maps of hand-written languages", function () {
    var derive = require('../build/derive-fold-maps');
    var cldr = fs.existsSync(require('../build/accent-fold').CLDR_FILE);
    it("should derive the committed accent fold maps of hand-written languages", { skip: !cldr && 'run npm run fetch-data to fetch CLDR' }, function () {
        var entries = derive.handWrittenAccentFolds();
        Object.keys(entries).forEach(function (locale) {
            assert.deepEqual(entries[locale], foldMaps[locale]);
        });
    });
});
