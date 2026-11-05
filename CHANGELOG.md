# Changelog

## 2.0.0 (unreleased)

### All languages

- Requires lunr 2 (`lunr@^2.0.0`); lunr 0.x and 1.x stay on lunr-languages 1.x.
- `lunr.stemmerSupport.Among` and `lunr.stemmerSupport.SnowballProgram`, the Snowball 0.3 runtime of 1.x, are removed. Stemmers extend `lunr.stemmerSupport.BaseStemmer` (Snowball 3.x) now.
- New `lunr.stemmerSupport.addQueryTerms(query, text, options)` and `normalizeQueryTerm(term, idx)` prepare terms for `query.term()` like the query parser does for search strings: split with the index's tokenizer, special casing, wildcard folding, lowercasing; stop words the index dropped are left out.
- Required words (`+word`) are found with accent folding: `+kızı` finds `kızlar`, `+rivière` an unaccented `riviere`. A required word kept every form the search pipeline made of it, and matched nothing if one form was missing from the index.
- Required stop words are left out (`+und`, `+the`): they matched nothing, because the index dropped them. This also applies to lunr's built-in English once `lunr.stemmer.support.js` is loaded.
- A wildcard term finds the words whose stem is shorter than what was typed: `häuser*` finds `Häuser` (stem `haus`), `Ελλάδα*` finds `Ελλάδα` (`ελλαδ`). lunr does not stem wildcard terms, so in 1.x the full word with `*` found itself in only about 5–45% of the words; now 88–100%. If the stemmer changes the last letter of the stem (Turkish `kullanıcı` → `kullanıç`, English `happy` → `happi`), the prefix before that letter is searched (`kullani*`, `happ*`). The term only gets shorter, so it finds everything it found before. Applies to every language stemmed with Snowball.
- `THIRD-PARTY-NOTICES.md` lists the third-party code and data the files include or are generated from, with version and license; `licenses/` ships the full texts. Files with accent folding carry a notice for the CLDR data.

### Arabic (ar)

- Generated from Snowball 3.2.0's Arabic light stemmer instead of the hand-written root stemmer (Taghva et al.). Stems keep the root pattern, so some forms no longer conflate: `يكتبون` stems to `يكتب` (was `كتب`). Hamza and alef forms, diacritics and tatweel are folded by the stemmer.
- Wildcard terms drop the prefixes the stemmer drops and fold hamza forms: `كتا*` finds `الكتابة`, `احم*` finds `أحمد`. 1.x indexed roots, so a word with `*` rarely found itself.
- The stop words are unchanged (434 words; an empty word and duplicates dropped); the trimmer keeps the whole Arabic script.

### Armenian (hy)

- Searches no longer go through lunr's English stemmer: a Latin word in an Armenian index (`running`) is found by itself again.
- Stemmed for the first time: 1.x returned words unchanged. Generated from Snowball 3.2.0's Armenian stemmer; the stop words are unchanged.
- A wildcard term finds words whose stem is shorter than what was typed (see All languages).

### Chinese (zh)

- Searches no longer go through lunr's English stemmer: a Latin word in a Chinese index (`running`) is found by itself again.
- A search string written without spaces is segmented like the index, so a phrase finds the documents that contain its words (see Japanese).
- Segmented with `Intl.Segmenter` plus a bigram for each pair of Chinese characters by default, in Node.js too. 1.x used `@node-rs/jieba` whenever it could be required, so segmentation changed with whatever was in `node_modules`, possibly as a transitive dependency.
- jieba is an optional plugin, `lunr.zh.jieba.js`, loaded before or after `lunr.zh.js`, with an optional custom dictionary. Without `@node-rs/jieba`, or in a browser, it throws instead of falling back. `@node-rs/jieba` is an optional peer dependency.
- `lunr.zh.jieba-wasm.js` registers jieba-wasm (jieba-rs compiled to WebAssembly) as a second jieba segmenter, also in browsers, where the initialized module is passed in: `lunrZhJiebaWasm(lunr, customDict, jieba)`. It segments like `@node-rs/jieba` (6 of 6 test queries gave the same results), so an index built with jieba in Node.js can be searched in a browser. jieba-wasm is an optional peer dependency.
- A custom jieba dictionary is loaded once, when the plugin is called, not on every tokenization, which made indexing with a custom dictionary use 100% CPU (#82).

### Danish (da)

- Stemmer: Snowball 3.2.0 instead of a port of the 2010 stemmer; stems change.
- A wildcard term finds words whose stem is shorter than what was typed: `husene*` finds `husene` (stem `hus`).

### Dutch (nl)

- The deprecated `du` locale is removed; use `nl`.
- Stemmer: Snowball 3.2.0's `dutch`, Kraaij-Pohlmann (Snowball's default since 3.0.0), instead of the Porter-based stemmer; stems change.
- Wildcard terms are folded like the stemmer folds the index (`ideeë*` finds `ideeën`).
- Accent folding on by default: `ideeen` finds `ideeën`, wildcards too. Opt-out: remove `lunr.nl.accentFold` from both pipelines.

### English (en)

- New, opt-in `lunr.en`: Snowball 3.2.0's English stemmer (Porter2), a trimmer for Latin letters (keeps `é`, where lunr's trimmer turns `café` into `caf`), Snowball's English stop words, pipeline labels `stemmer-en`, `trimmer-en`, `stopWordFilter-en`. lunr's built-in English (Porter, 1980) stays the default.
- `lunr.multiLanguage('en', …)` uses `lunr.en` when it is loaded and lunr's built-in English otherwise; the multi trimmer and tokenizer labels name lunr's built-in English `builtin` (`lunr-multi-trimmer-builtin-ru`), so they differ from those with `lunr.en`.
- Stop words: Snowball's 174 plus the 35 of lunr's built-in list that Snowball's lacks (209), so `lunr.en` drops at least what lunr's English drops.

### Finnish (fi)

- Stop words: Snowball's current list; adds `joten`.
- Stemmer: Snowball 3.2.0 instead of a port of the 2010 stemmer; stems change.
- A wildcard term finds words whose stem is shorter than what was typed (see All languages).

### French (fr)

- Stop words: Snowball's current list (154 words, was 163); adds `cela`, drops `as`, `aura`, `auras`, `avions`, `est`, `fût`, `son`, `sommes`, `été`, `étés`.
- Stemmer: Snowball 3.2.0 instead of a port of the 2010 stemmer; stems change.
- Accent folding on by default: each word is indexed as written and accent-free (`rivière`, `riviere`), so searches with and without accents find it, wildcards too. Replaces 1.x's folding before the stemmer, which indexed only the accent-free form. Opt-out: remove `lunr.fr.accentFold` from both pipelines.

### German (de)

- Stemmer: Snowball 3.2.0 instead of a port of the 2010 stemmer; stems change. It treats `ae`, `oe`, `ue` like `ä`, `ö`, `ü` (Snowball 3.0.0's german2), so `Kaese` and `Käse` share a stem.
- Wildcard terms are folded by a map derived from the stemmer instead of a hand-written one; it also folds `ae`, `oe`, `ue`.

### Greek (el)

- Stemmed for the first time under lunr 2: 1.x's stemmer expected uppercase words and returned lowercase ones unchanged. Generated from Snowball 3.2.0's Greek stemmer; `Ελλάδας` finds `Ελλάδα` (stem `ελλαδ`).
- Accented stop words (`από`, `αλλά`, `ή`) are dropped now: a normalizer (tonos, `ϋ`, `ΰ`, final `ς`) runs before the stop word filter. The trimmer is in the pipeline now.
- Wildcard terms are folded like the index: `σπιτ*` finds `σπίτια`.
- `lunr.el.normilizer` (never in the pipeline) is replaced by `lunr.el.normalizer` (label `normalizer-el`).

### Hindi (hi)

- Loads without `wordcut.js`; loading failed with a TypeError unless it was attached first. `lunr.hi.tokenizer` (a Thai segmenter that was never used for indexing) is removed.
- Stemmed for the first time: 1.x returned words unchanged. Generated from Snowball 3.2.0's Hindi stemmer; the stop words are unchanged.
- A wildcard term finds words whose stem is shorter than what was typed (see All languages).

### Hungarian (hu)

- Stop words: Snowball's current list; `ő` instead of the mis-encoded `õ` (`elő`, `ők`, …), so these words are filtered now.
- Stemmer: Snowball 3.2.0 instead of a port of the 2010 stemmer; stems change.
- Accent folding on by default: `haz` finds `ház`, wildcards too. Opt-out: remove `lunr.hu.accentFold` from both pipelines.

### Italian (it)

- Stemmer: Snowball 3.2.0 instead of a port of the 2010 stemmer; stems change.
- Wildcard terms are folded like the stemmer folds the index (`é` as `è`, elisions like `d'`).
- Accent folding on by default: `citta` finds `città`, wildcards too. Opt-out: remove `lunr.it.accentFold` from both pipelines.

### Japanese (ja)

- The deprecated `jp` locale and its `stemmer-jp`, `trimmer-jp` and `stopWordFilter-jp` labels are removed; use `ja`.
- Searches no longer go through lunr's English stemmer: a Latin word in a Japanese index (`running`) is found by itself again.
- A search string written without spaces is segmented like the index, so a phrase finds the documents that contain its words: `日本語の本` was one term in 1.x and found nothing. Modifiers apply to each word (`+title:日本語の本`); wildcard terms stay whole.
- Token positions are right with leading whitespace (they were too small, so highlighting marked the wrong characters), and the tokenizer keeps the metadata lunr passes (the field).
- Segmented with `Intl.Segmenter` (ICU's dictionary) by default. `lunr.ja.js` no longer fails to load with a TypeError when `tinyseg.js` was not loaded first.
- TinySegmenter is an optional plugin, `lunr.ja.tinyseg.js` (was `tinyseg.js`), loaded before or after `lunr.ja.js`. The two segment differently in places: TinySegmenter keeps verb forms together (`食べたい` → `食べ|たい`, `Intl.Segmenter`: `食|べた|い`), `Intl.Segmenter` knows dictionary words (`すもも`).
- `lunr.ja.tinyseg.js` carries TinySegmenter's full license text, as its license requires, instead of a link.

### Kannada (kn)

- Loads without `wordcut.js`; loading failed with a TypeError unless it was attached first. `lunr.kn.tokenizer` (a Thai segmenter that was never used for indexing) is removed.

### Norwegian (no)

- Stemmer: Snowball 3.2.0 instead of a port of the 2010 stemmer; stems change.
- A wildcard term finds words whose stem is shorter than what was typed (see All languages).

### Persian (fa)

- Generated from Snowball 3.2.0's Persian stemmer instead of a hand port of 3.1.1; the stems are identical on all 104,268 words of Snowball's word list, and indexing is the same as before except for one word in Arabic presentation forms, which the trimmer now keeps.
- Wildcard terms are folded like the stemmer folds the index: the prefix `می‌` (`می‌خوا*` finds `می‌خوانند`), Arabic keyboard spellings, `آ` as `ا`.
- `lunr.multiLanguage('fa', …)` now normalizes Persian like `lunr.fa` does (Arabic yeh and kaf, harakat, tatweel).
- The stop words are sourced from Jacques Savoy's list (BSD), as shipped in Lucene; the words are unchanged.

### Polish (pl)

- Stemmer: Snowball 3.2.0's Polish stemmer instead of a hand-written one; stems change.
- Wildcard terms are folded like the stemmer folds the index.
- Accent folding on by default: `zolw` finds `żółw`, wildcards too (`ł` as `l`). Opt-out: remove `lunr.pl.accentFold` from both pipelines.

### Portuguese (pt)

- Stemmer: Snowball 3.2.0 instead of a port of the 2010 stemmer; stems change.
- Accent folding on by default: `coracao` finds `coração`, wildcards too. Opt-out: remove `lunr.pt.accentFold` from both pipelines.

### Romanian (ro)

- Stemmer: Snowball 3.2.0 instead of a port of the 2010 stemmer; stems change.
- Wildcard terms are folded like the stemmer folds the index (`ş`, `ţ` as `ș`, `ț`).
- Accent folding on by default: `tara` finds `țară`, wildcards too. Opt-out: remove `lunr.ro.accentFold` from both pipelines.
- Stop words: `în` ("in") is filtered now; the list had it with a trailing space.

### Russian (ru)

- Stop words: Snowball's list (159 words) instead of a custom 421-word list.
- Stemmer: Snowball 3.2.0 instead of a port of the 2010 stemmer; stems change.
- Wildcard terms are folded like the stemmer folds the index (`ё` as `е`).
- Stop words: Snowball's 159 plus 197 function words of the 1.x list that Snowball's lacks (356); the 1.x list's typos, single letters, content words (`год`, `время`, `люди`, …) and numbers 4–20 and ordinals are left out.

### Sanskrit (sa)

- Loads without `wordcut.js`; loading failed with a TypeError unless it was attached first. `lunr.sa.tokenizer` (a Thai segmenter that was never used for indexing) is removed.

### Spanish (es)

- Stemmer: Snowball 3.2.0 instead of a port of the 2010 stemmer; stems change. It also removes unaccented suffixes (`respiracion` → `respir`, like `respiración`).
- Wildcard terms are folded like the stemmer folds the index.
- Accent folding on by default (was opt-in): `respiracion` finds `Respiración`; `ñ` stays a letter of its own. Opt-out: remove `lunr.es.accentFold` from both pipelines.

### Swedish (sv)

- Stop words: Snowball's current list; `sitt` instead of `sitta`.
- Stemmer: Snowball 3.2.0 instead of a port of the 2010 stemmer; stems change.
- A wildcard term finds words whose stem is shorter than what was typed: `flickorna*` finds `flickorna`.

### Tamil (ta)

- Loads without `wordcut.js`; loading failed with a TypeError unless it was attached first. `lunr.ta.tokenizer` (a Thai segmenter that was never used for indexing) is removed.
- Stemmed for the first time: 1.x returned words unchanged. Generated from Snowball 3.2.0's Tamil stemmer; the stop words are unchanged.
- The stemmer changes letters inside the word, so wildcard terms get rules for it, among them the demonstrative prefixes (`இந்`, `அந்`, …).

### Telugu (te)

- Loads without `wordcut.js`; loading failed with a TypeError unless it was attached first. `lunr.te.tokenizer` (a Thai segmenter that was never used for indexing) is removed.

### Thai (th)

- Searches no longer go through lunr's English stemmer: a Latin word in a Thai index (`running`) is found by itself again.
- Latin words in Thai text are lowercased like lunr's tokenizer does, so `Running` is found by `running`.
- A search string written without spaces is segmented like the index, so a phrase finds the documents that contain its words (see Japanese).
- Segmented with `Intl.Segmenter` (ICU's Thai dictionary) by default. `lunr.th.js` no longer fails to load with a TypeError when `wordcut.js` was not attached first (#101).
- wordcut is an optional plugin, `lunr.th.wordcut.js` (was `wordcut.js`), loaded before or after `lunr.th.js`. The two agree on 28 of 30 words of the Thai test documents (`Intl.Segmenter` splits `แผ่นดิน` into `แผ่น ดิน`).
- Segments that are not words (spaces, punctuation) are dropped, and tokens carry position metadata like lunr's tokenizer, for highlighting.
- `lunr.th.wordcut.js` bundles wordcut 0.9.1 (was 0.8.1 from 2016) built from npm, without the unused glob, minimatch and assert code: 512 KB instead of 677 KB. It segments the test texts like 0.8.1 and creates no globals. Its LGPL-3.0 license ships in `licenses/`.

### Turkish (tr)

- Stemmer: Snowball 3.2.0 instead of a port of the 2010 stemmer; stems change.
- Wildcard terms are folded like the stemmer folds the index.
- Accent folding on by default: `kiz` finds `kız`, wildcards too (`ı` as `i`). Opt-out: remove `lunr.tr.accentFold` from both pipelines.
- `kullanıcı*` finds `kullanıcı` (#69): the stemmer ends the stem in `ç`, which wildcard terms didn't match.
- `I` and `İ` are lowercased the Turkish way (`ı`, `i`) in indexed text and searches, before lunr lowercases: `İSTANBUL` finds `istanbul`, `KIZLAR` stems like `kızlar`. lunr's `toLowerCase()` gave `i̇` (with a combining dot) and `i`, so such words were not found.

### Vietnamese (vi)

- Searches no longer go through lunr's English stemmer: a Latin word in a Vietnamese index (`running`) is found by itself again.
