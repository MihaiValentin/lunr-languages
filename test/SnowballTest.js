var test = require('node:test');
var describe = test.describe;
var it = test.it;
var assert = require('assert');
var fs = require('fs');
var path = require('path');

var root = path.join(__dirname, '..');
var stemmers = require('../build/build').snowballStemmers();
var samples = require('../build/snowball/stem-samples.json');
var wildcardMaps = require('../build/fold-maps.json');

function freshLunr() {
    delete require.cache[require.resolve('./lunr/lunr-2.3.5')];
    var lunr = require('./lunr/lunr-2.3.5');
    require('../lunr.stemmer.support.js')(lunr);
    return lunr;
}

describe("Snowball stemmers", function () {
    Object.keys(stemmers).forEach(function (name) {
        stemmers[name].locales.forEach(function (locale) {
            it("should stem like Snowball's " + name + " (lunr." + locale + ", " + Object.keys(samples[name]).length + " words of snowball-data)", function () {
                var lunr = freshLunr();
                require('../lunr.' + locale + '.js')(lunr);
                // with afterStemmer in the list, lunr folds Snowball's stems afterwards (Persian آ)
                var after = stemmers[name].afterStemmer ? lunr.stemmerSupport.generateFold(stemmers[name].afterStemmer) : function (s) { return s; };
                var wrong = [];
                Object.keys(samples[name]).forEach(function (word) {
                    var stem = lunr[locale].stemmer(new lunr.Token(word)).toString();
                    var expected = after(samples[name][word]);
                    if (stem !== expected) {
                        wrong.push(word + ' -> ' + stem + ' (Snowball: ' + samples[name][word] + ')');
                    }
                });
                assert.deepEqual(wrong, []);
            });
        });
    });

    it("should have a stem sample for every configured stemmer", function () {
        assert.deepEqual(Object.keys(samples).sort(), Object.keys(stemmers).sort());
    });
});

describe("Outdated stemmer support", function () {
    it("should fail with a clear error when lunr.stemmer.support.js is older than the language file", function () {
        delete require.cache[require.resolve('./lunr/lunr-2.3.5')];
        var lunr = require('./lunr/lunr-2.3.5');
        // a 1.x support file: stemmerSupport without BaseStemmer
        lunr.stemmerSupport = { Among: function () {}, SnowballProgram: function () {} };
        lunr.trimmerSupport = { generateTrimmer: function () { return function (t) { return t; }; } };
        assert.throws(function () {
            require('../lunr.de.js')(lunr);
        }, /Lunr stemmer support is outdated/);
    });
});

describe("Wildcard maps", function () {
    var derive = require('../build/derive-fold-maps');
    var cache = path.join(root, 'build', 'cache', 'snowball-data');

    Object.keys(stemmers).forEach(function (name) {
        var cached = fs.existsSync(path.join(cache, name, 'voc.txt'));
        it("should derive the committed map for " + name + " from its word list", { skip: !cached && 'run npm run fetch-data to fetch the word lists' }, function () {
            assert.deepEqual(derive.derive(name), wildcardMaps[name]);
        });
    });
});

describe("Wildcard searches", function () {
    // language, indexed word, wildcard searches that must find it
    var cases = [
        ['de', 'Käse', ['käs*', 'kas*', 'kaes*']],
        ['de', 'Straße', ['straß*', 'strass*']],
        ['ru', 'ёлка', ['ёлк*', 'елк*']],
        ['nl', 'ideeën', ['ideeë*', 'ideee*']],
        ['fr', 'élève', ['élèv*', 'elev*']],
        ['es', 'acción', ['acció*', 'accio*']],
        ['it', "d'Orléans", ['orlé*', 'orlè*', 'orle*', "d'orlé*"]],
        ['en', 'classify', ['classify*', 'classif*']],
        ['pt', 'coração', ['coraç*', 'corac*']],
        ['ro', 'ţară', ['ţar*', 'țar*', 'tar*']],
        ['pl', 'żółw', ['żółw*', 'zolw*']],
        ['tr', 'KIZLAR', ['kız*', 'kiz*', 'KIZ*']],
        // fa: می‌خوانند (ZWNJ after the prefix می), found with and without the prefix, and typed with Arabic yeh
        ['fa', 'می‌خوانند',
            ['می‌خوا*', 'خوا*', 'مي‌خوا*']],
        // el: σπίτια found with and without the accent; αθεΐα, whose ΐ Snowball folds to η
        ['el', 'σπίτια', ['σπίτ*', 'σπιτ*']],
        ['el', 'αθεΐα', ['αθεΐ*']],
        // ta: இந்தக்கட்சி ("this party"), found with and without the demonstrative prefix இந்
        ['ta', 'இந்தக்கட்சி',
            ['இந்தக்க*', 'தக்க*']],
        // ar: الكتابة (with the article ال), found without it; أحمد found typed without the hamza
        ['ar', 'الكتابة', ['كتا*', 'الكتا*']],
        ['ar', 'أحمد', ['أحم*', 'احم*']],
        // fa: كتاب‌ها typed with Arabic kaf, found with Persian kaf
        ['fa', 'كتاب‌ها', ['کتا*', 'كتا*']]
    ];

    // the full word with a wildcard, longer than its stem (the prefix is stemmed too)
    var fullWords = [
        ['de', 'Häuser', ['häuser*', 'Häuser*']],
        ['fr', 'élèves', ['élèves*', 'eleves*']],
        ['ru', 'кошками', ['кошками*', 'кошка*']],
        ['el', 'Ελλάδας', ['Ελλάδας*']], // Ελλάδας
        ['en', 'generously', ['generously*', 'generous*']],
        ['tr', 'KIZLARIN', ['KIZLARIN*', 'kızların*']],
        ['hu', 'házakban', ['házakban*', 'hazakban*']]
    ];

    cases.concat(fullWords).forEach(function (c) {
        var locale = c[0], word = c[1];
        c[2].forEach(function (query) {
            it("should find " + locale + " '" + word + "' with '" + query + "'", function () {
                var lunr = freshLunr();
                require('../lunr.' + locale + '.js')(lunr);
                var idx = lunr(function () {
                    this.use(lunr[locale]);
                    this.ref('id');
                    this.field('body');
                    this.add({ id: 1, body: word });
                });
                assert.equal(idx.search(query).length, 1);
            });
        });
    });

    it("should have a test case for every language whose stemmer folds letters", function () {
        var tested = {};
        cases.forEach(function (c) { tested[c[0]] = true; });
        var missing = [];
        Object.keys(stemmers).forEach(function (name) {
            if (Object.keys(wildcardMaps[name].map).length === 0) return;
            stemmers[name].locales.forEach(function (locale) {
                if (!tested[locale]) missing.push(locale + ' (' + JSON.stringify(wildcardMaps[name].map) + ')');
            });
        });
        assert.deepEqual(missing, []);
    });
});
