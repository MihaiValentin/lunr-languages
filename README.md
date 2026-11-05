# Lunr Languages — Multilingual Search for AI, RAG & Local-First Apps

> **Used by 18k+ projects • ~300k weekly downloads**

Lunr Languages is an extension for Lunr.js that enables **fast, multilingual full-text search** across dozens of languages — in the browser or Node.js.

Originally built for classic search, it is now widely used as a **lightweight retrieval layer in AI systems**, including:

* Retrieval-Augmented Generation (RAG)
* Hybrid search (keyword + vector)
* Local-first / edge AI apps
* Static site search and documentation search

⭐ If this project saves you time or powers something important, consider starring it or supporting its maintenance.

---

## Supported Languages

* ![](https://raw.githubusercontent.com/madebybowtie/FlagKit/master/Assets/PNG/GB.png) English (opt-in, see [English](#english))
* ![](https://raw.githubusercontent.com/madebybowtie/FlagKit/master/Assets/PNG/DE.png) German
* ![](https://raw.githubusercontent.com/madebybowtie/FlagKit/master/Assets/PNG/FR.png) French<sup>2</sup>
* ![](https://raw.githubusercontent.com/madebybowtie/FlagKit/master/Assets/PNG/ES.png) Spanish<sup>2</sup>
* ![](https://raw.githubusercontent.com/madebybowtie/FlagKit/master/Assets/PNG/IT.png) Italian<sup>2</sup>
* ![](https://raw.githubusercontent.com/madebybowtie/FlagKit/master/Assets/PNG/NL.png) Dutch<sup>2</sup>
* ![](https://raw.githubusercontent.com/madebybowtie/FlagKit/master/Assets/PNG/DK.png) Danish
* ![](https://raw.githubusercontent.com/madebybowtie/FlagKit/master/Assets/PNG/PT.png) Portuguese<sup>2</sup>
* ![](https://raw.githubusercontent.com/madebybowtie/FlagKit/master/Assets/PNG/PL.png) Polish<sup>2</sup>
* ![](https://raw.githubusercontent.com/madebybowtie/FlagKit/master/Assets/PNG/FI.png) Finnish
* ![](https://raw.githubusercontent.com/madebybowtie/FlagKit/master/Assets/PNG/RO.png) Romanian<sup>2</sup>
* ![](https://raw.githubusercontent.com/madebybowtie/FlagKit/master/Assets/PNG/HU.png) Hungarian<sup>2</sup>
* ![](https://raw.githubusercontent.com/madebybowtie/FlagKit/master/Assets/PNG/RU.png) Russian
* ![](https://raw.githubusercontent.com/madebybowtie/FlagKit/master/Assets/PNG/NO.png) Norwegian
* ![](https://raw.githubusercontent.com/madebybowtie/FlagKit/master/Assets/PNG/SE.png) Swedish
* ![](https://raw.githubusercontent.com/madebybowtie/FlagKit/master/Assets/PNG/TR.png) Turkish<sup>2</sup>
* ![](https://raw.githubusercontent.com/madebybowtie/FlagKit/master/Assets/PNG/JP.png) Japanese
* ![](https://raw.githubusercontent.com/madebybowtie/FlagKit/master/Assets/PNG/TH.png) Thai
* ![](https://raw.githubusercontent.com/madebybowtie/FlagKit/master/Assets/PNG/IQ.png) Arabic
* ![](https://raw.githubusercontent.com/madebybowtie/FlagKit/master/Assets/PNG/CN.png) Chinese<sup>1</sup>
* ![](https://raw.githubusercontent.com/madebybowtie/FlagKit/master/Assets/PNG/VN.png) Vietnamese<sup>2</sup>
* ![](https://raw.githubusercontent.com/madebybowtie/FlagKit/master/Assets/PNG/IN.png) Sanskrit
* ![](https://raw.githubusercontent.com/madebybowtie/FlagKit/master/Assets/PNG/IN.png) Kannada
* ![](https://raw.githubusercontent.com/madebybowtie/FlagKit/master/Assets/PNG/IN.png) Telugu
* ![](https://raw.githubusercontent.com/madebybowtie/FlagKit/master/Assets/PNG/IN.png) Hindi
* ![](https://raw.githubusercontent.com/madebybowtie/FlagKit/master/Assets/PNG/IN.png) Tamil
* ![](https://raw.githubusercontent.com/madebybowtie/FlagKit/master/Assets/PNG/KR.png) Korean
* ![](https://raw.githubusercontent.com/madebybowtie/FlagKit/master/Assets/PNG/AM.png) Armenian
* ![](https://raw.githubusercontent.com/madebybowtie/FlagKit/master/Assets/PNG/IL.png) Hebrew
* ![](https://raw.githubusercontent.com/madebybowtie/FlagKit/master/Assets/PNG/GR.png) Greek
* ![](https://raw.githubusercontent.com/madebybowtie/FlagKit/master/Assets/PNG/IR.png) Farsi (Persian)

→ [Contribute a new language](CONTRIBUTING.md)

---

<sup>1</sup> Chinese tokenization uses `Intl.Segmenter` with CJK bigrams by default, which works in modern browsers and Node.js without native dependencies. jieba is optional; see [Chinese Tokenization](#chinese-tokenization).

<sup>2</sup> Matches queries typed without accents by default, such as `respiracion` matching `Respiración`; see [Accent folding](#accent-folding).

---

## Why Lunr Languages in an AI world?

Modern AI systems don’t replace search — they **depend on it**.

Before an LLM can generate an answer, it needs **relevant context**. That’s where Lunr Languages fits:

### 🔎 Fast and consistent lexical retrieval

Filter thousands of documents down to a small candidate set before embedding or reranking.

### 🌍 Multilingual support out of the box

Tokenization, stemming, and stopwords for 30+ languages — still a hard problem in AI pipelines.

### ⚡ Zero infrastructure

Runs entirely in the browser or Node.js. No vector DB required.

### 🔒 Privacy-friendly / offline-ready

Perfect for:

* in-browser AI assistants
* local knowledge bases
* on-device search

---

## Example: Hybrid Search (Keyword + AI)

```text
User query
→ Lunr (keyword search, multilingual)
→ top 100–500 documents
→ embeddings / reranker
→ LLM generates answer
```

Lunr Languages improves **recall and precision**, especially for:

* non-English content
* inflected languages
* mixed-language datasets

---

## Installation

```bash
npm install lunr lunr-languages
```

Lunr Languages 2.x requires Lunr 2 (`lunr@^2.0.0`). For Lunr 0.x or 1.x, use Lunr Languages 1.x.

It needs an ES2022 runtime: Chrome/Edge 84+, Firefox 90+, Safari 15+, Node.js 14.6+. For Internet Explorer 11, use Lunr Languages 1.x. Text must be in Unicode NFC, see [Text in Unicode NFC](#text-in-unicode-nfc). Indexes built with Lunr Languages 1.x must be rebuilt, because the stems changed.

---

## Usage

### Basic example (German)

```javascript
const lunr = require('lunr');
require('lunr-languages/lunr.stemmer.support')(lunr);
require('lunr-languages/lunr.de')(lunr);

const idx = lunr(function () {
  this.use(lunr.de);

  this.field('title', { boost: 10 });
  this.field('body');

  this.add({ title: 'Dokument', body: 'Beispieltext' });
});
```

The existing CommonJS usage is still supported. Modern runtimes and TypeScript projects can import the same subpath modules:

```javascript
import lunr from 'lunr';
import stemmerSupport from 'lunr-languages/lunr.stemmer.support';
import de from 'lunr-languages/lunr.de';

stemmerSupport(lunr);
de(lunr);
```

Type declarations are included for the registration modules and the Lunr properties they install, including `lunr.multiLanguage`.

### Accent folding

For French, Spanish, Portuguese, Italian, Dutch, Romanian, Polish, Turkish, Hungarian and Vietnamese, users often type without diacritics. These languages index every token and its accent-free form, so `respiracion` finds `Respiración` and `zolw` finds `żółw`, including wildcard searches. The original form still goes through the stemmer unchanged. Letters that are letters of their own stay (Spanish `ñ`), and languages like Swedish, Finnish or German don't fold at all. In Vietnamese, the tone marks tell words apart, so `ha noi` finds `Hà Nội`, but `ma` also finds `mà`, `má` and `mã`; a word typed with its marks still ranks its exact form first.

The second form makes the index larger, the more so the more words carry diacritics: up to about three quarters for Hungarian, almost half for Turkish and about a third for Polish and Romanian, and more than half for Vietnamese, whose syllables almost all carry a mark.

To switch it off, remove `lunr.xx.accentFold` from both pipelines:

```js
var idx = lunr(function () {
  this.use(lunr.es);
  this.pipeline.remove(lunr.es.accentFold);
  this.searchPipeline.remove(lunr.es.accentFold);

  this.field('body');
  this.add({ id: 1, body: 'Respiración' });
});
```

### Text in Unicode NFC

All languages expect text in Unicode Normalization Form C (NFC), the form text on the web is normally written in: an accented letter like `é` is one character, not `e` followed by a combining accent. Stop words, word characters and stemmers are written for NFC, so text in another form may be trimmed, filtered or stemmed wrongly.

If your text or your users' queries may arrive in another form, for example copied from a source that writes decomposed text, normalize both before indexing and searching:

```js
var idx = lunr(function () {
  this.use(lunr.de);
  this.field('body');
  this.add({ id: 1, body: body.normalize('NFC') });
});

idx.search(query.normalize('NFC'));
```

### Wildcards

Wildcard terms are folded and stemmed like the indexed words, so `häuser*` finds `Häuser`. Leading wildcards (`*ung`) don't find inflected words, because the index holds stems.

### English

Lunr has English built in (Porter stemmer from 1980). `lunr.en` is an opt-in alternative:

* Snowball's English stemmer (Porter2), which conflates fewer unrelated words (`generously` and `general` no longer share a stem)
* a trimmer that keeps letters like `é`, where lunr's trimmer turns `café` into `caf`
* Snowball's English stop words plus every word of lunr's built-in list

```javascript
require('lunr-languages/lunr.stemmer.support')(lunr);
require('lunr-languages/lunr.en')(lunr);

const idx = lunr(function () {
  this.use(lunr.en);
  this.field('body');
});
```

An index built with lunr's built-in English must be rebuilt for `lunr.en`. In `lunr.multiLanguage`, `'en'` uses `lunr.en` when it is loaded, and lunr's built-in English otherwise.

---

## Migrating from 1.x

* Lunr 2 is required (`lunr@^2.0.0`). For Lunr 0.x or 1.x, stay on Lunr Languages 1.x.
* An ES2022 runtime is required: Chrome/Edge 84+, Firefox 90+, Safari 15+, Node.js 14.6+. For Internet Explorer 11, stay on Lunr Languages 1.x.
* Rebuild every index built with 1.x. The stems changed, but the pipeline labels (`stemmer-de`, …) did not, so an old index still loads and then misses words.
* With `lunr.stemmer.support.js` loaded, a required stop word (`+the`) is left out of a search instead of making it find nothing, also for lunr's built-in English.
* Hindi, Kannada, Sanskrit, Tamil and Telugu no longer need `wordcut.js`; `lunr.hi.tokenizer` and its siblings are removed.
* Accent folding is on by default for French, Spanish, Portuguese, Italian, Dutch, Romanian, Polish, Turkish, Hungarian and Vietnamese (see [Accent folding](#accent-folding)). French used to fold accents before the stemmer, and Spanish had it opt-in; to keep an index without the accent-free forms, remove `lunr.xx.accentFold` from both pipelines.
* `lunr.stemmerSupport.Among` and `SnowballProgram` are removed. A third-party stemmer built on them has to extend `lunr.stemmerSupport.BaseStemmer` (Snowball 3.x) instead.
* Greek: `lunr.el.normilizer` is replaced by `lunr.el.normalizer`, which is in the pipeline now.
* Thai: `wordcut.js` is now the optional plugin `lunr.th.wordcut.js`; without it, Thai is segmented with `Intl.Segmenter`. Before: `lunr.wordcut = require('lunr-languages/wordcut')`, now: `require('lunr-languages/lunr.th.wordcut')(lunr)`. Rebuild Thai indexes with the segmenter you search with.
* Japanese: `tinyseg.js` is now the optional plugin `lunr.ja.tinyseg.js` and registers TinySegmenter as `lunr.segmenters.ja` instead of setting `lunr.TinySegmenter`; without it, Japanese is segmented with `Intl.Segmenter`. Before: `require('lunr-languages/tinyseg')(lunr)`, now: `require('lunr-languages/lunr.ja.tinyseg')(lunr)`. Rebuild Japanese indexes with the segmenter you search with.
* Chinese: `@node-rs/jieba` is no longer used just because it is installed; load `lunr.zh.jieba.js` to use it: `require('lunr-languages/lunr.zh.jieba')(lunr, customDictionary)`. A custom dictionary passed to `lunr.zh.js` throws. Without the plugin, Chinese is segmented with `Intl.Segmenter` plus bigrams, so rebuild indexes that were built with jieba, or load the plugin.
* `du` is removed: use `nl` (`lunr-languages/lunr.nl`) for Dutch.
* `jp` is removed: use `ja` (`lunr-languages/lunr.ja`) for Japanese. Its pipeline labels were `stemmer-jp`, `trimmer-jp` and `stopWordFilter-jp`; indexes saved with them must be rebuilt with `ja`.

See [CHANGELOG.md](CHANGELOG.md) for the changes per language.

---

## Multi-language indexing

```javascript
require('lunr-languages/lunr.multi')(lunr);

const idx = lunr(function () {
  this.use(lunr.multiLanguage('en', 'ru', 'de'));

  this.field('title');
  this.field('body');
});
```

---

## Building queries with `query.term`

`idx.search('…')` prepares each word for the index's languages: Turkish `KIZ` becomes `kız`, a German wildcard `Käs*` becomes `kas*`. `query.term()` uses a term exactly as given, so lunr-languages offers the same preparation for it:

```javascript
idx.query(function (q) {
  // split with the tokenizer the index was built with (Japanese, Chinese, Thai, Turkish, …),
  // prepare each word, and add it with the given options
  lunr.stemmerSupport.addQueryTerms(q, 'Käs* Brot', { presence: lunr.Query.presence.REQUIRED });
});

// a single term, e.g. for your own clauses
var term = lunr.stemmerSupport.normalizeQueryTerm('Käs*', idx); // 'kas*'
```

`addQueryTerms` takes plain text, without query syntax (`+`, `-`, `field:`, `~`, `^`). Words with `*` are wildcard terms and skip the search pipeline; stop words the index dropped are left out, so required words still match.

---

## Japanese Tokenization

Japanese is written without spaces between words, so `lunr.ja` segments it into words with `Intl.Segmenter` (Node.js 16+, Chrome/Edge 87+, Safari 14.1+, Firefox 125+), using ICU's dictionary.

To use TinySegmenter instead, a small trained segmenter that keeps verb forms together better (`食べたい` → `食べ|たい`, where `Intl.Segmenter` gives `食|べた|い`), or in runtimes without `Intl.Segmenter`, load `lunr.ja.tinyseg.js`, before or after `lunr.ja.js`:

```javascript
require('lunr-languages/lunr.ja.tinyseg')(lunr);
```

```html
<script src="lunr.ja.tinyseg.js"></script>
```

Without either, tokenizing Japanese throws an error. Build and search an index with the same segmenter.

---

## Thai Tokenization

Thai is written without spaces between words, so `lunr.th` segments it into words with `Intl.Segmenter` (Node.js 16+, Chrome/Edge 87+, Safari 14.1+, Firefox 125+), using ICU's Thai dictionary.

To use wordcut instead, a dictionary-based Thai segmenter, or in runtimes without `Intl.Segmenter`, load `lunr.th.wordcut.js`, before or after `lunr.th.js`:

```javascript
require('lunr-languages/lunr.th.wordcut')(lunr);
```

```html
<script src="lunr.th.wordcut.js"></script>
```

Without either, tokenizing Thai throws an error. Build and search an index with the same segmenter: load `lunr.th.wordcut.js` in both places or in neither, because the two can split some words differently.

Search strings are segmented like the indexed text for Japanese, Chinese and Thai, so a phrase typed without spaces finds its words.

---

## Chinese Tokenization

Chinese is written without spaces between words, so `lunr.zh` segments it into words with `Intl.Segmenter`, plus a bigram for each pair of Chinese characters. It works in modern browsers and Node.js without native dependencies. Bigrams improve recall for common two-character search terms such as `车主` and `学姐`.

To use jieba instead, which generally gives better precision and ranking, load one of its two builds, before or after `lunr.zh.js`. Both take an optional custom dictionary, which is loaded once:

* `lunr.zh.jieba.js` with `@node-rs/jieba`, a native add-on: fast, Node.js only.

  ```bash
  npm install @node-rs/jieba
  ```

  ```javascript
  require('lunr-languages/lunr.zh.jieba')(lunr);              // or (lunr, customDictionary)
  ```

* `lunr.zh.jieba-wasm.js` with `jieba-wasm`, the same jieba compiled to WebAssembly: Node.js and browsers, about ten times slower, a 2.7 MB (gzipped) download in browsers.

  ```bash
  npm install jieba-wasm
  ```

  ```javascript
  require('lunr-languages/lunr.zh.jieba-wasm')(lunr);         // Node.js: loads jieba-wasm itself

  // browsers: initialize jieba-wasm first, then pass it in
  import init, * as jieba from 'jieba-wasm';
  await init();
  lunrZhJiebaWasm(lunr, undefined, jieba);                    // or (lunr, customDictionary, jieba)
  ```

Both segment the same way, so an index built with `lunr.zh.jieba.js` in Node.js can be searched with `lunr.zh.jieba-wasm.js` in a browser. Installing a jieba package alone changes nothing; loading a jieba file without its package throws an error. Without `Intl.Segmenter` and jieba, tokenizing Chinese throws an error. Build and search an index with the same segmenter: jieba (either build) or `Intl.Segmenter`.

---

## Where this fits in modern architectures

Lunr Languages is commonly used as:

* **Pre-filter for vector search**
* **Fallback when embeddings fail**
* **Client-side retrieval for AI apps**
* **Static / documentation search**

👉 In practice, **hybrid search (keyword + vector) performs best**

---

## How it works

To provide high-quality search across languages:

* **Tokenization** — language-aware splitting (including Japanese, Chinese, etc.)
* **Stemming** — matches different word forms
* **Stopword filtering** — removes noise
* **Trimming** — normalizes tokens

These steps improve both **classic search** and **AI retrieval pipelines**.

---

## When to use Lunr Languages vs vector search

Use Lunr Languages when you need:

* fast, deterministic keyword matching
* multilingual normalization
* offline / browser-based search
* low-cost retrieval

Combine with embeddings for:

* semantic similarity
* fuzzy concept matching

---

## Contributing

Want to add a new language?

See [CONTRIBUTING.md](CONTRIBUTING.md)

---

## Support / Sponsorship

Maintained as an open-source project for over a decade.

If your company relies on this in production:

* consider sponsoring
* or contributing improvements

It helps keep the ecosystem stable.

---

## Final note

Even in an AI-first world, **retrieval is the bottleneck**.

Lunr Languages ensures the *right* content reaches your models — fast, locally, and across languages.
