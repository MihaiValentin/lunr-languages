/*
 * Fetches CLDR's Latin-ASCII transform, the source of the accent folding maps.
 *
 * Run by maintainers only, as part of `npm run fetch-data` (or `npm run fetch-cldr`), when CLDR is updated or a
 * language starts folding accents. Only build/cldr/VERSION is committed.
 *
 * - downloads common/transforms/Latin-ASCII.xml at a pinned commit into build/cache/cldr/ (not committed) and
 *   checks a pinned SHA-256, if a language uses `accentFold`; derive-fold-maps.js derives the maps from it
 * - writes build/cldr/VERSION, which the CLDR notices of the generated files name; without accentFold, removes it
 *
 * Requires Node >= 18 (global fetch).
 */
'use strict';

var fs = require('fs');
var path = require('path');
var crypto = require('crypto');

// CLDR's Latin-ASCII transform, the source of the accent folding maps (release-49)
var CLDR_RELEASE = 'release-49';
var CLDR_COMMIT = '96e54b273d2da4ec6fbad350ba19ff23fa24a588';
var CLDR_URL = 'https://raw.githubusercontent.com/unicode-org/cldr/' + CLDR_COMMIT + '/common/transforms/Latin-ASCII.xml';
var CLDR_SHA256 = '4686f5643c75039583281cf3a91688ef7dfb665420f185c03982664740e66523';

// the languages configured in build.js
var config = require('./build');
var SNOWBALL = config.snowballStemmers();
var STEMMERS = Object.keys(SNOWBALL);
var NEEDS_CLDR = STEMMERS.some(function(name) { return SNOWBALL[name].accentFold; }) ||
    config.languages.some(function(language) { return !language.snowball && language.accentFold; });

var VERSION_FILE = path.join(__dirname, 'cldr', 'VERSION');

function download(url) {
    return fetch(url).then(function(response) {
        if (!response.ok) {
            throw new Error('Download failed: ' + url + ' (HTTP ' + response.status + ')');
        }
        return response.arrayBuffer();
    }).then(function(buffer) {
        return Buffer.from(buffer);
    });
}

function sha256(buffer) {
    return crypto.createHash('sha256').update(buffer).digest('hex');
}

/* Latin-ASCII.xml into the cache, only if a language uses accentFold */
function fetchCldr() {
    var target = require('./accent-fold').CLDR_FILE;
    if (!NEEDS_CLDR || (fs.existsSync(target) && sha256(fs.readFileSync(target)) === CLDR_SHA256)) {
        return Promise.resolve();
    }
    return download(CLDR_URL).then(function(xml) {
        var hash = sha256(xml);
        if (hash !== CLDR_SHA256) {
            throw new Error('Latin-ASCII.xml: SHA-256 mismatch\n  expected ' + CLDR_SHA256 + '\n  got      ' + hash);
        }
        fs.mkdirSync(path.dirname(target), { recursive: true });
        fs.writeFileSync(target, xml);
        console.log('Fetched CLDR ' + CLDR_RELEASE + ' Latin-ASCII.xml');
    });
}

function writeVersion() {
    if (!NEEDS_CLDR) {
        fs.rmSync(VERSION_FILE, { force: true });
        return;
    }
    fs.mkdirSync(path.dirname(VERSION_FILE), { recursive: true });
    fs.writeFileSync(VERSION_FILE, 'cldr ' + CLDR_RELEASE + ' ' + CLDR_COMMIT + ' Latin-ASCII.xml sha256 ' + CLDR_SHA256 + '\n');
}

fetchCldr()
    .then(writeVersion)
    .then(function() {
        console.log(NEEDS_CLDR ? 'Done. CLDR ' + CLDR_RELEASE + ' is in ' + path.dirname(VERSION_FILE) : 'Done. No language uses accentFold.');
    })
    .catch(function(err) {
        console.error(err.message);
        process.exitCode = 1;
    });
