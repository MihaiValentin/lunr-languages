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
    module.exports = factory(root, typeof require === 'function' ? require : undefined)
  } else {
    // Browser globals (root is window)
    factory(root)(root.lunr);
  }
}(this, function(root, requireFn) {
  /**
   * Just return a value to define the module export.
   * This example returns an object, but the module
   * can return a function as the exported value.
   */
  var nodejieba;
  var nodejiebaDefaultDict;
  var nodejiebaDefaultDictResolved = false;
  var nodejiebaDefaultInstance;
  var nodejiebaCustomDict;
  var nodejiebaCustomInstance;
  var nodejiebaLoadedCustomDict;
  var nodejiebaResolved = false;
  var nodejiebaMissingLogged = false;
  var nodejiebaDictFallbackLogged = false;
  var intlSegmenter;

  var getGlobal = function() {
    if (typeof globalThis !== 'undefined') return globalThis
    if (typeof window !== 'undefined') return window
    if (typeof global !== 'undefined') return global
    return root
  }

  var isNode = function() {
    return typeof module !== 'undefined' && module.exports && typeof requireFn === 'function'
  }

  var logNodeJiebaUnavailable = function() {
    if (!nodejiebaMissingLogged && typeof console !== 'undefined' && console.info) {
      console.info('[Lunr Languages] @node-rs/jieba is not installed or could not be loaded; falling back to Intl.Segmenter for Chinese tokenization.')
      nodejiebaMissingLogged = true
    }
  }

  var getNodeJieba = function() {
    if (nodejiebaResolved) return nodejieba

    nodejiebaResolved = true

    if (!isNode()) return null

    try {
      nodejieba = requireFn('@node-rs/jieba')
      return nodejieba
    } catch (e) {
      logNodeJiebaUnavailable()
      return null
    }
  }

  var getNodeJiebaDefaultDict = function() {
    if (nodejiebaDefaultDictResolved) return nodejiebaDefaultDict

    nodejiebaDefaultDictResolved = true

    try {
      var defaultDictModule = requireFn('@node-rs/jieba/dict')
      nodejiebaDefaultDict = defaultDictModule && (defaultDictModule.dict || defaultDictModule.default || defaultDictModule)
      return nodejiebaDefaultDict
    } catch (e) {
      logNodeJiebaUnavailable()
      return null
    }
  }

  var createNodeJiebaV2 = function(jieba, nodejiebaDictJson) {
    if (!jieba.Jieba || typeof jieba.Jieba.withDict !== 'function') return null

    if (nodejiebaDictJson) {
      if (nodejiebaCustomInstance && nodejiebaCustomDict === nodejiebaDictJson) return nodejiebaCustomInstance

      var defaultDictForCustom = getNodeJiebaDefaultDict()

      try {
        if (defaultDictForCustom) {
          nodejiebaCustomInstance = jieba.Jieba.withDict(defaultDictForCustom)
          if (typeof nodejiebaCustomInstance.loadDict === 'function') {
            nodejiebaCustomInstance.loadDict(nodejiebaDictJson)
          } else {
            nodejiebaCustomInstance = jieba.Jieba.withDict(nodejiebaDictJson)
          }
        } else {
          nodejiebaCustomInstance = jieba.Jieba.withDict(nodejiebaDictJson)
        }

        nodejiebaCustomDict = nodejiebaDictJson
        return nodejiebaCustomInstance
      } catch (e) {
        logNodeJiebaUnavailable()
        return null
      }
    }

    if (nodejiebaDefaultInstance) return nodejiebaDefaultInstance

    var defaultDict = getNodeJiebaDefaultDict()
    if (!defaultDict) return null

    try {
      nodejiebaDefaultInstance = jieba.Jieba.withDict(defaultDict)
      return nodejiebaDefaultInstance
    } catch (e) {
      logNodeJiebaUnavailable()
      return null
    }
  }

  var getNodeJiebaTokenizer = function(nodejiebaDictJson) {
    var jieba = getNodeJieba()

    if (!jieba) return null

    if (typeof jieba.cut === 'function') {
      if (nodejiebaDictJson && nodejiebaLoadedCustomDict !== nodejiebaDictJson) {
        if (typeof jieba.loadDict === 'function') {
          jieba.loadDict(nodejiebaDictJson)
        } else if (typeof jieba.load === 'function') {
          jieba.load(nodejiebaDictJson)
        }
        nodejiebaLoadedCustomDict = nodejiebaDictJson
      }
      return jieba
    }

    var jiebaV2 = createNodeJiebaV2(jieba, nodejiebaDictJson)
    if (jiebaV2) return jiebaV2

    logNodeJiebaUnavailable()
    return null
  }

  var getIntlSegmenter = function() {
    if (intlSegmenter) return intlSegmenter

    var globalObj = getGlobal()

    if (globalObj.Intl && globalObj.Intl.Segmenter) {
      intlSegmenter = new globalObj.Intl.Segmenter('zh', {
        granularity: 'word'
      })
      return intlSegmenter
    }

    return null
  }

  var addToken = function(tokens, seen, token, start) {
    if (!token) return

    var key = token + '@' + start
    if (seen[key]) return

    seen[key] = true
    tokens.push({
      token: token,
      start: start
    })
  }

  var intlSegmenterCut = function(str) {
    var segmenter = getIntlSegmenter()

    if (!segmenter) {
      var message

      if (isNode()) {
        message = '[Lunr Languages] Chinese tokenization requires either @node-rs/jieba or Intl.Segmenter support.'
      } else {
        message = '[Lunr Languages] Chinese tokenization requires a browser with Intl.Segmenter support. No frontend fallback is available.'
      }

      if (typeof console !== 'undefined' && console.error) console.error(message)
      throw new Error(message)
    }

    var tokens = []
    var seen = {}

    var iterator = segmenter.segment(str)[Symbol.iterator]()
    var current

    while (!(current = iterator.next()).done) {
      var segment = current.value
      if (segment.isWordLike) addToken(tokens, seen, segment.segment, segment.index)
    }

    var cjkRegex = /[\u3400-\u9fff\uf900-\ufaff]+/g
    var match

    while ((match = cjkRegex.exec(str))) {
      var run = match[0]

      for (var i = 0; i < run.length - 1; i++) {
        addToken(tokens, seen, run.slice(i, i + 2), match.index + i)
      }
    }

    tokens.sort(function(a, b) {
      return a.start - b.start
    })

    return tokens
  }

  var nodejiebaCut = function(str, nodejiebaDictJson) {
    var jieba = getNodeJiebaTokenizer(nodejiebaDictJson)

    if (!jieba) {
      if (nodejiebaDictJson && !nodejiebaDictFallbackLogged && typeof console !== 'undefined' && console.info) {
        console.info('[Lunr Languages] Custom Chinese dictionaries require @node-rs/jieba and are ignored by the Intl.Segmenter fallback.')
        nodejiebaDictFallbackLogged = true
      }

      return intlSegmenterCut(str)
    }

    var tokens = []
    var fromIndex = 0

    jieba.cut(str, true).forEach(function(seg) {
      seg.split(' ').forEach(function(token) {
        if (!token) return

        var start = str.indexOf(token, fromIndex)
        tokens.push({
          token: token,
          start: start
        })
        fromIndex = start
      })
    })

    return tokens
  }

  return function(lunr, nodejiebaDictJson) {
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

    lunr.zh.tokenizer = function(obj) {
      if (!arguments.length || obj == null || obj == undefined) return []
      if (Array.isArray(obj)) return obj.map(function(t) {
        return isLunr2 ? new lunr.Token(t.toLowerCase()) : t.toLowerCase()
      })

      var str = obj.toString().trim().toLowerCase();
      var tokens = nodejiebaCut(str, nodejiebaDictJson);

      return tokens.map(function(token, index) {
        if (isLunr2) {
          var tokenMetadata = {}
          tokenMetadata["position"] = [token.start, token.token.length]
          tokenMetadata["index"] = index

          return new lunr.Token(token.token, tokenMetadata);
        } else {
          return token.token
        }
      });
    }

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
  };
}))