/*!
 * Lunr languages, `Polish` language
 * https://github.com/turbobit/lunr-languages
 *
 * Copyright 2023, Piotr Piechowicz
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
(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    // AMD. Register as an anonymous module.
    define(factory);
  } else if (typeof exports === "object") {
    /**
     * Node. Does not work with strict CommonJS, but
     * only CommonJS-like environments that support module.exports,
     * like Node.
     */
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    factory()(root.lunr);
  }
})(this, function () {
  /**
   * Just return a value to define the module export.
   * This example returns an object, but the module
   * can return a function as the exported value.
   */
  return function (lunr) {
    /* throw error if lunr is not yet included */
    if ("undefined" === typeof lunr) {
      throw new Error(
        "Lunr is not present. Please include / require Lunr before this script."
      );
    }

    /* throw error if lunr stemmer support is not yet included */
    if ("undefined" === typeof lunr.stemmerSupport) {
      throw new Error(
        "Lunr stemmer support is not present. Please include / require Lunr stemmer support before this script."
      );
    }

    /* register specific locale function */
    lunr.pl = function () {
      this.pipeline.reset();
      this.pipeline.add(lunr.pl.trimmer, lunr.pl.stopWordFilter);
    };

    /* lunr trimmer function */
    // http://www.unicode.org/charts/
    lunr.pl.wordCharacters =
      "[" +
      "A-Za-z" +
      "\u0100-\u017F" + // Latin Extended-A
      "]";

    lunr.pl.trimmer = lunr.trimmerSupport.generateTrimmer(
      lunr.pl.wordCharacters
    );

    lunr.Pipeline.registerFunction(lunr.pl.trimmer, "trimmer-pl");

    /* lunr stop word filter */
    // https://www.ranks.nl/stopwords/polish
    lunr.pl.stopWordFilter = lunr.generateStopWordFilter(
      `ach aj albo bardzo bez bo być ci cię ciebie co czy daleko dla dlaczego dlatego do dobrze dokąd dość dużo dwa dwaj dwie dwoje dziś dzisiaj gdyby gdzie go ich ile im inny ja ją jak jakby jaki je jeden jedna jedno jego jej jemu jeśli jest jestem jeżeli już każdy kiedy kierunku kto ku lub ma mają mam mi mną mnie moi mój moja moje może mu my na nam nami nas nasi nasz nasza nasze natychmiast nią nic nich nie niego niej niemu nigdy nim nimi niż obok od około on ona one oni ono owszem po pod ponieważ przed przedtem są sam sama się skąd tak taki tam ten to tobą tobie tu tutaj twoi twój twoja twoje ty wam wami was wasi wasz wasza wasze we więc wszystko wtedy wy żaden zawsze że`.split(
        " "
      )
    );
    lunr.Pipeline.registerFunction(lunr.pl.stopWordFilter, "stopWordFilter-pl");

    /* lunr stemmer function */
    lunr.pl.stemmer = (function () {
      return function (word) {
        // for lunr version 2
        if (typeof word.update === "function") {
          return word.update(function (word) {
            return word;
          });
        } else {
          // for lunr version <= 1
          return word;
        }
      };
    })();
    lunr.Pipeline.registerFunction(lunr.pl.stemmer, "stemmer-pl");
  };
});
