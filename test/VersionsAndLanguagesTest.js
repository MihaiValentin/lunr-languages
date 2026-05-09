var assert = require('assert');

var lunrVersions = [
    {
        version: "0.6.0",
        lunr: "lunr-0.6.0.min"
    }, {
        version: "0.7.0",
        lunr: "lunr-0.7.0.min"
    }, {
        version: "1.0.0",
        lunr: "lunr-1.0.0.min"
    }, {
        version: "2.0.1",
        lunr: "lunr-2.0.1"
    }, {
        version: "2.3.5",
        lunr: "lunr-2.3.5"
    }

];

var testDocuments = {
    he: require('./testdata/he'),
    ar: require('./testdata/ar'),
    de: require('./testdata/de'),
    da: require('./testdata/da'),
    du: require('./testdata/du'),
    es: require('./testdata/es'),
    fi: require('./testdata/fi'),
    fr: require('./testdata/fr'),
    hi: require('./testdata/hi'),
    hu: require('./testdata/hu'),
    hy: require('./testdata/hy'),
    it: require('./testdata/it'),
    ja: require('./testdata/ja'),
    jp: require('./testdata/ja'),
    kn: require('./testdata/kn'),
    ko: require('./testdata/ko'),
    no: require('./testdata/no'),
    pl: require('./testdata/pl'),
    pt: require('./testdata/pt'),
    ro: require('./testdata/ro'),
    ru: require('./testdata/ru'),
    sa: require('./testdata/sa'),
    sv: require('./testdata/sv'),
    ta: require('./testdata/ta'),
    te: require('./testdata/te'),
    tr: require('./testdata/tr'),
    th: require('./testdata/th'),
    vi: require('./testdata/vi'),
    zh: require('./testdata/zh'),
    el: require('./testdata/el'),
};

lunrVersions.forEach(function (lunrVersion) {
    describe("Testing Lunr-Languages & Lunr version " + lunrVersion.version, function () {
        describe("should be able to correctly identify words in multi-documents scenarios (eg: en + ru)", function () {
            delete require.cache[require.resolve('./lunr/' + lunrVersion.lunr)]
            var lunr = require('./lunr/' + lunrVersion.lunr);
            require('../lunr.stemmer.support.js')(lunr);
            require('../lunr.ru.js')(lunr);
            require('../lunr.multi.js')(lunr);

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
            delete require.cache[require.resolve('./lunr/' + lunrVersion.lunr)]
            var lunr = require('./lunr/' + lunrVersion.lunr);
            require('../lunr.stemmer.support.js')(lunr);
            require('../lunr.zh.js')(lunr);
            require('../lunr.de.js')(lunr);
            require('../lunr.multi.js')(lunr);

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
        describe("should keep numeric tokens when language trimmers are active", function () {
            delete require.cache[require.resolve('./lunr/' + lunrVersion.lunr)]

            var lunr = require('./lunr/' + lunrVersion.lunr);
            require('../lunr.stemmer.support.js')(lunr);
            require('../lunr.de.js')(lunr);
            require('../lunr.ru.js')(lunr);

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

            if (lunrVersion.version[0] === "2") {
                it("should keep wildcard searches with numeric prefixes", function () {
                    assert.equal(idxDe.search('123*').length, 1)
                });
            }
        });
        describe("should normalize German wildcard queries with umlauts", function () {
            delete require.cache[require.resolve('./lunr/' + lunrVersion.lunr)]

            var lunr = require('./lunr/' + lunrVersion.lunr);
            require('../lunr.stemmer.support.js')(lunr);
            require('../lunr.de.js')(lunr);

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

            if (lunrVersion.version[0] === "2") {
                it("should find German words with umlauts with wildcard searches", function () {
                    assert.equal(idx.search('günsti*').length, 1)
                });

                it("should leave non-German indexes unchanged after German is loaded", function () {
                    assert.equal(defaultIdx.search('günsti*').length, 1)
                });
            }
        });
        describe("should normalize French accented queries", function () {
            delete require.cache[require.resolve('./lunr/' + lunrVersion.lunr)]

            var lunr = require('./lunr/' + lunrVersion.lunr);
            require('../lunr.stemmer.support.js')(lunr);
            require('../lunr.fr.js')(lunr);

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

            if (lunrVersion.version[0] === "2") {
                it("should index folded French stems", function () {
                    assert.ok(idx.invertedIndex.empech)
                    assert.ok(idx.invertedIndex.maitr)
                    assert.equal(idx.invertedIndex['empêch'], undefined)
                    assert.equal(idx.invertedIndex['maîtr'], undefined)
                });

                it("should find French words with accented wildcard searches", function () {
                    assert.equal(idx.search('maîtr*').length, 1)
                });
            }
        });
        Object.keys(testDocuments).forEach(function (language) {
            describe("should be able to correctly find terms in " + language.toUpperCase() + " correctly", function () {
                // because these tests are asynchronous, we must ensure every load of lunr is fresh
                // so we do not get the previous used languages on it.
                // if we don't do this, when we'll run the test for jp, we'll also have da, de, fr, it languages used
                delete require.cache[require.resolve('./lunr/' + lunrVersion.lunr)];

                var lunr = require('./lunr/' + lunrVersion.lunr);
                require('../lunr.stemmer.support.js')(lunr);
                if (language === 'ja' || language === 'jp') {    // for japanese, we must also load the tinyseg tokenizer
                    require('../tinyseg')(lunr);
                }
                if (language === 'th' || language === 'hi' || language === 'ta' || language === 'sa' || language === 'kn' || language === 'te') {    // for thai, we must also load the wordcut tokenizer
                    lunr.wordcut = require('../wordcut');
                }
                require('../lunr.' + language + '.js')(lunr);

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

        if (lunrVersion.version[0] === "2") {
            describe("should support opt-in Spanish accent folding", function () {
                delete require.cache[require.resolve('./lunr/' + lunrVersion.lunr)]

                var lunr = require('./lunr/' + lunrVersion.lunr);
                require('../lunr.stemmer.support.js')(lunr);
                require('../lunr.es.js')(lunr);

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
        }
    })
});
