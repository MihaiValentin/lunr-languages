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
 * Either can take `add: '<file>'`: further words from build/stopwords-add/<file> (one word per line,
 * `#` starts a comment), merged into the list. Words already in the list are dropped.
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

// one word per line; `#` starts a comment, blank lines are ignored
function readAddedStopWords(file) {
    return fs.readFileSync(file, 'utf8').split(/\r?\n/).map(function(line) {
        return line.replace(/#.*/, '').trim();
    }).filter(Boolean);
}

// the stop words of a language: its list plus the added words, sorted and without duplicates
function stopWordsOf(language) {
    var words = readStopWords(stopWordsFile(language));
    var add = language.stopWords.add;
    if (add) {
        var file = 'build/stopwords-add/' + add;
        var added = readAddedStopWords(file);
        var known = added.filter(function(word) { return words.indexOf(word) !== -1; });
        if (known.length) {
            console.log('  ' + file + ': already in the list: ' + known.join(' '));
        }
        words = words.concat(added);
    }
    return words.filter(function(word, i) { return words.indexOf(word) === i; }).sort();
}

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

// a JS string literal with everything outside printable ASCII escaped, like the rest of the generated code
function jsString(s) {
    return JSON.stringify(s).replace(/[^\x20-\x7e]/g, function(c) {
        return '\\u' + ('000' + c.charCodeAt(0).toString(16).toUpperCase()).slice(-4);
    });
}

// the wildcard normalizer from build/fold-maps.json; none if the stemmer folds nothing
function wildcardNormalizerFunction(language, wildcardMaps) {
    var locale = language.locale;
    var snowballName = language.snowball;
    var entry = wildcardMaps[snowballName];
    if (!entry) {
        throw new Error('No wildcard map for ' + snowballName + ', run npm run fetch-data');
    }
    var accent = language.accentFold && entry.accentFold && entry.folded;
    if (Object.keys(entry.map).length === 0 && !accent) {
        return '';
    }
    // with accentFold in the index, wildcard terms are accent folded too and use the map of folded words
    var options = accent ? ', {\n' +
        '            label: "accentFold-' + locale + '",\n' +
        '            accentFold: lunr.' + locale + '.accentFold.map,\n' +
        '            map: ' + jsMap(entry.folded.map, 12) + '\n' +
        '        }' : '';
    return [
        '',
        '        /* fold wildcard terms like the stemmer folds the index (generated by build/derive-fold-maps.js) */',
        '        lunr.' + locale + '.wildcardNormalizer = lunr.stemmerSupport.generateWildcardNormalizer(' + jsMap(entry.map, 8) + options + ');',
        '        lunr.' + locale + '.wildcardNormalizer.label = "wildcardNormalizer-' + locale + '";',
        '        lunr.' + locale + '.wildcardNormalizer.pipelineFunctionLabel = "stemmer-' + locale + '";',
        '        lunr.stemmerSupport.addQueryParserWildcardNormalizer(lunr, lunr.' + locale + '.wildcardNormalizer);',
        ''
    ].join('\n');
}

// a map as an object literal, one entry per line, everything outside printable ASCII escaped
function jsMap(map, spaces) {
    var keys = Object.keys(map);
    if (keys.length === 0) {
        return '{}';
    }
    var pad = new Array(spaces + 1).join(' ');
    return '{\n' + keys.map(function(key) {
        return pad + '    ' + jsString(key) + ': ' + jsString(map[key]);
    }).join(',\n') + '\n' + pad + '}';
}

/*
 * lunr.<locale>.accentFold from the map in fold-maps.json: indexes the token and its folded form.
 * `isDefault` tells lunr.<locale> and lunr.multi to put it into the pipelines.
 */
function accentFoldFunction(language, wildcardMaps) {
    var entry = wildcardMaps[language.snowball];
    if (!entry || !entry.accentFold) {
        throw new Error(language.locale + ': no accent fold map for ' + language.snowball + ', run npm run fetch-data');
    }
    return [
        '',
        '        /* accent folding: indexes the token and its folded form (map from CLDR Latin-ASCII, build/accent-fold.js) */',
        '        lunr.' + language.locale + '.accentFold = lunr.stemmerSupport.generateAccentFold(' + jsMap(entry.accentFold, 8) + ');',
        '        lunr.' + language.locale + '.accentFold.isDefault = ' + (language.accentFold.default ? 'true' : 'false') + ';',
        '        lunr.Pipeline.registerFunction(lunr.' + language.locale + '.accentFold, "accentFold-' + language.locale + '");',
        ''
    ].join('\n');
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

/*
 * The configuration of every language. Everything else is driven by it: the build, and for Snowball
 * languages also build/fetch-snowball.js and build/derive-fold-maps.js.
 *
 *   locale         the code in lunr.<locale>.js
 *   snowball       Snowball's algorithm name: the stemmer build/snowball/<snowball>-stemmer.js, its
 *                  word list in snowball-data and its wildcard map are fetched and derived for it, and
 *                  lunr.<locale>.js is generated from build/lunr.template
 *   script         Unicode script of the word characters (unicode-8.0.0 package), for the trimmer and
 *                  for probing letters in the wildcard map derivation
 *   stopWords      the source of the stop word list and optional added words, see stopWordsFile()
 *   accentFold     { default, keep? }: adds lunr.<locale>.accentFold, which indexes each token and its
 *                  accent-free form. The map comes from CLDR's Latin-ASCII for the letters of the
 *                  language's word list, without the letters in `keep`. With `default: true`,
 *                  lunr.<locale> puts it into the pipelines (users can remove it); with false, it is
 *                  opt-in. Only for languages whose users often type without diacritics.
 *
 * Languages without `snowball` are hand-written; the build only beautifies and minifies them.
 */
var list = [
    {
        locale: 'ar',
    }, {
        locale: 'hi'
    }, {
        locale: 'da',
        snowball: 'danish',
        stopWords: { snowball: 'danish' },
        script: 'Latin'
    }, {
        locale: 'nl',
        snowball: 'dutch',
        stopWords: { snowball: 'dutch' },
        script: 'Latin',
        accentFold: { default: true }
    }, {
        locale: 'en',
        snowball: 'english',
        stopWords: { snowball: 'english' },
        script: 'Latin'
    }, {
        locale: 'fi',
        snowball: 'finnish',
        stopWords: { snowball: 'finnish' },
        script: 'Latin'
    }, {
        locale: 'fr',
        snowball: 'french',
        stopWords: { snowball: 'french' },
        script: 'Latin',
        accentFold: { default: true }
    }, {
        locale: 'de',
        snowball: 'german',
        stopWords: { snowball: 'german' },
        script: 'Latin'
    }, {
        locale: 'hu',
        snowball: 'hungarian',
        stopWords: { snowball: 'hungarian' },
        script: 'Latin',
        accentFold: { default: true }
    }, {
        locale: 'it',
        snowball: 'italian',
        stopWords: { snowball: 'italian' },
        script: 'Latin',
        accentFold: { default: true }
    }, {
        locale: 'ja'
    }, {
        locale: 'kn'
    }, {
        locale: 'no',
        snowball: 'norwegian',
        stopWords: { snowball: 'norwegian' },
        script: 'Latin'
    }, {
        locale: 'pt',
        snowball: 'portuguese',
        stopWords: { snowball: 'portuguese' },
        script: 'Latin',
        accentFold: { default: true }
    }, {
        locale: 'pl',
        snowball: 'polish',
        stopWords: { custom: 'pl.csv' },
        script: 'Latin',
        accentFold: { default: true }
    }, {
        locale: 'ro',
        snowball: 'romanian',
        stopWords: { custom: 'ro.csv' },
        script: 'Latin',
        accentFold: { default: true }
    }, {
        locale: 'ru',
        snowball: 'russian',
        stopWords: { snowball: 'russian' },
        script: 'Cyrillic'
    }, {
        locale: 'es',
        snowball: 'spanish',
        stopWords: { snowball: 'spanish' },
        script: 'Latin',
        accentFold: { default: true, keep: 'ñ' }
    }, {
        locale: 'sa'
    }, {
        locale: 'sv',
        snowball: 'swedish',
        stopWords: { snowball: 'swedish' },
        script: 'Latin'
    }, {
        locale: 'ta',
    }, {
        locale: 'te'
    }, {
        locale: 'tr',
        snowball: 'turkish',
        stopWords: { custom: 'tr.csv' },
        script: 'Latin',
        accentFold: { default: true }
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
    // read templates and the Snowball data
    var tpl = fs.readFileSync('build/lunr.template', 'utf8');
    var cm = fs.readFileSync('build/lunr.comments', 'utf8');
    var version = snowballVersion();
    var wildcardMaps = JSON.parse(fs.readFileSync('build/fold-maps.json', 'utf8'));

    // for each language, start building
    for (var i = 0; i < list.length; i++) {
        console.log('Building for "' + list[i].locale + '"');
        var f;
        var header;

        if (list[i].snowball) {
            var name = list[i].snowball;
            var languageName = name.charAt(0).toUpperCase() + name.slice(1);
            var stopWords = stopWordsOf(list[i]);
            var accentFold = list[i].accentFold;
            header = cm
                .replace(/\{\{languageName\}\}/g, languageName)
                .replace(/\{\{snowballLicense\}\}/g, snowballLicense('The stemmer is generated from ' + name +
                    '.sbl by Snowball ' + version + ' (https://snowballstem.org/).'));

            // start replacing the placeholders; functions as replacements, so `$` in the code stays as it is
            var values = {
                locale: list[i].locale,
                snowballName: name,
                snowballVersion: version,
                stemmerBody: indent(snowball.stemmerBody(name).trim(), 16),
                // inside '…' in the template; English has apostrophes (aren't)
                stopWords: stopWords.join(' ').replace(/[\\']/g, '\\$&'),
                wordCharacters: wordCharacters(list[i].script),
                // with accentFold on by default, it runs right before the stemmer in both pipelines
                pipelineBeforeStemmer: accentFold && accentFold.default ? '\n                lunr.' + list[i].locale + '.accentFold,' : '',
                accentFold: accentFold ? accentFoldFunction(list[i], wildcardMaps) : '',
                wildcardNormalizer: wildcardNormalizerFunction(list[i], wildcardMaps)
            };
            f = header + tpl.replace(/\{\{(\w+)\}\}/g, function(all, key) {
                if (!Object.prototype.hasOwnProperty.call(values, key)) {
                    throw new Error('lunr.template: unknown placeholder ' + all);
                }
                return values[key];
            });
        } else {
            // beautify andminify languages not generated from the template.
            f = fs.readFileSync('lunr.' + list[i].locale + '.js', 'utf8');
            header = list[i].licenseHeader ? licenseHeader(f) : '';
        }

        // write the full file
        fs.writeFileSync('lunr.' + list[i].locale + '.js', beautify(f, { indent_size: 2 }));
        // and the minified version
        fs.writeFileSync('min/lunr.' + list[i].locale + '.min.js', header + compress(f));
    }

    console.log('Building Stemmer Support');
    // build stemmer support: insert Snowball's base-stemmer.js, keep the license headers in the minified file
    var support = updateStemmerSupport(fs.readFileSync('lunr.stemmer.support.js', 'utf8'), version);
    fs.writeFileSync('lunr.stemmer.support.js', support);
    fs.writeFileSync('min/lunr.stemmer.support.min.js', licenseHeader(support) + compress(support));
    console.log('Building Multi-Language Extension');
    // build multi
    var multi = fs.readFileSync('lunr.multi.js', 'utf8');
    fs.writeFileSync('min/lunr.multi.min.js', compress(multi));

    console.log('Done!');
}

/*
 * The Snowball algorithms of the list as { <snowball>: { script, locales, accentFold } }, sorted by
 * name; `accentFold` is { keep } if a locale folds accents, else null.
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
        // the accent fold map is derived per algorithm, so its `keep` must be the same for all its locales
        var keep = language.accentFold ? language.accentFold.keep || '' : null;
        if (stemmer && stemmer.accentFold !== null && keep !== null && stemmer.accentFold.keep !== keep) {
            throw new Error(language.snowball + ': locales ' + stemmer.locales.join(', ') + ' and ' +
                language.locale + ' use different accentFold.keep');
        }
        stemmer = stemmers[language.snowball] = stemmer || { script: language.script, locales: [], accentFold: null };
        stemmer.locales.push(language.locale);
        if (keep !== null) stemmer.accentFold = { keep: keep };
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
