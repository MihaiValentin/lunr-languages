/*!
 * Lunr languages, Chinese word segmentation with jieba
 * https://github.com/MihaiValentin/lunr-languages
 *
 * Uses @node-rs/jieba (v1 or v2, https://github.com/napi-rs/node-rs, MIT), jieba-rs as a native Node.js add-on,
 * which has to be installed separately. lunr.zh.jieba-wasm.js uses the same jieba-rs compiled to WebAssembly,
 * which also runs in browsers. Optional: lunr.zh segments with Intl.Segmenter plus CJK bigrams unless a jieba
 * file is loaded.
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
    // Node and CommonJS-like environments that support module.exports
    module.exports = factory(typeof require === 'function' ? require : undefined)
  } else {
    // Browser globals (root is window)
    factory()(root.lunr);
  }
}(this, function(requireFn) {
  var load = function(name) {
    if (typeof requireFn !== 'function') {
      throw new Error('lunr.zh.jieba.js needs Node.js: @node-rs/jieba is a native package and does not run in browsers.')
    }
    try {
      return requireFn(name)
    } catch (e) {
      throw new Error('lunr.zh.jieba.js needs @node-rs/jieba: npm install @node-rs/jieba (' + e.message + ')')
    }
  }

  // the default dictionary of @node-rs/jieba v2
  var defaultDict = function() {
    var module = load('@node-rs/jieba/dict')
    return module && (module.dict || module.default || module)
  }

  // a jieba instance with cut(str, searchMode): v1 is one itself, v2 is created from a dictionary
  var createJieba = function(jieba, customDict) {
    if (typeof jieba.cut === 'function') {
      if (customDict) {
        if (typeof jieba.loadDict === 'function') {
          jieba.loadDict(customDict)
        } else if (typeof jieba.load === 'function') {
          jieba.load(customDict)
        }
      }
      return jieba
    }

    if (jieba.Jieba && typeof jieba.Jieba.withDict === 'function') {
      var instance = jieba.Jieba.withDict(defaultDict())
      if (customDict) {
        if (typeof instance.loadDict === 'function') {
          instance.loadDict(customDict)
        } else {
          instance = jieba.Jieba.withDict(customDict)
        }
      }
      return instance
    }

    throw new Error('lunr.zh.jieba.js: @node-rs/jieba has neither cut() (v1) nor Jieba.withDict() (v2)')
  }

  /*
   * Registers jieba as the segmenter of lunr.zh, in any order with lunr.zh.js (lunr.zh uses it from its next
   * tokenization on). `customDict` is a jieba dictionary added to the default one, once, here (not on every
   * tokenization, which made indexing slow in 1.x). Loading it again replaces the registration, with the
   * dictionary given then.
   */
  return function(lunr, customDict) {
    var jieba = createJieba(load('@node-rs/jieba'), customDict)

    lunr.segmenters = lunr.segmenters || {}
    lunr.segmenters.zh = {
      name: 'jieba',
      // the words of a string with their offsets, in jieba's search mode
      segment: function(str) {
        var words = []
        var fromIndex = 0

        jieba.cut(str, true).forEach(function(segment) {
          segment.split(' ').forEach(function(word) {
            if (!word) return
            var index = str.indexOf(word, fromIndex)
            if (index === -1) return
            words.push({ word: word, index: index })
            fromIndex = index
          })
        })

        return words
      }
    }
  }
}))
