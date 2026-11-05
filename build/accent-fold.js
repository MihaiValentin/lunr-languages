/*
 * Accent folding maps, from CLDR's Latin-ASCII transform (fetched by fetch-cldr.js into the
 * uncommitted build/cache/cldr/). Used by derive-fold-maps.js only:
 * the resulting map of NFC letters is stored in fold-maps.json and goes into the generated plugins,
 * which never normalise.
 *
 * Latin-ASCII works in this order, and so does foldLetter():
 *   :: NFD() ;  [[:Latin:][0-9]] { [:Mn:]+ → ;  :: NFC() ;  then explicit rules such as ł → l, ß → ss
 */
'use strict';

var fs = require('fs');
var path = require('path');

var CLDR_FILE = path.join(__dirname, 'cache', 'cldr', 'Latin-ASCII.xml');

/* the explicit single-letter rules of Latin-ASCII (`ł → l ;`), as { letter: ascii } */
function latinAsciiRules(xml) {
    var rules = {};
    xml.split(/\r?\n/).forEach(function(line) {
        var m = line.match(/^\s*(\S+) → ([^;]*);/);
        if (!m) return;
        var from = m[1], to = m[2].trim();
        if (Array.from(from).length !== 1 || !/^\p{L}$/u.test(from) || !/^[A-Za-z]+$/.test(to)) return;
        rules[from] = to;
    });
    if (Object.keys(rules).length < 100) {
        throw new Error(CLDR_FILE + ': only ' + Object.keys(rules).length + ' rules, has the format changed?');
    }
    return rules;
}

var cachedRules;
function rules() {
    if (!cachedRules) cachedRules = latinAsciiRules(fs.readFileSync(CLDR_FILE, 'utf8'));
    return cachedRules;
}

/* one lowercase letter folded like Latin-ASCII */
function foldLetter(letter) {
    var stripped = letter.normalize('NFD').replace(/(\p{Script=Latin})\p{Mn}+/gu, '$1').normalize('NFC');
    var r = rules();
    return Array.from(stripped).map(function(c) {
        return r[c] !== undefined ? r[c] : c;
    }).join('').toLowerCase();
}

/*
 * The accent fold map of a language: every letter of `letters` (the letters of its word list) that
 * Latin-ASCII changes, except those in `keep` (letters that stay, e.g. Spanish ñ).
 */
function accentFoldMap(letters, keep) {
    var map = {};
    letters.forEach(function(letter) {
        if (keep && keep.indexOf(letter) !== -1) return;
        var folded = foldLetter(letter);
        if (folded !== letter) map[letter] = folded;
    });
    var sorted = {};
    Object.keys(map).sort().forEach(function(k) { sorted[k] = map[k]; });
    return sorted;
}

module.exports = {
    CLDR_FILE: CLDR_FILE,
    latinAsciiRules: latinAsciiRules,
    foldLetter: foldLetter,
    accentFoldMap: accentFoldMap
};
