/*!
 * Lunr languages, `Japanese` language
 * https://github.com/MihaiValentin/lunr-languages
 *
 * Copyright 2014, Chad Liu
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
    lunr.ja = function() {
      this.pipeline.reset();
      this.pipeline.add(
        lunr.ja.trimmer,
        lunr.ja.stopWordFilter,
        lunr.ja.stemmer
      );
	  this.tokenizer = lunr.ja.tokenizer;
	  if (this.searchPipeline) {
        this.searchPipeline.reset();
        this.searchPipeline.add(lunr.ja.stemmer)
      }
    };
    var segmenter = new lunr.TinySegmenter(); // インスタンス生成

    lunr.ja.tokenizer = function(obj) {
      var i;
      var str;
      var len;
      var segs;
      var tokens;
      var char;
      var sliceLength;
      var sliceStart;
      var sliceEnd;
      var segStart;

      if (!arguments.length || obj == null || obj == undefined)
        return [];

      if (Array.isArray(obj)) {
        return obj.map(
          function(t) {
            return new lunr.Token(t.toLowerCase());
          }
        );
      }

      str = obj.toString().toLowerCase().replace(/^\s+/, '');
      for (i = str.length - 1; i >= 0; i--) {
        if (/\S/.test(str.charAt(i))) {
          str = str.substring(0, i + 1);
          break;
        }
      }

      tokens = [];
      len = str.length;
      for (sliceEnd = 0, sliceStart = 0; sliceEnd <= len; sliceEnd++) {
        char = str.charAt(sliceEnd);
        sliceLength = sliceEnd - sliceStart;

        if ((char.match(/\s/) || sliceEnd == len)) {
          if (sliceLength > 0) {
            segs = segmenter.segment(str.slice(sliceStart, sliceEnd)).filter(
              function(token) {
                return !!token;
              }
            );

            segStart = sliceStart;
            for (i = 0; i < segs.length; i++) {
				tokens.push(
				  new lunr.Token(
					segs[i], {
					  position: [segStart, segs[i].length],
					  index: tokens.length
					}
				  )
				);
              segStart += segs[i].length;
            }
          }

          sliceStart = sliceEnd + 1;
        }
      }

      return tokens;
    }

    /* lunr stemmer function */
    lunr.ja.stemmer = (function() {

      /* TODO japanese stemmer  */
      return function(word) {
        return word;
      }
    })();
    lunr.Pipeline.registerFunction(lunr.ja.stemmer, 'stemmer-ja');

    /* lunr trimmer function */
    lunr.ja.wordCharacters = "一二三四五六七八九十百千万億兆一-龠々〆ヵヶぁ-んァ-ヴーｱ-ﾝﾞa-zA-Zａ-ｚＡ-Ｚ0-9０-９";
    lunr.ja.trimmer = lunr.trimmerSupport.generateTrimmer(lunr.ja.wordCharacters);
    lunr.Pipeline.registerFunction(lunr.ja.trimmer, 'trimmer-ja');

    /* lunr stop word filter. see http://www.ranks.nl/stopwords/japanese */
    lunr.ja.stopWordFilter = lunr.generateStopWordFilter(
      'これ それ あれ この その あの ここ そこ あそこ こちら どこ だれ なに なん 何 私 貴方 貴方方 我々 私達 あの人 あのかた 彼女 彼 です あります おります います は が の に を で え から まで より も どの と し それで しかし'.split(' '));
    lunr.Pipeline.registerFunction(lunr.ja.stopWordFilter, 'stopWordFilter-ja');

  };
}))