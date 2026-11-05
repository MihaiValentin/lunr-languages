# Changelog

## 2.0.0 (unreleased)

### All languages

- Requires lunr 2 (`lunr@^2.0.0`); lunr 0.x and 1.x stay on lunr-languages 1.x.
- `lunr.stemmerSupport.Among` and `lunr.stemmerSupport.SnowballProgram`, the Snowball 0.3 runtime of 1.x, are removed. Stemmers extend `lunr.stemmerSupport.BaseStemmer` (Snowball 3.x) now.

### Danish (da)

- Stemmer: Snowball 3.2.0 instead of a port of the 2010 stemmer; stems change.

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

### French (fr)

- Stop words: Snowball's current list (154 words, was 163); adds `cela`, drops `as`, `aura`, `auras`, `avions`, `est`, `fût`, `son`, `sommes`, `été`, `étés`.
- Stemmer: Snowball 3.2.0 instead of a port of the 2010 stemmer; stems change.
- Accent folding on by default: each word is indexed as written and accent-free (`rivière`, `riviere`), so searches with and without accents find it, wildcards too. Replaces 1.x's folding before the stemmer, which indexed only the accent-free form. Opt-out: remove `lunr.fr.accentFold` from both pipelines.

### German (de)

- Stemmer: Snowball 3.2.0 instead of a port of the 2010 stemmer; stems change. It treats `ae`, `oe`, `ue` like `ä`, `ö`, `ü` (Snowball 3.0.0's german2), so `Kaese` and `Käse` share a stem.
- Wildcard terms are folded by a map derived from the stemmer instead of a hand-written one; it also folds `ae`, `oe`, `ue`.

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

### Norwegian (no)

- Stemmer: Snowball 3.2.0 instead of a port of the 2010 stemmer; stems change.

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

### Russian (ru)

- Stop words: Snowball's list (159 words) instead of a custom 421-word list.
- Stemmer: Snowball 3.2.0 instead of a port of the 2010 stemmer; stems change.
- Wildcard terms are folded like the stemmer folds the index (`ё` as `е`).
- Stop words: Snowball's 159 plus 197 function words of the 1.x list that Snowball's lacks (356); the 1.x list's typos, single letters, content words (`год`, `время`, `люди`, …) and numbers 4–20 and ordinals are left out.

### Spanish (es)

- Stemmer: Snowball 3.2.0 instead of a port of the 2010 stemmer; stems change. It also removes unaccented suffixes (`respiracion` → `respir`, like `respiración`).
- Wildcard terms are folded like the stemmer folds the index.
- Accent folding on by default (was opt-in): `respiracion` finds `Respiración`; `ñ` stays a letter of its own. Opt-out: remove `lunr.es.accentFold` from both pipelines.

### Swedish (sv)

- Stop words: Snowball's current list; `sitt` instead of `sitta`.
- Stemmer: Snowball 3.2.0 instead of a port of the 2010 stemmer; stems change.

### Turkish (tr)

- Stemmer: Snowball 3.2.0 instead of a port of the 2010 stemmer; stems change.
- Wildcard terms are folded like the stemmer folds the index.
- Accent folding on by default: `kiz` finds `kız`, wildcards too (`ı` as `i`). Opt-out: remove `lunr.tr.accentFold` from both pipelines.
