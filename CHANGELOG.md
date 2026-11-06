# Changelog

## 2.0.0 (unreleased)

### All languages

- Requires Node.js 22.12 or later (`engines`), the oldest Node.js version still supported.
- A word of only punctuation (`—`, `…`) is no longer indexed as an empty term: the trimmer leaves it out, like a stop word. The term counted toward the field's length, which lowered the score of fields with such words a little.
