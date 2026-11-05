/**
 * execute like this (from the project root folder):
 * node build/build.js
 */

var fs = require('fs');
var beautify = require('js-beautify').js_beautify;
var UglifyJS = require("uglify-js");

// shortcut for minifying a piece of code; comments are dropped, license headers are prepended by the caller
function compress(orig_code) {
    var result = UglifyJS.minify(orig_code, { output: { comments: false } });
    if (result.error) {
        throw result.error;
    }
    return result.code;
}

// the leading /*! ... */ blocks of a hand-written file, kept in its minified
// version when bundled third-party code requires its notice there
function licenseHeader(code) {
    var match = code.match(/^(\s*\/\*![\s\S]*?\*\/)+/);
    return match ? match[0].trim() + '\n' : '';
}

// take some of the stop words list from the stopwords-filter repo
var stopwordsRepoFolder = './stopwords-filter/lib/stopwords/snowball/locales/';
// and, since that repository does not include all the stopwords we want, we add more, custom stopwords lists
var stopwordsCustomFolder = './stopwords-custom/';
var stemmersCustomFolder = './custom-stemmers/';

// Use the Unicode library to produce a regex for characters of a particular
// 'script' (such as Latin), then extract the character ranges from that
// regex for use in our trimmer
function wordCharacters(script) {
    var charRegex = require('unicode-8.0.0/scripts/' + script + '/regex');
    // Now from /[a-z]/ get "a-z"
    var regexString = charRegex.toString()
    // Format sanity check
    if (regexString.slice(0, 2) !== '/[' || regexString.slice(-2) != ']/') {
        console.error('Unexpected regex structure, aborting: ' + regexString);
        throw Error;
    }
    return regexString.slice(2, -2);
}

function accentFoldFunction(locale) {
    return [
        '',
        '        lunr.' + locale + '.accentFold = function(token) {',
        '            if (!token) {',
        '                return token;',
        '            }',
        '',
        '            var str = token.toString();',
        '            var folded = str',
        '                .replace(/[\\u00E1\\u00E0\\u00E4\\u00E2]/g, "a")',
        '                .replace(/[\\u00E9\\u00E8\\u00EB\\u00EA]/g, "e")',
        '                .replace(/[\\u00ED\\u00EC\\u00EF\\u00EE]/g, "i")',
        '                .replace(/[\\u00F3\\u00F2\\u00F6\\u00F4]/g, "o")',
        '                .replace(/[\\u00FA\\u00F9\\u00FC\\u00FB]/g, "u");',
        '',
        '            if (folded === str) {',
        '                return token;',
        '            }',
        '',
        '            return [token, token.clone(function() {',
        '                return folded;',
        '            })];',
        '        };',
        '',
        '        lunr.Pipeline.registerFunction(lunr.' + locale + '.accentFold, "accentFold-' + locale + '");'
    ].join('\n');
}

function accentFoldTermFunction(locale) {
    return [
        '',
        '        lunr.' + locale + '.accentFoldTerm = function(term) {',
        '            return term',
        '                .replace(/[\\u00E0\\u00E1\\u00E2\\u00E4\\u00C0\\u00C1\\u00C2\\u00C4]/g, "a")',
        '                .replace(/[\\u00E7\\u00C7]/g, "c")',
        '                .replace(/[\\u00E9\\u00E8\\u00EA\\u00EB\\u00C9\\u00C8\\u00CA\\u00CB]/g, "e")',
        '                .replace(/[\\u00EE\\u00EF\\u00CE\\u00CF]/g, "i")',
        '                .replace(/[\\u00F4\\u00F6\\u00D4\\u00D6]/g, "o")',
        '                .replace(/[\\u00F9\\u00FB\\u00FC\\u00D9\\u00DB\\u00DC]/g, "u")',
        '                .replace(/[\\u0178\\u00FF]/g, "y")',
        '                .replace(/[\\u00E6\\u00C6]/g, "ae")',
        '                .replace(/[\\u0153\\u0152]/g, "oe");',
        '        };'
    ].join('\n');
}

function accentFoldTokenFunction(locale) {
    return accentFoldTermFunction(locale) + [
        '',
        '        lunr.' + locale + '.accentFold = function(token) {',
        '            if (!token) {',
        '                return token;',
        '            }',
        '',
        '            return token.update(function(term) {',
        '                return lunr.' + locale + '.accentFoldTerm(term);',
        '            });',
        '        };',
        '',
        '        lunr.Pipeline.registerFunction(lunr.' + locale + '.accentFold, "accentFold-' + locale + '");'
    ].join('\n');
}

function accentFoldWildcardNormalizerFunction(locale) {
    return [
        '',
        '        lunr.' + locale + '.wildcardNormalizer = function(term) {',
        '            return lunr.' + locale + '.accentFoldTerm(term);',
        '        };',
        '',
        '        lunr.' + locale + '.wildcardNormalizer.label = "wildcardNormalizer-' + locale + '";',
        '        lunr.' + locale + '.wildcardNormalizer.pipelineFunctionLabel = "stemmer-' + locale + '";',
        '        lunr.stemmerSupport.addQueryParserWildcardNormalizer(lunr, lunr.' + locale + '.wildcardNormalizer);'
    ].join('\n');
}

function germanWildcardNormalizerFunction(locale) {
    return [
        '',
        '        lunr.' + locale + '.wildcardNormalizer = function(term) {',
        '            return term',
        '                .replace(/[\\u00DF\\u1E9E]/g, "ss")',
        '                .replace(/[\\u00E4\\u00C4]/g, "a")',
        '                .replace(/[\\u00F6\\u00D6]/g, "o")',
        '                .replace(/[\\u00FC\\u00DC]/g, "u");',
        '        };',
        '',
        '        lunr.' + locale + '.wildcardNormalizer.label = "wildcardNormalizer-' + locale + '";',
        '        lunr.' + locale + '.wildcardNormalizer.pipelineFunctionLabel = "stemmer-' + locale + '";',
        '        lunr.stemmerSupport.addQueryParserWildcardNormalizer(lunr, lunr.' + locale + '.wildcardNormalizer);'
    ].join('\n');
}

/*
 * The configuration of every language. Everything else is driven by it: the build, and for Snowball
 * languages also build/fetch-snowball.js and build/derive-fold-maps.js.
 *
 *   locale     the code in lunr.<locale>.js
 *   snowball   Snowball's algorithm name: build/snowball/<snowball>-stemmer.js, its word list in
 *              snowball-data and its wildcard map are fetched and derived for it
 *   script     Unicode script of the word characters (unicode-8.0.0 package), for the trimmer and
 *              for probing letters in the wildcard map derivation
 *   file       the stemmer from the old snowball-js submodule that the build still uses
 *   stopwords  the stop word list
 *
 * Languages without `file` are hand-written; the build only beautifies and minifies them.
 */
var list = [
    {
        locale: 'ar',
    }, {
        locale: 'hi'
    }, {
        locale: 'da',
        file: 'DanishStemmer.js',
        snowball: 'danish',
        stopwords: stopwordsRepoFolder + 'da.csv',
        script: 'Latin'
    }, {
        locale: 'nl',
        file: 'DutchStemmer.js',
        snowball: 'dutch',
        stopwords: stopwordsRepoFolder + 'nl.csv',
        script: 'Latin'
    }, {
        locale: 'fi',
        file: 'FinnishStemmer.js',
        snowball: 'finnish',
        stopwords: stopwordsRepoFolder + 'fn.csv',
        script: 'Latin'
    }, {
        locale: 'fr',
        file: 'FrenchStemmer.js',
        snowball: 'french',
        stopwords: stopwordsRepoFolder + 'fr.csv',
        script: 'Latin',
        defaultAccentFolding: true,
        wildcardNormalizer: accentFoldWildcardNormalizerFunction
    }, {
        locale: 'de',
        file: 'GermanStemmer.js',
        snowball: 'german',
        stopwords: stopwordsRepoFolder + 'de.csv',
        script: 'Latin',
        wildcardNormalizer: germanWildcardNormalizerFunction
    }, {
        locale: 'hu',
        file: 'HungarianStemmer.js',
        snowball: 'hungarian',
        stopwords: stopwordsRepoFolder + 'hu.csv',
        script: 'Latin'
    }, {
        locale: 'it',
        file: 'ItalianStemmer.js',
        snowball: 'italian',
        stopwords: stopwordsRepoFolder + 'it.csv',
        script: 'Latin'
    }, {
        locale: 'ja'
    }, {
        locale: 'kn'
    }, {
        locale: 'no',
        file: 'NorwegianStemmer.js',
        snowball: 'norwegian',
        stopwords: stopwordsCustomFolder + 'no.csv',
        script: 'Latin'
    }, {
        locale: 'pt',
        file: 'PortugueseStemmer.js',
        snowball: 'portuguese',
        stopwords: stopwordsRepoFolder + 'pt.csv',
        script: 'Latin'
    }, {
        locale: 'pl',
        file: 'PolishStemmer.js',
        snowball: 'polish',
        stemmer: stemmersCustomFolder + 'PolishStemmer.js',
        stopwords: stopwordsCustomFolder + 'pl.csv',
        script: 'Latin'
    }, {
        locale: 'ro',
        file: 'RomanianStemmer.js',
        snowball: 'romanian',
        stopwords: stopwordsCustomFolder + 'ro.csv',
        script: 'Latin'
    }, {
        locale: 'ru',
        file: 'RussianStemmer.js',
        snowball: 'russian',
        stopwords: stopwordsCustomFolder + 'ru.csv',
        script: 'Cyrillic'
    }, {
        locale: 'es',
        file: 'SpanishStemmer.js',
        snowball: 'spanish',
        stopwords: stopwordsRepoFolder + 'es.csv',
        script: 'Latin',
        accentFolding: true
    }, {
        locale: 'sa'
    }, {
        locale: 'sv',
        file: 'SwedishStemmer.js',
        snowball: 'swedish',
        stopwords: stopwordsCustomFolder + 'sv.csv',
        script: 'Latin'
    }, {
        locale: 'ta',
    }, {
        locale: 'te'
    }, {
        locale: 'tr',
        file: 'TurkishStemmer.js',
        snowball: 'turkish',
        stopwords: stopwordsCustomFolder + 'tr.csv',
        script: 'Latin'
    }, {
        locale: 'th',
    }, {
        locale: 'vi',
    }, {
        locale: 'zh',
    }, {
        locale: 'ko',
    }, {
        locale: 'hy',
    }, {
        locale: 'he',
    }, {
        locale: 'el',
    },
    {
        locale: 'fa',
        licenseHeader: true // bundles Snowball's Persian stemmer (BSD-3-Clause)
    }
];

function build() {
    console.log('Starting building lunr-languages ...');
    // read templates
    var tpl = fs.readFileSync('build/lunr.template', 'utf8');
    var cm = fs.readFileSync('build/lunr.comments', 'utf8');

    // for each language, start building
    for (var i = 0; i < list.length; i++) {
        console.log('Building for "' + list[i].locale + '"');
        var data;
        var stopWords;
        var f;
        var fromTemplate = list[i].file && list[i].stopwords;

        if (fromTemplate) {
            data = fs.readFileSync('build/' + (list[i].stemmer || ('snowball-js/stemmer/src/ext/' + list[i].file)), 'utf8');
            stopWords = fs.readFileSync('build/' + list[i].stopwords, 'utf8');
            var languageExtras = [];

            if (list[i].accentFolding) {
                languageExtras.push(accentFoldFunction(list[i].locale));
            }

            if (list[i].defaultAccentFolding) {
                languageExtras.push(accentFoldTokenFunction(list[i].locale));
            }

            if (list[i].wildcardNormalizer) {
                languageExtras.push(list[i].wildcardNormalizer(list[i].locale));
            }

            // start replacing the placeholders
            f = tpl;
            f = cm + f;
            f = f.replace(/\{\{locale\}\}/g, list[i].locale);
            f = f.replace(/\{\{stemmerFunction\}\}/g, data.substring(data.indexOf('function')));
            f = f.replace(/\{\{stopWords\}\}/g, stopWords.split(',').sort().join(' '));
            f = f.replace(/\{\{languageName\}\}/g, list[i].file.replace(/Stemmer\.js/g, ''));
            f = f.replace(/\{\{wordCharacters\}\}/g, wordCharacters(list[i].script));
            f = f.replace(/\{\{pipelineBeforeStemmer\}\}/g, list[i].defaultAccentFolding ? '\n                lunr.' + list[i].locale + '.accentFold,' : '');
            f = f.replace(/\{\{languageExtras\}\}/g, languageExtras.join('\n'));
        } else {
            // beautify andminify languages not generated from the template.
            f = fs.readFileSync('lunr.' + list[i].locale + '.js', 'utf8');
        }

        // write the full file
        fs.writeFileSync('lunr.' + list[i].locale + '.js', beautify(f, { indent_size: 2 }));
        // and the minified version
        fs.writeFileSync('min/lunr.' + list[i].locale + '.min.js',
            fromTemplate ? cm.replace(/\{\{languageName\}\}/g, list[i].file.replace(/Stemmer\.js/g, '')) + compress(f) :
                (list[i].licenseHeader ? licenseHeader(f) : '') + compress(f)
        );
    }

    console.log('Building Stemmer Support');
    // build stemmer support
    var support = fs.readFileSync('lunr.stemmer.support.js', 'utf8');
    fs.writeFileSync('min/lunr.stemmer.support.min.js', compress(support));
    console.log('Building Multi-Language Extension');
    // build multi
    var multi = fs.readFileSync('lunr.multi.js', 'utf8');
    fs.writeFileSync('min/lunr.multi.min.js', compress(multi));

    console.log('Done!');
}

module.exports = {
    languages: list,
    /* the Snowball languages of the list, i.e. those with `snowball` */
    snowballLanguages: function() {
        return list.filter(function(language) {
            return language.snowball;
        });
    }
};

if (require.main === module) {
    build();
}
