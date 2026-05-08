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

* ![](https://raw.githubusercontent.com/madebybowtie/FlagKit/master/Assets/PNG/DE.png) German
* ![](https://raw.githubusercontent.com/madebybowtie/FlagKit/master/Assets/PNG/FR.png) French
* ![](https://raw.githubusercontent.com/madebybowtie/FlagKit/master/Assets/PNG/ES.png) Spanish<sup>2</sup>
* ![](https://raw.githubusercontent.com/madebybowtie/FlagKit/master/Assets/PNG/IT.png) Italian
* ![](https://raw.githubusercontent.com/madebybowtie/FlagKit/master/Assets/PNG/NL.png) Dutch
* ![](https://raw.githubusercontent.com/madebybowtie/FlagKit/master/Assets/PNG/DK.png) Danish
* ![](https://raw.githubusercontent.com/madebybowtie/FlagKit/master/Assets/PNG/PT.png) Portuguese
* ![](https://raw.githubusercontent.com/madebybowtie/FlagKit/master/Assets/PNG/PL.png) Polish
* ![](https://raw.githubusercontent.com/madebybowtie/FlagKit/master/Assets/PNG/FI.png) Finnish
* ![](https://raw.githubusercontent.com/madebybowtie/FlagKit/master/Assets/PNG/RO.png) Romanian
* ![](https://raw.githubusercontent.com/madebybowtie/FlagKit/master/Assets/PNG/HU.png) Hungarian
* ![](https://raw.githubusercontent.com/madebybowtie/FlagKit/master/Assets/PNG/RU.png) Russian
* ![](https://raw.githubusercontent.com/madebybowtie/FlagKit/master/Assets/PNG/NO.png) Norwegian
* ![](https://raw.githubusercontent.com/madebybowtie/FlagKit/master/Assets/PNG/SE.png) Swedish
* ![](https://raw.githubusercontent.com/madebybowtie/FlagKit/master/Assets/PNG/TR.png) Turkish
* ![](https://raw.githubusercontent.com/madebybowtie/FlagKit/master/Assets/PNG/JP.png) Japanese
* ![](https://raw.githubusercontent.com/madebybowtie/FlagKit/master/Assets/PNG/TH.png) Thai
* ![](https://raw.githubusercontent.com/madebybowtie/FlagKit/master/Assets/PNG/IQ.png) Arabic
* ![](https://raw.githubusercontent.com/madebybowtie/FlagKit/master/Assets/PNG/CN.png) Chinese<sup>1</sup>
* ![](https://raw.githubusercontent.com/madebybowtie/FlagKit/master/Assets/PNG/VN.png) Vietnamese
* ![](https://raw.githubusercontent.com/madebybowtie/FlagKit/master/Assets/PNG/IN.png) Sanskrit
* ![](https://raw.githubusercontent.com/madebybowtie/FlagKit/master/Assets/PNG/IN.png) Kannada
* ![](https://raw.githubusercontent.com/madebybowtie/FlagKit/master/Assets/PNG/IN.png) Telugu
* ![](https://raw.githubusercontent.com/madebybowtie/FlagKit/master/Assets/PNG/IN.png) Hindi
* ![](https://raw.githubusercontent.com/madebybowtie/FlagKit/master/Assets/PNG/IN.png) Tamil
* ![](https://raw.githubusercontent.com/madebybowtie/FlagKit/master/Assets/PNG/KR.png) Korean
* ![](https://raw.githubusercontent.com/madebybowtie/FlagKit/master/Assets/PNG/AM.png) Armenian
* ![](https://raw.githubusercontent.com/madebybowtie/FlagKit/master/Assets/PNG/IL.png) Hebrew
* ![](https://raw.githubusercontent.com/madebybowtie/FlagKit/master/Assets/PNG/GR.png) Greek

→ [Contribute a new language](CONTRIBUTING.md)

---

<sup>1</sup> Chinese tokenization uses `Intl.Segmenter` with CJK bigrams by default, which works in modern browsers and Node.js without native dependencies. In Node.js, if `@node-rs/jieba` is installed, Lunr Languages uses it automatically for higher-quality Jieba segmentation. Browsers must support `Intl.Segmenter`; there is no frontend fallback.

<sup>2</sup> Spanish includes an opt-in `lunr.es.accentFold` pipeline function for Lunr 2 indexes that should match user queries with omitted accents, such as `respiracion` matching `Respiración`, without replacing the default Spanish stemmer.

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
npm install lunr-languages
```

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

For Spanish indexes on Lunr 2, you can opt into accent-insensitive matching by expanding accented tokens before stemming:

```js
require('lunr-languages/lunr.stemmer.support')(lunr);
require('lunr-languages/lunr.es')(lunr);

var idx = lunr(function () {
  this.use(lunr.es);
  this.pipeline.before(lunr.es.stemmer, lunr.es.accentFold);
  this.searchPipeline.before(lunr.es.stemmer, lunr.es.accentFold);

  this.field('body');
  this.add({ id: 1, body: 'Respiración' });
});
```

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

## Chinese Tokenization

Chinese support is designed to work without mandatory native binaries:

* In browsers, `lunr.zh` uses `Intl.Segmenter` plus CJK bigrams. If `Intl.Segmenter` is unavailable, it logs an error and throws because there is no bundled browser fallback.
* In Node.js, `lunr.zh` first tries to load `@node-rs/jieba`. If it is installed, it is used for better Chinese segmentation. If it is not installed, Lunr Languages logs an informational message and falls back to `Intl.Segmenter` plus CJK bigrams.
* If neither `@node-rs/jieba` nor `Intl.Segmenter` is available in Node.js, Chinese tokenization logs an error and throws.

The `Intl.Segmenter` fallback avoids native package supply-chain risk and works well for lightweight search, but it is not identical to Jieba. Bigrams improve recall for common two-character search terms such as `车主` and `学姐`, while Jieba generally provides better precision and ranking for serious Chinese search.

To opt into Jieba tokenization in Node.js:

```bash
npm install @node-rs/jieba
```

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
