/*!
 * Lunr languages, `Chinese` language
 * https://github.com/MihaiValentin/lunr-languages
 *
 * Copyright 2019, Felix Lian (repairearth)
 * http://www.mozilla.org/MPL/
 */
/*!
 * based on
 * Snowball zhvaScript Library v0.3
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
  /*
   * Intl.Segmenter's words plus a bigram for each pair of CJK characters, which helps common two-character
   * search terms (车主, 学姐); sorted by offset, without duplicates.
   */
  var withBigrams = function(words, str) {
    var seen = {}
    var out = []
    var add = function(word, index) {
      var key = word + '@' + index
      if (!word || seen[key]) return
      seen[key] = true
      out.push({
        word: word,
        index: index
      })
    }

    words.forEach(function(w) {
      add(w.word, w.index)
    })

    var cjk = /[\u3400-\u9fff\uf900-\ufaff]+/g
    var match
    while ((match = cjk.exec(str))) {
      for (var i = 0; i < match[0].length - 1; i++) {
        add(match[0].slice(i, i + 2), match.index + i)
      }
    }

    return out.sort(function(a, b) {
      return a.index - b.index
    })
  }

  return function(lunr, customDict) {
    /* throw error if lunr is not yet included */
    if ('undefined' === typeof lunr) {
      throw new Error('Lunr is not present. Please include / require Lunr before this script.');
    }

    /* throw error if lunr stemmer support is not yet included */
    if ('undefined' === typeof lunr.stemmerSupport) {
      throw new Error('Lunr stemmer support is not present. Please include / require Lunr stemmer support before this script.');
    }

    /* custom jieba dictionaries moved to the jieba plugin */
    if (customDict !== undefined) {
      throw new Error('A custom Chinese dictionary needs jieba: require(\'lunr-languages/lunr.zh.jieba\')(lunr, dictionary).');
    }

    /* register specific locale function */
    lunr.zh = function() {
      this.pipeline.reset();
      this.pipeline.add(
        lunr.zh.trimmer,
        lunr.zh.stopWordFilter,
        lunr.zh.stemmer
      );

      // searched words are stemmed like indexed ones (not with lunr's English stemmer)
      this.searchPipeline.reset();
      this.searchPipeline.add(lunr.zh.stemmer);

      // change the tokenizer for Chinese one
      this.tokenizer = lunr.zh.tokenizer;
    };

    /*
     * Chinese is written without spaces between words: segmented with Intl.Segmenter plus CJK bigrams, or
     * with jieba when lunr.zh.jieba.js is loaded (before or after this file). Without both, tokenizing throws.
     */
    lunr.zh.tokenizer = lunr.stemmerSupport.generateSegmentingTokenizer('zh', {
      intlLocale: 'zh',
      intlWords: withBigrams,
      missing: 'Chinese tokenization needs Intl.Segmenter or lunr.zh.jieba.js (Node.js with @node-rs/jieba). ' +
        'In browsers without Intl.Segmenter there is no fallback.'
    });

    /* lunr trimmer function */
    lunr.zh.wordCharacters = "\\w\u4e00-\u9fa5";
    lunr.zh.trimmer = lunr.trimmerSupport.generateTrimmer(lunr.zh.wordCharacters);
    lunr.Pipeline.registerFunction(lunr.zh.trimmer, 'trimmer-zh');

    /* lunr stemmer function */
    lunr.zh.stemmer = (function() {

      /* TODO Chinese stemmer  */
      return function(word) {
        return word;
      }
    })();
    lunr.Pipeline.registerFunction(lunr.zh.stemmer, 'stemmer-zh');

    /* lunr stop word filter. see https://www.ranks.nl/stopwords/chinese-stopwords */
    lunr.zh.stopWordFilter = lunr.generateStopWordFilter(
      '的 一 不 在 人 有 是 为 為 以 于 於 上 他 而 后 後 之 来 來 及 了 因 下 可 到 由 这 這 与 與 也 此 但 并 並 个 個 其 已 无 無 小 我 们 們 起 最 再 今 去 好 只 又 或 很 亦 某 把 那 你 乃 它 吧 被 比 别 趁 当 當 从 從 得 打 凡 儿 兒 尔 爾 该 該 各 给 給 跟 和 何 还 還 即 几 幾 既 看 据 據 距 靠 啦 另 么 麽 每 嘛 拿 哪 您 凭 憑 且 却 卻 让 讓 仍 啥 如 若 使 谁 誰 虽 雖 随 隨 同 所 她 哇 嗡 往 些 向 沿 哟 喲 用 咱 则 則 怎 曾 至 致 着 著 诸 諸 自'.split(' '));
    lunr.Pipeline.registerFunction(lunr.zh.stopWordFilter, 'stopWordFilter-zh');
    lunr.stemmerSupport.addTokenizer('zh', lunr.zh.tokenizer);
  };
}))