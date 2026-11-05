/*!
 * Lunr languages, `Thai` language
 * https://github.com/MihaiValentin/lunr-languages
 *
 * Copyright 2017, Keerati Thiwanruk
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
    lunr.th = function() {
      this.pipeline.reset();
      this.pipeline.add(
        /*lunr.th.stopWordFilter,*/
        lunr.th.trimmer
      );

      // Thai has no stemmer; searched words are trimmed like indexed ones (not stemmed with lunr's English stemmer)
      this.searchPipeline.reset();
      this.searchPipeline.add(lunr.th.trimmer);

      this.tokenizer = lunr.th.tokenizer;
    };

    /* lunr trimmer function */
    lunr.th.wordCharacters = "A-Za-z\u0e00-\u0e7f";
    lunr.th.trimmer = lunr.trimmerSupport.generateTrimmer(lunr.th.wordCharacters);
    lunr.Pipeline.registerFunction(lunr.th.trimmer, 'trimmer-th');

    /*
     * Thai is written without spaces between words: segmented with Intl.Segmenter (ICU's Thai dictionary),
     * or with wordcut when lunr.th.wordcut.js is loaded (before or after this file). Without both,
     * tokenizing throws.
     */
    lunr.th.tokenizer = lunr.stemmerSupport.generateSegmentingTokenizer('th', {
      intlLocale: 'th',
      missing: 'Thai tokenization needs Intl.Segmenter or lunr.th.wordcut.js. In runtimes without ' +
        'Intl.Segmenter, load lunr.th.wordcut.js.'
    });
    lunr.stemmerSupport.addTokenizer('th', lunr.th.tokenizer);
  };
}))