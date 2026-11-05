# Third-party notices

lunr-languages is licensed under the MPL (see `package.json`). It includes, or is generated from, the
third-party code and data below. The license texts are in [`licenses/`](licenses/), which is part of the npm
package.

## Included in the package

| Component | Version | License | Where | Notice |
|---|---|---|---|---|
| [Snowball](https://snowballstem.org/) stemmers and `base-stemmer.js` | 3.2.0 | BSD-3-Clause | every generated `lunr.<locale>.js`, `lunr.stemmer.support.js` | full text in each file's header; [`licenses/Snowball-BSD-3-Clause.txt`](licenses/Snowball-BSD-3-Clause.txt) |
| Snowball's stop word lists ([snowball-website](https://github.com/snowballstem/snowball-website)) | commit `dc14fb4` | BSD-3-Clause | stop words of da, nl, en, fi, fr, de, hu, it, no, pt, ru, es, sv, id | [`licenses/Snowball-BSD-3-Clause.txt`](licenses/Snowball-BSD-3-Clause.txt) |
| [TinySegmenter](http://chasen.org/~taku/software/TinySegmenter/) | 0.1 | BSD-3-Clause | `lunr.ja.tinyseg.js` | full text in the file's header; [`licenses/TinySegmenter-BSD-3-Clause.txt`](licenses/TinySegmenter-BSD-3-Clause.txt) |
| [wordcut](https://github.com/veer66/wordcut), with its Thai dictionary | 0.9.1 | LGPL-3.0 | `lunr.th.wordcut.js` | notice in the file's header; [`licenses/wordcut-LGPL-3.0.txt`](licenses/wordcut-LGPL-3.0.txt), [`licenses/GPL-3.0.txt`](licenses/GPL-3.0.txt) |
| [CLDR](https://cldr.unicode.org/) `Latin-ASCII` transform (data the accent folding maps are derived from) | release-49 | Unicode License V3 | `lunr.<locale>.js` with accent folding: ca, es, fr, hu, it, nl, pl, pt, ro, tr, vi | notice in each file's header; [`licenses/Unicode-3.0.txt`](licenses/Unicode-3.0.txt) |
| [stopwords-iso/stopwords-vi](https://github.com/stopwords-iso/stopwords-vi) | commit `0bf911e` | MIT | 28 single-syllable function words of it as the stop words of `lunr.vi.js` | [`licenses/stopwords-iso-MIT.txt`](licenses/stopwords-iso-MIT.txt) |
| Lucene's Catalan stop words ([apache/lucene](https://github.com/apache/lucene/blob/main/lucene/analysis/common/src/resources/org/apache/lucene/analysis/ca/stopwords.txt), from [vcl/cue.language](https://github.com/vcl/cue.language)) | commit `53acee9` | Apache-2.0 | the stop words of `lunr.ca.js` (`build/stopwords-custom/ca.csv`) | [`licenses/Apache-2.0.txt`](licenses/Apache-2.0.txt) |
| [lunr](https://lunrjs.com/)'s English stop words | 2.3.9 | MIT | the words added to Snowball's list in `lunr.en.js` (`build/stopwords-add/en.txt`) | [`licenses/lunr-MIT.txt`](licenses/lunr-MIT.txt) |
| [UMD](https://github.com/umdjs/umd) `returnExports` pattern | – | MIT | the module wrapper of every file | [`licenses/UMD-MIT.txt`](licenses/UMD-MIT.txt) |

## Optional peer dependencies (not included)

Installed separately, only when a segmenter plugin is used; their licenses apply to them.

| Package | License | Used by |
|---|---|---|
| [@node-rs/jieba](https://github.com/napi-rs/node-rs) | MIT | `lunr.zh.jieba.js` |
| [jieba-wasm](https://github.com/fengkx/jieba-wasm) | MIT | `lunr.zh.jieba-wasm.js` |

## Used only to build (not included)

| Component | License | Used for |
|---|---|---|
| [snowball-data](https://github.com/snowballstem/snowball-data) word lists (`voc.txt`, `output.txt`) | BSD-3-Clause | deriving the wildcard maps; the stem samples of the tests (`build/snowball/stem-samples.json`, in the repository) |
| [@unicode/unicode-17.0.0](https://www.npmjs.com/package/@unicode/unicode-17.0.0) (Unicode 17.0 data) | MIT | the character ranges of the trimmers |

## Stop word lists of other origin

| Language | Origin | License |
|---|---|---|
| fa | 24 function words of Jacques Savoy's Persian stop word list, [as shipped in Lucene](https://github.com/apache/lucene/blob/main/lucene/analysis/common/src/resources/org/apache/lucene/analysis/fa/stopwords.txt), in Persian spelling (Lucene writes them normalized: Arabic ي and ك, ا for آ) | BSD (per the list's header) |
| ja, zh | [ranks.nl](https://www.ranks.nl/stopwords) | not stated |
| ar, el, hi, hy, ta, pl, ro, tr, and the words of `build/stopwords-add/ru.txt` | not recorded; they come from the hand-written language files of lunr-languages 1.x | unknown |
| he, ko, kn, te, sa | not recorded (hand-written language files) | unknown |
