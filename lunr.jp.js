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
    lunr.jp = function() {
      this.pipeline.reset();
      this.pipeline.add(
        lunr.jp.stopWordFilter,
        lunr.jp.stemmer
      );
      // change the tokenizer for japanese one
      lunr.tokenizer = lunr.jp.tokenizer;
    };
    var segmenter = new TinySegmenter();  // インスタンス生成

    lunr.jp.tokenizer = function (obj) {
        if (!arguments.length || obj == null || obj == undefined) return []
        if (Array.isArray(obj)) return obj.map(function (t) { return t.toLowerCase() })

        var str = obj.toString().replace(/^\s+/, '')

        for (var i = str.length - 1; i >= 0; i--) {
            if (/\S/.test(str.charAt(i))) {
                str = str.substring(0, i + 1)
                break
            }
        }

                     
        var segs = segmenter.segment(str);  // 単語の配列が返る
        return segs.filter(function (token) {
            return !!token
          })
          .map(function (token) {
            return token
          })
    }

    /* lunr stemmer function */
    lunr.jp.stemmer = (function() {
      
      /* TODO japanese stemmer  */
      return function(word) {
        return word;
      }
    })();

    lunr.Pipeline.registerFunction(lunr.jp.stemmer, 'stemmer-jp');
    lunr.jp.wordCharacters = "一二三四五六七八九十百千万億兆一-龠々〆ヵヶぁ-んァ-ヴーｱ-ﾝﾞa-zA-Zａ-ｚＡ-Ｚ0-9０-９"

    /* stop word filter function */
    lunr.jp.stopWordFilter = function(token) {
      if (lunr.jp.stopWordFilter.stopWords.indexOf(token) === -1) {
        return token;
      }
    };

    lunr.jp.stopWordFilter.stopWords = new lunr.SortedSet();
    lunr.jp.stopWordFilter.stopWords.length = 45;

    // The space at the beginning is crucial: It marks the empty string
    // as a stop word. lunr.js crashes during search when documents
    // processed by the pipeline still contain the empty string.
    // stopword for japanese is from http://www.ranks.nl/stopwords/japanese
    lunr.jp.stopWordFilter.stopWords.elements = ' これ それ あれ この その あの ここ そこ あそこ こちら どこ だれ なに なん 何 私 貴方 貴方方 我々 私達 あの人 あのかた 彼女 彼 です あります おります います は が の に を で え から まで より も どの と し それで しかし'.split(' ');
    lunr.Pipeline.registerFunction(lunr.jp.stopWordFilter, 'stopWordFilter-jp');
  };
}))
