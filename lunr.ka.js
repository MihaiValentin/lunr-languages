/*!
 * Lunr languages, `Georgian` language
 * https://github.com/turbobit/lunr-languages
 *
 * Copyright 2024, Imeda Bekaia
 * http://www.mozilla.org/MPL/
 */
/*!
 * based on
 * Snowball JavaScript Library v0.3
 * http://code.google.com/p/urim/
 * http://snowball.tartarus.org/
 *
 * Copyright 2010, Oleg Mazko
 * http://www.mozilla.org/MPL/
 */

/**
 * export the module via AMD, CommonJS or as a browser global
 * Export code from https://github.com/umdjs/umd/blob/master/returnExports.js
 */
;
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(factory)
  } else if (typeof exports === 'object') {
    /**
     * Node. Does not work with strict CommonJS, but
     * only CommonJS-like environments that support module.exports,
     * like Node.
     */
    module.exports = factory()
  } else {
    // Browser globals (root is window)
    factory()(root.lunr);
  }
}(this, function() {
  /**
   * Just return a value to define the module export.
   * This example returns an object, but the module
   * can return a function as the exported value.
   */
  return function(lunr) {
    /* throw error if lunr is not yet included */
    if ('undefined' === typeof lunr) {
      throw new Error('Lunr is not present. Please include / require Lunr before this script.');
    }

    /* throw error if lunr stemmer support is not yet included */
    if ('undefined' === typeof lunr.stemmerSupport) {
      throw new Error('Lunr stemmer support is not present. Please include / require Lunr stemmer support before this script.');
    }

    /* register specific locale function */
    lunr.ka = function() {
      this.pipeline.reset();
      this.pipeline.add(
        lunr.ka.trimmer,
        lunr.ka.stopWordFilter
      );
    };

    /* lunr trimmer function */
    // http://www.unicode.org/charts/
    lunr.ka.wordCharacters = "A-Za-z\xAA\xBA\xC0-\xD6\xD8-\xF6\xF8-\u1C90\u1C91-\u1C92\u1C93-\u1C94\u1C95-\u1C96\u1C97-\u1C98\u1C99-\u1C90\u1C9A-\u1C9B\u1C9C-\u1C9D\u1C9E-\u1C9F\u1CA0\u1CA1-\u1CA2\u1CA3-\u1CA4\u1CA5-\u1CA6\u1CA7-\u1CA8\u1CA9-\u1CAA\1CAB-\u1CAC\1CAD-\u1CAE\u1CAF-\u1CB0\";
    lunr.ka.trimmer = lunr.trimmerSupport.generateTrimmer(lunr.ka.wordCharacters);
    
    lunr.Pipeline.registerFunction(lunr.ka.trimmer, 'trimmer-ka');
    lunr.Pipeline.registerFunction(lunr.ka.stopWordFilter, 'stopWordFilter-ka');

    /* lunr stemmer function */
    lunr.ka.stemmer = (function() {

      return function(word) {
        // for lunr version 2
        if (typeof word.update === "function") {
          return word.update(function(word) {
            return word;
          })
        } else { // for lunr version <= 1
          return word;
        }
      }
    })();
    lunr.Pipeline.registerFunction(lunr.ka.stemmer, 'stemmer-ka');
  };
}))
