/*!
 * Lunr languages, `Vietnamese` language
 * https://github.com/MihaiValentin/lunr-languages
 *
 * Copyright 2019, Bill Moyers
 * http://www.mozilla.org/MPL/
 */
/*!
 * The accent folding map is derived from CLDR's Latin-ASCII transform (release-49, https://cldr.unicode.org/),
 * Copyright © 2001-2026 Unicode, Inc., under the Unicode License V3 (licenses/Unicode-3.0.txt).
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
    lunr.vi = function() {
      this.pipeline.reset();
      this.pipeline.add(
        lunr.vi.trimmer,
        lunr.vi.stopWordFilter,
        lunr.vi.accentFold
      );

      // searched words are trimmed and accent folded like indexed ones (not stemmed with lunr's English stemmer)
      this.searchPipeline.reset();
      this.searchPipeline.add(lunr.vi.trimmer, lunr.vi.accentFold);
    };

    /* lunr trimmer function */
    lunr.vi.wordCharacters =
      "A-Za-z" +
      "\u0300\u0350" + // dấu huyền
      "\u0301\u0351" + // dấu sắc
      "\u0309" + // dấu hỏi
      "\u0323" + // dấu nặng
      "\u0303\u0343" + // dấu ngã
      "\u00C2\u00E2" + // Â
      "\u00CA\u00EA" + // Ê
      "\u00D4\u00F4" + // Ô
      "\u0102-\u0103" + // Ă
      "\u0110-\u0111" + // Đ
      "\u01A0-\u01A1" + // Ơ
      "\u01AF-\u01B0" + // Ư
      "\u00C0-\u00C3\u00C8-\u00CA\u00CC\u00CD\u00D2-\u00D5\u00D9\u00DA\u00DD" + // À Á Â Ã È É Ê Ì Í Ò Ó Ô Õ Ù Ú Ý
      "\u00E0-\u00E3\u00E8-\u00EA\u00EC\u00ED\u00F2-\u00F5\u00F9\u00FA\u00FD" + // à á â ã è é ê ì í ò ó ô õ ù ú ý
      "\u0128\u0129\u0168\u0169" + // Ĩ ĩ Ũ ũ
      "\u1EA0-\u1EF9"; // Ạ ạ … Ỹ ỹ, the composed letters with tone marks
    lunr.vi.trimmer = lunr.trimmerSupport.generateTrimmer(lunr.vi.wordCharacters);
    lunr.Pipeline.registerFunction(lunr.vi.trimmer, 'trimmer-vi');
    /* single-syllable function words from stopwords-iso/stopwords-vi (MIT, see THIRD-PARTY-NOTICES.md); lunr splits
     * Vietnamese at spaces, so a word of several syllables can't be a stop word, and syllables that are also
     * common content words (người, năm, có, một, từ, không) stay searchable */
    lunr.vi.stopWordFilter = lunr.generateStopWordFilter(('các những cái và hoặc nhưng mà nếu vì rằng tuy là thì được bị ' +
      'đã đang sẽ của với để này đó ấy cũng vẫn rất đều').split(' '));
    lunr.Pipeline.registerFunction(lunr.vi.stopWordFilter, 'stopWordFilter-vi');

    // build: accentFold

    /* accent folding: indexes the token and its folded form (map from CLDR Latin-ASCII, build/accent-fold.js) */
    lunr.vi.accentFold = lunr.stemmerSupport.generateAccentFold({
      "\u00E0": "a",
      "\u00E1": "a",
      "\u00E2": "a",
      "\u00E3": "a",
      "\u00E8": "e",
      "\u00E9": "e",
      "\u00EA": "e",
      "\u00EC": "i",
      "\u00ED": "i",
      "\u00F2": "o",
      "\u00F3": "o",
      "\u00F4": "o",
      "\u00F5": "o",
      "\u00F9": "u",
      "\u00FA": "u",
      "\u00FD": "y",
      "\u0103": "a",
      "\u0111": "d",
      "\u0129": "i",
      "\u0169": "u",
      "\u01A1": "o",
      "\u01B0": "u",
      "\u1EA1": "a",
      "\u1EA3": "a",
      "\u1EA5": "a",
      "\u1EA7": "a",
      "\u1EA9": "a",
      "\u1EAB": "a",
      "\u1EAD": "a",
      "\u1EAF": "a",
      "\u1EB1": "a",
      "\u1EB3": "a",
      "\u1EB5": "a",
      "\u1EB7": "a",
      "\u1EB9": "e",
      "\u1EBB": "e",
      "\u1EBD": "e",
      "\u1EBF": "e",
      "\u1EC1": "e",
      "\u1EC3": "e",
      "\u1EC5": "e",
      "\u1EC7": "e",
      "\u1EC9": "i",
      "\u1ECB": "i",
      "\u1ECD": "o",
      "\u1ECF": "o",
      "\u1ED1": "o",
      "\u1ED3": "o",
      "\u1ED5": "o",
      "\u1ED7": "o",
      "\u1ED9": "o",
      "\u1EDB": "o",
      "\u1EDD": "o",
      "\u1EDF": "o",
      "\u1EE1": "o",
      "\u1EE3": "o",
      "\u1EE5": "u",
      "\u1EE7": "u",
      "\u1EE9": "u",
      "\u1EEB": "u",
      "\u1EED": "u",
      "\u1EEF": "u",
      "\u1EF1": "u",
      "\u1EF3": "y",
      "\u1EF5": "y",
      "\u1EF7": "y",
      "\u1EF9": "y"
    });
    lunr.vi.accentFold.isDefault = true;
    lunr.Pipeline.registerFunction(lunr.vi.accentFold, "accentFold-vi");

    /* fold wildcard terms like the index in an index with lunr.vi.accentFold (no stemmer) */
    lunr.vi.wildcardNormalizer = lunr.stemmerSupport.generateWildcardNormalizer({}, {
      label: "accentFold-vi",
      accentFold: lunr.vi.accentFold.map,
      map: {}
    });
    lunr.vi.wildcardNormalizer.label = "wildcardNormalizer-vi";
    lunr.vi.wildcardNormalizer.pipelineFunctionLabel = "trimmer-vi";
    lunr.stemmerSupport.addQueryParserWildcardNormalizer(lunr, lunr.vi.wildcardNormalizer);
    // build: end accentFold
  };
}))