/*!
 * Loosely based on lunr.ja.js.
 * Depends on https://github.com/rakuten-nlp/rakutenma
 * For indexing, must at least load:
 *   rakutenma.js
 *   model_zh.js
 *   zh_chardic.js
 *   hanzenkaku.js
 * Those are not required for searching an index, but this file
 * is required at search to provide registered stemmer.
 *
 * Paul Tyson, Oberon Technologies
 */
/*!
 * Lunr languages, `Chinese` language
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

    /*
      Chinese tokenization is trickier, since it does not
      take into account spaces.
      Since the tokenization function is represented different
      internally for each of the Lunr versions, this had to be done
      in order to try to try to pick the best way of doing this based
      on the Lunr version
    */
    var isLunr2 = lunr.version[0] == "2";

    /* register specific locale function */
    lunr.zh = function() {
      this.pipeline.reset();
      this.pipeline.add(
        lunr.zh.trimmer,
        lunr.zh.stopWordFilter,
        lunr.zh.stemmer
      );

      // change the tokenizer for Chinese one
      if (isLunr2) { // for lunr version 2.0.0
        this.tokenizer = lunr.zh.tokenizer;
      } else {
        if (lunr.tokenizer) { // for lunr version 0.6.0
          lunr.tokenizer = lunr.zh.tokenizer;
        }
        if (this.tokenizerFn) { // for lunr version 0.7.0 -> 1.0.0
          this.tokenizerFn = lunr.zh.tokenizer;
        }
      }
    };

    var rma;
    try {
      rma = new RakutenMA(model_zh);
      rma.featset = RakutenMA.default_featset_zh;
      rma.hash_func = RakutenMA.create_hash_func(15);
      rma.ctype_func = RakutenMA.create_ctype_chardic_func(chardic);
    } catch (e) {
      /* OK: only needed for indexing, not searching */
    }

    lunr.zh.tokenizer = function(obj) {
      var str = obj;
      var tokens;

      if (!rma || !arguments.length || obj == null || obj == undefined)
        return [];

      if (Array.isArray(obj)) {
        return obj.map(
          function(t) {
            return isLunr2 ? new lunr.Token(t.toLowerCase()) : t.toLowerCase();
          }
        );
      }

      tokens = rma.tokenize(HanZenKaku.hs2fs(
        HanZenKaku.hw2fw(
          HanZenKaku.h2z(str)))).filter(function(e) {
        return e[1] !== 'PU';
      }).map(function(e, i, a) {
        var t = e[0].trim().toLowerCase();
        if (isLunr2) {
          return new lunr.Token(t, {
            "index": i
          });
        } else {
          return t;
        }
      });

      return tokens;
    }

    /* lunr stemmer function */
    lunr.zh.stemmer = (function() {

      /* TODO Chinese stemmer  */
      return function(word) {
        return word.toString().toLowerCase();
      }
    })();
    lunr.Pipeline.registerFunction(lunr.zh.stemmer, 'stemmer-zh');

    /* lunr trimmer function */
    lunr.zh.wordCharacters = "\\u4e00-\\u9fffa-zA-Zａ-ｚＡ-Ｚ0-9０-９";
    lunr.zh.trimmer = lunr.trimmerSupport.generateTrimmer(lunr.zh.wordCharacters);
    lunr.Pipeline.registerFunction(lunr.zh.trimmer, 'trimmer-zh');

    /* lunr stop word filter. see http://www.ranks.nl/stopwords/chinese-stopwords */
    lunr.zh.stopWordFilter = lunr.generateStopWordFilter(
      '的 一 不 在 人 有 是 为 以 于 上 他 而 后 之 来 及 了 因 下 可 到 由 这 与 也 此 但 并 个 其 已 无 小 我 们 起 最 再 今 去 好 只 又 或 很 亦 某 把 那 你 乃 它 吧 被 比 别 趁 当 从 到 得 打 凡 儿 尔 该 各 给 跟 和 何 还 即 几 既 看 据 距 靠 啦 了 另 么 每 们 嘛 拿 哪 那 您 凭 且 却 让 仍 啥 如 若 使 谁 虽 随 同 所 她 哇 嗡 往 哪 些 向 沿 哟 用 于 咱 则 怎 曾 至 致 着 诸 自'.split(' '));
    lunr.Pipeline.registerFunction(lunr.zh.stopWordFilter, 'stopWordFilter-zh');

  };
}))