/**
 * execute like this (from the project root folder):
 * node build/build.js
 */

var fs = require('fs');
var beautify = require('js-beautify').js_beautify;
var UglifyJS = require("uglify-js");
var snowball = require('./snowball-loader');

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

/*
 * The stop word list of a language. `stopWords` names its source:
 *   { snowball: '<name>' }  Snowball's list algorithms/<name>/stop.txt from snowball-website, fetched
 *                           by fetch-snowball.js into build/snowball/stopwords/<name>.txt (one word per
 *                           line). Snowball names these lists by language, not by algorithm: the list
 *                           for dutch_porter is 'dutch'.
 *   { custom: '<file>' }    build/stopwords-custom/<file> (comma-separated), for languages Snowball has
 *                           no list for
 */
function stopWordsFile(language) {
    var source = language.stopWords || {};
    if (source.snowball) {
        return 'build/snowball/stopwords/' + source.snowball + '.txt';
    }
    if (source.custom) {
        return 'build/stopwords-custom/' + source.custom;
    }
    throw new Error(language.locale + ': unknown stopWords ' + JSON.stringify(language.stopWords));
}

function readStopWords(file) {
    var text = fs.readFileSync(file, 'utf8');
    return /\.txt$/.test(file) ? text.split(/\r?\n/).filter(Boolean) : text.split(',');
}
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

// the Snowball version from build/snowball/VERSION (written by fetch-snowball.js)
function snowballVersion() {
    return fs.readFileSync('build/snowball/VERSION', 'utf8').match(/^snowball (\S+)$/m)[1];
}

// Snowball's BSD-3-Clause notice as a /*! */ block, which the minified files keep too
function snowballLicense(firstLine) {
    var copying = fs.readFileSync('build/snowball/COPYING', 'utf8').trim().split(/\r?\n/);
    return ['/*!', ' * ' + firstLine, ' *'].concat(copying.map(function(line) {
        return line ? ' * ' + line : ' *';
    })).concat([' */']).join('\n');
}

function indent(code, spaces) {
    var pad = new Array(spaces + 1).join(' ');
    return code.split('\n').map(function(line) {
        return line ? pad + line : line;
    }).join('\n');
}

// lunr.stemmer.support.js: Snowball's notice and base-stemmer.js between the BEGIN/END markers
function updateStemmerSupport(support, version) {
    var header = /\/\*!\n \* (?:SNOWBALL-LICENSE|BaseStemmer is Snowball's)[\s\S]*?\*\/\n/;
    var region = /(\/\/ BEGIN base-stemmer\.js[^\n]*)[\s\S]*?(\n[ \t]*\/\/ END base-stemmer\.js)/;
    if (!header.test(support) || !region.test(support)) {
        throw new Error('lunr.stemmer.support.js: Snowball license block or base-stemmer.js markers not found');
    }
    var license = snowballLicense("BaseStemmer is Snowball's base-stemmer.js, from Snowball " + version +
        ' (https://snowballstem.org/).');
    return support
        .replace(header, function() { return license + '\n'; })
        .replace(region, function(all, begin, end) {
            return begin + '\n' + indent(snowball.baseStemmerSource().trim(), 8) + end;
        });
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
 *   stopWords  the source of the stop word list, see stopWordsFile()
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
        stopWords: { snowball: 'danish' },
        script: 'Latin'
    }, {
        locale: 'nl',
        file: 'DutchStemmer.js',
        snowball: 'dutch',
        stopWords: { snowball: 'dutch' },
        script: 'Latin'
    }, {
        locale: 'fi',
        file: 'FinnishStemmer.js',
        snowball: 'finnish',
        stopWords: { snowball: 'finnish' },
        script: 'Latin'
    }, {
        locale: 'fr',
        file: 'FrenchStemmer.js',
        snowball: 'french',
        stopWords: { snowball: 'french' },
        script: 'Latin',
        defaultAccentFolding: true,
        wildcardNormalizer: accentFoldWildcardNormalizerFunction
    }, {
        locale: 'de',
        file: 'GermanStemmer.js',
        snowball: 'german',
        stopWords: { snowball: 'german' },
        script: 'Latin',
        wildcardNormalizer: germanWildcardNormalizerFunction
    }, {
        locale: 'hu',
        file: 'HungarianStemmer.js',
        snowball: 'hungarian',
        stopWords: { snowball: 'hungarian' },
        script: 'Latin'
    }, {
        locale: 'it',
        file: 'ItalianStemmer.js',
        snowball: 'italian',
        stopWords: { snowball: 'italian' },
        script: 'Latin'
    }, {
        locale: 'ja'
    }, {
        locale: 'kn'
    }, {
        locale: 'no',
        file: 'NorwegianStemmer.js',
        snowball: 'norwegian',
        stopWords: { snowball: 'norwegian' },
        script: 'Latin'
    }, {
        locale: 'pt',
        file: 'PortugueseStemmer.js',
        snowball: 'portuguese',
        stopWords: { snowball: 'portuguese' },
        script: 'Latin'
    }, {
        locale: 'pl',
        file: 'PolishStemmer.js',
        snowball: 'polish',
        stemmer: stemmersCustomFolder + 'PolishStemmer.js',
        stopWords: { custom: 'pl.csv' },
        script: 'Latin'
    }, {
        locale: 'ro',
        file: 'RomanianStemmer.js',
        snowball: 'romanian',
        stopWords: { custom: 'ro.csv' },
        script: 'Latin'
    }, {
        locale: 'ru',
        file: 'RussianStemmer.js',
        snowball: 'russian',
        stopWords: { snowball: 'russian' },
        script: 'Cyrillic'
    }, {
        locale: 'es',
        file: 'SpanishStemmer.js',
        snowball: 'spanish',
        stopWords: { snowball: 'spanish' },
        script: 'Latin',
        accentFolding: true
    }, {
        locale: 'sa'
    }, {
        locale: 'sv',
        file: 'SwedishStemmer.js',
        snowball: 'swedish',
        stopWords: { snowball: 'swedish' },
        script: 'Latin'
    }, {
        locale: 'ta',
    }, {
        locale: 'te'
    }, {
        locale: 'tr',
        file: 'TurkishStemmer.js',
        snowball: 'turkish',
        stopWords: { custom: 'tr.csv' },
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
        var fromTemplate = list[i].file && list[i].stopWords;

        if (fromTemplate) {
            data = fs.readFileSync('build/' + (list[i].stemmer || ('snowball-js/stemmer/src/ext/' + list[i].file)), 'utf8');
            stopWords = readStopWords(stopWordsFile(list[i]));
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
            f = f.replace(/\{\{stopWords\}\}/g, stopWords.sort().join(' '));
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
    // build stemmer support: insert Snowball's base-stemmer.js, keep the license headers in the minified file
    var support = updateStemmerSupport(fs.readFileSync('lunr.stemmer.support.js', 'utf8'), snowballVersion());
    fs.writeFileSync('lunr.stemmer.support.js', support);
    fs.writeFileSync('min/lunr.stemmer.support.min.js', licenseHeader(support) + compress(support));
    console.log('Building Multi-Language Extension');
    // build multi
    var multi = fs.readFileSync('lunr.multi.js', 'utf8');
    fs.writeFileSync('min/lunr.multi.min.js', compress(multi));

    console.log('Done!');
}

/*
 * The Snowball algorithms of the list as { <snowball>: { script, locales } }, sorted by name.
 * Used by fetch-snowball.js and derive-fold-maps.js, so they follow this list.
 */
function snowballStemmers() {
    var stemmers = {};
    list.filter(function(language) {
        return language.snowball;
    }).forEach(function(language) {
        var stemmer = stemmers[language.snowball];
        if (stemmer && stemmer.script !== language.script) {
            throw new Error(language.snowball + ': locales ' + stemmer.locales.join(', ') + ' and ' +
                language.locale + ' use different scripts');
        }
        stemmer = stemmers[language.snowball] = stemmer || { script: language.script, locales: [] };
        stemmer.locales.push(language.locale);
    });
    var sorted = {};
    Object.keys(stemmers).sort().forEach(function(name) {
        sorted[name] = stemmers[name];
    });
    return sorted;
}

// the names of Snowball's stop word lists the list uses ({ snowball: '<name>' }), sorted, without duplicates
function snowballStopWordLists() {
    return list.map(function(language) {
        return language.stopWords && language.stopWords.snowball;
    }).filter(function(name, i, names) {
        return name && names.indexOf(name) === i;
    }).sort();
}

module.exports = {
    languages: list,
    snowballStemmers: snowballStemmers,
    snowballStopWordLists: snowballStopWordLists
};

if (require.main === module) {
    build();
}
