# Contributing to Lunr Languages

## I found a bug

Thanks! Go to the *Issues* section and open a new issue. Please try to provide a detailed example describing the expected and actual outcome.

## I found a bug and have a fix for it

Even better! Open a *Pull request*. Make sure you include everything needed in the pull request (check below)

## I want to add a new language

Wonderful! Here are the changes you need to do, then Open a *Pull request*. Make sure you include everything needed in the pull request (check below)

- [ ] If [Snowball](https://snowballstem.org/algorithms/) has a stemmer for your language, add an entry to the list in `build/build.js`: `locale`, `snowball` (the algorithm's name), `stopWords` and `script` (the Unicode script of its letters). `npm run fetch-data` then fetches the stemmer and derives its wildcard map, and `npm run build` generates `lunr.<locale>.js` from `build/lunr.template`. The comment above the list describes every option.
- [ ] Otherwise, write `lunr.<locale>.js` by hand (copy a similar language) and add an entry with only `locale`; the build beautifies and minifies it.
- [ ] write stop words, word characters and stemming rules for text in Unicode NFC, the form all languages expect their input in; the test suite checks that every stop word is in NFC
- [ ] you must also test your new language
    - [ ] go to `test/testdata` and create a new file, then link it to `VersionsAndLanguagesTest.js`
    - [ ] make sure you cover many testcases (wildcard, stemming)
    - [ ] your tests will automatically be run on all the Lunr versions
- [ ] add the new language to `README.md`
- [ ] re-build the files (check section below)
- [ ] open a *Pull request*. Make sure you include everything needed in the pull request (check below)

# Pull request check-list

- [ ] Describe in detail **what you did** and **why you did it**
- [ ] Add tests. The more the better
    - [ ] with at least 1 scenario in case of a bug-fix and 4 scenarios in case of a new language
- [ ] Don't open a Pull request for more unrelated topics. _(eg a bug-fix, a new language, and few changes to stemming for existing languages in a single pull request)_

# Building your own files

The `lunr.<locale>.js` files are the result of a build process that concatenates a stemmer and a stop word list and add functionality to become lunr.js-compatible.
Should you decide to make mass-modifications (add stopwords, change stemming rules, reorganize the code) and build a new set of files, you should do follow these steps:

* `git clone https://github.com/MihaiValentin/lunr-languages.git`
* `cd path/to/lunr-languages`
* `npm install` to install the dependencies needed for building
* change the `build/*.template` files or the list in `build/build.js`
* run `node build/build.js` to generate the `lunr.<locale>.js` files (and the minified versions as well) and the `lunr.stemmer.support.js` file

## Snowball

`build/snowball/` holds the Snowball release lunr-languages is built from (stemmers, `base-stemmer.js`, its license and NEWS), so building needs no network. `npm run fetch-data` downloads it again from the pinned release (`build/fetch-snowball.js`: version and SHA-256) and caches Snowball's word lists in `build/cache/snowball-data/` (not committed). To update Snowball, change the pinned version and checksum, run it, and review the diff of `build/snowball/`.

A language's stop words are named in its entry of the list in `build/build.js`: `stopWords: { snowball: '<name>' }` for Snowball's list (fetched from snowball-website into `build/snowball/stopwords/`; Snowball names them by language, so `dutch_porter` would use `'dutch'`), or `stopWords: { custom: '<file>' }` for a comma-separated list in `build/stopwords-custom/`.
