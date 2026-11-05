/*
 * Derives the wildcard fold maps from the Snowball stemmers in build/snowball/.
 *
 * Lunr doesn't stem wildcard terms, so a query like `käs*` has to be folded the way the stemmer
 * folds the index (`käse` -> `kas`). Snowball has no function for that, so the map is learned from
 * the stemmer's own output, using only the public `stemWord()`:
 *
 * 1. Stem a sample of snowball-data's voc.txt (cached by fetch-snowball.js).
 * 2. A word is covered when its stem is a prefix of fold(word): then every prefix the user can type,
 *    up to the length of the stem, finds it.
 * 3. For uncovered words, align word and stem; each difference before the end of the stem is a
 *    candidate rule (`ä`->`a`, `ß`->`ss`, `ae`->`a`, diacritic -> nothing).
 * 4. Greedily accept the candidate with the largest net gain in coverage until no candidate gains
 *    enough. A rule that breaks words proposes exceptions (`que` stays `que`), which compete too.
 * 5. Probe the letters of the script that voc.txt (almost) lacks: swap the letter for its base
 *    letter in sample words; if the stems agree, the stemmer folds it.
 *
 * Writes build/fold-maps.json. NFD is only used here, to guess base letters; the
 * plugins never normalise.
 *
 * Usage: node build/derive-fold-maps.js [--accept] [stemmer ...]
 * (npm run fetch-data runs it for all stemmers, after fetching the data.)
 */
'use strict';

var fs = require('fs');
var path = require('path');
var languages = require('./build').snowballStemmers();   // { <snowball>: { script, locales, accentFold } }
var loader = require('./snowball-loader');
var accentFold = require('./accent-fold');

var CACHE_DIR = path.join(__dirname, 'cache', 'snowball-data');
var OUT_FILE = path.join(__dirname, 'fold-maps.json');

var MAX_WORDS = 100000;          // evenly spaced sample of voc.txt
var MAX_RULE_LENGTH = 3;         // characters on either side of a rule
var MIN_GAIN = 5;                // words a rule must fix (net), at least ...
var MIN_GAIN_SHARE = 0.0002;     // ... and this share of the sample
var CANDIDATES_PER_ROUND = 40;
var PROBE_SEEN_LIMIT = 5;        // probe letters seen fewer times than this in the sample
var PROBE_SAMPLES = 30;
var PROBE_AGREEMENT = 0.9;
var MIN_LETTER_COUNT = 3;        // letters of the word list that the accent fold map covers

// nonspacing marks only, like CLDR's Latin-ASCII: spacing marks (Mc) are letters, e.g. Devanagari vowel signs
var MARKS = /\p{Mn}/gu;

function baseLetter(ch) {
    return ch.normalize('NFD').replace(MARKS, '');
}

function similar(a, b) {
    var base = baseLetter(a);
    return base !== '' && base === baseLetter(b);
}

/* evenly spaced sample of a word list, without decoding the whole (possibly huge) file */
function readWords(name) {
    var buffer = fs.readFileSync(path.join(CACHE_DIR, name, 'voc.txt'));
    var lines = 0;
    for (var i = 0; i < buffer.length; i++) {
        if (buffer[i] === 10) lines++;
    }
    var step = Math.max(1, Math.floor(lines / MAX_WORDS));
    var words = [];
    var start = 0, line = 0;
    for (var j = 0; j <= buffer.length; j++) {
        if (j === buffer.length || buffer[j] === 10) {
            if (line % step === 0 && j > start) {
                var word = buffer.toString('utf8', start, j).trim();
                // lunr lowercases tokens before they reach the stemmer
                if (word && word === word.toLowerCase()) {
                    words.push(word);
                }
            }
            line++;
            start = j + 1;
        }
    }
    return words;
}

/*
 * The fold of the runtime normalizer in lunr.stemmer.support.js, so the derivation measures exactly what
 * the plugins do: one left-to-right pass, longest key first, `^` keys only at the start of the word.
 */
var support = require('lunr');   // the peer dependency; the support file needs lunr 2
require('../lunr.stemmer.support.js')(support);

function makeFold(map) {
    return support.stemmerSupport.generateWildcardNormalizer(map).fold;
}

function affects(word, key) {
    return key[0] === '^' ? word.indexOf(key.slice(1)) === 0 : word.indexOf(key) !== -1;
}

/*
 * Aligns the stem with the start of the word; the rest of the word is free (it's the suffix the
 * stemmer removed). Substituting a letter with the same base letter (é/e, ё/е) is cheap, any other
 * substitution is more expensive than deleting and inserting.
 * Returns the differing blocks as { from, to, context } in word order.
 */
function diffBlocks(word, stem) {
    var n = word.length, m = stem.length, width = n + 1;
    var cost = new Float64Array((m + 1) * width);
    var move = new Uint8Array((m + 1) * width); // 1 diagonal, 2 delete word letter, 3 insert stem letter
    for (var j = 1; j <= n; j++) { cost[j] = j; move[j] = 2; }
    for (var i = 1; i <= m; i++) {
        cost[i * width] = i; move[i * width] = 3;
        for (j = 1; j <= n; j++) {
            var w = word[j - 1], s = stem[i - 1];
            var best = cost[(i - 1) * width + j - 1] + (w === s ? 0 : similar(w, s) ? 0.5 : 2), how = 1;
            var del = cost[i * width + j - 1] + 1;
            if (del < best) { best = del; how = 2; }
            var ins = cost[(i - 1) * width + j] + 1;
            if (ins < best) { best = ins; how = 3; }
            cost[i * width + j] = best;
            move[i * width + j] = how;
        }
    }
    var end = 0;
    for (j = 1; j <= n; j++) {
        if (cost[m * width + j] <= cost[m * width + end]) end = j;
    }

    var ops = [];
    i = m; j = end;
    while (i > 0 || j > 0) {
        var mv = move[i * width + j];
        if (mv === 1) { ops.push({ w: word[j - 1], s: stem[i - 1], j: j - 1 }); i--; j--; }
        else if (mv === 2) { ops.push({ w: word[j - 1], s: '', j: j - 1 }); j--; }
        else { ops.push({ w: '', s: stem[i - 1], j: j }); i--; }
    }
    ops.reverse();

    var blocks = [], current = null;
    ops.forEach(function(op) {
        if (op.w === op.s) {
            current = null;
            return;
        }
        if (!current) {
            current = { from: '', to: '', context: op.j > 0 ? word[op.j - 1] : '', start: op.j };
            blocks.push(current);
        }
        current.from += op.w;
        current.to += op.s;
    });
    return blocks;
}

function candidatesFor(block) {
    var list = [];
    if (block.from && block.to) {
        list.push([block.from, block.to]);
    }
    if (!block.to && block.start === 0) {
        list.push(['^' + block.from, '']);                           // e.g. Dutch ge-, Italian l'
    } else if (!block.to) {
        list.push([block.from, '']);                                 // e.g. Arabic diacritics
    }
    if ((!block.from || !block.to) && block.context) {
        list.push([block.context + block.from, block.context + block.to]); // e.g. ae -> a
    }
    return list.filter(function(c) {
        return c[0].length > 0 && c[0].length <= MAX_RULE_LENGTH + 1 && c[1].length <= MAX_RULE_LENGTH + 1;
    });
}

/*
 * The stem fold map for one set of words (raw, or accent folded) and their stems: greedy rules, then
 * probing of rare letters (only for raw words, accent folded words have no accents left to probe).
 */
function learnMap(name, stemmer, words, stems, withProbe) {
    var count = words.length;
    var minGain = Math.max(MIN_GAIN, Math.ceil(count * MIN_GAIN_SHARE));

    var map = {};
    var covered = words.map(function(w, i) { return w.indexOf(stems[i]) === 0; });
    var baseline = covered.filter(Boolean).length;
    var exceptions = {};

    function gainOf(key, to) {
        var trial = Object.assign({}, map);
        trial[key] = to;
        var fold = makeFold(trial), gain = 0, changes = [];
        for (var i = 0; i < count; i++) {
            if (!affects(words[i], key)) continue;
            var now = fold(words[i]).indexOf(stems[i]) === 0;
            if (now !== covered[i]) {
                gain += now ? 1 : -1;
                changes.push(i);
            }
        }
        return { gain: gain, changes: changes };
    }

    for (;;) {
        var counts = {};
        for (var i = 0; i < count; i++) {
            if (covered[i]) continue;
            diffBlocks(words[i], stems[i]).forEach(function(block) {
                candidatesFor(block).forEach(function(c) {
                    if (map[c[0]] === c[1]) return;
                    var id = c[0] + '\u0000' + c[1];
                    counts[id] = (counts[id] || 0) + 1;
                });
            });
        }
        Object.keys(exceptions).forEach(function(id) {
            counts[id] = Math.max(counts[id] || 0, exceptions[id]);
        });

        var ranked = Object.keys(counts).filter(function(id) {
            return counts[id] >= minGain;
        }).sort(function(a, b) {
            return counts[b] - counts[a] || (a < b ? -1 : 1);
        }).slice(0, CANDIDATES_PER_ROUND);

        var best = null;
        ranked.forEach(function(id) {
            var parts = id.split('\u0000');
            if (parts[0].length > MAX_RULE_LENGTH + 2) return;
            if (map[parts[0]] === parts[1]) return;
            var result = gainOf(parts[0], parts[1]);
            if (!best || result.gain > best.gain) {
                best = { key: parts[0], to: parts[1], gain: result.gain, changes: result.changes };
            }
        });
        if (!best || best.gain < minGain) break;

        map[best.key] = best.to;
        delete exceptions[best.key + '\u0000' + best.to];
        best.changes.forEach(function(i) {
            covered[i] = !covered[i];
            if (covered[i]) return;
            // the rule broke this word: let the letter before or after protect it
            var word = words[i];
            if (best.key[0] === '^') {
                var rest = best.key.slice(1);
                if (rest.length < word.length) {
                    var anchored = '^' + rest + word[rest.length];
                    exceptions[anchored + '\u0000' + anchored.slice(1)] = (exceptions[anchored + '\u0000' + anchored.slice(1)] || 0) + 1;
                }
                return;
            }
            var at = word.indexOf(best.key);
            while (at !== -1) {
                if (at > 0) {
                    var before = word[at - 1] + best.key;
                    exceptions[before + '\u0000' + before] = (exceptions[before + '\u0000' + before] || 0) + 1;
                }
                if (at + best.key.length < word.length) {
                    var after = best.key + word[at + best.key.length];
                    exceptions[after + '\u0000' + after] = (exceptions[after + '\u0000' + after] || 0) + 1;
                }
                at = word.indexOf(best.key, at + 1);
            }
        });
    }

    var probed = withProbe ? probe(name, stemmer, words, stems, map) : [];
    probed.forEach(function(rule) {
        map[rule[0]] = rule[1];
    });

    var sorted = {};
    Object.keys(map).sort().forEach(function(key) {
        sorted[key] = map[key];
    });
    var fold = makeFold(sorted);
    var final = words.filter(function(w, i) { return fold(w).indexOf(stems[i]) === 0; }).length;

    return {
        coverage: {
            none: round(baseline / count),
            map: round(final / count)
        },
        map: sorted,
        probed: probed.map(function(rule) { return rule[0]; }).sort()
    };
}

/* the letters of the word list, seen at least MIN_LETTER_COUNT times, sorted */
function lettersOf(words) {
    var seen = {};
    words.forEach(function(w) {
        Array.from(w).forEach(function(c) {
            if (/^\p{L}$/u.test(c)) seen[c] = (seen[c] || 0) + 1;
        });
    });
    return Object.keys(seen).filter(function(c) { return seen[c] >= MIN_LETTER_COUNT; }).sort();
}

/*
 * The wildcard maps of one Snowball algorithm. With accentFold configured in build.js, also the accent
 * fold map (CLDR Latin-ASCII for the letters of the word list, without `keep`) and the stem fold map
 * for accent folded words: an index with accentFold contains the stems of both forms, and a wildcard
 * term searched in it is accent folded before the stem fold.
 */
function derive(name) {
    var Stemmer = loader.loadStemmer(name);
    var stemmer = new Stemmer();
    var stem = function(w) { return stemmer.stemWord(w); };
    var words = readWords(name);
    var raw = learnMap(name, stemmer, words, words.map(stem), true);
    var result = { words: words.length, coverage: raw.coverage, map: raw.map, probed: raw.probed };

    var accent = languages[name].accentFold;
    if (accent) {
        var foldMap = accentFold.accentFoldMap(lettersOf(words), accent.keep);
        var fold = makeFold(foldMap);
        var foldedWords = words.map(fold);
        var folded = learnMap(name, stemmer, foldedWords, foldedWords.map(stem), false);
        result.accentFold = foldMap;
        result.folded = { coverage: folded.coverage, map: folded.map };
    }
    return result;
}

/* letters of the script that the sample (almost) lacks: does the stemmer fold them to their base letter? */
function probe(name, stemmer, words, stems, map) {
    var script = require('unicode-8.0.0/scripts/' + languages[name].script + '/regex');
    var seen = {};
    words.forEach(function(w) {
        for (var i = 0; i < w.length; i++) seen[w[i]] = (seen[w[i]] || 0) + 1;
    });

    var rules = [];
    for (var cp = 0; cp <= 0xFFFF; cp++) {
        if (cp >= 0xD800 && cp <= 0xDFFF) continue;
        var ch = String.fromCharCode(cp);
        if (!script.test(ch) || ch !== ch.toLowerCase() || map[ch] !== undefined) continue;
        if ((seen[ch] || 0) >= PROBE_SEEN_LIMIT) continue;
        var base = baseLetter(ch);
        if (base.length !== 1 || base === ch || !seen[base]) continue;

        var tried = 0, agreed = 0;
        for (var i = 0; i < words.length && tried < PROBE_SAMPLES; i++) {
            var at = words[i].indexOf(base);
            if (at === -1 || at >= stems[i].length - 1) continue;
            var variant = words[i].slice(0, at) + ch + words[i].slice(at + 1);
            tried++;
            if (stemmer.stemWord(variant) === stems[i]) agreed++;
        }
        if (tried >= PROBE_SAMPLES / 3 && agreed / tried >= PROBE_AGREEMENT) {
            rules.push([ch, base]);
        }
    }
    return rules;
}

function round(x) {
    return Math.round(x * 10000) / 10000;
}

var MAX_COVERAGE_DROP = 0.01;

/*
 * Derives the maps and writes fold-maps.json. Fails if a language's coverage drops by more than
 * MAX_COVERAGE_DROP against the committed file, unless `accept` is set (`--accept`), e.g. after
 * reviewing a Snowball update that changes a stemmer on purpose.
 */
function run(names, accept) {
    if (names.length === 0) names = Object.keys(languages);

    var previous = fs.existsSync(OUT_FILE) ? JSON.parse(fs.readFileSync(OUT_FILE, 'utf8')) : {};
    var result = {};
    Object.keys(previous).forEach(function(name) {
        if (languages[name]) result[name] = previous[name];   // drop stemmers that are no longer used
    });
    var dropped = [];
    names.forEach(function(name) {
        if (!languages[name]) throw new Error('Unknown stemmer: ' + name);
        var started = Date.now();
        var r = result[name] = derive(name);
        console.log(name + ': ' + r.words + ' words, coverage ' + r.coverage.none + ' -> ' + r.coverage.map +
            ', ' + Object.keys(r.map).length + ' rules' +
            (r.folded ? '; accent folded ' + r.folded.coverage.none + ' -> ' + r.folded.coverage.map + ', ' +
                Object.keys(r.folded.map).length + ' rules, ' + Object.keys(r.accentFold).length + ' letters folded' : '') +
            ' (' + ((Date.now() - started) / 1000).toFixed(1) + 's)');
        var p = previous[name];
        if (p && r.coverage.map < p.coverage.map - MAX_COVERAGE_DROP) {
            dropped.push(name + ' ' + p.coverage.map + ' -> ' + r.coverage.map);
        }
        if (p && p.folded && r.folded && r.folded.coverage.map < p.folded.coverage.map - MAX_COVERAGE_DROP) {
            dropped.push(name + ' (accent folded) ' + p.folded.coverage.map + ' -> ' + r.folded.coverage.map);
        }
    });

    if (dropped.length && !accept) {
        throw new Error('Wildcard coverage dropped (rerun with --accept after review):\n  ' + dropped.join('\n  '));
    }

    var sorted = {};
    Object.keys(result).sort().forEach(function(name) { sorted[name] = result[name]; });
    fs.writeFileSync(OUT_FILE, JSON.stringify(sorted, null, 2) + '\n');
}

if (require.main === module) {
    try {
        var args = process.argv.slice(2);
        run(args.filter(function(a) { return a !== '--accept'; }), args.indexOf('--accept') !== -1);
    } catch (err) {
        console.error(err.message);
        process.exitCode = 1;
    }
}

module.exports = { run: run, derive: derive, makeFold: makeFold, diffBlocks: diffBlocks };
