# Changelog

## 2.0.0 (unreleased)

### All languages

- Requires lunr 2.3.5 or later (`lunr@^2.3.5`); older versions of lunr stay on lunr-languages 1.x.
- Requires Node.js 22.12 or later (`engines`), the oldest Node.js version still supported.
- A word of only punctuation (`—`, `…`) is no longer indexed as an empty term: the trimmer leaves it out, like a stop word. The term counted toward the field's length, which lowered the score of fields with such words a little.

### Dutch (nl)

- The deprecated `du` locale and its `stemmer-du`, `trimmer-du` and `stopWordFilter-du` labels are removed; use `nl`.
