var test = require('node:test');
var describe = test.describe;
var it = test.it;
var assert = require('assert');

// a trimmer applied to a word (lunr 2 passes tokens)
var trimToken = function (lunr, trimmer, word) {
    return trimmer(new lunr.Token(word)).toString();
};

// the lunr versions to test with (see test/lunr-versions.js)
var lunrVersions = require('../lunr-versions');
// the current lunr, for the tests that don't depend on its version
var freshLunr = function () { return lunrVersions.fresh(); };

var testDocuments = {
    he: require('../testdata/he'),
    ar: require('../testdata/ar'),
    de: require('../testdata/de'),
    da: require('../testdata/da'),
    du: require('../testdata/du'),
    es: require('../testdata/es'),
    fi: require('../testdata/fi'),
    fr: require('../testdata/fr'),
    hi: require('../testdata/hi'),
    hu: require('../testdata/hu'),
    hy: require('../testdata/hy'),
    it: require('../testdata/it'),
    ja: require('../testdata/ja'),
    jp: require('../testdata/ja'),
    kn: require('../testdata/kn'),
    ko: require('../testdata/ko'),
    no: require('../testdata/no'),
    pl: require('../testdata/pl'),
    pt: require('../testdata/pt'),
    ro: require('../testdata/ro'),
    ru: require('../testdata/ru'),
    sa: require('../testdata/sa'),
    sv: require('../testdata/sv'),
    ta: require('../testdata/ta'),
    te: require('../testdata/te'),
    tr: require('../testdata/tr'),
    th: require('../testdata/th'),
    vi: require('../testdata/vi'),
    zh: require('../testdata/zh'),
    el: require('../testdata/el'),
    fa: require('../testdata/fa'),
};

// once per lunr version, each with its own fresh lunr
lunrVersions.packages.forEach(function (name) {
    var freshLunr = function () { return lunrVersions.fresh(name); };

    describe("Testing Lunr-Languages with Lunr " + lunrVersions.version(name), function () {
        describe("should be able to correctly identify words in multi-documents scenarios (eg: en + ru)", function () {
            var lunr = freshLunr();
            require('../../lunr.stemmer.support.js')(lunr);
            require('../../lunr.ru.js')(lunr);
            require('../../lunr.multi.js')(lunr);

            var idxEn = lunr(function () {
                this.field('body');
                this.add({ "body": "Этот текст написан на русском.", "id": 1 });
                this.add({ "body": "This text is written in the English language.", "id": 2 });
            });

            var idxRu = lunr(function () {
                this.use(lunr.ru);
                this.field('body');
                this.add({ "body": "Этот текст написан на русском.", "id": 1 });
                this.add({ "body": "This text is written in the English language.", "id": 2 });
            });

            var idxMulti = lunr(function () {
                this.use(lunr.multiLanguage('en', 'ru'));
                this.field('body');
                this.add({ "body": "Этот текст написан на русском.", "id": 1 });
                this.add({ "body": "This text is written in the English language.", "id": 2 });
            });

            it("should not stem and find 'Русских' in english documents", function () {
                assert.equal(idxEn.search('Русских').length, 0)
            });

            it("should stem and find 'languages' in english documents", function () {
                assert.equal(idxEn.search('languages').length, 1)
            });

            it("should stem and find 'Русских' in russian documents", function () {
                assert.equal(idxRu.search('Русских').length, 1)
            });

            it("should not stem and find 'languages' in russian documents", function () {
                assert.equal(idxRu.search('languages').length, 0)
            });

            it("should stem and find 'Русских' in russian+english documents", function () {
                assert.equal(idxMulti.search('Русских').length, 1)
            });

            it("should stem and find 'languages' in russian+english documents", function () {
                assert.equal(idxMulti.search('languages').length, 1)
            });
        });
        describe("should be able to use language tokenizers in multi-language indexes", function () {
            var lunr = freshLunr();
            require('../../lunr.stemmer.support.js')(lunr);
            require('../../lunr.zh.js')(lunr);
            require('../../lunr.de.js')(lunr);
            require('../../lunr.multi.js')(lunr);

            var idx = lunr(function () {
                this.ref('id');
                this.use(lunr.multiLanguage('en', 'zh', 'de'));
                this.field('name', { boost: 10 });
                this.add({ name: "Göttin des Sieges", id: 1 });
                this.add({ name: "goddess of victory", id: 2 });
                this.add({ name: "校花学姐", id: 3 });
            });

            it("should find Chinese terms segmented by a language tokenizer", function () {
                assert.equal(idx.search('学姐').length, 1)
            });

            it("should keep finding German terms with the default tokenizer", function () {
                assert.equal(idx.search('Göttin').length, 1)
            });

            it("should keep finding English terms with the default tokenizer", function () {
                assert.equal(idx.search('goddess').length, 1)
            });
        });
        describe("should leave out words the language trimmers empty", function () {
            var lunr = freshLunr();
            require('../../lunr.stemmer.support.js')(lunr);
            require('../../lunr.de.js')(lunr);

            var idx = lunr(function () {
                this.use(lunr.de);
                this.ref('id');
                this.field('text');
                this.add({ id: 1, text: "Haus — Garten (Test) …" });
            });

            it("should not index a word of only punctuation as an empty term", function () {
                assert.deepEqual(Object.keys(idx.invertedIndex).sort(), ['gart', 'haus', 'test'])
            });

            it("should still find the words around it", function () {
                assert.equal(idx.search('Garten').length, 1)
            });
        });
        describe("should keep numeric tokens when language trimmers are active", function () {
            var lunr = freshLunr();
            require('../../lunr.stemmer.support.js')(lunr);
            require('../../lunr.de.js')(lunr);
            require('../../lunr.ru.js')(lunr);

            var idxDe = lunr(function () {
                this.use(lunr.de);
                this.ref('id');
                this.field('text');
                this.add({ id: 1, text: "Port 1234 is a good port for testing a problem" });
            });

            var idxRu = lunr(function () {
                this.use(lunr.ru);
                this.ref('id');
                this.field('text');
                this.add({ id: 1, text: "Порт 1234 работает" });
            });

            it("should find numeric-only terms in German documents", function () {
                assert.equal(idxDe.search('1234').length, 1)
            });

            it("should find numeric-only terms in Russian documents", function () {
                assert.equal(idxRu.search('1234').length, 1)
            });

            it("should keep wildcard searches with numeric prefixes", function () {
                assert.equal(idxDe.search('123*').length, 1)
            });
        });
        describe("should trim punctuation around locale words in language trimmers", function () {
            var lunr = freshLunr();
            require('../../lunr.stemmer.support.js')(lunr);
            require('../../lunr.ko.js')(lunr);
            require('../../lunr.hy.js')(lunr);
            require('../../lunr.vi.js')(lunr);

            var trim = function (trimmer, word) {
                return trimmer(new lunr.Token(word)).toString()
            };

            it("should trim Korean punctuation", function () {
                assert.equal(trim(lunr.ko.trimmer, '(한국어)'), '한국어')
                assert.equal(trim(lunr.ko.trimmer, '한국어,'), '한국어')
            });

            it("should trim Armenian punctuation", function () {
                assert.equal(trim(lunr.hy.trimmer, '(միսը)'), 'միսը')
                assert.equal(trim(lunr.hy.trimmer, 'միսը,'), 'միսը')
            });

            it("should trim Vietnamese punctuation", function () {
                assert.equal(trim(lunr.vi.trimmer, '(đình)'), 'đình')
                assert.equal(trim(lunr.vi.trimmer, 'đình,'), 'đình')
            });
        });
        describe("should trim punctuation around Thai words", function () {
            var lunr = freshLunr();
            require('../../lunr.stemmer.support.js')(lunr);
            lunr.wordcut = require('../../wordcut');
            require('../../lunr.th.js')(lunr);

            it("should trim Thai punctuation", function () {
                assert.equal(trimToken(lunr, lunr.th.trimmer, '(สวัสดี)'), 'สวัสดี')
                assert.equal(trimToken(lunr, lunr.th.trimmer, 'สวัสดี,'), 'สวัสดี')
            });

            it("should keep Latin words in Thai text", function () {
                assert.equal(trimToken(lunr, lunr.th.trimmer, '(iPhone)'), 'iPhone')
            });

            it("should not index the spaces and punctuation between Thai words", function () {
                var idx = lunr(function () {
                    this.use(lunr.th);
                    this.ref('id');
                    this.field('text');
                    this.add({ id: 1, text: 'ภาษาไทย ง่าย, 123 iPhone' });
                });
                assert.deepEqual(Object.keys(idx.invertedIndex).sort(), ['123', 'iPhone', 'ง่าย', 'ภาษา', 'ไทย'].sort());
            });
        });
        describe("should use the Hindi tokenizer in multi-language indexes", function () {
            var lunr = freshLunr();
            require('../../lunr.stemmer.support.js')(lunr);
            lunr.wordcut = require('../../wordcut');
            require('../../lunr.hi.js')(lunr);
            require('../../lunr.multi.js')(lunr);

            // lunr.multi.js takes lunr.hi.tokenizer, which returns wordcut's pieces, the spaces between words too
            var idx = lunr(function () {
                this.use(lunr.multiLanguage('en', 'hi'));
                this.ref('id');
                this.field('text');
                this.add({ id: 1, text: 'यह अच्छा है, test' });
            });

            it("should index the words without an empty term", function () {
                assert.deepEqual(Object.keys(idx.invertedIndex).sort(), ['test', 'अच्छा'].sort());
            });
        });
        describe("should keep Vietnamese words written with composed letters", function () {
            var lunr = freshLunr();
            require('../../lunr.stemmer.support.js')(lunr);
            require('../../lunr.vi.js')(lunr);

            var idx = lunr(function () {
                this.use(lunr.vi);
                this.ref('id');
                this.field('text');
                this.add({ id: 1, text: "Hà Nội mà, thủ đô." });
            });

            it("should keep composed letters at the end of a word", function () {
                assert.equal(trimToken(lunr, lunr.vi.trimmer, 'là'), 'là')
                assert.equal(trimToken(lunr, lunr.vi.trimmer, 'thủ'), 'thủ')
                assert.equal(trimToken(lunr, lunr.vi.trimmer, '(đó)'), 'đó')
            });

            it("should keep decomposed letters at the end of a word", function () {
                assert.equal(trimToken(lunr, lunr.vi.trimmer, 'là'.normalize('NFD')), 'là'.normalize('NFD'))
            });

            it("should find a word ending in a composed letter", function () {
                assert.equal(idx.search('hà').length, 1)
                assert.equal(idx.search('thủ').length, 1)
            });

            it("should register the stop word filter", function () {
                assert.equal(lunr.Pipeline.registeredFunctions['stopWordFilter-vi'], lunr.vi.stopWordFilter)
            });

            it("should not index a stop word followed by punctuation", function () {
                assert.equal(idx.invertedIndex['mà'], undefined)
                assert.equal(idx.invertedIndex['m'], undefined)
            });
        });
        describe("should filter Hindi stop words written in NFC", function () {
            var lunr = freshLunr();
            require('../../lunr.stemmer.support.js')(lunr);
            lunr.wordcut = require('../../wordcut');
            require('../../lunr.hi.js')(lunr);

            // NFC writes the nukta letters of these stop words decomposed
            var kaafi = 'काफ़ी'.normalize('NFC');
            var vagairah = 'वग़ैरह'.normalize('NFC');

            var idx = lunr(function () {
                this.use(lunr.hi);
                this.ref('id');
                this.field('text');
                this.add({ id: 1, text: 'यह ' + kaafi + ' अच्छा है ' + vagairah });
            });

            it("should not find the stop word %w written in NFC".replace('%w', kaafi), function () {
                assert.equal(idx.search(kaafi).length, 0)
            });

            it("should not find the stop word %w written in NFC".replace('%w', vagairah), function () {
                assert.equal(idx.search(vagairah).length, 0)
            });
        });
        describe("should normalize German wildcard queries with umlauts", function () {
            var lunr = freshLunr();
            require('../../lunr.stemmer.support.js')(lunr);
            require('../../lunr.de.js')(lunr);

            var idx = lunr(function () {
                this.use(lunr.de);
                this.ref('id');
                this.field('text');
                this.add({ id: 1, text: "das ist günstig" });
            });

            var defaultIdx = lunr(function () {
                this.ref('id');
                this.field('text');
                this.add({ id: 1, text: "das ist günstig" });
            });

            it("should find German words with umlauts without wildcard searches", function () {
                assert.equal(idx.search('günstig').length, 1)
            });

            it("should find German words with umlauts with wildcard searches", function () {
                assert.equal(idx.search('günsti*').length, 1)
            });

            it("should leave non-German indexes unchanged after German is loaded", function () {
                assert.equal(defaultIdx.search('günsti*').length, 1)
            });
        });
        describe("should normalize French accented queries", function () {
            var lunr = freshLunr();
            require('../../lunr.stemmer.support.js')(lunr);
            require('../../lunr.fr.js')(lunr);

            var idx = lunr(function () {
                this.use(lunr.fr);
                this.ref('id');
                this.field('text');
                this.add({ id: 1, text: "empêchaient maître" });
            });

            it("should find French words when accents are omitted", function () {
                assert.equal(idx.search('empechaient').length, 1)
                assert.equal(idx.search('maitre').length, 1)
            });

            it("should index folded French stems", function () {
                assert.ok(idx.invertedIndex.empech)
                assert.ok(idx.invertedIndex.maitr)
                assert.equal(idx.invertedIndex['empêch'], undefined)
                assert.equal(idx.invertedIndex['maîtr'], undefined)
            });

            it("should find French words with accented wildcard searches", function () {
                assert.equal(idx.search('maîtr*').length, 1)
            });
        });
        Object.keys(testDocuments).forEach(function (language) {
            describe("should be able to correctly find terms in " + language.toUpperCase() + " correctly", function () {
                // because these tests are asynchronous, we must ensure every load of lunr is fresh
                // so we do not get the previous used languages on it.
                // if we don't do this, when we'll run the test for jp, we'll also have da, de, fr, it languages used
                var lunr = freshLunr();
                require('../../lunr.stemmer.support.js')(lunr);
                if (language === 'ja' || language === 'jp') {    // for japanese, we must also load the tinyseg tokenizer
                    require('../../tinyseg')(lunr);
                }
                if (language === 'th' || language === 'hi' || language === 'ta' || language === 'sa' || language === 'kn' || language === 'te') {    // for thai, we must also load the wordcut tokenizer
                    lunr.wordcut = require('../../wordcut');
                }
                require('../../lunr.' + language + '.js')(lunr);

                var idx = lunr(function () {
                    this.use(lunr[language]);
                    testDocuments[language].fields.forEach(function (field) {
                        this.field(field.name, field.config)
                    }.bind(this));

                    testDocuments[language].documents.forEach(function (doc) {
                        this.add(doc)
                    }.bind(this));
                });

                testDocuments[language].tests.forEach(function (test) {
                    it("should " + test.what.replace('%w', '"' + test.search + '"'), function () {
                        assert.equal(idx.search(test.search).length, test.found)
                    });
                }.bind(this));
            })
        })

        describe("should support opt-in Spanish accent folding", function () {
            var lunr = freshLunr();
            require('../../lunr.stemmer.support.js')(lunr);
            require('../../lunr.es.js')(lunr);

            var defaultIdx = lunr(function () {
                this.use(lunr.es);
                this.field('body');
                this.add({ "body": "Respiración", "id": 1 });
            });

            var accentFoldIdx = lunr(function () {
                this.use(lunr.es);
                this.pipeline.before(lunr.es.stemmer, lunr.es.accentFold);
                this.searchPipeline.before(lunr.es.stemmer, lunr.es.accentFold);
                this.field('body');
                this.add({ "body": "Respiración autonomías hablaré pingüino año", "id": 1 });
            });

            it("should not fold Spanish accents by default", function () {
                assert.equal(defaultIdx.search('respiracion').length, 0)
            });

            it("should find accented Spanish words when accents are omitted", function () {
                assert.equal(accentFoldIdx.search('respiracion').length, 1)
                assert.equal(accentFoldIdx.search('autonomias').length, 1)
                assert.equal(accentFoldIdx.search('hablare').length, 1)
                assert.equal(accentFoldIdx.search('pinguino').length, 1)
            });

            it("should not fold ene into plain n", function () {
                assert.equal(accentFoldIdx.search('ano').length, 0)
                assert.equal(accentFoldIdx.search('año').length, 1)
            });
        })
    });
});

describe("should write the stop words of every language in Unicode NFC", function () {
    var languages = require('fs').readdirSync(require('path').join(__dirname, '..', '..'))
        .map(function (file) {
            var match = file.match(/^lunr\.([a-z]+)\.js$/);
            return match && match[1];
        })
        .filter(function (language) {
            return language && language !== 'multi';
        });

    languages.forEach(function (language) {
        it("should write the stop words of " + language.toUpperCase() + " in NFC", function () {
            delete require.cache[require.resolve('../../lunr.' + language + '.js')];

            var lunr = freshLunr();
            require('../../lunr.stemmer.support.js')(lunr);
            if (language === 'ja' || language === 'jp') {
                require('../../tinyseg')(lunr);
            }
            if (language === 'th' || language === 'hi' || language === 'ta' || language === 'sa' || language === 'kn' || language === 'te') {
                lunr.wordcut = require('../../wordcut');
            }

            // collect every stop word list the language hands to Lunr
            var stopWords = [];
            var generateStopWordFilter = lunr.generateStopWordFilter;
            lunr.generateStopWordFilter = function (words) {
                stopWords = stopWords.concat(words);
                return generateStopWordFilter.apply(this, arguments);
            };
            if (language === 'jp') {
                require('../../lunr.ja.js')(lunr);
            }
            require('../../lunr.' + language + '.js')(lunr);
            lunr.generateStopWordFilter = generateStopWordFilter;

            assert.deepEqual(stopWords.filter(function (word) {
                return word !== word.normalize('NFC');
            }), []);
        });
    });
});
