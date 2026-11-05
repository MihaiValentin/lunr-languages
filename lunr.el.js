/*!
 * Lunr languages, `Greek` language
 * https://github.com/MihaiValentin/lunr-languages
 *
 * Copyright 2023, Panos Bariamis
 * http://www.mozilla.org/MPL/
 */
/*!
 * The stemmer is generated from greek.sbl by Snowball 3.2.0 (https://snowballstem.org/).
 *
 * Copyright (c) 2001, Dr Martin Porter
 * Copyright (c) 2004,2005, Richard Boulton
 * Copyright (c) 2013, Yoshiki Shibukawa
 * Copyright (c) 2006-2025, Olly Betts
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 *
 *   1. Redistributions of source code must retain the above copyright notice,
 *      this list of conditions and the following disclaimer.
 *   2. Redistributions in binary form must reproduce the above copyright notice,
 *      this list of conditions and the following disclaimer in the documentation
 *      and/or other materials provided with the distribution.
 *   3. Neither the name of the Snowball project nor the names of its contributors
 *      may be used to endorse or promote products derived from this software
 *      without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
 * ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
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
    lunr.el = function() {
      this.pipeline.reset();
      this.pipeline.add(
        lunr.el.trimmer,
        lunr.el.normalizer,
        lunr.el.stopWordFilter,
        lunr.el.stemmer
      );

      // every searched word is also trimmed and stemmed
      this.searchPipeline.reset();
      this.searchPipeline.add(
        lunr.el.trimmer,
        lunr.el.normalizer,
        lunr.el.stemmer
      )
    };

    /* lunr trimmer function */
    lunr.el.wordCharacters = "\u0370-\u0373\u0375-\u0377\u037A-\u037D\u037F\u0384\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03E1\u03F0-\u03FF\u1D26-\u1D2A\u1D5D-\u1D61\u1D66-\u1D6A\u1DBF\u1F00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FC4\u1FC6-\u1FD3\u1FD6-\u1FDB\u1FDD-\u1FEF\u1FF2-\u1FF4\u1FF6-\u1FFE\u2126\uAB65A-Za-z\xAA\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02B8\u02E0-\u02E4\u1D00-\u1D25\u1D2C-\u1D5C\u1D62-\u1D65\u1D6B-\u1D77\u1D79-\u1DBE\u1E00-\u1EFF\u2071\u207F\u2090-\u209C\u212A\u212B\u2132\u214E\u2160-\u2188\u2C60-\u2C7F\uA722-\uA787\uA78B-\uA7DC\uA7F1-\uA7FF\uAB30-\uAB5A\uAB5C-\uAB64\uAB66-\uAB69\uFB00-\uFB06\uFF21-\uFF3A\uFF41-\uFF5A";
    lunr.el.trimmer = lunr.trimmerSupport.generateTrimmer(lunr.el.wordCharacters);

    lunr.Pipeline.registerFunction(lunr.el.trimmer, 'trimmer-el');

    /* throw error if lunr stemmer support is older than this file */
    if ('function' !== typeof lunr.stemmerSupport.BaseStemmer) {
      throw new Error('Lunr stemmer support is outdated. Please update lunr.stemmer.support.js to the same version as this script.');
    }

    /* lunr stemmer function */
    lunr.el.stemmer = (function() {
      var BaseStemmer = lunr.stemmerSupport.BaseStemmer;

      /* greek-stemmer.js, generated by Snowball 3.2.0 */
      var Stemmer = (function() {
        // Generated from greek.sbl by Snowball 3.2.0 - https://snowballstem.org/

        // deno-lint-ignore-file ban-unused-ignore no-constant-condition no-empty prefer-const

        const a_0 = [
          ["", 25],
          ["\u0386", 1, 1],
          ["\u0388", 5, 2],
          ["\u0389", 7, 3],
          ["\u038A", 9, 4],
          ["\u038C", 15, 5],
          ["\u038E", 20, 6],
          ["\u038F", 24, 7],
          ["\u0390", 7, 8],
          ["\u0391", 1, 9],
          ["\u0392", 2, 10],
          ["\u0393", 3, 11],
          ["\u0394", 4, 12],
          ["\u0395", 5, 13],
          ["\u0396", 6, 14],
          ["\u0397", 7, 15],
          ["\u0398", 8, 16],
          ["\u0399", 9, 17],
          ["\u039A", 10, 18],
          ["\u039B", 11, 19],
          ["\u039C", 12, 20],
          ["\u039D", 13, 21],
          ["\u039E", 14, 22],
          ["\u039F", 15, 23],
          ["\u03A0", 16, 24],
          ["\u03A1", 17, 25],
          ["\u03A3", 18, 26],
          ["\u03A4", 19, 27],
          ["\u03A5", 20, 28],
          ["\u03A6", 21, 29],
          ["\u03A7", 22, 30],
          ["\u03A8", 23, 31],
          ["\u03A9", 24, 32],
          ["\u03AA", 9, 33],
          ["\u03AB", 20, 34],
          ["\u03AC", 1, 35],
          ["\u03AD", 5, 36],
          ["\u03AE", 7, 37],
          ["\u03AF", 9, 38],
          ["\u03B0", 20, 39],
          ["\u03C2", 18, 40],
          ["\u03CA", 7, 41],
          ["\u03CB", 20, 42],
          ["\u03CC", 15, 43],
          ["\u03CD", 20, 44],
          ["\u03CE", 24, 45]
        ];

        const a_1 = [
          ["\u03C3\u03BA\u03B1\u03B3\u03B9\u03B1", 2],
          ["\u03C6\u03B1\u03B3\u03B9\u03B1", 1],
          ["\u03BF\u03BB\u03BF\u03B3\u03B9\u03B1", 3],
          ["\u03C3\u03BF\u03B3\u03B9\u03B1", 4],
          ["\u03C4\u03B1\u03C4\u03BF\u03B3\u03B9\u03B1", 5],
          ["\u03BA\u03C1\u03B5\u03B1\u03C4\u03B1", 6],
          ["\u03C0\u03B5\u03C1\u03B1\u03C4\u03B1", 7],
          ["\u03C4\u03B5\u03C1\u03B1\u03C4\u03B1", 8],
          ["\u03B3\u03B5\u03B3\u03BF\u03BD\u03BF\u03C4\u03B1", 11],
          ["\u03BA\u03B1\u03B8\u03B5\u03C3\u03C4\u03C9\u03C4\u03B1", 10],
          ["\u03C6\u03C9\u03C4\u03B1", 9],
          ["\u03C0\u03B5\u03C1\u03B1\u03C4\u03B7", 7],
          ["\u03C3\u03BA\u03B1\u03B3\u03B9\u03C9\u03BD", 2],
          ["\u03C6\u03B1\u03B3\u03B9\u03C9\u03BD", 1],
          ["\u03BF\u03BB\u03BF\u03B3\u03B9\u03C9\u03BD", 3],
          ["\u03C3\u03BF\u03B3\u03B9\u03C9\u03BD", 4],
          ["\u03C4\u03B1\u03C4\u03BF\u03B3\u03B9\u03C9\u03BD", 5],
          ["\u03BA\u03C1\u03B5\u03B1\u03C4\u03C9\u03BD", 6],
          ["\u03C0\u03B5\u03C1\u03B1\u03C4\u03C9\u03BD", 7],
          ["\u03C4\u03B5\u03C1\u03B1\u03C4\u03C9\u03BD", 8],
          ["\u03B3\u03B5\u03B3\u03BF\u03BD\u03BF\u03C4\u03C9\u03BD", 11],
          ["\u03BA\u03B1\u03B8\u03B5\u03C3\u03C4\u03C9\u03C4\u03C9\u03BD", 10],
          ["\u03C6\u03C9\u03C4\u03C9\u03BD", 9],
          ["\u03BA\u03C1\u03B5\u03B1\u03C3", 6],
          ["\u03C0\u03B5\u03C1\u03B1\u03C3", 7],
          ["\u03C4\u03B5\u03C1\u03B1\u03C3", 8],
          ["\u03B3\u03B5\u03B3\u03BF\u03BD\u03BF\u03C3", 11],
          ["\u03BA\u03C1\u03B5\u03B1\u03C4\u03BF\u03C3", 6],
          ["\u03C0\u03B5\u03C1\u03B1\u03C4\u03BF\u03C3", 7],
          ["\u03C4\u03B5\u03C1\u03B1\u03C4\u03BF\u03C3", 8],
          ["\u03B3\u03B5\u03B3\u03BF\u03BD\u03BF\u03C4\u03BF\u03C3", 11],
          ["\u03BA\u03B1\u03B8\u03B5\u03C3\u03C4\u03C9\u03C4\u03BF\u03C3", 10],
          ["\u03C6\u03C9\u03C4\u03BF\u03C3", 9],
          ["\u03BA\u03B1\u03B8\u03B5\u03C3\u03C4\u03C9\u03C3", 10],
          ["\u03C6\u03C9\u03C3", 9],
          ["\u03C3\u03BA\u03B1\u03B3\u03B9\u03BF\u03C5", 2],
          ["\u03C6\u03B1\u03B3\u03B9\u03BF\u03C5", 1],
          ["\u03BF\u03BB\u03BF\u03B3\u03B9\u03BF\u03C5", 3],
          ["\u03C3\u03BF\u03B3\u03B9\u03BF\u03C5", 4],
          ["\u03C4\u03B1\u03C4\u03BF\u03B3\u03B9\u03BF\u03C5", 5]
        ];

        const /**@type {Array<string>}*/ as_1 = ["\u03C6\u03B1", "\u03C3\u03BA\u03B1", "\u03BF\u03BB\u03BF", "\u03C3\u03BF", "\u03C4\u03B1\u03C4\u03BF", "\u03BA\u03C1\u03B5", "\u03C0\u03B5\u03C1", "\u03C4\u03B5\u03C1", "\u03C6\u03C9", "\u03BA\u03B1\u03B8\u03B5\u03C3\u03C4", "\u03B3\u03B5\u03B3\u03BF\u03BD"];

        const a_2 = [
          ["\u03C0\u03B1", 1],
          ["\u03BE\u03B1\u03BD\u03B1\u03C0\u03B1", 1, 1],
          ["\u03B5\u03C0\u03B1", 1, 2],
          ["\u03C0\u03B5\u03C1\u03B9\u03C0\u03B1", 1, 3],
          ["\u03B1\u03BD\u03B1\u03BC\u03C0\u03B1", 1, 4],
          ["\u03B5\u03BC\u03C0\u03B1", 1, 5],
          ["\u03B2", 2],
          ["\u03B4\u03B1\u03BD\u03B5", 1],
          ["\u03B2\u03B1\u03B8\u03C5\u03C1\u03B9", 2],
          ["\u03B2\u03B1\u03C1\u03BA", 2],
          ["\u03BC\u03B1\u03C1\u03BA", 2],
          ["\u03BB", 2],
          ["\u03BC", 2],
          ["\u03BA\u03BF\u03C1\u03BD", 2],
          ["\u03B1\u03B8\u03C1\u03BF", 1],
          ["\u03C3\u03C5\u03BD\u03B1\u03B8\u03C1\u03BF", 1, 1],
          ["\u03C0", 2],
          ["\u03B9\u03BC\u03C0", 2, 1],
          ["\u03C1", 2],
          ["\u03BC\u03B1\u03C1", 2, 1],
          ["\u03B1\u03BC\u03C0\u03B1\u03C1", 2, 2],
          ["\u03B3\u03BA\u03C1", 2, 3],
          ["\u03B2\u03BF\u03BB\u03B2\u03BF\u03C1", 2, 4],
          ["\u03B3\u03BB\u03C5\u03BA\u03BF\u03C1", 2, 5],
          ["\u03C0\u03B9\u03C0\u03B5\u03C1\u03BF\u03C1", 2, 6],
          ["\u03C0\u03C1", 2, 7],
          ["\u03BC\u03C0\u03C1", 2, 1],
          ["\u03B1\u03C1\u03C1", 2, 9],
          ["\u03B3\u03BB\u03C5\u03BA\u03C5\u03C1", 2, 10],
          ["\u03C0\u03BF\u03BB\u03C5\u03C1", 2, 11],
          ["\u03BB\u03BF\u03C5", 2]
        ];

        const /**@type {Array<string>}*/ as_2 = ["\u03B9", "\u03B9\u03B6"];

        const a_3 = [
          ["\u03B9\u03B6\u03B1", 1],
          ["\u03B9\u03B6\u03B5", 1],
          ["\u03B9\u03B6\u03B1\u03BC\u03B5", 1],
          ["\u03B9\u03B6\u03BF\u03C5\u03BC\u03B5", 1],
          ["\u03B9\u03B6\u03B1\u03BD\u03B5", 1],
          ["\u03B9\u03B6\u03BF\u03C5\u03BD\u03B5", 1],
          ["\u03B9\u03B6\u03B1\u03C4\u03B5", 1],
          ["\u03B9\u03B6\u03B5\u03C4\u03B5", 1],
          ["\u03B9\u03B6\u03B5\u03B9", 1],
          ["\u03B9\u03B6\u03B1\u03BD", 1],
          ["\u03B9\u03B6\u03BF\u03C5\u03BD", 1],
          ["\u03B9\u03B6\u03B5\u03C3", 1],
          ["\u03B9\u03B6\u03B5\u03B9\u03C3", 1],
          ["\u03B9\u03B6\u03C9", 1]
        ];

        const a_4 = [
          ["\u03B2\u03B9", 1],
          ["\u03BB\u03B9", 1],
          ["\u03B1\u03BB", 1],
          ["\u03B5\u03BD", 1],
          ["\u03C3", 1],
          ["\u03C7", 1],
          ["\u03C5\u03C8", 1],
          ["\u03B6\u03C9", 1]
        ];

        const a_5 = [
          ["\u03C9\u03B8\u03B7\u03BA\u03B1", 1],
          ["\u03C9\u03B8\u03B7\u03BA\u03B5", 1],
          ["\u03C9\u03B8\u03B7\u03BA\u03B1\u03BC\u03B5", 1],
          ["\u03C9\u03B8\u03B7\u03BA\u03B1\u03BD\u03B5", 1],
          ["\u03C9\u03B8\u03B7\u03BA\u03B1\u03C4\u03B5", 1],
          ["\u03C9\u03B8\u03B7\u03BA\u03B1\u03BD", 1],
          ["\u03C9\u03B8\u03B7\u03BA\u03B5\u03C3", 1]
        ];

        const a_6 = [
          ["\u03BE\u03B1\u03BD\u03B1\u03C0\u03B1", 1],
          ["\u03B5\u03C0\u03B1", 1],
          ["\u03C0\u03B5\u03C1\u03B9\u03C0\u03B1", 1],
          ["\u03B1\u03BD\u03B1\u03BC\u03C0\u03B1", 1],
          ["\u03B5\u03BC\u03C0\u03B1", 1],
          ["\u03C7\u03B1\u03C1\u03C4\u03BF\u03C0\u03B1", 1],
          ["\u03B5\u03BE\u03B1\u03C1\u03C7\u03B1", 1],
          ["\u03B3\u03B5", 2],
          ["\u03B3\u03BA\u03B5", 2],
          ["\u03BA\u03BB\u03B5", 1],
          ["\u03B5\u03BA\u03BB\u03B5", 1, 1],
          ["\u03B1\u03C0\u03B5\u03BA\u03BB\u03B5", 1, 1],
          ["\u03B1\u03C0\u03BF\u03BA\u03BB\u03B5", 1, 3],
          ["\u03B5\u03C3\u03C9\u03BA\u03BB\u03B5", 1, 4],
          ["\u03B4\u03B1\u03BD\u03B5", 1],
          ["\u03C0\u03B5", 1],
          ["\u03B5\u03C0\u03B5", 1, 1],
          ["\u03BC\u03B5\u03C4\u03B5\u03C0\u03B5", 1, 1],
          ["\u03B5\u03C3\u03B5", 1],
          ["\u03B3\u03BA", 2],
          ["\u03BC", 2],
          ["\u03C0\u03BF\u03C5\u03BA\u03B1\u03BC", 2, 1],
          ["\u03BA\u03BF\u03BC", 2, 2],
          ["\u03B1\u03BD", 2],
          ["\u03BF\u03BB\u03BF", 2],
          ["\u03B1\u03B8\u03C1\u03BF", 1],
          ["\u03C3\u03C5\u03BD\u03B1\u03B8\u03C1\u03BF", 1, 1],
          ["\u03C0", 2],
          ["\u03BB\u03B1\u03C1", 2],
          ["\u03B4\u03B7\u03BC\u03BF\u03BA\u03C1\u03B1\u03C4", 2],
          ["\u03B1\u03C6", 2],
          ["\u03B3\u03B9\u03B3\u03B1\u03BD\u03C4\u03BF\u03B1\u03C6", 2, 1]
        ];

        const /**@type {Array<string>}*/ as_6 = ["\u03B9", "\u03B9\u03C3"];

        const a_7 = [
          ["\u03B9\u03C3\u03B1", 1],
          ["\u03B9\u03C3\u03B1\u03BC\u03B5", 1],
          ["\u03B9\u03C3\u03B1\u03BD\u03B5", 1],
          ["\u03B9\u03C3\u03B5", 1],
          ["\u03B9\u03C3\u03B1\u03C4\u03B5", 1],
          ["\u03B9\u03C3\u03B1\u03BD", 1],
          ["\u03B9\u03C3\u03B5\u03C3", 1]
        ];

        const a_8 = [
          ["\u03BE\u03B1\u03BD\u03B1\u03C0\u03B1", 1],
          ["\u03B5\u03C0\u03B1", 1],
          ["\u03C0\u03B5\u03C1\u03B9\u03C0\u03B1", 1],
          ["\u03B1\u03BD\u03B1\u03BC\u03C0\u03B1", 1],
          ["\u03B5\u03BC\u03C0\u03B1", 1],
          ["\u03C7\u03B1\u03C1\u03C4\u03BF\u03C0\u03B1", 1],
          ["\u03B5\u03BE\u03B1\u03C1\u03C7\u03B1", 1],
          ["\u03BA\u03BB\u03B5", 1],
          ["\u03B5\u03BA\u03BB\u03B5", 1, 1],
          ["\u03B1\u03C0\u03B5\u03BA\u03BB\u03B5", 1, 1],
          ["\u03B1\u03C0\u03BF\u03BA\u03BB\u03B5", 1, 3],
          ["\u03B5\u03C3\u03C9\u03BA\u03BB\u03B5", 1, 4],
          ["\u03B4\u03B1\u03BD\u03B5", 1],
          ["\u03C0\u03B5", 1],
          ["\u03B5\u03C0\u03B5", 1, 1],
          ["\u03BC\u03B5\u03C4\u03B5\u03C0\u03B5", 1, 1],
          ["\u03B5\u03C3\u03B5", 1],
          ["\u03B1\u03B8\u03C1\u03BF", 1],
          ["\u03C3\u03C5\u03BD\u03B1\u03B8\u03C1\u03BF", 1, 1]
        ];

        const a_9 = [
          ["\u03B9\u03C3\u03BF\u03C5\u03BC\u03B5", 1],
          ["\u03B9\u03C3\u03BF\u03C5\u03BD\u03B5", 1],
          ["\u03B9\u03C3\u03B5\u03C4\u03B5", 1],
          ["\u03B9\u03C3\u03B5\u03B9", 1],
          ["\u03B9\u03C3\u03BF\u03C5\u03BD", 1],
          ["\u03B9\u03C3\u03B5\u03B9\u03C3", 1],
          ["\u03B9\u03C3\u03C9", 1]
        ];

        const a_10 = [
          ["\u03B1\u03C4\u03B1", 2],
          ["\u03C6\u03B1", 2],
          ["\u03B7\u03C6\u03B1", 2, 1],
          ["\u03BC\u03B5\u03B3", 2],
          ["\u03BB\u03C5\u03B3", 2],
          ["\u03B7\u03B4", 2],
          ["\u03BA\u03BB\u03B5", 1],
          ["\u03B5\u03C3\u03C9\u03BA\u03BB\u03B5", 1, 1],
          ["\u03C0\u03BB\u03B5", 1],
          ["\u03B4\u03B1\u03BD\u03B5", 1],
          ["\u03C3\u03B5", 1],
          ["\u03B1\u03C3\u03B5", 1, 1],
          ["\u03BA\u03B1\u03B8", 2],
          ["\u03B5\u03C7\u03B8", 2],
          ["\u03BA\u03B1\u03BA", 2],
          ["\u03BC\u03B1\u03BA", 2],
          ["\u03C3\u03BA", 2],
          ["\u03C6\u03B9\u03BB", 2],
          ["\u03BA\u03C5\u03BB", 2],
          ["\u03BC", 2],
          ["\u03B3\u03B5\u03BC", 2, 1],
          ["\u03B1\u03C7\u03BD", 2],
          ["\u03C3\u03C5\u03BD\u03B1\u03B8\u03C1\u03BF", 1],
          ["\u03C0", 2],
          ["\u03B1\u03C0", 2, 1],
          ["\u03B5\u03BC\u03C0", 2, 2],
          ["\u03B5\u03C5\u03C0", 2, 3],
          ["\u03B1\u03C1", 2],
          ["\u03B1\u03BF\u03C1", 2],
          ["\u03B3\u03C5\u03C1", 2],
          ["\u03C7\u03C1", 2],
          ["\u03C7\u03C9\u03C1", 2],
          ["\u03BA\u03C4", 2],
          ["\u03B1\u03BA\u03C4", 2, 1],
          ["\u03C7\u03C4", 2],
          ["\u03B1\u03C7\u03C4", 2, 1],
          ["\u03C4\u03B1\u03C7", 2],
          ["\u03C3\u03C7", 2],
          ["\u03B1\u03C3\u03C7", 2, 1],
          ["\u03C5\u03C8", 2]
        ];

        const /**@type {Array<string>}*/ as_10 = ["\u03B9", "\u03B9\u03C3\u03C4"];

        const a_11 = [
          ["\u03B9\u03C3\u03C4\u03B1", 1],
          ["\u03B9\u03C3\u03C4\u03B5", 1],
          ["\u03B9\u03C3\u03C4\u03B7", 1],
          ["\u03B9\u03C3\u03C4\u03BF\u03B9", 1],
          ["\u03B9\u03C3\u03C4\u03C9\u03BD", 1],
          ["\u03B9\u03C3\u03C4\u03BF", 1],
          ["\u03B9\u03C3\u03C4\u03B5\u03C3", 1],
          ["\u03B9\u03C3\u03C4\u03B7\u03C3", 1],
          ["\u03B9\u03C3\u03C4\u03BF\u03C3", 1],
          ["\u03B9\u03C3\u03C4\u03BF\u03C5\u03C3", 1],
          ["\u03B9\u03C3\u03C4\u03BF\u03C5", 1]
        ];

        const a_12 = [
          ["\u03B5\u03B3\u03BA\u03BB\u03B5", 1],
          ["\u03B1\u03C0\u03BF\u03BA\u03BB\u03B5", 1],
          ["\u03B4\u03B1\u03BD\u03B5", 2],
          ["\u03B1\u03BD\u03C4\u03B9\u03B4\u03B1\u03BD\u03B5", 2, 1],
          ["\u03C3\u03B5", 1],
          ["\u03BC\u03B5\u03C4\u03B1\u03C3\u03B5", 1, 1],
          ["\u03BC\u03B9\u03BA\u03C1\u03BF\u03C3\u03B5", 1, 2]
        ];

        const /**@type {Array<string>}*/ as_12 = ["\u03B9\u03C3\u03BC", "\u03B9"];

        const a_13 = [
          ["\u03B1\u03C4\u03BF\u03BC\u03B9\u03BA", 2],
          ["\u03B5\u03B8\u03BD\u03B9\u03BA", 4],
          ["\u03C4\u03BF\u03C0\u03B9\u03BA", 7],
          ["\u03B5\u03BA\u03BB\u03B5\u03BA\u03C4\u03B9\u03BA", 5],
          ["\u03C3\u03BA\u03B5\u03C0\u03C4\u03B9\u03BA", 6],
          ["\u03B3\u03BD\u03C9\u03C3\u03C4\u03B9\u03BA", 3],
          ["\u03B1\u03B3\u03BD\u03C9\u03C3\u03C4\u03B9\u03BA", 1, 1],
          ["\u03B1\u03BB\u03B5\u03BE\u03B1\u03BD\u03B4\u03C1\u03B9\u03BD", 8],
          ["\u03B8\u03B5\u03B1\u03C4\u03C1\u03B9\u03BD", 10],
          ["\u03B2\u03C5\u03B6\u03B1\u03BD\u03C4\u03B9\u03BD", 9]
        ];

        const /**@type {Array<string>}*/ as_13 = ["\u03B1\u03B3\u03BD\u03C9\u03C3\u03C4", "\u03B1\u03C4\u03BF\u03BC", "\u03B3\u03BD\u03C9\u03C3\u03C4", "\u03B5\u03B8\u03BD", "\u03B5\u03BA\u03BB\u03B5\u03BA\u03C4", "\u03C3\u03BA\u03B5\u03C0\u03C4", "\u03C4\u03BF\u03C0", "\u03B1\u03BB\u03B5\u03BE\u03B1\u03BD\u03B4\u03C1", "\u03B2\u03C5\u03B6\u03B1\u03BD\u03C4", "\u03B8\u03B5\u03B1\u03C4\u03C1"];

        const a_14 = [
          ["\u03B9\u03C3\u03BC\u03BF\u03B9", 1],
          ["\u03B9\u03C3\u03BC\u03C9\u03BD", 1],
          ["\u03B9\u03C3\u03BC\u03BF", 1],
          ["\u03B9\u03C3\u03BC\u03BF\u03C3", 1],
          ["\u03B9\u03C3\u03BC\u03BF\u03C5\u03C3", 1],
          ["\u03B9\u03C3\u03BC\u03BF\u03C5", 1]
        ];

        const a_15 = [
          ["\u03C3", 1],
          ["\u03C7", 1]
        ];

        const a_16 = [
          ["\u03BF\u03C5\u03B4\u03B1\u03BA\u03B9\u03B1", 1],
          ["\u03B1\u03C1\u03B1\u03BA\u03B9\u03B1", 1],
          ["\u03BF\u03C5\u03B4\u03B1\u03BA\u03B9", 1],
          ["\u03B1\u03C1\u03B1\u03BA\u03B9", 1]
        ];

        const a_17 = [
          ["\u03B2", 2],
          ["\u03B2\u03B1\u03BC\u03B2", 1, 1],
          ["\u03C3\u03BB\u03BF\u03B2", 1, 2],
          ["\u03C4\u03C3\u03B5\u03C7\u03BF\u03C3\u03BB\u03BF\u03B2", 1, 1],
          ["\u03BA\u03B1\u03C1\u03B4", 2],
          ["\u03B6", 2],
          ["\u03C4\u03B6", 1, 1],
          ["\u03BA", 1],
          ["\u03BA\u03B1\u03C0\u03B1\u03BA", 1, 1],
          ["\u03C3\u03BF\u03BA", 1, 2],
          ["\u03C3\u03BA", 1, 3],
          ["\u03B2\u03B1\u03BB", 2],
          ["\u03BC\u03B1\u03BB", 1],
          ["\u03B3\u03BB", 2],
          ["\u03C4\u03C1\u03B9\u03C0\u03BF\u03BB", 2],
          ["\u03C0\u03BB", 1],
          ["\u03BB\u03BF\u03C5\u03BB", 1],
          ["\u03C6\u03C5\u03BB", 1],
          ["\u03BA\u03B1\u03B9\u03BC", 1],
          ["\u03BA\u03BB\u03B9\u03BC", 1],
          ["\u03C6\u03B1\u03C1\u03BC", 1],
          ["\u03B3\u03B9\u03B1\u03BD", 2],
          ["\u03C3\u03C0\u03B1\u03BD", 1],
          ["\u03B7\u03B3\u03BF\u03C5\u03BC\u03B5\u03BD", 2],
          ["\u03BA\u03BF\u03BD", 1],
          ["\u03BC\u03B1\u03BA\u03C1\u03C5\u03BD", 2],
          ["\u03C0", 2],
          ["\u03BA\u03B1\u03C4\u03C1\u03B1\u03C0", 1, 1],
          ["\u03C1", 1],
          ["\u03B2\u03C1", 1, 1],
          ["\u03BB\u03B1\u03B2\u03C1", 1, 1],
          ["\u03B1\u03BC\u03B2\u03C1", 1, 2],
          ["\u03BC\u03B5\u03C1", 1, 4],
          ["\u03C0\u03B1\u03C4\u03B5\u03C1", 2, 5],
          ["\u03B1\u03BD\u03B8\u03C1", 1, 6],
          ["\u03BA\u03BF\u03C1", 1, 7],
          ["\u03C3", 1],
          ["\u03BD\u03B1\u03B3\u03BA\u03B1\u03C3", 1, 1],
          ["\u03C4\u03BF\u03C3", 2, 2],
          ["\u03BC\u03BF\u03C5\u03C3\u03C4", 1],
          ["\u03C1\u03C5", 1],
          ["\u03C6", 1],
          ["\u03C3\u03C6", 1, 1],
          ["\u03B1\u03BB\u03B9\u03C3\u03C6", 1, 1],
          ["\u03BD\u03C5\u03C6", 2, 3],
          ["\u03C7", 1]
        ];

        const /**@type {Array<string>}*/ as_17 = ["\u03B1\u03BA", "\u03B9\u03C4\u03C3"];

        const a_18 = [
          ["\u03B1\u03BA\u03B9\u03B1", 1],
          ["\u03B1\u03C1\u03B1\u03BA\u03B9\u03B1", 1, 1],
          ["\u03B9\u03C4\u03C3\u03B1", 1],
          ["\u03B1\u03BA\u03B9", 1],
          ["\u03B1\u03C1\u03B1\u03BA\u03B9", 1, 1],
          ["\u03B9\u03C4\u03C3\u03C9\u03BD", 1],
          ["\u03B9\u03C4\u03C3\u03B1\u03C3", 1],
          ["\u03B9\u03C4\u03C3\u03B5\u03C3", 1]
        ];

        const a_19 = [
          ["\u03C8\u03B1\u03BB", 1],
          ["\u03B1\u03B9\u03C6\u03BD", 1],
          ["\u03BF\u03BB\u03BF", 1],
          ["\u03B9\u03C1", 1]
        ];

        const a_20 = [
          ["\u03B5", 1],
          ["\u03C0\u03B1\u03B9\u03C7\u03BD", 1]
        ];

        const a_21 = [
          ["\u03B9\u03B4\u03B9\u03B1", 1],
          ["\u03B9\u03B4\u03B9\u03C9\u03BD", 1],
          ["\u03B9\u03B4\u03B9\u03BF", 1]
        ];

        const a_22 = [
          ["\u03B9\u03B2", 1],
          ["\u03B4", 1],
          ["\u03C6\u03C1\u03B1\u03B3\u03BA", 1],
          ["\u03BB\u03C5\u03BA", 1],
          ["\u03BF\u03B2\u03B5\u03BB", 1],
          ["\u03BC\u03B7\u03BD", 1],
          ["\u03C1", 1]
        ];

        const a_23 = [
          ["\u03B9\u03C3\u03BA\u03B5", 1],
          ["\u03B9\u03C3\u03BA\u03BF", 1],
          ["\u03B9\u03C3\u03BA\u03BF\u03C3", 1],
          ["\u03B9\u03C3\u03BA\u03BF\u03C5", 1]
        ];

        const a_24 = [
          ["\u03B1\u03B4\u03C9\u03BD", 1],
          ["\u03B1\u03B4\u03B5\u03C3", 1]
        ];

        const a_25 = [
          ["\u03B3\u03B9\u03B1\u03B3\u03B9", -1],
          ["\u03B8\u03B5\u03B9", -1],
          ["\u03BF\u03BA", -1],
          ["\u03BC\u03B1\u03BC", -1],
          ["\u03BC\u03B1\u03BD", -1],
          ["\u03BC\u03C0\u03B1\u03BC\u03C0", -1],
          ["\u03C0\u03B5\u03B8\u03B5\u03C1", -1],
          ["\u03C0\u03B1\u03C4\u03B5\u03C1", -1],
          ["\u03BA\u03C5\u03C1", -1],
          ["\u03BD\u03C4\u03B1\u03BD\u03C4", -1]
        ];

        const a_26 = [
          ["\u03B5\u03B4\u03C9\u03BD", 1],
          ["\u03B5\u03B4\u03B5\u03C3", 1]
        ];

        const a_27 = [
          ["\u03BC\u03B9\u03BB", 1],
          ["\u03B4\u03B1\u03C0", 1],
          ["\u03B3\u03B7\u03C0", 1],
          ["\u03B9\u03C0", 1],
          ["\u03B5\u03BC\u03C0", 1],
          ["\u03BF\u03C0", 1],
          ["\u03BA\u03C1\u03B1\u03C3\u03C0", 1],
          ["\u03C5\u03C0", 1]
        ];

        const a_28 = [
          ["\u03BF\u03C5\u03B4\u03C9\u03BD", 1],
          ["\u03BF\u03C5\u03B4\u03B5\u03C3", 1]
        ];

        const a_29 = [
          ["\u03C4\u03C1\u03B1\u03B3", 1],
          ["\u03C6\u03B5", 1],
          ["\u03BA\u03B1\u03BB\u03B9\u03B1\u03BA", 1],
          ["\u03B1\u03C1\u03BA", 1],
          ["\u03C3\u03BA", 1],
          ["\u03C0\u03B5\u03C4\u03B1\u03BB", 1],
          ["\u03B2\u03B5\u03BB", 1],
          ["\u03BB\u03BF\u03C5\u03BB", 1],
          ["\u03C6\u03BB", 1],
          ["\u03C7\u03BD", 1],
          ["\u03C0\u03BB\u03B5\u03BE", 1],
          ["\u03C3\u03C0", 1],
          ["\u03C6\u03C1", 1],
          ["\u03C3", 1],
          ["\u03BB\u03B9\u03C7", 1]
        ];

        const a_30 = [
          ["\u03B5\u03C9\u03BD", 1],
          ["\u03B5\u03C9\u03C3", 1]
        ];

        const a_31 = [
          ["\u03B4", 1],
          ["\u03B9\u03B4", 1, 1],
          ["\u03B8", 1],
          ["\u03B3\u03B1\u03BB", 1],
          ["\u03B5\u03BB", 1],
          ["\u03BD", 1],
          ["\u03C0", 1],
          ["\u03C0\u03B1\u03C1", 1]
        ];

        const a_32 = [
          ["\u03B9\u03B1", 1],
          ["\u03B9\u03C9\u03BD", 1],
          ["\u03B9\u03BF\u03C5", 1]
        ];

        const a_33 = [
          ["\u03B9\u03BA\u03B1", 1],
          ["\u03B9\u03BA\u03C9\u03BD", 1],
          ["\u03B9\u03BA\u03BF", 1],
          ["\u03B9\u03BA\u03BF\u03C5", 1]
        ];

        const a_34 = [
          ["\u03B1\u03B4", 1],
          ["\u03C3\u03C5\u03BD\u03B1\u03B4", 1, 1],
          ["\u03BA\u03B1\u03C4\u03B1\u03B4", 1, 2],
          ["\u03B1\u03BD\u03C4\u03B9\u03B4", 1],
          ["\u03B5\u03BD\u03B4", 1],
          ["\u03C6\u03C5\u03BB\u03BF\u03B4", 1],
          ["\u03C5\u03C0\u03BF\u03B4", 1],
          ["\u03C0\u03C1\u03C9\u03C4\u03BF\u03B4", 1],
          ["\u03B5\u03BE\u03C9\u03B4", 1],
          ["\u03B7\u03B8", 1],
          ["\u03B1\u03BD\u03B7\u03B8", 1, 1],
          ["\u03BE\u03B9\u03BA", 1],
          ["\u03B1\u03BB", 1],
          ["\u03B1\u03BC\u03BC\u03BF\u03C7\u03B1\u03BB", 1, 1],
          ["\u03C3\u03C5\u03BD\u03BF\u03BC\u03B7\u03BB", 1],
          ["\u03BC\u03C0\u03BF\u03BB", 1],
          ["\u03BC\u03BF\u03C5\u03BB", 1],
          ["\u03C4\u03C3\u03B1\u03BC", 1],
          ["\u03B2\u03C1\u03C9\u03BC", 1],
          ["\u03B1\u03BC\u03B1\u03BD", 1],
          ["\u03BC\u03C0\u03B1\u03BD", 1],
          ["\u03BA\u03B1\u03BB\u03BB\u03B9\u03BD", 1],
          ["\u03C0\u03BF\u03C3\u03C4\u03B5\u03BB\u03BD", 1],
          ["\u03C6\u03B9\u03BB\u03BF\u03BD", 1],
          ["\u03BA\u03B1\u03BB\u03C0", 1],
          ["\u03B3\u03B5\u03C1", 1],
          ["\u03C7\u03B1\u03C3", 1],
          ["\u03BC\u03C0\u03BF\u03C3", 1],
          ["\u03C0\u03BB\u03B9\u03B1\u03C4\u03C3", 1],
          ["\u03C0\u03B5\u03C4\u03C3", 1],
          ["\u03C0\u03B9\u03C4\u03C3", 1],
          ["\u03C6\u03C5\u03C3", 1],
          ["\u03BC\u03C0\u03B1\u03B3\u03B9\u03B1\u03C4", 1],
          ["\u03BD\u03B9\u03C4", 1],
          ["\u03C0\u03B9\u03BA\u03B1\u03BD\u03C4", 1],
          ["\u03C3\u03B5\u03C1\u03C4", 1]
        ];

        const a_35 = [
          ["\u03B1\u03B3\u03B1\u03BC\u03B5", 1],
          ["\u03B7\u03BA\u03B1\u03BC\u03B5", 1],
          ["\u03B7\u03B8\u03B7\u03BA\u03B1\u03BC\u03B5", 1, 1],
          ["\u03B7\u03C3\u03B1\u03BC\u03B5", 1],
          ["\u03BF\u03C5\u03C3\u03B1\u03BC\u03B5", 1]
        ];

        const a_36 = [
          ["\u03B2\u03BF\u03C5\u03B2", 1],
          ["\u03BE\u03B5\u03B8", 1],
          ["\u03C0\u03B5\u03B8", 1],
          ["\u03B1\u03C0\u03BF\u03B8", 1],
          ["\u03B1\u03C0\u03BF\u03BA", 1],
          ["\u03BF\u03C5\u03BB", 1],
          ["\u03B1\u03BD\u03B1\u03C0", 1],
          ["\u03C0\u03B9\u03BA\u03C1", 1],
          ["\u03C0\u03BF\u03C4", 1],
          ["\u03B1\u03C0\u03BF\u03C3\u03C4", 1],
          ["\u03C7", 1],
          ["\u03C3\u03B9\u03C7", 1, 1]
        ];

        const a_37 = [
          ["\u03C4\u03C1", 1],
          ["\u03C4\u03C3", 1]
        ];

        const a_38 = [
          ["\u03B1\u03B3\u03B1\u03BD\u03B5", 1],
          ["\u03B7\u03BA\u03B1\u03BD\u03B5", 1],
          ["\u03B7\u03B8\u03B7\u03BA\u03B1\u03BD\u03B5", 1, 1],
          ["\u03B7\u03C3\u03B1\u03BD\u03B5", 1],
          ["\u03BF\u03C5\u03C3\u03B1\u03BD\u03B5", 1],
          ["\u03BF\u03BD\u03C4\u03B1\u03BD\u03B5", 1],
          ["\u03B9\u03BF\u03BD\u03C4\u03B1\u03BD\u03B5", 1, 1],
          ["\u03BF\u03C5\u03BD\u03C4\u03B1\u03BD\u03B5", 1],
          ["\u03B9\u03BF\u03C5\u03BD\u03C4\u03B1\u03BD\u03B5", 1, 1],
          ["\u03BF\u03C4\u03B1\u03BD\u03B5", 1],
          ["\u03B9\u03BF\u03C4\u03B1\u03BD\u03B5", 1, 1]
        ];

        const a_39 = [
          ["\u03C4\u03B1\u03B2", 1],
          ["\u03BD\u03C4\u03B1\u03B2", 1, 1],
          ["\u03C8\u03B7\u03BB\u03BF\u03C4\u03B1\u03B2", 1, 2],
          ["\u03BB\u03B9\u03B2", 1],
          ["\u03BA\u03BB\u03B9\u03B2", 1, 1],
          ["\u03BE\u03B7\u03C1\u03BF\u03BA\u03BB\u03B9\u03B2", 1, 1],
          ["\u03B3", 1],
          ["\u03B1\u03B3", 1, 1],
          ["\u03C4\u03C1\u03B1\u03B3", 1, 1],
          ["\u03C4\u03C3\u03B1\u03B3", 1, 2],
          ["\u03B1\u03B8\u03B9\u03B3\u03B3", 1, 4],
          ["\u03C4\u03C3\u03B9\u03B3\u03B3", 1, 5],
          ["\u03B1\u03C4\u03C3\u03B9\u03B3\u03B3", 1, 1],
          ["\u03C3\u03C4\u03B5\u03B3", 1, 7],
          ["\u03B1\u03C0\u03B7\u03B3", 1, 8],
          ["\u03C3\u03B9\u03B3", 1, 9],
          ["\u03B1\u03BD\u03BF\u03C1\u03B3", 1, 10],
          ["\u03B5\u03BD\u03BF\u03C1\u03B3", 1, 11],
          ["\u03BA\u03B1\u03BB\u03C0\u03BF\u03C5\u03B6", 1],
          ["\u03B8", 1],
          ["\u03BC\u03C9\u03B1\u03BC\u03B5\u03B8", 1, 1],
          ["\u03C0\u03B9\u03B8", 1, 2],
          ["\u03B1\u03C0\u03B9\u03B8", 1, 1],
          ["\u03B4\u03B5\u03BA", 1],
          ["\u03C0\u03B5\u03BB\u03B5\u03BA", 1],
          ["\u03B9\u03BA", 1],
          ["\u03B1\u03BD\u03B9\u03BA", 1, 1],
          ["\u03B2\u03BF\u03C5\u03BB\u03BA", 1],
          ["\u03B2\u03B1\u03C3\u03BA", 1],
          ["\u03B2\u03C1\u03B1\u03C7\u03C5\u03BA", 1],
          ["\u03B3\u03B1\u03BB", 1],
          ["\u03BA\u03B1\u03C4\u03B1\u03B3\u03B1\u03BB", 1, 1],
          ["\u03BF\u03BB\u03BF\u03B3\u03B1\u03BB", 1, 2],
          ["\u03B2\u03B1\u03B8\u03C5\u03B3\u03B1\u03BB", 1, 3],
          ["\u03BC\u03B5\u03BB", 1],
          ["\u03BA\u03B1\u03C3\u03C4\u03B5\u03BB", 1],
          ["\u03C0\u03BF\u03C1\u03C4\u03BF\u03BB", 1],
          ["\u03C0\u03BB", 1],
          ["\u03B4\u03B9\u03C0\u03BB", 1, 1],
          ["\u03BB\u03B1\u03BF\u03C0\u03BB", 1, 2],
          ["\u03C8\u03C5\u03C7\u03BF\u03C0\u03BB", 1, 3],
          ["\u03BF\u03C5\u03BB", 1],
          ["\u03BC", 1],
          ["\u03BF\u03BB\u03B9\u03B3\u03BF\u03B4\u03B1\u03BC", 1, 1],
          ["\u03BC\u03BF\u03C5\u03C3\u03BF\u03C5\u03BB\u03BC", 1, 2],
          ["\u03B4\u03C1\u03B1\u03B4\u03BF\u03C5\u03BC", 1, 3],
          ["\u03B2\u03C1\u03B1\u03C7\u03BC", 1, 4],
          ["\u03BD", 1],
          ["\u03B1\u03BC\u03B5\u03C1\u03B9\u03BA\u03B1\u03BD", 1, 1],
          ["\u03C0", 1],
          ["\u03B1\u03B4\u03B1\u03C0", 1, 1],
          ["\u03C7\u03B1\u03BC\u03B7\u03BB\u03BF\u03B4\u03B1\u03C0", 1, 2],
          ["\u03C0\u03BF\u03BB\u03C5\u03B4\u03B1\u03C0", 1, 3],
          ["\u03BA\u03BF\u03C0", 1, 4],
          ["\u03C5\u03C0\u03BF\u03BA\u03BF\u03C0", 1, 1],
          ["\u03C4\u03C3\u03BF\u03C0", 1, 6],
          ["\u03C3\u03C0", 1, 7],
          ["\u03B5\u03C1", 1],
          ["\u03B3\u03B5\u03C1", 1, 1],
          ["\u03B2\u03B5\u03C4\u03B5\u03C1", 1, 2],
          ["\u03BB\u03BF\u03C5\u03B8\u03B7\u03C1", 1],
          ["\u03BA\u03BF\u03C1\u03BC\u03BF\u03C1", 1],
          ["\u03C0\u03B5\u03C1\u03B9\u03C4\u03C1", 1],
          ["\u03BF\u03C5\u03C1", 1],
          ["\u03C3", 1],
          ["\u03B2\u03B1\u03C3", 1, 1],
          ["\u03C0\u03BF\u03BB\u03B9\u03C3", 1, 2],
          ["\u03C3\u03B1\u03C1\u03B1\u03BA\u03B1\u03C4\u03C3", 1, 3],
          ["\u03B8\u03C5\u03C3", 1, 4],
          ["\u03B4\u03B9\u03B1\u03C4", 1],
          ["\u03C0\u03BB\u03B1\u03C4", 1],
          ["\u03C4\u03C3\u03B1\u03C1\u03BB\u03B1\u03C4", 1],
          ["\u03C4\u03B5\u03C4", 1],
          ["\u03C0\u03BF\u03C5\u03C1\u03B9\u03C4", 1],
          ["\u03C3\u03BF\u03C5\u03BB\u03C4", 1],
          ["\u03BC\u03B1\u03B9\u03BD\u03C4", 1],
          ["\u03B6\u03C9\u03BD\u03C4", 1],
          ["\u03BA\u03B1\u03C3\u03C4", 1],
          ["\u03C6", 1],
          ["\u03B4\u03B9\u03B1\u03C6", 1, 1],
          ["\u03C3\u03C4\u03B5\u03C6", 1, 2],
          ["\u03C6\u03C9\u03C4\u03BF\u03C3\u03C4\u03B5\u03C6", 1, 1],
          ["\u03C0\u03B5\u03C1\u03B7\u03C6", 1, 4],
          ["\u03C5\u03C0\u03B5\u03C1\u03B7\u03C6", 1, 1],
          ["\u03BA\u03BF\u03B9\u03BB\u03B1\u03C1\u03C6", 1, 6],
          ["\u03C0\u03B5\u03BD\u03C4\u03B1\u03C1\u03C6", 1, 7],
          ["\u03BF\u03C1\u03C6", 1, 8],
          ["\u03C7", 1],
          ["\u03B1\u03BC\u03B7\u03C7", 1, 1],
          ["\u03B2\u03B9\u03BF\u03BC\u03B7\u03C7", 1, 2],
          ["\u03BC\u03B5\u03B3\u03BB\u03BF\u03B2\u03B9\u03BF\u03BC\u03B7\u03C7", 1, 1],
          ["\u03BA\u03B1\u03C0\u03BD\u03BF\u03B2\u03B9\u03BF\u03BC\u03B7\u03C7", 1, 2],
          ["\u03BC\u03B9\u03BA\u03C1\u03BF\u03B2\u03B9\u03BF\u03BC\u03B7\u03C7", 1, 3],
          ["\u03C0\u03BF\u03BB\u03C5\u03BC\u03B7\u03C7", 1, 6],
          ["\u03BB\u03B9\u03C7", 1, 7]
        ];

        const a_40 = [
          ["\u03B5\u03BD\u03B4", 1],
          ["\u03C3\u03C5\u03BD\u03B4", 1],
          ["\u03BF\u03B4", 1],
          ["\u03B4\u03B9\u03B1\u03B8", 1],
          ["\u03BA\u03B1\u03B8", 1],
          ["\u03C1\u03B1\u03B8", 1],
          ["\u03C4\u03B1\u03B8", 1],
          ["\u03C4\u03B9\u03B8", 1],
          ["\u03B5\u03BA\u03B8", 1],
          ["\u03B5\u03BD\u03B8", 1],
          ["\u03C3\u03C5\u03BD\u03B8", 1],
          ["\u03C1\u03BF\u03B8", 1],
          ["\u03C5\u03C0\u03B5\u03C1\u03B8", 1],
          ["\u03C3\u03B8", 1],
          ["\u03B5\u03C5\u03B8", 1],
          ["\u03B1\u03C1\u03BA", 1],
          ["\u03C9\u03C6\u03B5\u03BB", 1],
          ["\u03B2\u03BF\u03BB", 1],
          ["\u03B1\u03B9\u03BD", 1],
          ["\u03C0\u03BF\u03BD", 1],
          ["\u03C1\u03BF\u03BD", 1],
          ["\u03C3\u03C5\u03BD", 1],
          ["\u03B2\u03B1\u03C1", 1],
          ["\u03B2\u03C1", 1],
          ["\u03B1\u03B9\u03C1", 1],
          ["\u03C6\u03BF\u03C1", 1],
          ["\u03B5\u03C5\u03C1", 1],
          ["\u03C0\u03C5\u03C1", 1],
          ["\u03C7\u03C9\u03C1", 1],
          ["\u03BD\u03B5\u03C4", 1],
          ["\u03C3\u03C7", 1]
        ];

        const a_41 = [
          ["\u03C0\u03B1\u03B3", 1],
          ["\u03B4", 1],
          ["\u03B1\u03B4", 1, 1],
          ["\u03B8", 1],
          ["\u03B1\u03B8", 1, 1],
          ["\u03C4\u03BF\u03BA", 1],
          ["\u03C3\u03BA", 1],
          ["\u03C0\u03B1\u03C1\u03B1\u03BA\u03B1\u03BB", 1],
          ["\u03C3\u03BA\u03B5\u03BB", 1],
          ["\u03B1\u03C0\u03BB", 1],
          ["\u03B5\u03BC", 1],
          ["\u03B1\u03BD", 1],
          ["\u03B2\u03B5\u03BD", 1],
          ["\u03B2\u03B1\u03C1\u03BF\u03BD", 1],
          ["\u03BA\u03BF\u03C0", 1],
          ["\u03C3\u03B5\u03C1\u03C0", 1],
          ["\u03B1\u03B2\u03B1\u03C1", 1],
          ["\u03B5\u03BD\u03B1\u03C1", 1],
          ["\u03B1\u03B2\u03C1", 1],
          ["\u03BC\u03C0\u03BF\u03C1", 1],
          ["\u03B8\u03B1\u03C1\u03C1", 1],
          ["\u03BD\u03C4\u03C1", 1],
          ["\u03C5", 1],
          ["\u03BD\u03B9\u03C6", 1],
          ["\u03C3\u03C5\u03C1\u03C6", 1]
        ];

        const a_42 = [
          ["\u03BF\u03BD\u03C4\u03B1\u03C3", 1],
          ["\u03C9\u03BD\u03C4\u03B1\u03C3", 1]
        ];

        const a_43 = [
          ["\u03BF\u03BC\u03B1\u03C3\u03C4\u03B5", 1],
          ["\u03B9\u03BF\u03BC\u03B1\u03C3\u03C4\u03B5", 1, 1]
        ];

        const a_44 = [
          ["\u03C0", 1],
          ["\u03B1\u03C0", 1, 1],
          ["\u03B1\u03BA\u03B1\u03C4\u03B1\u03C0", 1, 1],
          ["\u03C3\u03C5\u03BC\u03C0", 1, 3],
          ["\u03B1\u03C3\u03C5\u03BC\u03C0", 1, 1],
          ["\u03B1\u03BC\u03B5\u03C4\u03B1\u03BC\u03C6", 1]
        ];

        const a_45 = [
          ["\u03B6", 1],
          ["\u03B1\u03BB", 1],
          ["\u03C0\u03B1\u03C1\u03B1\u03BA\u03B1\u03BB", 1, 1],
          ["\u03B5\u03BA\u03C4\u03B5\u03BB", 1],
          ["\u03BC", 1],
          ["\u03BE", 1],
          ["\u03C0\u03C1\u03BF", 1],
          ["\u03B1\u03C1", 1],
          ["\u03BD\u03B9\u03C3", 1]
        ];

        const a_46 = [
          ["\u03B7\u03B8\u03B7\u03BA\u03B1", 1],
          ["\u03B7\u03B8\u03B7\u03BA\u03B5", 1],
          ["\u03B7\u03B8\u03B7\u03BA\u03B5\u03C3", 1]
        ];

        const a_47 = [
          ["\u03C0\u03B9\u03B8", 1],
          ["\u03BF\u03B8", 1],
          ["\u03BD\u03B1\u03C1\u03B8", 1],
          ["\u03C3\u03BA\u03BF\u03C5\u03BB", 1],
          ["\u03C3\u03BA\u03C9\u03BB", 1],
          ["\u03C3\u03C6", 1]
        ];

        const a_48 = [
          ["\u03B8", 1],
          ["\u03B4\u03B9\u03B1\u03B8", 1, 1],
          ["\u03C0\u03B1\u03C1\u03B1\u03BA\u03B1\u03C4\u03B1\u03B8", 1, 2],
          ["\u03C3\u03C5\u03BD\u03B8", 1, 3],
          ["\u03C0\u03C1\u03BF\u03C3\u03B8", 1, 4]
        ];

        const a_49 = [
          ["\u03B7\u03BA\u03B1", 1],
          ["\u03B7\u03BA\u03B5", 1],
          ["\u03B7\u03BA\u03B5\u03C3", 1]
        ];

        const a_50 = [
          ["\u03C6\u03B1\u03B3", 1],
          ["\u03BB\u03B7\u03B3", 1],
          ["\u03C6\u03C1\u03C5\u03B4", 1],
          ["\u03BC\u03B1\u03BD\u03C4\u03B9\u03BB", 1],
          ["\u03BC\u03B1\u03BB\u03BB", 1],
          ["\u03BF\u03BC", 1],
          ["\u03B2\u03BB\u03B5\u03C0", 1],
          ["\u03C0\u03BF\u03B4\u03B1\u03C1", 1],
          ["\u03BA\u03C5\u03BC\u03B1\u03C4", 1],
          ["\u03C0\u03C1\u03C9\u03C4", 1],
          ["\u03BB\u03B1\u03C7", 1],
          ["\u03C0\u03B1\u03BD\u03C4\u03B1\u03C7", 1]
        ];

        const a_51 = [
          ["\u03C4\u03C3\u03B1", 1],
          ["\u03C7\u03B1\u03B4", 1],
          ["\u03BC\u03B5\u03B4", 1],
          ["\u03BB\u03B1\u03BC\u03C0\u03B9\u03B4", 1],
          ["\u03B4\u03B5", 1],
          ["\u03C0\u03BB\u03B5", 1],
          ["\u03BC\u03B5\u03C3\u03B1\u03B6", 1],
          ["\u03B4\u03B5\u03C3\u03C0\u03BF\u03B6", 1],
          ["\u03B1\u03B9\u03B8", 1],
          ["\u03C6\u03B1\u03C1\u03BC\u03B1\u03BA", 1],
          ["\u03B1\u03B3\u03BA", 1],
          ["\u03B1\u03BD\u03B7\u03BA", 1],
          ["\u03BB", 1],
          ["\u03BC", 1],
          ["\u03B1\u03BC", 1, 1],
          ["\u03B2\u03C1\u03BF\u03BC", 1, 2],
          ["\u03C5\u03C0\u03BF\u03C4\u03B5\u03B9\u03BD", 1],
          ["\u03B5\u03BA\u03BB\u03B9\u03C0", 1],
          ["\u03C1", 1],
          ["\u03B5\u03BD\u03B4\u03B9\u03B1\u03C6\u03B5\u03C1", 1, 1],
          ["\u03B1\u03BD\u03B1\u03C1\u03C1", 1, 2],
          ["\u03C0\u03B1\u03C4", 1],
          ["\u03BA\u03B1\u03B8\u03B1\u03C1\u03B5\u03C5", 1],
          ["\u03B4\u03B5\u03C5\u03C4\u03B5\u03C1\u03B5\u03C5", 1],
          ["\u03BB\u03B5\u03C7", 1]
        ];

        const a_52 = [
          ["\u03BF\u03C5\u03C3\u03B1", 1],
          ["\u03BF\u03C5\u03C3\u03B5", 1],
          ["\u03BF\u03C5\u03C3\u03B5\u03C3", 1]
        ];

        const a_53 = [
          ["\u03C0\u03B5\u03BB", 1],
          ["\u03BB\u03BB", 1],
          ["\u03C3\u03BC\u03B7\u03BD", 1],
          ["\u03C1\u03C0", 1],
          ["\u03C0\u03C1", 1],
          ["\u03C6\u03C1", 1],
          ["\u03C7\u03BF\u03C1\u03C4", 1],
          ["\u03BF\u03C6", 1],
          ["\u03C8\u03BF\u03C6", -1, 1],
          ["\u03C3\u03C6", 1],
          ["\u03BB\u03BF\u03C7", 1],
          ["\u03BD\u03B1\u03C5\u03BB\u03BF\u03C7", -1, 1]
        ];

        const a_54 = [
          ["\u03B1\u03BC\u03B1\u03BB\u03BB\u03B9", 1],
          ["\u03BB", 1],
          ["\u03B1\u03BC\u03B1\u03BB", 1, 1],
          ["\u03BC", 1],
          ["\u03BF\u03C5\u03BB\u03B1\u03BC", 1, 1],
          ["\u03B5\u03BD", 1],
          ["\u03B4\u03B5\u03C1\u03B2\u03B5\u03BD", 1, 1],
          ["\u03C0", 1],
          ["\u03B1\u03B5\u03B9\u03C0", 1, 1],
          ["\u03B1\u03C1\u03C4\u03B9\u03C0", 1, 2],
          ["\u03C3\u03C5\u03BC\u03C0", 1, 3],
          ["\u03BD\u03B5\u03BF\u03C0", 1, 4],
          ["\u03BA\u03C1\u03BF\u03BA\u03B1\u03BB\u03BF\u03C0", 1, 5],
          ["\u03BF\u03BB\u03BF\u03C0", 1, 6],
          ["\u03C0\u03C1\u03BF\u03C3\u03C9\u03C0\u03BF\u03C0", 1, 7],
          ["\u03C3\u03B9\u03B4\u03B7\u03C1\u03BF\u03C0", 1, 8],
          ["\u03B4\u03C1\u03BF\u03C3\u03BF\u03C0", 1, 9],
          ["\u03B1\u03C3\u03C0", 1, 10],
          ["\u03B1\u03BD\u03C5\u03C0", 1, 11],
          ["\u03C1", 1],
          ["\u03B1\u03C3\u03C0\u03B1\u03C1", 1, 1],
          ["\u03C7\u03B1\u03C1", 1, 2],
          ["\u03B1\u03C7\u03B1\u03C1", 1, 1],
          ["\u03B1\u03C0\u03B5\u03C1", 1, 4],
          ["\u03C4\u03C1", 1, 5],
          ["\u03BF\u03C5\u03C1", 1, 6],
          ["\u03C4", 1],
          ["\u03B4\u03B9\u03B1\u03C4", 1, 1],
          ["\u03B5\u03C0\u03B9\u03C4", 1, 2],
          ["\u03C3\u03C5\u03BD\u03C4", 1, 3],
          ["\u03BF\u03BC\u03BF\u03C4", 1, 4],
          ["\u03BD\u03BF\u03BC\u03BF\u03C4", 1, 1],
          ["\u03B1\u03C0\u03BF\u03C4", 1, 6],
          ["\u03C5\u03C0\u03BF\u03C4", 1, 7],
          ["\u03B1\u03B2\u03B1\u03C3\u03C4", 1, 8],
          ["\u03B1\u03B9\u03BC\u03BF\u03C3\u03C4", 1, 9],
          ["\u03C0\u03C1\u03BF\u03C3\u03C4", 1, 10],
          ["\u03B1\u03BD\u03C5\u03C3\u03C4", 1, 11],
          ["\u03BD\u03B1\u03C5", 1],
          ["\u03B1\u03C6", 1],
          ["\u03BE\u03B5\u03C6", 1],
          ["\u03B1\u03B4\u03B7\u03C6", 1],
          ["\u03C0\u03B1\u03BC\u03C6", 1],
          ["\u03C0\u03BF\u03BB\u03C5\u03C6", 1]
        ];

        const a_55 = [
          ["\u03B1\u03B3\u03B1", 1],
          ["\u03B1\u03B3\u03B5", 1],
          ["\u03B1\u03B3\u03B5\u03C3", 1]
        ];

        const a_56 = [
          ["\u03B7\u03C3\u03B1", 1],
          ["\u03B7\u03C3\u03B5", 1],
          ["\u03B7\u03C3\u03BF\u03C5", 1]
        ];

        const a_57 = [
          ["\u03BD", 1],
          ["\u03B4\u03C9\u03B4\u03B5\u03BA\u03B1\u03BD", 1, 1],
          ["\u03B5\u03C0\u03C4\u03B1\u03BD", 1, 2],
          ["\u03BC\u03B5\u03B3\u03B1\u03BB\u03BF\u03BD", 1, 3],
          ["\u03B5\u03C1\u03B7\u03BC\u03BF\u03BD", 1, 4],
          ["\u03C7\u03B5\u03C1\u03C3\u03BF\u03BD", 1, 5]
        ];

        const a_58 = [
          ["\u03C3\u03B2", 1],
          ["\u03B1\u03C3\u03B2", 1, 1],
          ["\u03B1\u03C0\u03BB", 1],
          ["\u03B1\u03B5\u03B9\u03BC\u03BD", 1],
          ["\u03C7\u03C1", 1],
          ["\u03B1\u03C7\u03C1", 1, 1],
          ["\u03BA\u03BF\u03B9\u03BD\u03BF\u03C7\u03C1", 1, 2],
          ["\u03B4\u03C5\u03C3\u03C7\u03C1", 1, 3],
          ["\u03B5\u03C5\u03C7\u03C1", 1, 4],
          ["\u03C0\u03B1\u03BB\u03B9\u03BC\u03C8", 1]
        ];

        const a_59 = [
          ["\u03BF\u03C5\u03BD\u03B5", 1],
          ["\u03B7\u03B8\u03BF\u03C5\u03BD\u03B5", 1, 1],
          ["\u03B7\u03C3\u03BF\u03C5\u03BD\u03B5", 1, 2]
        ];

        const a_60 = [
          ["\u03C3\u03C0\u03B9", 1],
          ["\u03BD", 1],
          ["\u03B5\u03BE\u03C9\u03BD", 1, 1],
          ["\u03C1", 1],
          ["\u03C3\u03C4\u03C1\u03B1\u03B2\u03BF\u03BC\u03BF\u03C5\u03C4\u03C3", 1],
          ["\u03BA\u03B1\u03BA\u03BF\u03BC\u03BF\u03C5\u03C4\u03C3", 1]
        ];

        const a_61 = [
          ["\u03BF\u03C5\u03BC\u03B5", 1],
          ["\u03B7\u03B8\u03BF\u03C5\u03BC\u03B5", 1, 1],
          ["\u03B7\u03C3\u03BF\u03C5\u03BC\u03B5", 1, 2]
        ];

        const a_62 = [
          ["\u03B1\u03B6", 1],
          ["\u03C9\u03C1\u03B9\u03BF\u03C0\u03BB", 1],
          ["\u03B1\u03C3\u03BF\u03C5\u03C3", 1],
          ["\u03C0\u03B1\u03C1\u03B1\u03C3\u03BF\u03C5\u03C3", 1, 1],
          ["\u03B1\u03BB\u03BB\u03BF\u03C3\u03BF\u03C5\u03C3", 1],
          ["\u03C6", 1],
          ["\u03C7", 1]
        ];

        const a_63 = [
          ["\u03BC\u03B1\u03C4\u03B1", 1],
          ["\u03BC\u03B1\u03C4\u03C9\u03BD", 1],
          ["\u03BC\u03B1\u03C4\u03BF\u03C3", 1]
        ];

        const a_64 = [
          ["\u03B1", 1],
          ["\u03B9\u03BF\u03C5\u03BC\u03B1", 1, 1],
          ["\u03BF\u03BC\u03BF\u03C5\u03BD\u03B1", 1, 2],
          ["\u03B9\u03BF\u03BC\u03BF\u03C5\u03BD\u03B1", 1, 1],
          ["\u03BF\u03C3\u03BF\u03C5\u03BD\u03B1", 1, 4],
          ["\u03B9\u03BF\u03C3\u03BF\u03C5\u03BD\u03B1", 1, 1],
          ["\u03B5", 1],
          ["\u03B1\u03B3\u03B1\u03C4\u03B5", 1, 1],
          ["\u03B7\u03BA\u03B1\u03C4\u03B5", 1, 2],
          ["\u03B7\u03B8\u03B7\u03BA\u03B1\u03C4\u03B5", 1, 1],
          ["\u03B7\u03C3\u03B1\u03C4\u03B5", 1, 4],
          ["\u03BF\u03C5\u03C3\u03B1\u03C4\u03B5", 1, 5],
          ["\u03B5\u03B9\u03C4\u03B5", 1, 6],
          ["\u03B7\u03B8\u03B5\u03B9\u03C4\u03B5", 1, 1],
          ["\u03B9\u03B5\u03BC\u03B1\u03C3\u03C4\u03B5", 1, 8],
          ["\u03BF\u03C5\u03BC\u03B1\u03C3\u03C4\u03B5", 1, 9],
          ["\u03B9\u03BF\u03C5\u03BC\u03B1\u03C3\u03C4\u03B5", 1, 1],
          ["\u03B9\u03B5\u03C3\u03B1\u03C3\u03C4\u03B5", 1, 11],
          ["\u03BF\u03C3\u03B1\u03C3\u03C4\u03B5", 1, 12],
          ["\u03B9\u03BF\u03C3\u03B1\u03C3\u03C4\u03B5", 1, 1],
          ["\u03B7", 1],
          ["\u03B9", 1],
          ["\u03B1\u03BC\u03B1\u03B9", 1, 1],
          ["\u03B9\u03B5\u03BC\u03B1\u03B9", 1, 2],
          ["\u03BF\u03BC\u03B1\u03B9", 1, 3],
          ["\u03BF\u03C5\u03BC\u03B1\u03B9", 1, 4],
          ["\u03B1\u03C3\u03B1\u03B9", 1, 5],
          ["\u03B5\u03C3\u03B1\u03B9", 1, 6],
          ["\u03B9\u03B5\u03C3\u03B1\u03B9", 1, 1],
          ["\u03B1\u03C4\u03B1\u03B9", 1, 8],
          ["\u03B5\u03C4\u03B1\u03B9", 1, 9],
          ["\u03B9\u03B5\u03C4\u03B1\u03B9", 1, 1],
          ["\u03BF\u03BD\u03C4\u03B1\u03B9", 1, 11],
          ["\u03BF\u03C5\u03BD\u03C4\u03B1\u03B9", 1, 12],
          ["\u03B9\u03BF\u03C5\u03BD\u03C4\u03B1\u03B9", 1, 1],
          ["\u03B5\u03B9", 1, 14],
          ["\u03B1\u03B5\u03B9", 1, 1],
          ["\u03B7\u03B8\u03B5\u03B9", 1, 2],
          ["\u03B7\u03C3\u03B5\u03B9", 1, 3],
          ["\u03BF\u03B9", 1, 18],
          ["\u03B1\u03BD", 1],
          ["\u03B1\u03B3\u03B1\u03BD", 1, 1],
          ["\u03B7\u03BA\u03B1\u03BD", 1, 2],
          ["\u03B7\u03B8\u03B7\u03BA\u03B1\u03BD", 1, 1],
          ["\u03B7\u03C3\u03B1\u03BD", 1, 4],
          ["\u03BF\u03C5\u03C3\u03B1\u03BD", 1, 5],
          ["\u03BF\u03BD\u03C4\u03BF\u03C5\u03C3\u03B1\u03BD", 1, 1],
          ["\u03B9\u03BF\u03BD\u03C4\u03BF\u03C5\u03C3\u03B1\u03BD", 1, 1],
          ["\u03BF\u03BD\u03C4\u03B1\u03BD", 1, 8],
          ["\u03B9\u03BF\u03BD\u03C4\u03B1\u03BD", 1, 1],
          ["\u03BF\u03C5\u03BD\u03C4\u03B1\u03BD", 1, 10],
          ["\u03B9\u03BF\u03C5\u03BD\u03C4\u03B1\u03BD", 1, 1],
          ["\u03BF\u03C4\u03B1\u03BD", 1, 12],
          ["\u03B9\u03BF\u03C4\u03B1\u03BD", 1, 1],
          ["\u03BF\u03BC\u03B1\u03C3\u03C4\u03B1\u03BD", 1, 14],
          ["\u03B9\u03BF\u03BC\u03B1\u03C3\u03C4\u03B1\u03BD", 1, 1],
          ["\u03BF\u03C3\u03B1\u03C3\u03C4\u03B1\u03BD", 1, 16],
          ["\u03B9\u03BF\u03C3\u03B1\u03C3\u03C4\u03B1\u03BD", 1, 1],
          ["\u03BF\u03C5\u03BD", 1],
          ["\u03B7\u03B8\u03BF\u03C5\u03BD", 1, 1],
          ["\u03BF\u03BC\u03BF\u03C5\u03BD", 1, 2],
          ["\u03B9\u03BF\u03BC\u03BF\u03C5\u03BD", 1, 1],
          ["\u03B7\u03C3\u03BF\u03C5\u03BD", 1, 4],
          ["\u03BF\u03C3\u03BF\u03C5\u03BD", 1, 5],
          ["\u03B9\u03BF\u03C3\u03BF\u03C5\u03BD", 1, 1],
          ["\u03C9\u03BD", 1],
          ["\u03B7\u03B4\u03C9\u03BD", 1, 1],
          ["\u03BF", 1],
          ["\u03B1\u03C3", 1],
          ["\u03B5\u03C3", 1],
          ["\u03B7\u03B4\u03B5\u03C3", 1, 1],
          ["\u03B7\u03C3\u03B5\u03C3", 1, 2],
          ["\u03B7\u03C3", 1],
          ["\u03B5\u03B9\u03C3", 1],
          ["\u03B7\u03B8\u03B5\u03B9\u03C3", 1, 1],
          ["\u03BF\u03C3", 1],
          ["\u03C5\u03C3", 1],
          ["\u03BF\u03C5\u03C3", 1, 1],
          ["\u03C5", 1],
          ["\u03BF\u03C5", 1, 1],
          ["\u03C9", 1],
          ["\u03B1\u03C9", 1, 1],
          ["\u03B7\u03B8\u03C9", 1, 2],
          ["\u03B7\u03C3\u03C9", 1, 3]
        ];

        const a_65 = [
          ["\u03BF\u03C4\u03B5\u03C1", 1],
          ["\u03B5\u03C3\u03C4\u03B5\u03C1", 1],
          ["\u03C5\u03C4\u03B5\u03C1", 1],
          ["\u03C9\u03C4\u03B5\u03C1", 1],
          ["\u03BF\u03C4\u03B1\u03C4", 1],
          ["\u03B5\u03C3\u03C4\u03B1\u03C4", 1],
          ["\u03C5\u03C4\u03B1\u03C4", 1],
          ["\u03C9\u03C4\u03B1\u03C4", 1]
        ];

        const /**@type {Array<number>}*/ g_v = [81, 65, 16, 1];

        const /**@type {Array<number>}*/ g_v2 = [81, 65, 0, 1];

        var B = BaseStemmer;

        return class extends B {


          /** @return {boolean} */
          #stem() {
            let /**@type {number}*/ a;
            let /**@type {boolean}*/ B_test1;
            this.limit_backward = this.c;
            this.c = this.limit;
            const /**@type {number}*/ v_1 = this.limit - this.c;
            // deno-lint-ignore no-unused-labels
            lab0: {
              while (true) {
                const /**@type {number}*/ v_2 = this.limit - this.c;
                // deno-lint-ignore no-unused-labels
                lab1: {
                  this.ket = this.c;
                  a = this.find_among_b(a_0);
                  this.bra = this.c;
                  switch (a) {
                    case 1: {
                      this.slice_from("\u03B1");
                      break;
                    }
                    case 2: {
                      this.slice_from("\u03B2");
                      break;
                    }
                    case 3: {
                      this.slice_from("\u03B3");
                      break;
                    }
                    case 4: {
                      this.slice_from("\u03B4");
                      break;
                    }
                    case 5: {
                      this.slice_from("\u03B5");
                      break;
                    }
                    case 6: {
                      this.slice_from("\u03B6");
                      break;
                    }
                    case 7: {
                      this.slice_from("\u03B7");
                      break;
                    }
                    case 8: {
                      this.slice_from("\u03B8");
                      break;
                    }
                    case 9: {
                      this.slice_from("\u03B9");
                      break;
                    }
                    case 10: {
                      this.slice_from("\u03BA");
                      break;
                    }
                    case 11: {
                      this.slice_from("\u03BB");
                      break;
                    }
                    case 12: {
                      this.slice_from("\u03BC");
                      break;
                    }
                    case 13: {
                      this.slice_from("\u03BD");
                      break;
                    }
                    case 14: {
                      this.slice_from("\u03BE");
                      break;
                    }
                    case 15: {
                      this.slice_from("\u03BF");
                      break;
                    }
                    case 16: {
                      this.slice_from("\u03C0");
                      break;
                    }
                    case 17: {
                      this.slice_from("\u03C1");
                      break;
                    }
                    case 18: {
                      this.slice_from("\u03C3");
                      break;
                    }
                    case 19: {
                      this.slice_from("\u03C4");
                      break;
                    }
                    case 20: {
                      this.slice_from("\u03C5");
                      break;
                    }
                    case 21: {
                      this.slice_from("\u03C6");
                      break;
                    }
                    case 22: {
                      this.slice_from("\u03C7");
                      break;
                    }
                    case 23: {
                      this.slice_from("\u03C8");
                      break;
                    }
                    case 24: {
                      this.slice_from("\u03C9");
                      break;
                    }
                    case 25: {
                      if (this.c <= this.limit_backward) break lab1;
                      this.c--;
                      break;
                    }
                  }
                  continue;
                }
                this.c = this.limit - v_2;
                break;
              }
            }
            this.c = this.limit - v_1;
            if ( /**@type {boolean}*/ (this.current.length < 3)) return false;
            B_test1 = true;
            const /**@type {number}*/ v_3 = this.limit - this.c;
            // deno-lint-ignore no-unused-labels
            lab2: {
              this.ket = this.c;
              a = this.find_among_b(a_1);
              if (a === 0) break lab2;
              this.bra = this.c;
              this.slice_from(as_1[a - 1]);
              B_test1 = false;
            }
            this.c = this.limit - v_3;
            const /**@type {number}*/ v_4 = this.limit - this.c;
            // deno-lint-ignore no-unused-labels
            lab3: {
              this.ket = this.c;
              if (this.find_among_b(a_3) === 0) break lab3;
              this.bra = this.c;
              this.slice_del();
              B_test1 = false;
              this.ket = this.c;
              this.bra = this.c;
              a = this.find_among_b(a_2);
              if (a === 0) break lab3;
              if ( /**@type {boolean}*/ (this.c > this.limit_backward)) break lab3;
              this.slice_from(as_2[a - 1]);
            }
            this.c = this.limit - v_4;
            const /**@type {number}*/ v_5 = this.limit - this.c;
            // deno-lint-ignore no-unused-labels
            lab4: {
              this.ket = this.c;
              if (this.find_among_b(a_5) === 0) break lab4;
              this.bra = this.c;
              this.slice_del();
              B_test1 = false;
              this.ket = this.c;
              this.bra = this.c;
              if (this.find_among_b(a_4) === 0) break lab4;
              if ( /**@type {boolean}*/ (this.c > this.limit_backward)) break lab4;
              this.slice_from("\u03C9\u03BD");
            }
            this.c = this.limit - v_5;
            const /**@type {number}*/ v_6 = this.limit - this.c;
            // deno-lint-ignore no-unused-labels
            lab5: {
              // deno-lint-ignore no-unused-labels
              lab6: {
                const /**@type {number}*/ v_7 = this.limit - this.c;
                // deno-lint-ignore no-unused-labels
                lab7: {
                  this.ket = this.c;
                  if (!(this.eq_s_b("\u03B9\u03C3\u03B1"))) break lab7;
                  this.bra = this.c;
                  if ( /**@type {boolean}*/ (this.c > this.limit_backward)) break lab7;
                  this.slice_from("\u03B9\u03C3");
                  break lab6;
                }
                this.c = this.limit - v_7;
                this.ket = this.c;
              }
              if (this.find_among_b(a_7) === 0) break lab5;
              this.bra = this.c;
              this.slice_del();
              B_test1 = false;
              this.ket = this.c;
              this.bra = this.c;
              a = this.find_among_b(a_6);
              if (a === 0) break lab5;
              if ( /**@type {boolean}*/ (this.c > this.limit_backward)) break lab5;
              this.slice_from(as_6[a - 1]);
            }
            this.c = this.limit - v_6;
            const /**@type {number}*/ v_8 = this.limit - this.c;
            // deno-lint-ignore no-unused-labels
            lab8: {
              this.ket = this.c;
              if (this.find_among_b(a_9) === 0) break lab8;
              this.bra = this.c;
              this.slice_del();
              B_test1 = false;
              this.ket = this.c;
              this.bra = this.c;
              if (this.find_among_b(a_8) === 0) break lab8;
              if ( /**@type {boolean}*/ (this.c > this.limit_backward)) break lab8;
              this.slice_from("\u03B9");
            }
            this.c = this.limit - v_8;
            const /**@type {number}*/ v_9 = this.limit - this.c;
            // deno-lint-ignore no-unused-labels
            lab9: {
              this.ket = this.c;
              if (this.find_among_b(a_11) === 0) break lab9;
              this.bra = this.c;
              this.slice_del();
              B_test1 = false;
              this.ket = this.c;
              this.bra = this.c;
              a = this.find_among_b(a_10);
              if (a === 0) break lab9;
              if ( /**@type {boolean}*/ (this.c > this.limit_backward)) break lab9;
              this.slice_from(as_10[a - 1]);
            }
            this.c = this.limit - v_9;
            const /**@type {number}*/ v_10 = this.limit - this.c;
            // deno-lint-ignore no-unused-labels
            lab10: {
              this.ket = this.c;
              if (this.find_among_b(a_14) === 0) break lab10;
              this.bra = this.c;
              this.slice_del();
              B_test1 = false;
              // deno-lint-ignore no-unused-labels
              lab11: {
                const /**@type {number}*/ v_11 = this.limit - this.c;
                // deno-lint-ignore no-unused-labels
                lab12: {
                  this.ket = this.c;
                  this.bra = this.c;
                  a = this.find_among_b(a_12);
                  if (a === 0) break lab12;
                  if ( /**@type {boolean}*/ (this.c > this.limit_backward)) break lab12;
                  this.slice_from(as_12[a - 1]);
                  break lab11;
                }
                this.c = this.limit - v_11;
                this.ket = this.c;
                a = this.find_among_b(a_13);
                if (a === 0) break lab10;
                this.bra = this.c;
                this.slice_from(as_13[a - 1]);
              }
            }
            this.c = this.limit - v_10;
            const /**@type {number}*/ v_12 = this.limit - this.c;
            // deno-lint-ignore no-unused-labels
            lab13: {
              this.ket = this.c;
              if (this.find_among_b(a_16) === 0) break lab13;
              this.bra = this.c;
              this.slice_del();
              B_test1 = false;
              this.ket = this.c;
              this.bra = this.c;
              if (this.find_among_b(a_15) === 0) break lab13;
              if ( /**@type {boolean}*/ (this.c > this.limit_backward)) break lab13;
              this.slice_from("\u03B1\u03C1\u03B1\u03BA");
            }
            this.c = this.limit - v_12;
            const /**@type {number}*/ v_13 = this.limit - this.c;
            // deno-lint-ignore no-unused-labels
            lab14: {
              this.ket = this.c;
              if (this.find_among_b(a_18) === 0) break lab14;
              this.bra = this.c;
              this.slice_del();
              B_test1 = false;
              // deno-lint-ignore no-unused-labels
              lab15: {
                const /**@type {number}*/ v_14 = this.limit - this.c;
                // deno-lint-ignore no-unused-labels
                lab16: {
                  this.ket = this.c;
                  this.bra = this.c;
                  a = this.find_among_b(a_17);
                  if (a === 0) break lab16;
                  if ( /**@type {boolean}*/ (this.c > this.limit_backward)) break lab16;
                  this.slice_from(as_17[a - 1]);
                  break lab15;
                }
                this.c = this.limit - v_14;
                this.ket = this.c;
                this.bra = this.c;
                if (!(this.eq_s_b("\u03BA\u03BF\u03C1"))) break lab14;
                this.slice_from("\u03B9\u03C4\u03C3");
              }
            }
            this.c = this.limit - v_13;
            const /**@type {number}*/ v_15 = this.limit - this.c;
            // deno-lint-ignore no-unused-labels
            lab17: {
              this.ket = this.c;
              if (this.find_among_b(a_21) === 0) break lab17;
              this.bra = this.c;
              this.slice_del();
              B_test1 = false;
              // deno-lint-ignore no-unused-labels
              lab18: {
                const /**@type {number}*/ v_16 = this.limit - this.c;
                // deno-lint-ignore no-unused-labels
                lab19: {
                  this.ket = this.c;
                  this.bra = this.c;
                  if (this.find_among_b(a_19) === 0) break lab19;
                  if ( /**@type {boolean}*/ (this.c > this.limit_backward)) break lab19;
                  this.slice_from("\u03B9\u03B4");
                  break lab18;
                }
                this.c = this.limit - v_16;
                this.ket = this.c;
                this.bra = this.c;
                if (this.find_among_b(a_20) === 0) break lab17;
                this.slice_from("\u03B9\u03B4");
              }
            }
            this.c = this.limit - v_15;
            const /**@type {number}*/ v_17 = this.limit - this.c;
            // deno-lint-ignore no-unused-labels
            lab20: {
              this.ket = this.c;
              if (this.find_among_b(a_23) === 0) break lab20;
              this.bra = this.c;
              this.slice_del();
              B_test1 = false;
              this.ket = this.c;
              this.bra = this.c;
              if (this.find_among_b(a_22) === 0) break lab20;
              if ( /**@type {boolean}*/ (this.c > this.limit_backward)) break lab20;
              this.slice_from("\u03B9\u03C3\u03BA");
            }
            this.c = this.limit - v_17;
            const /**@type {number}*/ v_18 = this.limit - this.c;
            // deno-lint-ignore no-unused-labels
            lab21: {
              this.ket = this.c;
              if (this.find_among_b(a_24) === 0) break lab21;
              this.bra = this.c;
              this.slice_del();
              {
                const /**@type {number}*/ v_19 = this.limit - this.c;
                // deno-lint-ignore no-unused-labels
                lab22: {
                  if (this.find_among_b(a_25) === 0) break lab22;
                  break lab21;
                }
                this.c = this.limit - v_19;
              } {
                const /**@type {number}*/ c = this.c;
                this.insert(c, c, "\u03B1\u03B4");
                this.c = c;
              }
            }
            this.c = this.limit - v_18;
            const /**@type {number}*/ v_20 = this.limit - this.c;
            // deno-lint-ignore no-unused-labels
            lab23: {
              this.ket = this.c;
              if (this.find_among_b(a_26) === 0) break lab23;
              this.bra = this.c;
              this.slice_del();
              this.ket = this.c;
              this.bra = this.c;
              if (this.find_among_b(a_27) === 0) break lab23;
              this.slice_from("\u03B5\u03B4");
            }
            this.c = this.limit - v_20;
            const /**@type {number}*/ v_21 = this.limit - this.c;
            // deno-lint-ignore no-unused-labels
            lab24: {
              this.ket = this.c;
              if (this.find_among_b(a_28) === 0) break lab24;
              this.bra = this.c;
              this.slice_del();
              this.ket = this.c;
              this.bra = this.c;
              if (this.find_among_b(a_29) === 0) break lab24;
              this.slice_from("\u03BF\u03C5\u03B4");
            }
            this.c = this.limit - v_21;
            const /**@type {number}*/ v_22 = this.limit - this.c;
            // deno-lint-ignore no-unused-labels
            lab25: {
              this.ket = this.c;
              if (this.find_among_b(a_30) === 0) break lab25;
              this.bra = this.c;
              this.slice_del();
              B_test1 = false;
              this.ket = this.c;
              this.bra = this.c;
              if (this.find_among_b(a_31) === 0) break lab25;
              if ( /**@type {boolean}*/ (this.c > this.limit_backward)) break lab25;
              this.slice_from("\u03B5");
            }
            this.c = this.limit - v_22;
            const /**@type {number}*/ v_23 = this.limit - this.c;
            // deno-lint-ignore no-unused-labels
            lab26: {
              this.ket = this.c;
              if (this.find_among_b(a_32) === 0) break lab26;
              this.bra = this.c;
              this.slice_del();
              B_test1 = false;
              this.ket = this.c;
              this.bra = this.c;
              if (!(this.in_grouping_b(g_v, 945, 969))) break lab26;
              this.slice_from("\u03B9");
            }
            this.c = this.limit - v_23;
            const /**@type {number}*/ v_24 = this.limit - this.c;
            // deno-lint-ignore no-unused-labels
            lab27: {
              this.ket = this.c;
              if (this.find_among_b(a_33) === 0) break lab27;
              this.bra = this.c;
              this.slice_del();
              B_test1 = false;
              // deno-lint-ignore no-unused-labels
              lab28: {
                const /**@type {number}*/ v_25 = this.limit - this.c;
                // deno-lint-ignore no-unused-labels
                lab29: {
                  this.ket = this.c;
                  this.bra = this.c;
                  if (!(this.in_grouping_b(g_v, 945, 969))) break lab29;
                  this.slice_from("\u03B9\u03BA");
                  break lab28;
                }
                this.c = this.limit - v_25;
                this.ket = this.c;
              }
              this.bra = this.c;
              if (this.find_among_b(a_34) === 0) break lab27;
              if ( /**@type {boolean}*/ (this.c > this.limit_backward)) break lab27;
              this.slice_from("\u03B9\u03BA");
            }
            this.c = this.limit - v_24;
            const /**@type {number}*/ v_26 = this.limit - this.c;
            // deno-lint-ignore no-unused-labels
            lab30: {
              const /**@type {number}*/ v_27 = this.limit - this.c;
              // deno-lint-ignore no-unused-labels
              lab31: {
                this.ket = this.c;
                if (!(this.eq_s_b("\u03B1\u03B3\u03B1\u03BC\u03B5"))) break lab31;
                this.bra = this.c;
                if ( /**@type {boolean}*/ (this.c > this.limit_backward)) break lab31;
                this.slice_from("\u03B1\u03B3\u03B1\u03BC");
              }
              this.c = this.limit - v_27;
              const /**@type {number}*/ v_28 = this.limit - this.c;
              // deno-lint-ignore no-unused-labels
              lab32: {
                this.ket = this.c;
                if (this.find_among_b(a_35) === 0) break lab32;
                this.bra = this.c;
                this.slice_del();
                B_test1 = false;
              }
              this.c = this.limit - v_28;
              this.ket = this.c;
              if (!(this.eq_s_b("\u03B1\u03BC\u03B5"))) break lab30;
              this.bra = this.c;
              this.slice_del();
              B_test1 = false;
              this.ket = this.c;
              this.bra = this.c;
              if (this.find_among_b(a_36) === 0) break lab30;
              if ( /**@type {boolean}*/ (this.c > this.limit_backward)) break lab30;
              this.slice_from("\u03B1\u03BC");
            }
            this.c = this.limit - v_26;
            const /**@type {number}*/ v_29 = this.limit - this.c;
            // deno-lint-ignore no-unused-labels
            lab33: {
              const /**@type {number}*/ v_30 = this.limit - this.c;
              // deno-lint-ignore no-unused-labels
              lab34: {
                this.ket = this.c;
                if (this.find_among_b(a_38) === 0) break lab34;
                this.bra = this.c;
                this.slice_del();
                B_test1 = false;
                this.ket = this.c;
                this.bra = this.c;
                if (this.find_among_b(a_37) === 0) break lab34;
                if ( /**@type {boolean}*/ (this.c > this.limit_backward)) break lab34;
                this.slice_from("\u03B1\u03B3\u03B1\u03BD");
              }
              this.c = this.limit - v_30;
              this.ket = this.c;
              if (!(this.eq_s_b("\u03B1\u03BD\u03B5"))) break lab33;
              this.bra = this.c;
              this.slice_del();
              B_test1 = false;
              // deno-lint-ignore no-unused-labels
              lab35: {
                const /**@type {number}*/ v_31 = this.limit - this.c;
                // deno-lint-ignore no-unused-labels
                lab36: {
                  this.ket = this.c;
                  this.bra = this.c;
                  if (!(this.in_grouping_b(g_v2, 945, 969))) break lab36;
                  this.slice_from("\u03B1\u03BD");
                  break lab35;
                }
                this.c = this.limit - v_31;
                this.ket = this.c;
              }
              this.bra = this.c;
              if (this.find_among_b(a_39) === 0) break lab33;
              if ( /**@type {boolean}*/ (this.c > this.limit_backward)) break lab33;
              this.slice_from("\u03B1\u03BD");
            }
            this.c = this.limit - v_29;
            const /**@type {number}*/ v_32 = this.limit - this.c;
            // deno-lint-ignore no-unused-labels
            lab37: {
              const /**@type {number}*/ v_33 = this.limit - this.c;
              // deno-lint-ignore no-unused-labels
              lab38: {
                this.ket = this.c;
                if (!(this.eq_s_b("\u03B7\u03C3\u03B5\u03C4\u03B5"))) break lab38;
                this.bra = this.c;
                this.slice_del();
                B_test1 = false;
              }
              this.c = this.limit - v_33;
              this.ket = this.c;
              if (!(this.eq_s_b("\u03B5\u03C4\u03B5"))) break lab37;
              this.bra = this.c;
              this.slice_del();
              B_test1 = false;
              // deno-lint-ignore no-unused-labels
              lab39: {
                const /**@type {number}*/ v_34 = this.limit - this.c;
                // deno-lint-ignore no-unused-labels
                lab40: {
                  this.ket = this.c;
                  this.bra = this.c;
                  if (!(this.in_grouping_b(g_v2, 945, 969))) break lab40;
                  this.slice_from("\u03B5\u03C4");
                  break lab39;
                }
                this.c = this.limit - v_34;
                // deno-lint-ignore no-unused-labels
                lab41: {
                  this.ket = this.c;
                  this.bra = this.c;
                  if (this.find_among_b(a_40) === 0) break lab41;
                  this.slice_from("\u03B5\u03C4");
                  break lab39;
                }
                this.c = this.limit - v_34;
                this.ket = this.c;
              }
              this.bra = this.c;
              if (this.find_among_b(a_41) === 0) break lab37;
              if ( /**@type {boolean}*/ (this.c > this.limit_backward)) break lab37;
              this.slice_from("\u03B5\u03C4");
            }
            this.c = this.limit - v_32;
            const /**@type {number}*/ v_35 = this.limit - this.c;
            // deno-lint-ignore no-unused-labels
            lab42: {
              this.ket = this.c;
              if (this.find_among_b(a_42) === 0) break lab42;
              this.bra = this.c;
              this.slice_del();
              B_test1 = false;
              // deno-lint-ignore no-unused-labels
              lab43: {
                const /**@type {number}*/ v_36 = this.limit - this.c;
                // deno-lint-ignore no-unused-labels
                lab44: {
                  this.ket = this.c;
                  this.bra = this.c;
                  if (!(this.eq_s_b("\u03B1\u03C1\u03C7"))) break lab44;
                  if ( /**@type {boolean}*/ (this.c > this.limit_backward)) break lab44;
                  this.slice_from("\u03BF\u03BD\u03C4");
                  break lab43;
                }
                this.c = this.limit - v_36;
                this.ket = this.c;
                this.bra = this.c;
                if (!(this.eq_s_b("\u03BA\u03C1\u03B5"))) break lab42;
                this.slice_from("\u03C9\u03BD\u03C4");
              }
            }
            this.c = this.limit - v_35;
            const /**@type {number}*/ v_37 = this.limit - this.c;
            // deno-lint-ignore no-unused-labels
            lab45: {
              this.ket = this.c;
              if (this.find_among_b(a_43) === 0) break lab45;
              this.bra = this.c;
              this.slice_del();
              B_test1 = false;
              this.ket = this.c;
              this.bra = this.c;
              if (!(this.eq_s_b("\u03BF\u03BD"))) break lab45;
              if ( /**@type {boolean}*/ (this.c > this.limit_backward)) break lab45;
              this.slice_from("\u03BF\u03BC\u03B1\u03C3\u03C4");
            }
            this.c = this.limit - v_37;
            const /**@type {number}*/ v_38 = this.limit - this.c;
            // deno-lint-ignore no-unused-labels
            lab46: {
              const /**@type {number}*/ v_39 = this.limit - this.c;
              // deno-lint-ignore no-unused-labels
              lab47: {
                this.ket = this.c;
                if (!(this.eq_s_b("\u03B9\u03B5\u03C3\u03C4\u03B5"))) break lab47;
                this.bra = this.c;
                this.slice_del();
                B_test1 = false;
                this.ket = this.c;
                this.bra = this.c;
                if (this.find_among_b(a_44) === 0) break lab47;
                if ( /**@type {boolean}*/ (this.c > this.limit_backward)) break lab47;
                this.slice_from("\u03B9\u03B5\u03C3\u03C4");
              }
              this.c = this.limit - v_39;
              this.ket = this.c;
              if (!(this.eq_s_b("\u03B5\u03C3\u03C4\u03B5"))) break lab46;
              this.bra = this.c;
              this.slice_del();
              B_test1 = false;
              this.ket = this.c;
              this.bra = this.c;
              if (this.find_among_b(a_45) === 0) break lab46;
              if ( /**@type {boolean}*/ (this.c > this.limit_backward)) break lab46;
              this.slice_from("\u03B9\u03B5\u03C3\u03C4");
            }
            this.c = this.limit - v_38;
            const /**@type {number}*/ v_40 = this.limit - this.c;
            // deno-lint-ignore no-unused-labels
            lab48: {
              const /**@type {number}*/ v_41 = this.limit - this.c;
              // deno-lint-ignore no-unused-labels
              lab49: {
                this.ket = this.c;
                if (this.find_among_b(a_46) === 0) break lab49;
                this.bra = this.c;
                this.slice_del();
                B_test1 = false;
              }
              this.c = this.limit - v_41;
              this.ket = this.c;
              if (this.find_among_b(a_49) === 0) break lab48;
              this.bra = this.c;
              this.slice_del();
              B_test1 = false;
              // deno-lint-ignore no-unused-labels
              lab50: {
                const /**@type {number}*/ v_42 = this.limit - this.c;
                // deno-lint-ignore no-unused-labels
                lab51: {
                  this.ket = this.c;
                  this.bra = this.c;
                  if (this.find_among_b(a_47) === 0) break lab51;
                  this.slice_from("\u03B7\u03BA");
                  break lab50;
                }
                this.c = this.limit - v_42;
                this.ket = this.c;
                this.bra = this.c;
                if (this.find_among_b(a_48) === 0) break lab48;
                if ( /**@type {boolean}*/ (this.c > this.limit_backward)) break lab48;
                this.slice_from("\u03B7\u03BA");
              }
            }
            this.c = this.limit - v_40;
            const /**@type {number}*/ v_43 = this.limit - this.c;
            // deno-lint-ignore no-unused-labels
            lab52: {
              this.ket = this.c;
              if (this.find_among_b(a_52) === 0) break lab52;
              this.bra = this.c;
              this.slice_del();
              B_test1 = false;
              // deno-lint-ignore no-unused-labels
              lab53: {
                const /**@type {number}*/ v_44 = this.limit - this.c;
                // deno-lint-ignore no-unused-labels
                lab54: {
                  this.ket = this.c;
                  this.bra = this.c;
                  if (this.find_among_b(a_50) === 0) break lab54;
                  this.slice_from("\u03BF\u03C5\u03C3");
                  break lab53;
                }
                this.c = this.limit - v_44;
                this.ket = this.c;
                this.bra = this.c;
                if (this.find_among_b(a_51) === 0) break lab52;
                if ( /**@type {boolean}*/ (this.c > this.limit_backward)) break lab52;
                this.slice_from("\u03BF\u03C5\u03C3");
              }
            }
            this.c = this.limit - v_43;
            const /**@type {number}*/ v_45 = this.limit - this.c;
            // deno-lint-ignore no-unused-labels
            lab55: {
              this.ket = this.c;
              if (this.find_among_b(a_56) === 0) break lab55;
              this.bra = this.c;
              this.slice_del();
              B_test1 = false;
              this.ket = this.c;
              this.bra = this.c;
              if (this.find_among_b(a_57) === 0) break lab55;
              if ( /**@type {boolean}*/ (this.c > this.limit_backward)) break lab55;
              this.slice_from("\u03B7\u03C3");
            }
            this.c = this.limit - v_45;
            const /**@type {number}*/ v_46 = this.limit - this.c;
            // deno-lint-ignore no-unused-labels
            lab56: {
              this.ket = this.c;
              if (this.find_among_b(a_55) === 0) break lab56;
              this.bra = this.c;
              this.slice_del();
              B_test1 = false;
              // deno-lint-ignore no-unused-labels
              lab57: {
                const /**@type {number}*/ v_47 = this.limit - this.c;
                // deno-lint-ignore no-unused-labels
                lab58: {
                  this.ket = this.c;
                  this.bra = this.c;
                  if (!(this.eq_s_b("\u03BA\u03BF\u03BB\u03BB"))) break lab58;
                  this.slice_from("\u03B1\u03B3");
                  break lab57;
                }
                this.c = this.limit - v_47;
                // deno-lint-ignore no-unused-labels
                lab59: {
                  const /**@type {number}*/ v_48 = this.limit - this.c;
                  // deno-lint-ignore no-unused-labels
                  lab60: {
                    this.ket = this.c;
                    this.bra = this.c;
                    a = this.find_among_b(a_53);
                    if (a === 0) break lab60;
                    switch (a) {
                      case 1: {
                        this.slice_from("\u03B1\u03B3");
                        break;
                      }
                    }
                    break lab59;
                  }
                  this.c = this.limit - v_48;
                  this.ket = this.c;
                  this.bra = this.c;
                  if (this.find_among_b(a_54) === 0) break lab56;
                  if ( /**@type {boolean}*/ (this.c > this.limit_backward)) break lab56;
                  this.slice_from("\u03B1\u03B3");
                }
              }
            }
            this.c = this.limit - v_46;
            const /**@type {number}*/ v_49 = this.limit - this.c;
            // deno-lint-ignore no-unused-labels
            lab61: {
              this.ket = this.c;
              if (!(this.eq_s_b("\u03B7\u03C3\u03C4\u03B5"))) break lab61;
              this.bra = this.c;
              this.slice_del();
              B_test1 = false;
              this.ket = this.c;
              this.bra = this.c;
              if (this.find_among_b(a_58) === 0) break lab61;
              if ( /**@type {boolean}*/ (this.c > this.limit_backward)) break lab61;
              this.slice_from("\u03B7\u03C3\u03C4");
            }
            this.c = this.limit - v_49;
            const /**@type {number}*/ v_50 = this.limit - this.c;
            // deno-lint-ignore no-unused-labels
            lab62: {
              this.ket = this.c;
              if (this.find_among_b(a_59) === 0) break lab62;
              this.bra = this.c;
              this.slice_del();
              B_test1 = false;
              this.ket = this.c;
              this.bra = this.c;
              if (this.find_among_b(a_60) === 0) break lab62;
              if ( /**@type {boolean}*/ (this.c > this.limit_backward)) break lab62;
              this.slice_from("\u03BF\u03C5\u03BD");
            }
            this.c = this.limit - v_50;
            const /**@type {number}*/ v_51 = this.limit - this.c;
            // deno-lint-ignore no-unused-labels
            lab63: {
              this.ket = this.c;
              if (this.find_among_b(a_61) === 0) break lab63;
              this.bra = this.c;
              this.slice_del();
              B_test1 = false;
              this.ket = this.c;
              this.bra = this.c;
              if (this.find_among_b(a_62) === 0) break lab63;
              if ( /**@type {boolean}*/ (this.c > this.limit_backward)) break lab63;
              this.slice_from("\u03BF\u03C5\u03BC");
            }
            this.c = this.limit - v_51;
            const /**@type {number}*/ v_52 = this.limit - this.c;
            // deno-lint-ignore no-unused-labels
            lab64: {
              const /**@type {number}*/ v_53 = this.limit - this.c;
              // deno-lint-ignore no-unused-labels
              lab65: {
                this.ket = this.c;
                if (this.find_among_b(a_63) === 0) break lab65;
                this.bra = this.c;
                this.slice_from("\u03BC\u03B1");
              }
              this.c = this.limit - v_53;
              if (!B_test1) break lab64;
              this.ket = this.c;
              if (this.find_among_b(a_64) === 0) break lab64;
              this.bra = this.c;
              this.slice_del();
            }
            this.c = this.limit - v_52;
            const /**@type {number}*/ v_54 = this.limit - this.c;
            // deno-lint-ignore no-unused-labels
            lab66: {
              this.ket = this.c;
              if (this.find_among_b(a_65) === 0) break lab66;
              this.bra = this.c;
              this.slice_del();
            }
            this.c = this.limit - v_54;
            this.c = this.limit_backward;
            return true;
          }

          /**@return{string}*/
          stem( /**@type {string}*/ input) {
            this.setCurrent(input);
            this.#stem();
            return this.getCurrent();
          }

          stemWord = this.stem;
        }
      })();

      var st = new Stemmer();

      /* and return a function that stems a word for the current locale */
      return function(token) {
        return token.update(function(word) {
          return st.stemWord(word);
        })
      }
    })();

    lunr.Pipeline.registerFunction(lunr.el.stemmer, 'stemmer-el');

    /* normalizer: folds spellings to one before the stop word filter and the stemmer */
    lunr.el.normalizer = lunr.stemmerSupport.generateNormalizer({
      "\u03AC": "\u03B1",
      "\u03AD": "\u03B5",
      "\u03AE": "\u03B7",
      "\u03AF": "\u03B9",
      "\u03CC": "\u03BF",
      "\u03CD": "\u03C5",
      "\u03CE": "\u03C9",
      "\u03CB": "\u03C5",
      "\u03B0": "\u03C5",
      "\u03C2": "\u03C3"
    });
    lunr.el.normalize = lunr.el.normalizer.normalize;
    lunr.Pipeline.registerFunction(lunr.el.normalizer, "normalizer-el");

    /* fold wildcard terms like the stemmer folds the index (generated by build/derive-fold-maps.js) */
    lunr.el.wildcardNormalizer = lunr.stemmerSupport.generateWildcardNormalizer({
      "\u0390": "\u03B7",
      "\u03AC": "\u03B1",
      "\u03AD": "\u03B5",
      "\u03AE": "\u03B7",
      "\u03AF": "\u03B9",
      "\u03B0": "\u03C5",
      "\u03CA": "\u03B7",
      "\u03CB": "\u03C5",
      "\u03CC": "\u03BF",
      "\u03CD": "\u03C5",
      "\u03CE": "\u03C9"
    }, undefined, lunr.el.normalizer);
    lunr.el.wildcardNormalizer.label = "wildcardNormalizer-el";
    lunr.el.wildcardNormalizer.pipelineFunctionLabel = "stemmer-el";
    lunr.stemmerSupport.addQueryParserWildcardNormalizer(lunr, lunr.el.wildcardNormalizer);


    lunr.el.stopWordFilter = lunr.generateStopWordFilter('αλλα αν αντι απο αυτα αυτεσ αυτη αυτο αυτοι αυτοσ αυτουσ αυτων για δε δεν εαν ειμαι ειμαστε ειναι εισαι ειστε εκεινα εκεινεσ εκεινη εκεινο εκεινοι εκεινοσ εκεινουσ εκεινων ενω επι η θα ισωσ κ και κατα κι μα με μετα μη μην να ο οι ομωσ οπωσ οσο οτι παρα ποια ποιεσ ποιο ποιοι ποιοσ ποιουσ ποιων που προσ πωσ σε στη στην στο στον τα την τησ το τον τοτε του των ωσ'.split(' '));

    lunr.Pipeline.registerFunction(lunr.el.stopWordFilter, 'stopWordFilter-el');
  };
}))