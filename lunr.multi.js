/**
 * export the module via AMD, CommonJS or as a browser global
 * Export code from https://github.com/umdjs/umd/blob/master/returnExports.js
 */
;(function (root, factory) {
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
}(this, function () {
    /**
     * Just return a value to define the module export.
     * This example returns an object, but the module
     * can return a function as the exported value.
     */
    return function(lunr) {
        /* Set up the pipeline for indexing content in multiple languages. The
           corresponding lunr.{lang} files must be loaded before calling this
           function. For English ('en'), lunr.en.js is used when it is loaded,
           and lunr's built-in English otherwise.

           Returns: a lunr plugin for use in your indexer.

           Known drawback: every word will be stemmed with stemmers for every
           language. This could mean that sometimes words that have the same
           stemming root will not be stemmed as such.
           */
        lunr.multiLanguage = function(/* lang1, lang2, ... */) {
            var languages = Array.prototype.slice.call(arguments);
            // lunr's built-in English is 'builtin' in the labels, so they differ from those with lunr.en
            var nameSuffix = languages.map(function(language) {
                return language == 'en' && !lunr.en ? 'builtin' : language;
            }).join('-');
            var wordCharacters = "";
            var pipeline = [];
            var normalizers = [];
            var accentFolds = [];
            var stemmers = [];
            var tokenizers = [];
            for (var i = 0; i < languages.length; ++i) {
                if (languages[i] == 'en' && !lunr.en) {
                    wordCharacters += '\\w';
                    pipeline.unshift(lunr.stopWordFilter);
                    stemmers.push(lunr.stemmer);
                } else {
                    wordCharacters += lunr[languages[i]].wordCharacters;
                    if (lunr[languages[i]].stopWordFilter) {
                        pipeline.unshift(lunr[languages[i]].stopWordFilter);
                    }
                    // a language's normalizer (Persian) runs before the stop word filters, as in lunr.<locale>
                    if (lunr[languages[i]].normalizer) {
                        normalizers.push(lunr[languages[i]].normalizer);
                    }
                    // a language's accent folding that is on by default runs before all stemmers
                    if (lunr[languages[i]].accentFold && lunr[languages[i]].accentFold.isDefault) {
                        accentFolds.push(lunr[languages[i]].accentFold);
                    }
                    if (lunr[languages[i]].stemmer) {
                        stemmers.push(lunr[languages[i]].stemmer);
                    }
                    if (lunr[languages[i]].tokenizer) {
                        tokenizers.push(lunr[languages[i]].tokenizer);
                    }
                }
            };
            pipeline = normalizers.concat(pipeline, accentFolds, stemmers);
            var searchPipeline = normalizers.concat(accentFolds, stemmers);
            var multiTrimmer = lunr.trimmerSupport.generateTrimmer(wordCharacters);
            lunr.Pipeline.registerFunction(multiTrimmer, 'lunr-multi-trimmer-' + nameSuffix);
            pipeline.unshift(multiTrimmer);

            if (tokenizers.length > 0) {
                // lunr's tokens plus those of each language tokenizer, without duplicates
                var multiTokenizer = lunr.stemmerSupport.combineTokenizers(tokenizers);

                if (lunr.tokenizer.registerFunction) {
                    lunr.tokenizer.registerFunction(multiTokenizer, 'lunr-multi-tokenizer-' + nameSuffix);
                }
            }

            return function() {
                this.pipeline.reset();

                this.pipeline.add.apply(this.pipeline, pipeline);

                if (multiTokenizer) {
                    this.tokenizer = multiTokenizer;
                }

                // every searched word is also stemmed
                this.searchPipeline.reset();
                this.searchPipeline.add.apply(this.searchPipeline, searchPipeline);
            };
        }
    }
}));
