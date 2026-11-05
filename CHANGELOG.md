# Changelog

## 2.0.0 (unreleased)

### All languages

- Requires lunr 2 (`lunr@^2.0.0`); lunr 0.x and 1.x stay on lunr-languages 1.x.

### Dutch (nl)

- The deprecated `du` locale is removed; use `nl`.

### Finnish (fi)

- Stop words: Snowball's current list; adds `joten`.

### French (fr)

- Stop words: Snowball's current list (154 words, was 163); adds `cela`, drops `as`, `aura`, `auras`, `avions`, `est`, `fût`, `son`, `sommes`, `été`, `étés`.

### Hungarian (hu)

- Stop words: Snowball's current list; `ő` instead of the mis-encoded `õ` (`elő`, `ők`, …), so these words are filtered now.

### Japanese (ja)

- The deprecated `jp` locale and its `stemmer-jp`, `trimmer-jp` and `stopWordFilter-jp` labels are removed; use `ja`.

### Russian (ru)

- Stop words: Snowball's list (159 words) instead of a custom 421-word list.

### Swedish (sv)

- Stop words: Snowball's current list; `sitt` instead of `sitta`.
