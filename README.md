Lunr languages
==============

This project features a collection of languages stemmers and stopwords for [Lunr](http://lunrjs.com/) Javascript library (which currently only supports English).

The following languages are available:

* German
* French
* Spanish
* Italian
* Dutch
* Danish
* Portuguese
* Finnish
* Romanian
* Hungarian
* Russian
* Norwegian

# How to use
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

# With node.js

```javascript
global.lunr = require('./lib/lunr.js');
require('./lunr.stemmer.support.js');
require('./lunr.de.js');

var idx = lunr(function () {
    // use the language (de)
    this.use(lunr.de);
    // then, the normal lunr index initialization
    this.field('title', { boost: 10 })
    this.field('body')
});
```

# Technical details & Credits

I've created this project by compiling and wrapping stemmers toghether with stop words from various sources so they can be directly used with Lunr.

*   <https://github.com/fortnightlabs/snowball-js> (the stemmers for all languages, ported from snowball-js)
*   <https://github.com/brenes/stopwords-filter> (the stop words list for the other languages)