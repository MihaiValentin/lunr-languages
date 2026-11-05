/*!
 * Lunr languages, Chinese word segmentation with jieba-wasm
 * https://github.com/MihaiValentin/lunr-languages
 *
 * Uses jieba-wasm (https://github.com/fengkx/jieba-wasm, MIT), jieba-rs compiled to WebAssembly, which has to
 * be installed separately. It runs in Node.js and browsers and segments like lunr.zh.jieba.js (@node-rs/jieba,
 * also jieba-rs), so an index built with either can be searched with the other. Optional: lunr.zh segments
 * with Intl.Segmenter plus CJK bigrams unless a jieba file is loaded.
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
    // Browser globals: jieba-wasm has to be initialized first (await init()), so this file can't apply itself;
    // call lunrZhJiebaWasm(lunr, customDict, jiebaWasm) with the initialized module
    root.lunrZhJiebaWasm = factory()
  }
}(this, function(requireFn) {
  var load = function() {
    if (typeof requireFn !== 'function') {
      throw new Error('lunr.zh.jieba-wasm.js: in browsers, pass the initialized jieba-wasm module: ' +
        'await init(); lunrZhJiebaWasm(lunr, customDict, jiebaWasm).')
    }
    try {
      return requireFn('jieba-wasm')
    } catch (e) {
      throw new Error('lunr.zh.jieba-wasm.js needs jieba-wasm: npm install jieba-wasm (' + e.message + ')')
    }
  }

  /*
   * Registers jieba-wasm as the segmenter of lunr.zh, in any order with lunr.zh.js (lunr.zh uses it from its next
   * tokenization on). `customDict` (a jieba dictionary, text or bytes) is added to the default one, once, here.
   * `jiebaWasm` is the jieba-wasm module, required in browsers (initialized), loaded by this file in Node.js.
   */
  return function(lunr, customDict, jiebaWasm) {
    var jieba = jiebaWasm || load()
    if (typeof jieba.cut !== 'function') {
      throw new Error('lunr.zh.jieba-wasm.js: this is not the jieba-wasm module (no cut())')
    }
    try {
      jieba.cut('', true)
    } catch (e) {
      throw new Error('lunr.zh.jieba-wasm.js: jieba-wasm is not initialized; call its init() first (' + e.message + ')')
    }
    if (customDict) {
      jieba.with_dict(typeof customDict === 'string' ? customDict : new TextDecoder().decode(customDict))
    }

    lunr.segmenters = lunr.segmenters || {}
    lunr.segmenters.zh = {
      name: 'jieba-wasm',
      // the words of a string with their offsets
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
