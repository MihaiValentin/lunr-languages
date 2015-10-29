Lunr languages [![npm](https://img.shields.io/npm/v/lunr-languages.svg)](https://www.npmjs.com/package/lunr-languages) [![Bower](https://img.shields.io/bower/v/lunr-languages.svg)]()
==============

This project features a collection of languages stemmers and stopwords for [Lunr](http://lunrjs.com/) Javascript library (which currently only supports English).

The following languages are available:

* German
* French
* Spanish
* Italian
* Japanese
* Dutch
* Danish
* Portuguese
* Finnish
* Romanian
* Hungarian
* Russian
* Norwegian

# How to use

Lunr-languages supports AMD and CommonJS. Check out the examples below:

## In a web browser

The following example is for the German language (de).

Add the following JS files to the page:

```html
<script src="lunr.stemmer.support.js"></script>
<script src="lunr.de.js"></script>
```

then, use the language in when initializing lunr:

```javascript
var idx = lunr(function () {
    // use the language (de)
    this.use(lunr.de);
    // then, the normal lunr index initialization
    this.field('title', { boost: 10 });
    this.field('body');
});
```

That's it. Just add the documents and you're done. When searching, the language stemmer and stopwords list will be the one you used.

## In a web browser, with RequireJS

Add `require.js` to the page:

```html
<script src="lib/require.js"></script>
```

then, use the language in when initializing lunr:

```javascript
require(['lib/lunr.js', '../lunr.stemmer.support.js', '../lunr.de.js'], function(lunr, stemmerSupport, de) {
    // since the stemmerSupport and de add keys on the lunr object, we'll pass it as reference to them
    // in the end, we will only need lunr.
    stemmerSupport(lunr); // adds lunr.stemmerSupport
    de(lunr); // adds lunr.de key

    // at this point, lunr can be used
    var idx = lunr(function () {
        // use the language (de)
        this.use(lunr.de);
        // then, the normal lunr index initialization
        this.field('title', { boost: 10 })
        this.field('body')
    });
});
```

# With node.js

```javascript
var lunr = require('./lib/lunr.js');
require('./lunr.stemmer.support.js')(lunr);
require('./lunr.de.js')(lunr);

var idx = lunr(function () {
    // use the language (de)
    this.use(lunr.de);
    // then, the normal lunr index initialization
    this.field('title', { boost: 10 })
    this.field('body')
});
```

# Indexing multi-language content

If your documents are written in more than one language, you can enable multi-language indexing. This ensures every word is properly trimmed and stemmed, every stopword is removed, and no words are lost (indexing in just one language would remove words from every other one.)

```javascript
var lunr = require('./lib/lunr.js');
require('./lunr.stemmer.support.js')(lunr);
require('./lunr.ru.js')(lunr);
require('./lunr.multi.js')(lunr);

var idx = lunr(function () {
    this.use(lunr.multiLanguage('en', 'ru'));
    // then, the normal lunr index initialization
    // ...
});
```

You can combine any number of supported languages this way. The corresponding lunr language scripts must be loaded (English is built in).

If you serialize the index and load it in another script, you'll have to initialize the multi-language support in that script, too, like this:

```javascript
lunr.multiLanguage('en', 'ru');
var idx = lunr.Index.load(serializedIndex);
```

# Building your own files

The `lunr.<locale>.js` files are the result of a build process that concatenates a stemmer and a stop word list and add functionality to become lunr.js-compatible.
Should you decide to make mass-modifications (add stopwords, change stemming rules, reorganize the code) and build a new set of files, you should do follow these steps:

* `git clone --recursive git://github.com/MihaiValentin/lunr-languages.git` (make sure you use the `--recursive` flag to also clone the repos needed to build `lunr-languages`)
* `cd path/to/lunr-languages`
* `npm install` to install the dependencies needed for building
* change the `build/*.template` files
* run `node build/build.js` to generate the `lunr.<locale>.js` files (and the minified versions as well) and the `lunr.stemmer.support.js` file

# Technical details & Credits

I've created this project by compiling and wrapping stemmers toghether with stop words from various sources so they can be directly used with Lunr.

*   <https://github.com/fortnightlabs/snowball-js> (the stemmers for all languages, ported from snowball-js)
*   <https://github.com/brenes/stopwords-filter> (the stop words list for the other languages)
