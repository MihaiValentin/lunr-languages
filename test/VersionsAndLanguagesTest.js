var test = require('node:test');
var describe = test.describe;
var it = test.it;
var assert = require('assert');

// a trimmer applied to a word (lunr 2 passes tokens)
var trimToken = function (lunr, trimmer, word) {
    return trimmer(new lunr.Token(word)).toString();
};

var lunrVersions = [
    {
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
    en: require('./testdata/en'),
    es: require('./testdata/es'),
    fi: require('./testdata/fi'),
    fr: require('./testdata/fr'),
    hi: require('./testdata/hi'),
    hu: require('./testdata/hu'),
    hy: require('./testdata/hy'),
    it: require('./testdata/it'),
    ja: require('./testdata/ja'),
    kn: require('./testdata/kn'),
    ko: require('./testdata/ko'),
    nl: require('./testdata/nl'),
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
    fa: require('./testdata/fa'),
    eo: require('./testdata/eo'),
    ca: require('./testdata/ca'),
    id: require('./testdata/id'),
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

            it("should name lunr's built-in English 'builtin' in the multi-trimmer label", function () {
                assert.ok(lunr.Pipeline.registeredFunctions['lunr-multi-trimmer-builtin-ru']);
                assert.ok(!lunr.Pipeline.registeredFunctions['lunr-multi-trimmer-en-ru']);
            });
        });
        describe("should use lunr.en in multi-language indexes when it is loaded", function () {
            delete require.cache[require.resolve('./lunr/' + lunrVersion.lunr)]
            var lunr = require('./lunr/' + lunrVersion.lunr);
            require('../lunr.stemmer.support.js')(lunr);
            require('../lunr.en.js')(lunr);
            require('../lunr.ru.js')(lunr);
            require('../lunr.multi.js')(lunr);

            var idxMulti = lunr(function () {
                this.use(lunr.multiLanguage('en', 'ru'));
                this.field('body');
                this.add({ "body": "Этот текст написан на русском.", "id": 1 });
                this.add({ "body": "The café was generously decorated.", "id": 2 });
            });

            it("should stem with lunr.en (Porter2: generously -> generous)", function () {
                assert.equal(idxMulti.search('generous').length, 1)
                assert.equal(idxMulti.search('general').length, 0)
            });

            it("should trim with lunr.en's word characters", function () {
                assert.equal(idxMulti.search('café').length, 1)
            });

            it("should still stem Russian", function () {
                assert.equal(idxMulti.search('Русских').length, 1)
            });

            it("should name lunr.en 'en' in the multi-trimmer label", function () {
                assert.ok(lunr.Pipeline.registeredFunctions['lunr-multi-trimmer-en-ru']);
                assert.ok(!lunr.Pipeline.registeredFunctions['lunr-multi-trimmer-builtin-ru']);
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

            it("should keep wildcard searches with numeric prefixes", function () {
                assert.equal(idxDe.search('123*').length, 1)
            });
        });
        describe("should trim punctuation around locale words in language trimmers", function () {
            delete require.cache[require.resolve('./lunr/' + lunrVersion.lunr)]

            var lunr = require('./lunr/' + lunrVersion.lunr);
            require('../lunr.stemmer.support.js')(lunr);
            require('../lunr.ko.js')(lunr);
            require('../lunr.hy.js')(lunr);
            require('../lunr.vi.js')(lunr);

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
            delete require.cache[require.resolve('./lunr/' + lunrVersion.lunr)]

            var lunr = require('./lunr/' + lunrVersion.lunr);
            require('../lunr.stemmer.support.js')(lunr);
            require('../lunr.th.js')(lunr);

            it("should trim Thai punctuation", function () {
                assert.equal(trimToken(lunr, lunr.th.trimmer, '(สวัสดี)'), 'สวัสดี')
                assert.equal(trimToken(lunr, lunr.th.trimmer, 'สวัสดี,'), 'สวัสดี')
            });

            it("should keep Latin words in Thai text", function () {
                assert.equal(trimToken(lunr, lunr.th.trimmer, '(iPhone)'), 'iPhone')
            });
        });
        describe("should keep Vietnamese words written with composed letters", function () {
            delete require.cache[require.resolve('./lunr/' + lunrVersion.lunr)]

            var lunr = require('./lunr/' + lunrVersion.lunr);
            require('../lunr.stemmer.support.js')(lunr);
            require('../lunr.vi.js')(lunr);

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

            if (lunrVersion.version[0] === "2") {
                it("should not index a stop word followed by punctuation", function () {
                    assert.equal(idx.invertedIndex['mà'], undefined)
                    assert.equal(idx.invertedIndex['m'], undefined)
                });
            }

            it("should drop function words and keep syllables that are also content words", function () {
                var words = function (text) {
                    return lunr.vi.stopWordFilter(new lunr.Token(text)) === undefined ? null : text;
                };
                assert.deepEqual(['của', 'và', 'được', 'những', 'đã'].map(words), [null, null, null, null, null]);
                assert.deepEqual(['người', 'năm', 'có', 'một', 'từ', 'không'].map(words), ['người', 'năm', 'có', 'một', 'từ', 'không']);
            });
        });
        describe("should filter Hindi stop words written in NFC", function () {
            delete require.cache[require.resolve('./lunr/' + lunrVersion.lunr)]

            var lunr = require('./lunr/' + lunrVersion.lunr);
            require('../lunr.stemmer.support.js')(lunr);
            require('../lunr.hi.js')(lunr);

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

            it("should find German words with umlauts with wildcard searches", function () {
                assert.equal(idx.search('günsti*').length, 1)
            });

            it("should leave non-German indexes unchanged after German is loaded", function () {
                assert.equal(defaultIdx.search('günsti*').length, 1)
            });
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

            it("should index the stems of both forms", function () {
                assert.ok(idx.invertedIndex['empêch'])
                assert.ok(idx.invertedIndex.empech)
                assert.ok(idx.invertedIndex['maîtr'])
                assert.ok(idx.invertedIndex.maitr)
            });

            it("should find French words with accented and accent-free wildcard searches", function () {
                assert.equal(idx.search('maîtr*').length, 1)
                assert.equal(idx.search('maitr*').length, 1)
                assert.equal(idx.search('empêch*').length, 1)
            });
        });
        describe("should let accent folding be switched off (opt-out)", function () {
            delete require.cache[require.resolve('./lunr/' + lunrVersion.lunr)]

            var lunr = require('./lunr/' + lunrVersion.lunr);
            require('../lunr.stemmer.support.js')(lunr);
            require('../lunr.fr.js')(lunr);

            var idx = lunr(function () {
                this.use(lunr.fr);
                this.pipeline.remove(lunr.fr.accentFold);
                this.searchPipeline.remove(lunr.fr.accentFold);
                this.ref('id');
                this.field('text');
                this.add({ id: 1, text: "rivière" });
            });

            it("should only index the original stem", function () {
                assert.ok(idx.invertedIndex.rivi)
                assert.equal(idx.invertedIndex.rivier, undefined)
            });

            it("should find the accented word, but not the accent-free one", function () {
                assert.equal(idx.search('rivière').length, 1)
                assert.equal(idx.search('riviere').length, 0)
            });

            it("should not accent fold wildcard terms", function () {
                assert.equal(idx.search('rivi*').length, 1)
                // the full word with a wildcard is stemmed to rivi*, the accent-free one is not folded
                assert.equal(idx.search('rivière*').length, 1)
                assert.equal(idx.search('riviere*').length, 0)
            });

            it("should still accent fold wildcard terms in an index that has accent folding", function () {
                var folding = lunr(function () {
                    this.use(lunr.fr);
                    this.ref('id');
                    this.field('text');
                    this.add({ id: 1, text: "rivière" });
                });
                assert.equal(folding.search('rivier*').length, 1)
                assert.equal(folding.search('riviè*').length, 1)
            });
        });
        describe("should fold accents in other languages by default", function () {
            delete require.cache[require.resolve('./lunr/' + lunrVersion.lunr)]

            var lunr = require('./lunr/' + lunrVersion.lunr);
            require('../lunr.stemmer.support.js')(lunr);
            ['pl', 'ro', 'tr', 'hu', 'pt', 'de', 'sv'].forEach(function (locale) {
                require('../lunr.' + locale + '.js')(lunr);
            });

            var index = function (locale, text) {
                return lunr(function () {
                    this.use(lunr[locale]);
                    this.ref('id');
                    this.field('text');
                    this.add({ id: 1, text: text });
                });
            };

            it("should fold letters without a Unicode decomposition (Polish ł, Turkish ı)", function () {
                assert.equal(index('pl', 'żółw').search('zolw').length, 1)
                assert.equal(index('pl', 'łódź').search('lodz').length, 1)
                assert.equal(index('tr', 'ılık').search('ilik').length, 1)
            });

            it("should fold Romanian, Hungarian and Portuguese diacritics", function () {
                assert.equal(index('ro', 'învățământ').search('invatamant').length, 1)
                assert.equal(index('hu', 'gyönyörű').search('gyonyoru').length, 1)
                assert.equal(index('pt', 'coração').search('coracao').length, 1)
            });

            it("should not have accent folding where the marked letters are letters of their own", function () {
                assert.equal(lunr.de.accentFold, undefined)
                assert.equal(lunr.sv.accentFold, undefined)
                assert.equal(index('sv', 'här').search('har').length, 0)
            });
        });
        describe("should fold accents in multi-language indexes", function () {
            delete require.cache[require.resolve('./lunr/' + lunrVersion.lunr)]

            var lunr = require('./lunr/' + lunrVersion.lunr);
            require('../lunr.stemmer.support.js')(lunr);
            require('../lunr.fr.js')(lunr);
            require('../lunr.de.js')(lunr);
            require('../lunr.multi.js')(lunr);

            var idx = lunr(function () {
                this.use(lunr.multiLanguage('de', 'fr'));
                this.ref('id');
                this.field('text');
                this.add({ id: 1, text: "rivière Häuser" });
            });

            it("should find French words without accents and German words without umlauts", function () {
                assert.equal(idx.search('riviere').length, 1)
                assert.equal(idx.search('hauser').length, 1)
            });
        });
        Object.keys(testDocuments).forEach(function (language) {
            describe("should be able to correctly find terms in " + language.toUpperCase() + " correctly", function () {
                // because these tests are asynchronous, we must ensure every load of lunr is fresh
                // so we do not get the previous used languages on it.
                // if we don't do this, when we'll run the test for ja, we'll also have da, de, fr, it languages used
                delete require.cache[require.resolve('./lunr/' + lunrVersion.lunr)];

                var lunr = require('./lunr/' + lunrVersion.lunr);
                require('../lunr.stemmer.support.js')(lunr);
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

        describe("should not stem searched words with lunr's English stemmer", function () {
            var samples = { ja: '日本語', zh: '中文', th: 'ภาษาไทย', hy: 'հայերեն', vi: 'tiếng' };

            Object.keys(samples).forEach(function (language) {
                delete require.cache[require.resolve('./lunr/' + lunrVersion.lunr)]

                var lunr = require('./lunr/' + lunrVersion.lunr);
                require('../lunr.stemmer.support.js')(lunr);
                require('../lunr.' + language + '.js')(lunr);

                var idx = lunr(function () {
                    this.use(lunr[language]);
                    this.field('body');
                    this.add({ "body": "running " + samples[language], "id": 1 });
                });

                it("should find the unstemmed word 'running' in " + language.toUpperCase(), function () {
                    assert.equal(idx.search('running').length, 1)
                    assert.equal(idx.toJSON().pipeline.indexOf('stemmer'), -1)
                });
            });
        });

        describe("should segment search strings like the index (ja, zh, th)", function () {
            delete require.cache[require.resolve('./lunr/' + lunrVersion.lunr)]

            var lunr = require('./lunr/' + lunrVersion.lunr);
            require('../lunr.stemmer.support.js')(lunr);
            require('../lunr.ja.js')(lunr);
            require('../lunr.zh.js')(lunr);
            require('../lunr.th.js')(lunr);
            require('../lunr.multi.js')(lunr);

            var build = function (plugin, docs) {
                return lunr(function () {
                    this.use(plugin);
                    this.ref('id');
                    this.field('title');
                    this.field('body');
                    docs.forEach(function (doc) { this.add(doc); }, this);
                });
            };
            var idxJa = build(lunr.ja, [{ id: 1, title: '日本語の本', body: '' }, { id: 2, title: '英語の雑誌', body: '' }]);
            var idxTh = build(lunr.th, [{ id: 1, title: 'ฉันกินข้าว', body: '' }, { id: 2, title: 'ฉันดื่มน้ำ', body: '' }]);
            var idxZh = build(lunr.zh, [{ id: 1, title: '我喜欢学习中文', body: '' }]);

            it("should find a Japanese phrase written without spaces", function () {
                assert.equal(idxJa.search('日本語の本').length, 1);
            });

            it("should find a Thai phrase written without spaces", function () {
                assert.equal(idxTh.search('ฉันกินข้าว')[0].ref, '1');
            });

            it("should find a Chinese phrase written without spaces", function () {
                assert.equal(idxZh.search('学习中文').length, 1);
            });

            it("should repeat presence and field for each word of a phrase", function () {
                if (!lunr.Query.presence) {
                    return;
                }
                assert.deepEqual(idxJa.search('+title:日本語の本').map(function (r) { return r.ref; }), ['1']);
                assert.deepEqual(idxJa.search('+title:英語の本').map(function (r) { return r.ref; }), []);
                // prohibited words: every document without them (の is a stop word, dropped from the index)
                assert.deepEqual(idxJa.search('-title:日本語の本').map(function (r) { return r.ref; }), ['2']);
            });

            it("should keep wildcard terms whole", function () {
                assert.equal(idxJa.search('日本*').length, 1);
            });

            it("should count Japanese token positions from the start of the text", function () {
                var tokens = lunr.ja.tokenizer('  日本語の本', { fields: ['title'] });
                assert.deepEqual(tokens.map(function (t) { return t.metadata.position; }), [[2, 3], [5, 1], [6, 1]]);
                assert.deepEqual(tokens[0].metadata.fields, ['title']);
            });

            it("should segment in multi-language indexes", function () {
                var idxMulti = build(lunr.multiLanguage('en', 'ja'), [{ id: 1, title: 'book 日本語の本', body: '' }]);
                assert.equal(idxMulti.search('日本語の本').length, 1);
            });
        });

        describe("should segment Japanese with Intl.Segmenter, or TinySegmenter when it is loaded", function () {
            var load = function (order) {
                delete require.cache[require.resolve('./lunr/' + lunrVersion.lunr)]
                var lunr = require('./lunr/' + lunrVersion.lunr);
                order.forEach(function (name) {
                    var file = { support: '../lunr.stemmer.support.js', ja: '../lunr.ja.js', tinyseg: '../lunr.ja.tinyseg.js' }[name];
                    delete require.cache[require.resolve(file)];
                    require(file)(lunr);
                });
                return lunr;
            };
            var words = function (lunr, text) {
                return lunr.ja.tokenizer(text).map(function (t) { return t.toString(); });
            };

            it("should use Intl.Segmenter by default", function () {
                var lunr = load(['support', 'ja']);
                assert.equal(lunr.ja.tokenizer.segmenter(), 'Intl.Segmenter');
                assert.deepEqual(words(lunr, '日本語の本'), ['日本語', 'の', '本']);
            });

            it("should use TinySegmenter when lunr.ja.tinyseg.js is loaded, before or after lunr.ja.js", function () {
                [['tinyseg', 'support', 'ja'], ['support', 'ja', 'tinyseg'], ['support', 'tinyseg', 'ja', 'tinyseg']].forEach(function (order) {
                    var lunr = load(order);
                    assert.equal(lunr.ja.tokenizer.segmenter(), 'TinySegmenter');
                    // TinySegmenter keeps the verb 食べ together, Intl.Segmenter splits it (食|べた|い)
                    assert.deepEqual(words(lunr, 'ラーメンが食べたい'), ['ラーメン', 'が', '食べ', 'たい']);
                });
            });

            it("should fail with a clear error when tokenizing without both", function () {
                var lunr = load(['support', 'ja']);
                var original = Intl.Segmenter;
                Intl.Segmenter = undefined;
                try {
                    assert.throws(function () { words(lunr, '日本語'); }, /Intl\.Segmenter or lunr\.ja\.tinyseg\.js/);
                } finally {
                    Intl.Segmenter = original;
                }
            });

            it("should count token positions from the start of the text with both segmenters", function () {
                [load(['support', 'ja']), load(['support', 'ja', 'tinyseg'])].forEach(function (lunr) {
                    var tokens = lunr.ja.tokenizer('  日本語の本', { fields: ['title'] });
                    assert.deepEqual(tokens.map(function (t) { return t.metadata.position; }), [[2, 3], [5, 1], [6, 1]]);
                    assert.deepEqual(tokens[0].metadata.fields, ['title']);
                });
            });
        });

        describe("should segment Thai with Intl.Segmenter, or wordcut when it is loaded", function () {
            // order: the files in the order to load them ('support', 'th', 'wordcut')
            var load = function (order) {
                delete require.cache[require.resolve('./lunr/' + lunrVersion.lunr)]
                var lunr = require('./lunr/' + lunrVersion.lunr);
                order.forEach(function (name) {
                    var file = { support: '../lunr.stemmer.support.js', th: '../lunr.th.js', wordcut: '../lunr.th.wordcut.js' }[name];
                    delete require.cache[require.resolve(file)];
                    require(file)(lunr);
                });
                return lunr;
            };
            var words = function (lunr, text) {
                return lunr.th.tokenizer(text).map(function (t) { return t.toString(); });
            };
            var withoutIntlSegmenter = function (fn) {
                var original = Intl.Segmenter;
                Intl.Segmenter = undefined;
                try {
                    return fn();
                } finally {
                    Intl.Segmenter = original;
                }
            };

            it("should use Intl.Segmenter by default", function () {
                var lunr = load(['support', 'th']);
                assert.equal(lunr.th.tokenizer.segmenter(), 'Intl.Segmenter');
                assert.deepEqual(words(lunr, 'ฉันกินข้าว'), ['ฉัน', 'กิน', 'ข้าว']);
            });

            it("should use wordcut when lunr.th.wordcut.js is loaded, before or after lunr.th.js", function () {
                [['wordcut', 'support', 'th'], ['support', 'th', 'wordcut']].forEach(function (order) {
                    var lunr = load(order);
                    assert.equal(lunr.th.tokenizer.segmenter(), 'wordcut');
                    assert.deepEqual(words(lunr, 'ฉันกินข้าว, ฉัน'), ['ฉัน', 'กิน', 'ข้าว', 'ฉัน']);
                });
            });

            it("should load wordcut's dictionary and create no globals", function () {
                var lunr = load(['support', 'th', 'wordcut']);
                // without its dictionary, wordcut splits สวัสดี (hello) into สวัส|ดี
                assert.deepEqual(words(lunr, 'สวัสดีชาวบ้าน'), ['สวัสดี', 'ชาว', 'บ้าน']);
                assert.equal('words' in globalThis, false);
                assert.equal('defaultDict' in globalThis, false);
            });

            it("should load lunr.th.wordcut.js twice without harm", function () {
                var lunr = load(['support', 'wordcut', 'th', 'wordcut']);
                assert.deepEqual(words(lunr, 'ฉันกินข้าว'), ['ฉัน', 'กิน', 'ข้าว']);
            });

            it("should work with wordcut where Intl.Segmenter is missing", function () {
                var lunr = load(['support', 'th', 'wordcut']);
                withoutIntlSegmenter(function () {
                    assert.deepEqual(words(lunr, 'ฉันกินข้าว'), ['ฉัน', 'กิน', 'ข้าว']);
                });
            });

            it("should fail with a clear error when tokenizing without both", function () {
                var lunr = load(['support', 'th']);
                withoutIntlSegmenter(function () {
                    assert.throws(function () { words(lunr, 'ฉันกินข้าว'); }, /Intl\.Segmenter or lunr\.th\.wordcut\.js/);
                });
            });

            it("should set position metadata like lunr's tokenizer", function () {
                [load(['support', 'th']), load(['support', 'th', 'wordcut'])].forEach(function (lunr) {
                    var tokens = lunr.th.tokenizer('ฉัน กินข้าว', { fields: ['body'] });
                    assert.deepEqual(tokens.map(function (t) { return t.metadata.position; }), [[0, 3], [4, 3], [7, 4]]);
                    assert.deepEqual(tokens.map(function (t) { return t.metadata.index; }), [0, 1, 2]);
                    assert.deepEqual(tokens[0].metadata.fields, ['body']);
                });
            });
        });

        describe("should lowercase Thai text like lunr", function () {
            delete require.cache[require.resolve('./lunr/' + lunrVersion.lunr)]

            var lunr = require('./lunr/' + lunrVersion.lunr);
            require('../lunr.stemmer.support.js')(lunr);
            require('../lunr.th.js')(lunr);

            it("should lowercase Latin words in Thai text", function () {
                var idx = lunr(function () {
                    this.use(lunr.th);
                    this.field('body');
                    this.add({ "body": "Running ภาษาไทย", "id": 1 });
                });
                assert.equal(idx.search('running').length, 1);
            });
        });

        describe("should load hi, kn, sa, ta and te without wordcut", function () {
            delete require.cache[require.resolve('./lunr/' + lunrVersion.lunr)]

            var lunr = require('./lunr/' + lunrVersion.lunr);
            require('../lunr.stemmer.support.js')(lunr);

            ['hi', 'kn', 'sa', 'ta', 'te'].forEach(function (language) {
                it("should load " + language.toUpperCase() + " and tokenize it with lunr's tokenizer", function () {
                    require('../lunr.' + language + '.js')(lunr);
                    assert.equal(lunr[language].tokenizer, undefined);
                });
            });
        });

        describe("should find the tokenizer an index was built with", function () {
            delete require.cache[require.resolve('./lunr/' + lunrVersion.lunr)]

            var lunr = require('./lunr/' + lunrVersion.lunr);
            require('../lunr.stemmer.support.js')(lunr);
            require('../lunr.ja.js')(lunr);
            require('../lunr.tr.js')(lunr);
            require('../lunr.de.js')(lunr);
            require('../lunr.multi.js')(lunr);

            var build = function (plugin) {
                return lunr(function () {
                    this.use(plugin);
                    this.field('body');
                });
            };
            var support = lunr.stemmerSupport;

            it("should use the language's tokenizer for its index", function () {
                assert.strictEqual(support.tokenizerFor(build(lunr.ja).pipeline), lunr.ja.tokenizer);
                assert.strictEqual(support.tokenizerFor(build(lunr.tr).pipeline), lunr.tr.tokenizer);
            });

            it("should use lunr's tokenizer for languages without one", function () {
                assert.strictEqual(support.tokenizerFor(build(lunr.de).pipeline), lunr.tokenizer);
            });

            it("should use the language tokenizer in multi-language indexes", function () {
                assert.strictEqual(support.tokenizerFor(build(lunr.multiLanguage('en', 'tr')).pipeline), lunr.tr.tokenizer);
                assert.strictEqual(support.tokenizerFor(build(lunr.multiLanguage('de', 'ja')).pipeline), lunr.ja.tokenizer);
            });

            it("should combine lunr's tokens with the language tokenizers' for lunr.multi", function () {
                var tokens = support.combineTokenizers([lunr.tr.tokenizer])('INFO').map(function (t) { return t.toString(); });
                assert.deepEqual(tokens, ['info', 'ınfo']);
            });
        });

        describe("should find required words with accent folding", function () {
            delete require.cache[require.resolve('./lunr/' + lunrVersion.lunr)]

            var lunr = require('./lunr/' + lunrVersion.lunr);
            require('../lunr.stemmer.support.js')(lunr);
            require('../lunr.tr.js')(lunr);
            require('../lunr.fr.js')(lunr);

            var build = function (plugin, body) {
                return lunr(function () {
                    this.use(plugin);
                    this.ref('id');
                    this.field('body');
                    this.add({ "body": body, "id": 1 });
                });
            };
            var idxTr = build(lunr.tr, "kızlar");
            var idxFr = build(lunr.fr, "riviere");
            var idxFrAccented = build(lunr.fr, "rivière");

            if (!lunr.Query.presence) {
                return;
            }

            it("should find a required word whose folded form stems differently (Turkish kızı)", function () {
                assert.equal(idxTr.search('+kızı').length, 1);
            });

            it("should find a required accented word in an unaccented document", function () {
                assert.equal(idxFr.search('+rivière').length, 1);
            });

            it("should keep finding required words in both forms", function () {
                assert.equal(idxFrAccented.search('+rivière').length, 1);
                assert.equal(idxFrAccented.search('+riviere').length, 1);
            });

            it("should still find nothing for a required word that is not in the index", function () {
                assert.equal(idxFr.search('+riviere +montagne').length, 0);
            });

            it("should ignore required stop words, which the index dropped", function () {
                var idx = build(lunr.fr, "la riviere");
                assert.equal(idx.search('+la +riviere').length, 1);
                assert.equal(idx.search('+la +montagne').length, 0);
            });

            it("should ignore required stop words of lunr's built-in English", function () {
                var idx = lunr(function () {
                    this.ref('id');
                    this.field('body');
                    this.add({ "body": "the river", "id": 1 });
                });
                assert.equal(idx.search('+the +river').length, 1);
            });
        });

        describe("should prepare query.term() terms like the query parser", function () {
            delete require.cache[require.resolve('./lunr/' + lunrVersion.lunr)]

            var lunr = require('./lunr/' + lunrVersion.lunr);
            require('../lunr.stemmer.support.js')(lunr);
            require('../lunr.ja.js')(lunr);
            require('../lunr.tr.js')(lunr);
            require('../lunr.de.js')(lunr);
            require('../lunr.multi.js')(lunr);

            var support = lunr.stemmerSupport;
            var build = function (plugin, body) {
                return lunr(function () {
                    this.use(plugin);
                    this.ref('id');
                    this.field('body');
                    this.add({ "body": body, "id": 1 });
                });
            };
            var count = function (idx, text, options) {
                return idx.query(function (q) {
                    support.addQueryTerms(q, text, options);
                }).length;
            };
            var required = lunr.Query.presence ? { presence: lunr.Query.presence.REQUIRED } : {};

            var idxTr = build(lunr.tr, "İSTANBUL KIZLAR");
            var idxDe = build(lunr.de, "Käse Häuser");
            var idxJa = build(lunr.ja, "日本語の本を読む");
            var idxMulti = build(lunr.multiLanguage('en', 'tr'), "running KIZLAR");

            it("should normalize terms for the index's languages", function () {
                assert.equal(support.normalizeQueryTerm('KIZ*', idxTr), 'kiz*');
                assert.equal(support.normalizeQueryTerm('Käs*', idxDe), 'kas*');
                assert.deepEqual(support.normalizeQueryTerm(['İSTANBUL', 'Käse'], idxTr), ['istanbul', 'käse']);
            });

            it("should apply special casing to plain and wildcard terms", function () {
                assert.equal(count(idxTr, 'İstanbul'), 1);
                assert.equal(count(idxTr, 'KIZI'), 1);
                assert.equal(count(idxTr, 'KIZ*'), 1);
            });

            it("should fold wildcard terms, also with the wildcard option", function () {
                assert.equal(count(idxDe, 'Käs*'), 1);
                if (lunr.Query.wildcard) {
                    assert.equal(count(idxDe, 'Kä', { wildcard: lunr.Query.wildcard.TRAILING }), 1);
                }
            });

            it("should split text with the tokenizer the index was built with", function () {
                assert.equal(count(idxJa, '日本語の本', required), 1);
                if (lunr.Query.presence) {
                    assert.equal(count(idxJa, '日本語の雑誌', required), 0);
                }
            });

            it("should drop stop words the index dropped, so required terms still match", function () {
                assert.equal(count(build(lunr.de, "Käse und Brot"), 'Käse und Brot', required), 1);
            });

            it("should work in multi-language indexes", function () {
                assert.equal(count(idxMulti, 'run KIZI', required), 1);
            });
        });

        describe("should lowercase Turkish I and İ the Turkish way", function () {
            delete require.cache[require.resolve('./lunr/' + lunrVersion.lunr)]

            var lunr = require('./lunr/' + lunrVersion.lunr);
            require('../lunr.stemmer.support.js')(lunr);
            require('../lunr.tr.js')(lunr);
            require('../lunr.de.js')(lunr);
            require('../lunr.multi.js')(lunr);

            var idx = lunr(function () {
                this.use(lunr.tr);
                this.field('body');
                this.add({ "body": "İSTANBUL KIZLAR", "id": 1 });
            });

            var idxDe = lunr(function () {
                this.use(lunr.de);
                this.field('body');
                this.add({ "body": "INFO", "id": 1 });
            });

            var idxMulti = lunr(function () {
                this.use(lunr.multiLanguage('en', 'tr'));
                this.field('body');
                this.add({ "body": "INFO KIZLAR", "id": 1 });
            });

            it("should index İ as i (not i plus a combining dot)", function () {
                assert.equal(idx.search('istanbul').length, 1)
            });

            it("should index I as ı, so it stems like the lowercase word", function () {
                assert.equal(lunr.tr.tokenizer('KIZLAR')[0].toString(), 'kızlar')
                assert.equal(idx.search('kızı').length, 1)
            });

            it("should map query terms the same way", function () {
                assert.equal(idx.search('İSTANBUL').length, 1)
                assert.equal(idx.search('KIZI').length, 1)
                assert.equal(idx.search('İstan*').length, 1)
            });

            it("should not change other languages' indexes", function () {
                assert.equal(lunr.tokenizer('INFO')[0].toString(), 'info')
                assert.equal(idxDe.search('INFO').length, 1)
            });

            it("should keep both readings in multi-language indexes", function () {
                assert.equal(idxMulti.search('info').length, 1)
                assert.equal(idxMulti.search('INFO').length, 1)
                assert.equal(idxMulti.search('kızı').length, 1)
            });
        });

        describe("should segment with the registered segmenter, else Intl.Segmenter", function () {
            delete require.cache[require.resolve('./lunr/' + lunrVersion.lunr)]
            var lunr = require('./lunr/' + lunrVersion.lunr);
            require('../lunr.stemmer.support.js')(lunr);
            var tokenizer = lunr.stemmerSupport.generateSegmentingTokenizer('xx', { intlLocale: 'en', missing: 'no segmenter for xx' });
            var fake = { name: 'fake', segment: function (str) { return [{ word: str.slice(0, 2), index: 0 }]; } };

            it("should use Intl.Segmenter and set position metadata like lunr's tokenizer", function () {
                assert.equal(tokenizer.segmenter(), 'Intl.Segmenter');
                var tokens = tokenizer('Ab, cd', { fields: ['body'] });
                assert.deepEqual(tokens.map(String), ['ab', 'cd']);
                assert.deepEqual(tokens.map(function (t) { return t.metadata.position; }), [[0, 2], [4, 2]]);
                assert.deepEqual(tokens[1].metadata.fields, ['body']);
            });

            it("should use a segmenter registered after the tokenizer was made", function () {
                lunr.segmenters = { xx: fake };
                try {
                    assert.equal(tokenizer.segmenter(), 'fake');
                    assert.deepEqual(tokenizer('abcd').map(String), ['ab']);
                } finally {
                    delete lunr.segmenters;
                }
            });

            it("should fail with options.missing without both", function () {
                var original = Intl.Segmenter;
                Intl.Segmenter = undefined;
                try {
                    assert.throws(function () { tokenizer('abcd'); }, /no segmenter for xx/);
                } finally {
                    Intl.Segmenter = original;
                }
            });
        });

        describe("should map special casing before lunr lowercases", function () {
            delete require.cache[require.resolve('./lunr/' + lunrVersion.lunr)]
            var lunr = require('./lunr/' + lunrVersion.lunr);
            require('../lunr.stemmer.support.js')(lunr);
            var casing = lunr.stemmerSupport.generateSpecialCasing({ 'I': '\u0131', '\u0130': 'i' });
            var tokenizer = lunr.stemmerSupport.generateSpecialCasingTokenizer(casing);

            it("should map the letters and keep the rest for lunr's lowercasing", function () {
                assert.equal(casing('KIZ \u0130STANBUL'), 'K\u0131Z iSTANBUL');
                assert.deepEqual(tokenizer('KIZ \u0130STANBUL').map(String), ['k\u0131z', 'istanbul']);
            });
        });
        describe("should fold Spanish accents by default", function () {
            delete require.cache[require.resolve('./lunr/' + lunrVersion.lunr)]

            var lunr = require('./lunr/' + lunrVersion.lunr);
            require('../lunr.stemmer.support.js')(lunr);
            require('../lunr.es.js')(lunr);

            var idx = lunr(function () {
                this.use(lunr.es);
                this.field('body');
                this.add({ "body": "Respiración autonomías hablaré pingüino año", "id": 1 });
            });

            it("should find accented Spanish words when accents are omitted", function () {
                assert.equal(idx.search('respiracion').length, 1)
                assert.equal(idx.search('autonomias').length, 1)
                assert.equal(idx.search('hablare').length, 1)
                assert.equal(idx.search('pinguino').length, 1)
            });

            it("should not fold ene into plain n", function () {
                assert.equal(idx.search('ano').length, 0)
                assert.equal(idx.search('año').length, 1)
            });
        })
    })
});

describe("should write the stop words of every language in Unicode NFC", function () {
    var languages = require('fs').readdirSync(require('path').join(__dirname, '..'))
        .map(function (file) {
            var match = file.match(/^lunr\.([a-z]+)\.js$/);
            return match && match[1];
        })
        .filter(function (language) {
            return language && language !== 'multi';
        });

    languages.forEach(function (language) {
        it("should write the stop words of " + language.toUpperCase() + " in NFC", function () {
            delete require.cache[require.resolve('./lunr/lunr-2.3.5')];
            delete require.cache[require.resolve('../lunr.' + language + '.js')];

            var lunr = require('./lunr/lunr-2.3.5');
            require('../lunr.stemmer.support.js')(lunr);

            // collect every stop word list the language hands to Lunr
            var stopWords = [];
            var generateStopWordFilter = lunr.generateStopWordFilter;
            lunr.generateStopWordFilter = function (words) {
                stopWords = stopWords.concat(words);
                return generateStopWordFilter.apply(this, arguments);
            };
            require('../lunr.' + language + '.js')(lunr);
            lunr.generateStopWordFilter = generateStopWordFilter;

            assert.deepEqual(stopWords.filter(function (word) {
                return word !== word.normalize('NFC');
            }), []);
        });
    });
});

describe("Lunr versions before 2", function () {
    it("should be rejected by the stemmer support with a hint to lunr-languages 1.x", function () {
        ['0.7.2', '1.0.0'].forEach(function (version) {
            assert.throws(function () {
                require('../lunr.stemmer.support.js')({ version: version });
            }, /requires Lunr 2.*use Lunr languages 1\.x/);
        });
    });
});

describe("Stemmer support for Snowball 3", function () {
    var lunr = require('./lunr/lunr-2.3.5');
    require('../lunr.stemmer.support.js')(lunr);

    it("should provide Snowball's BaseStemmer", function () {
        var stemmer = new lunr.stemmerSupport.BaseStemmer();
        stemmer.setCurrent('wort');
        assert.equal(stemmer.getCurrent(), 'wort');
    });

    it("should fold wildcard terms with a derived map, longest key first", function () {
        var normalizer = lunr.stemmerSupport.generateWildcardNormalizer({ 'ä': 'a', 'ae': 'a', 'ß': 'ss' });
        assert.equal(normalizer('Käse*'), 'kase*');
        assert.equal(normalizer('kaese*'), 'kase*');
        assert.equal(normalizer('straße*'), 'strasse*');
    });

    it("should apply ^ keys only at the start of a term", function () {
        var normalizer = lunr.stemmerSupport.generateWildcardNormalizer({ '^ge': '' });
        assert.equal(normalizer('gefiets*'), 'fiets*');
        assert.equal(normalizer('berge*'), 'berge*');
    });

    it("should keep a term that folding would reduce to wildcards only", function () {
        var normalizer = lunr.stemmerSupport.generateWildcardNormalizer({ '^ge': '' });
        assert.equal(normalizer('ge*'), 'ge*');
    });

    it("should normalize a token until nothing changes, and drop it if nothing is left", function () {
        var normalizer = lunr.stemmerSupport.generateNormalizer({ 'a': 'b', 'bb': 'b', '-': '' });
        assert.equal(normalizer.normalize('aaaa'), 'b');
        assert.equal(String(normalizer(new lunr.Token('xab'))), 'xb');
        assert.equal(normalizer(new lunr.Token('--')), undefined);
    });

    it("should index a token and its accent-free form with an accent fold", function () {
        var accentFold = lunr.stemmerSupport.generateAccentFold({ 'è': 'e', 'é': 'e' });
        var forms = accentFold(new lunr.Token('rivière'));
        assert.deepEqual(forms.map(String), ['rivière', 'riviere']);
        assert.equal(String(accentFold(new lunr.Token('maison'))), 'maison');
        assert.deepEqual(accentFold.map, { 'è': 'e', 'é': 'e' });
    });

    it("should accent fold wildcard terms only for an index with the accent fold", function () {
        var normalizer = lunr.stemmerSupport.generateWildcardNormalizer({ 'é': 'e' }, {
            label: 'accentFold-xx', accentFold: { 'è': 'e' }, map: { 'x': 'y' }
        });
        var withFold = new lunr.Pipeline();
        var fold = function (t) { return t; };
        lunr.Pipeline.registerFunction(fold, 'accentFold-xx');
        withFold.add(fold);
        assert.equal(normalizer('rivièrex*', withFold), 'rivierey*');
        assert.equal(normalizer('rivièrex*', new lunr.Pipeline()), 'rivièrex*');
    });
});
