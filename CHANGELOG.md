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

### Finnish (fi)

- Stop words: Snowball's current list; adds `joten`.
- Stemmer: Snowball 3.2.0 instead of a port of the 2010 stemmer; stems change.

### French (fr)

- Stop words: Snowball's current list (154 words, was 163); adds `cela`, drops `as`, `aura`, `auras`, `avions`, `est`, `fût`, `son`, `sommes`, `été`, `étés`.
- Stemmer: Snowball 3.2.0 instead of a port of the 2010 stemmer; stems change.

### German (de)

- Stemmer: Snowball 3.2.0 instead of a port of the 2010 stemmer; stems change. It treats `ae`, `oe`, `ue` like `ä`, `ö`, `ü` (Snowball 3.0.0's german2), so `Kaese` and `Käse` share a stem.
- Wildcard terms are folded by a map derived from the stemmer instead of a hand-written one; it also folds `ae`, `oe`, `ue`.

### Hungarian (hu)

- Stop words: Snowball's current list; `ő` instead of the mis-encoded `õ` (`elő`, `ők`, …), so these words are filtered now.
- Stemmer: Snowball 3.2.0 instead of a port of the 2010 stemmer; stems change.

### Italian (it)

- Stemmer: Snowball 3.2.0 instead of a port of the 2010 stemmer; stems change.
- Wildcard terms are folded like the stemmer folds the index (`é` as `è`, elisions like `d'`).

### Japanese (ja)

- The deprecated `jp` locale and its `stemmer-jp`, `trimmer-jp` and `stopWordFilter-jp` labels are removed; use `ja`.

### Norwegian (no)

- Stemmer: Snowball 3.2.0 instead of a port of the 2010 stemmer; stems change.

### Polish (pl)

- Stemmer: Snowball 3.2.0's Polish stemmer instead of a hand-written one; stems change.
- Wildcard terms are folded like the stemmer folds the index.

### Portuguese (pt)

- Stemmer: Snowball 3.2.0 instead of a port of the 2010 stemmer; stems change.

### Romanian (ro)

- Stemmer: Snowball 3.2.0 instead of a port of the 2010 stemmer; stems change.
- Wildcard terms are folded like the stemmer folds the index (`ş`, `ţ` as `ș`, `ț`).

### Russian (ru)

- Stop words: Snowball's list (159 words) instead of a custom 421-word list.
- Stemmer: Snowball 3.2.0 instead of a port of the 2010 stemmer; stems change.
- Wildcard terms are folded like the stemmer folds the index (`ё` as `е`).

### Spanish (es)

- Stemmer: Snowball 3.2.0 instead of a port of the 2010 stemmer; stems change. It also removes unaccented suffixes (`respiracion` → `respir`, like `respiración`).
- Wildcard terms are folded like the stemmer folds the index.

### Swedish (sv)

- Stop words: Snowball's current list; `sitt` instead of `sitta`.
- Stemmer: Snowball 3.2.0 instead of a port of the 2010 stemmer; stems change.

### Turkish (tr)

- Stemmer: Snowball 3.2.0 instead of a port of the 2010 stemmer; stems change.
- Wildcard terms are folded like the stemmer folds the index.
