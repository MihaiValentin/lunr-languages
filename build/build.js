/**
 * execute like this (from the project root folder):
 * node build/build.js
 */

var fs = require('fs');
var beautify = require('js-beautify').js_beautify;
var UglifyJS = require("uglify-js");

// shortcut for minifying a piece of code
function compress(orig_code) {
    return UglifyJS.minify(orig_code, {fromString: true, comments: true}).code;
}

// take some of the stop words list from the stopwords-filter repo
var stopwordsRepoFolder = './stopwords-filter/lib/stopwords/snowball/locales/';
// and, since that repository does not include all the stopwords we want, we add more, custom stopwords lists
var stopwordsCustomFolder = './stopwords-custom/';

// list mapping between locale, file and stopwords file
var list = [{
    locale: 'da',
    file: 'DanishStemmer.js',
    stopwords: stopwordsRepoFolder + 'da.csv'
}, {
    locale: 'du',
    file: 'DutchStemmer.js',
    stopwords: stopwordsRepoFolder + 'nl.csv'
}, {
    locale: 'fi',
    file: 'FinnishStemmer.js',
    stopwords: stopwordsRepoFolder + 'fn.csv'
}, {
    locale: 'fr',
    file: 'FrenchStemmer.js',
    stopwords: stopwordsRepoFolder + 'fr.csv'
}, {
    locale: 'de',
    file: 'GermanStemmer.js',
    stopwords: stopwordsRepoFolder + 'de.csv'
}, {
    locale: 'hu',
    file: 'HungarianStemmer.js',
    stopwords: stopwordsRepoFolder + 'hu.csv'
}, {
    locale: 'it',
    file: 'ItalianStemmer.js',
    stopwords: stopwordsRepoFolder + 'it.csv'
}, {
    locale: 'no',
    file: 'NorwegianStemmer.js',
    stopwords: stopwordsCustomFolder + 'no.csv'
}, {
    locale: 'pt',
    file: 'PortugueseStemmer.js',
    stopwords: stopwordsRepoFolder + 'pt.csv'
}, {
    locale: 'ro',
    file: 'RomanianStemmer.js',
    stopwords: stopwordsCustomFolder + 'ro.csv'
}, {
    locale: 'ru',
    file: 'RussianStemmer.js',
    stopwords: stopwordsCustomFolder + 'ru.csv'
}, {
    locale: 'es',
    file: 'SpanishStemmer.js',
    stopwords: stopwordsRepoFolder + 'es.csv'
}, {
    locale: 'sv',
    file: 'SwedishStemmer.js',
    stopwords: stopwordsCustomFolder + 'sv.csv'
}, {
    locale: 'tr',
    file: 'TurkishStemmer.js',
    stopwords: stopwordsCustomFolder + 'tr.csv'
}
];

console.log('Starting building lunr-languages ...');
// read templates
var tpl = fs.readFileSync('build/lunr.template', 'utf8');
var cm = fs.readFileSync('build/lunr.comments', 'utf8');

// for each language, start building
for(var i = 0; i < list.length; i++) {
    console.log('Building for "' + list[i].locale + '"');
    var data = fs.readFileSync('build/snowball-js/stemmer/src/ext/' + list[i].file, 'utf8');
    var stopWords = fs.readFileSync('build/' + list[i].stopwords, 'utf8');
    var f = tpl;

    // start replacing the placeholders
    f = cm + f;
    f = f.replace(/\{\{locale\}\}/g, list[i].locale);
    f = f.replace(/\{\{stemmerFunction\}\}/g, data.substring(data.indexOf('function')));
    f = f.replace(/\{\{stopWords\}\}/g, stopWords.split(',').sort().join(' '));
    f = f.replace(/\{\{stopWordsLength\}\}/g, stopWords.split(',').length + 1);
    f = f.replace(/\{\{languageName\}\}/g, list[i].file.replace(/Stemmer\.js/g, ''));

    // write the full file
    fs.writeFile('lunr.' + list[i].locale + '.js', beautify(f, { indent_size: 2 }));
    // and the minified version
    fs.writeFile('min/lunr.' + list[i].locale + '.min.js', cm.replace(/\{\{languageName\}\}/g, list[i].file.replace(/Stemmer\.js/g, '')) + compress(f));
}

console.log('Building Stemmer Support');
// build stemmer support
var support = fs.readFileSync('lunr.stemmer.support.js', 'utf8');
fs.writeFile('min/lunr.stemmer.support.min.js', compress(support));

console.log('Done!');