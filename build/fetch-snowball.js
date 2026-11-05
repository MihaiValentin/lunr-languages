/*
 * Fetches the Snowball stemmers and word lists that the build uses.
 *
 * Run by maintainers only, when Snowball is updated: `npm run fetch-data`.
 * The result in build/snowball/ is committed, so `npm run build` needs no network.
 *
 * - downloads jsstemmer-<version>.tar.gz from snowballstem.org and checks a pinned SHA-256
 *   (snowballstem.org publishes no checksums; the hash was computed on the first download)
 * - extracts base-stemmer.js, the stemmers of the languages configured in build.js (`snowball`),
 *   COPYING and NEWS into build/snowball/
 * - downloads <stemmer>/voc.txt from snowballstem/snowball-data at a pinned commit into
 *   build/cache/snowball-data/ (not committed); the wildcard maps are derived from it
 * - downloads <stemmer>/output.txt likewise and writes a sample of word/stem pairs to
 *   build/snowball/stem-samples.json, which the tests check the generated stemmers against
 * - downloads the stop word lists named in build.js (`stopWords: { snowball: '<name>' }`, i.e.
 *   algorithms/<name>/stop.txt) from snowballstem/snowball-website at a pinned commit into
 *   build/snowball/stopwords/
 * - writes build/snowball/VERSION
 *
 * Requires Node >= 18 (global fetch) and a `tar` on the PATH (Windows 10+, macOS and Linux ship one).
 */
'use strict';

var fs = require('fs');
var os = require('os');
var path = require('path');
var crypto = require('crypto');
var zlib = require('zlib');
var childProcess = require('child_process');

var SNOWBALL_VERSION = '3.2.0';
var TARBALL = 'jsstemmer-' + SNOWBALL_VERSION + '.tar.gz';
var TARBALL_URL = 'https://snowballstem.org/dist/' + TARBALL;
var TARBALL_SHA256 = '1d3f39267a15d0351312ff4d778de7bb8aae6480a63c4b318eda31032a15e5bd';

// snowball-data has no tags; this is the last commit before the 3.2.0 release (2026-10-17)
var DATA_COMMIT = '019921c3a41c2b70063ee3feb215a00c8e594597';
var DATA_URL = 'https://raw.githubusercontent.com/snowballstem/snowball-data/' + DATA_COMMIT + '/';

// snowball-website has no tags either; this is its state on the release day
var WEBSITE_COMMIT = 'dc14fb462784e5bdf90f3210022b0f91d3881ffd';
var WEBSITE_URL = 'https://raw.githubusercontent.com/snowballstem/snowball-website/' + WEBSITE_COMMIT + '/';

// the Snowball algorithms and stop word lists of the languages configured in build.js
var config = require('./build');
var STEMMERS = Object.keys(config.snowballStemmers());
var STOP_WORD_LISTS = config.snowballStopWordLists();
var STOP_WORD_DIR = path.join(__dirname, 'snowball', 'stopwords');

var OUT_DIR = path.join(__dirname, 'snowball');
var CACHE_DIR = path.join(__dirname, 'cache', 'snowball-data');

// The adapter in build.js removes exactly these lines; fail here already if a release changes them.
var IMPORT_LINE = /^import B from '\.\/base-stemmer\.js'$/m;
var EXPORT_LINE = /^export default class extends B \{$/m;
var BASE_EXPORT_LINE = /^export default class BaseStemmer \{$/m;

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

function checkModuleShape(name, source) {
    if (name === 'base') {
        if (!BASE_EXPORT_LINE.test(source)) {
            throw new Error('base-stemmer.js: unexpected export line, update the adapter in build.js');
        }
        return;
    }
    if (!IMPORT_LINE.test(source) || !EXPORT_LINE.test(source)) {
        throw new Error(name + '-stemmer.js: unexpected import/export lines, update the adapter in build.js');
    }
    if (source.indexOf('stemWord = this.stem;') === -1) {
        throw new Error(name + '-stemmer.js: no stemWord, update the adapter in build.js');
    }
}

function fetchStemmers() {
    console.log('Downloading ' + TARBALL_URL);
    return download(TARBALL_URL).then(function(tarball) {
        var hash = sha256(tarball);
        if (hash !== TARBALL_SHA256) {
            throw new Error(TARBALL + ': SHA-256 mismatch\n  expected ' + TARBALL_SHA256 + '\n  got      ' + hash);
        }

        // extract into a fresh temp directory; relative paths keep Git Bash's tar happy on Windows
        var tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'lunr-snowball-'));
        try {
            fs.writeFileSync(path.join(tmp, TARBALL), tarball);
            childProcess.execFileSync('tar', ['-xzf', TARBALL], { cwd: tmp, stdio: 'inherit' });

            var root = path.join(tmp, 'jsstemmer-' + SNOWBALL_VERSION);
            fs.mkdirSync(OUT_DIR, { recursive: true });
            fs.readdirSync(OUT_DIR).forEach(function(file) {
                if (/\.js$/.test(file)) {
                    fs.unlinkSync(path.join(OUT_DIR, file));
                }
            });

            ['base'].concat(STEMMERS).forEach(function(name) {
                var file = name + '-stemmer.js';
                var source = fs.readFileSync(path.join(root, 'javascript', file), 'utf8');
                checkModuleShape(name, source);
                fs.writeFileSync(path.join(OUT_DIR, file), source);
            });
            ['COPYING', 'NEWS'].forEach(function(file) {
                fs.copyFileSync(path.join(root, file), path.join(OUT_DIR, file));
            });
        } finally {
            fs.rmSync(tmp, { recursive: true, force: true });
        }
        console.log('Extracted ' + (STEMMERS.length + 1) + ' files into ' + OUT_DIR);
    });
}

function fetchWordList(name) {
    var target = path.join(CACHE_DIR, name, 'voc.txt');
    if (fs.existsSync(target)) {
        return Promise.resolve();
    }
    // most word lists are plain text, the large ones (e.g. arabic) only exist gzipped
    return download(DATA_URL + name + '/voc.txt').catch(function() {
        return download(DATA_URL + name + '/voc.txt.gz').then(function(gz) {
            return zlib.gunzipSync(gz);
        });
    }).then(function(words) {
        fs.mkdirSync(path.dirname(target), { recursive: true });
        fs.writeFileSync(target, words);
        console.log('Fetched ' + name + '/voc.txt');
    }, function() {
        throw new Error('snowball-data ' + DATA_COMMIT.slice(0, 8) + ': no voc.txt or voc.txt.gz for ' + name);
    });
}

function fetchWordLists() {
    return STEMMERS.reduce(function(chain, name) {
        return chain.then(function() {
            return fetchWordList(name);
        });
    }, Promise.resolve());
}

/* <stemmer>/output.txt, Snowball's stem of each line of voc.txt, into the cache like voc.txt */
function fetchStemList(name) {
    var target = path.join(CACHE_DIR, name, 'output.txt');
    if (fs.existsSync(target)) {
        return Promise.resolve();
    }
    return download(DATA_URL + name + '/output.txt').catch(function() {
        return download(DATA_URL + name + '/output.txt.gz').then(function(gz) {
            return zlib.gunzipSync(gz);
        });
    }).then(function(stems) {
        fs.writeFileSync(target, stems);
        console.log('Fetched ' + name + '/output.txt');
    }, function() {
        throw new Error('snowball-data ' + DATA_COMMIT.slice(0, 8) + ': no output.txt or output.txt.gz for ' + name);
    });
}

/*
 * build/snowball/stem-samples.json: every n-th word of voc.txt with Snowball's stem from output.txt,
 * STEM_SAMPLE_SIZE per stemmer, so the tests check the generated stemmers against Snowball's own output.
 */
var STEM_SAMPLE_SIZE = 200;
function writeStemSamples() {
    return STEMMERS.reduce(function(chain, name) {
        return chain.then(function() {
            return fetchStemList(name);
        });
    }, Promise.resolve()).then(function() {
        var samples = {};
        STEMMERS.forEach(function(name) {
            var lines = function(file) {
                // a stem can be empty, so only the line break at the end is dropped
                return fs.readFileSync(path.join(CACHE_DIR, name, file), 'utf8').replace(/\r?\n$/, '').split(/\r?\n/);
            };
            var words = lines('voc.txt'), stems = lines('output.txt');
            if (words.length !== stems.length) {
                throw new Error(name + ': voc.txt has ' + words.length + ' lines, output.txt ' + stems.length);
            }
            var step = Math.max(1, Math.floor(words.length / STEM_SAMPLE_SIZE));
            samples[name] = {};
            for (var i = 0; i < words.length && Object.keys(samples[name]).length < STEM_SAMPLE_SIZE; i += step) {
                samples[name][words[i]] = stems[i];
            }
        });
        fs.writeFileSync(path.join(OUT_DIR, 'stem-samples.json'), JSON.stringify(samples, null, 1) + '\n');
        console.log('Wrote stem-samples.json (' + STEM_SAMPLE_SIZE + ' words per stemmer)');
    });
}

/*
 * stop.txt: comments start with `|`, each stop word stands at the start of a line.
 * Written as one word per line, sorted, without duplicates.
 */
function parseStopWords(name, text) {
    var words = {};
    text.split(/\r?\n/).forEach(function(line) {
        line.split('|')[0].trim().split(/\s+/).forEach(function(word) {
            if (!word) return;
            if (word !== word.normalize('NFC') || word !== word.toLowerCase()) {
                throw new Error(name + '/stop.txt: "' + word + '" is not lowercase NFC');
            }
            words[word] = true;
        });
    });
    var list = Object.keys(words).sort();
    if (list.length < 20) {
        throw new Error(name + '/stop.txt: only ' + list.length + ' words, has the format changed?');
    }
    return list;
}

function fetchStopWords() {
    fs.mkdirSync(STOP_WORD_DIR, { recursive: true });
    // lists of languages that are no longer configured go away
    fs.readdirSync(STOP_WORD_DIR).forEach(function(file) {
        if (/\.txt$/.test(file)) {
            fs.unlinkSync(path.join(STOP_WORD_DIR, file));
        }
    });
    return STOP_WORD_LISTS.reduce(function(chain, name) {
        return chain.then(function() {
            return download(WEBSITE_URL + 'algorithms/' + name + '/stop.txt');
        }).then(function(buffer) {
            var words = parseStopWords(name, buffer.toString('utf8'));
            fs.writeFileSync(path.join(STOP_WORD_DIR, name + '.txt'), words.join('\n') + '\n');
            console.log('Fetched ' + name + '/stop.txt (' + words.length + ' words)');
        });
    }, Promise.resolve());
}

function writeVersion() {
    fs.writeFileSync(path.join(OUT_DIR, 'VERSION'), [
        'snowball ' + SNOWBALL_VERSION,
        TARBALL + ' sha256 ' + TARBALL_SHA256,
        'snowball-data ' + DATA_COMMIT,
        'snowball-website ' + WEBSITE_COMMIT,
        'stemmers ' + STEMMERS.join(' '),
        ''
    ].join('\n'));
}

fetchStemmers()
    .then(fetchWordLists)
    .then(writeStemSamples)
    .then(fetchStopWords)
    .then(writeVersion)
    .then(function() {
        console.log('Done. Snowball ' + SNOWBALL_VERSION + ' is in ' + OUT_DIR);
    })
    .catch(function(err) {
        console.error(err.message);
        process.exitCode = 1;
    });
