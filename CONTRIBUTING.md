# Contributing to Lunr Languages

## I found a bug

Thanks! Go to the *Issues* section and open a new issue. Please try to provide a detailed example describing the expected and actual outcome.

## I found a bug and have a fix for it

Even better! Open a *Pull request*. Make sure you include everything needed in the pull request (check below)

## I want to add a new language

Wonderful! Here are the changes you need to do, then Open a *Pull request*. Make sure you include everything needed in the pull request (check below)

- [ ] except Japanese, all the `lunr.<language>.js` files are built from `build/lunr.template`
    - [ ] If `lunr.template` fits your needs in terms of code/template, go to `build/build.js` and add your language
        - [ ] You need a stemmer file
        - [ ] You need a stop words file
    - [ ] If `lunr.template` does not fit your needs (for example for non-latin characters), just copy any `lunr.<language>.js` file and start modifying
- [ ] write stop words, word characters and stemming rules for text in Unicode NFC, the form all languages expect their input in; the test suite checks that every stop word is in NFC
- [ ] you must also test your new language
    - [ ] go to `test/testdata` and create a new file, then link it to `test/tests/VersionsAndLanguagesTest.js`
    - [ ] make sure you cover many testcases (wildcard, stemming)
    - [ ] `npm test` runs the tests with every Lunr version listed in the `devDependencies` of `package.json` (`"lunr"` and aliases like `"lunr-2.3.5": "npm:lunr@2.3.5"`), as CI does; `npm run test:current` only with the current one. A test that depends on the Lunr version loops over `require('../lunr-versions').packages` and takes its Lunr from `fresh(name)` (see `test/tests/VersionsAndLanguagesTest.js`); any other test uses `fresh()`, the current version, and runs once. For a part of the tests, call `node --test` with its options before the files, e.g. `node --test --test-name-pattern=Thai test/tests/*Test.js` or `node --test test/tests/BuildTest.js` (`npm test -- <options>` doesn't work: npm puts them after the files, where `node --test` ignores them)
    - [ ] `test/tests/BuildTest.js` parses every shipped file as an ES2022 script without ES modules (no `import`, `export`, `import.meta` or `import()`), so the files keep loading with `<script>` and `require()`
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

* `git clone --recursive https://github.com/MihaiValentin/lunr-languages.git` (make sure you use the `--recursive` flag to also clone the repos needed to build `lunr-languages`)
* `cd path/to/lunr-languages`
* `npm ci` to install the dependencies needed for building, exactly as `package-lock.json` pins them, so the build reproduces the committed files (add a new dependency with `npm install <package>`)
* change the `build/*.template` files
* run `node build/build.js` to generate the `lunr.<locale>.js` files (and the minified versions as well) and the `lunr.stemmer.support.js` file

## wordcut

`wordcut.js` is built from the npm package wordcut, a devDependency pinned exactly in `package.json` (its integrity is in `package-lock.json`): `npm run build-wordcut` reads it from `node_modules`, wraps its `lib/*.js` modules unchanged with shims for `fs`, `path` and `glob` that serve the built-in dictionary, and writes its license to `licenses/`. wordcut's own dependencies are installed with it, but not bundled. To update wordcut, change its version in `package.json`, run `npm install`, `npm run build-wordcut` and the Thai tests.
