# Changelog

## 2.0.0 (unreleased)

### All languages

- Requires lunr 2.3.5 or later (`lunr@^2.3.5`); older versions of lunr stay on lunr-languages 1.x.
- Requires Node.js 22.12 or later (`engines`), the oldest Node.js version still supported.
- A word of only punctuation (`—`, `…`) is no longer indexed as an empty term: the trimmer leaves it out, like a stop word. The term counted toward the field's length, which lowered the score of fields with such words a little.
- The trimmers know the letters of Unicode 18.0 (was 8.0): letters added since in the Basic Multilingual Plane, like Latin Extended-D (`U+A7AE`…) and Cyrillic Extended-C (`U+1C80`…), are no longer cut off at the start or end of a word. Letters outside it (Latin Extended-F and -G, `U+10780`…, `U+1DF00`…; Cyrillic Extended-D, `U+1E030`…) are still cut off, as in 1.x: the trimmer works on UTF-16 code units.

### Dutch (nl)

- The deprecated `du` locale and its `stemmer-du`, `trimmer-du` and `stopWordFilter-du` labels are removed; use `nl`.

### Japanese (ja)

- The deprecated `jp` locale and its `stemmer-jp`, `trimmer-jp` and `stopWordFilter-jp` labels are removed; use `ja`.

### Thai (th)

- `wordcut.js` bundles wordcut 0.9.1 (was 0.8.1 from 2016) built from npm, without the unused glob, minimatch and assert code: 511 KB instead of 677 KB. It segments the test texts like 0.8.1 and creates no globals. Its LGPL-3.0 license ships in `licenses/`.
