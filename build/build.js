/**
 * execute like this (from the project root folder):
 * node build/build.js
 */

var fs = require('fs');
var beautify = require('js-beautify').js_beautify;
var UglifyJS = require("uglify-js");

// shortcut for minifying a piece of code
function compress(orig_code) {
    return UglifyJS.minify(orig_code, { fromString: true, comments: true }).code;
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
        '            if (!token || typeof token.clone !== "function") {',
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
        '            if (typeof token.update === "function") {',
        '                return token.update(function(term) {',
        '                    return lunr.' + locale + '.accentFoldTerm(term);',
        '                });',
        '            }',
        '',
        '            if (typeof token === "string") {',
        '                return lunr.' + locale + '.accentFoldTerm(token);',
        '            }',
        '',
        '            return token;',
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

// list mapping between locale, stemmer file, stopwords file, and char pattern
var list = [
    {
        locale: 'ar',
    }, {
        locale: 'hi'
    }, {
        locale: 'da',
        file: 'DanishStemmer.js',
        stopwords: stopwordsRepoFolder + 'da.csv',
        wordCharacters: wordCharacters('Latin')
    }, {
        locale: 'nl',
        file: 'DutchStemmer.js',
        stopwords: stopwordsRepoFolder + 'nl.csv',
        wordCharacters: wordCharacters('Latin')
    }, {
        /*
        Kept here to prevent breaking changes.
        The correct code for Dutch is NL.
        Please do not use "du" anymore, start using "nl".
        I will remove "du" next time I'll build a major, backward incompatible package
        */
        locale: 'du',
        file: 'DutchStemmer.js',
        stopwords: stopwordsRepoFolder + 'nl.csv',
        wordCharacters: wordCharacters('Latin'),
        warningMessage: '[Lunr Languages] Please use the "nl" instead of the "du". The "nl" code is the standard code for Dutch language, and "du" will be removed in the next major versions.'
    }, {
        locale: 'fi',
        file: 'FinnishStemmer.js',
        stopwords: stopwordsRepoFolder + 'fn.csv',
        wordCharacters: wordCharacters('Latin')
    }, {
        locale: 'fr',
        file: 'FrenchStemmer.js',
        stopwords: stopwordsRepoFolder + 'fr.csv',
        wordCharacters: wordCharacters('Latin'),
        defaultAccentFolding: true,
        wildcardNormalizer: accentFoldWildcardNormalizerFunction
    }, {
        locale: 'de',
        file: 'GermanStemmer.js',
        stopwords: stopwordsRepoFolder + 'de.csv',
        wordCharacters: wordCharacters('Latin'),
        wildcardNormalizer: germanWildcardNormalizerFunction
    }, {
        locale: 'hu',
        file: 'HungarianStemmer.js',
        stopwords: stopwordsRepoFolder + 'hu.csv',
        wordCharacters: wordCharacters('Latin')
    }, {
        locale: 'it',
        file: 'ItalianStemmer.js',
        stopwords: stopwordsRepoFolder + 'it.csv',
        wordCharacters: wordCharacters('Latin')
    }, {
        locale: 'ja'
    }, {
        locale: 'jp'
    }, {
        locale: 'kn'
    }, {
        locale: 'no',
        file: 'NorwegianStemmer.js',
        stopwords: stopwordsCustomFolder + 'no.csv',
        wordCharacters: wordCharacters('Latin')
    }, {
        locale: 'pt',
        file: 'PortugueseStemmer.js',
        stopwords: stopwordsRepoFolder + 'pt.csv',
        wordCharacters: wordCharacters('Latin')
    }, {
        locale: 'pl',
        file: 'PolishStemmer.js',
        stemmer: stemmersCustomFolder + 'PolishStemmer.js',
        stopwords: stopwordsCustomFolder + 'pl.csv',
        wordCharacters: wordCharacters('Latin')
    }, {
        locale: 'ro',
        file: 'RomanianStemmer.js',
        stopwords: stopwordsCustomFolder + 'ro.csv',
        wordCharacters: wordCharacters('Latin')
    }, {
        locale: 'ru',
        file: 'RussianStemmer.js',
        stopwords: stopwordsCustomFolder + 'ru.csv',
        wordCharacters: wordCharacters('Cyrillic')
    }, {
        locale: 'es',
        file: 'SpanishStemmer.js',
        stopwords: stopwordsRepoFolder + 'es.csv',
        wordCharacters: wordCharacters('Latin'),
        accentFolding: true
    }, {
        locale: 'sa'
    }, {
        locale: 'sv',
        file: 'SwedishStemmer.js',
        stopwords: stopwordsCustomFolder + 'sv.csv',
        wordCharacters: wordCharacters('Latin')
    }, {
        locale: 'ta',
    }, {
        locale: 'te'
    }, {
        locale: 'tr',
        file: 'TurkishStemmer.js',
        stopwords: stopwordsCustomFolder + 'tr.csv',
        wordCharacters: wordCharacters('Latin')
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
    }
];

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
        f = f.replace(/\{\{stopWordsLength\}\}/g, stopWords.split(',').length + 1);
        f = f.replace(/\{\{languageName\}\}/g, list[i].file.replace(/Stemmer\.js/g, ''));
        f = f.replace(/\{\{wordCharacters\}\}/g, list[i].wordCharacters);
        f = f.replace(/\{\{pipelineBeforeStemmer\}\}/g, list[i].defaultAccentFolding ? '\n                lunr.' + list[i].locale + '.accentFold,' : '');
        f = f.replace(/\{\{languageExtras\}\}/g, languageExtras.join('\n'));

        f = f.replace(/\{\{consoleWarning\}\}/g, list[i].warningMessage ? '\n\nconsole.warn(' + JSON.stringify(list[i].warningMessage) + ');' : '');
    } else {
        // beautify andminify languages not generated from the template.
        f = fs.readFileSync('lunr.' + list[i].locale + '.js', 'utf8');
    }

    // write the full file
    fs.writeFileSync('lunr.' + list[i].locale + '.js', beautify(f, { indent_size: 2 }));
    // and the minified version
    fs.writeFileSync('min/lunr.' + list[i].locale + '.min.js',
        fromTemplate ? cm.replace(/\{\{languageName\}\}/g, list[i].file.replace(/Stemmer\.js/g, '')) + compress(f) : compress(f)
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
