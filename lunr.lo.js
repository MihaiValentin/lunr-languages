/*!
 * Lunr languages, `Lao` language
 * https://github.com/MihaiValentin/lunr-languages
 *
 * Copyright 2025, phatsss
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
(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    // AMD. Register as an anonymous module.
    define(factory);
  } else if (typeof exports === "object") {
    /**
     * Node. Does not work with strict CommonJS, but
     * only CommonJS-like environments that support module.exports,
     * like Node.
     */
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    factory()(root.lunr);
  }
})(this, function() {
  /**
   * Just return a value to define the module export.
   * This example returns an object, but the module
   * can return a function as the exported value.
   */
  return function(lunr) {
    /* throw error if lunr is not yet included */
    if ("undefined" === typeof lunr) {
      throw new Error(
        "Lunr is not present. Please include / require Lunr before this script."
      );
    }

    /* throw error if lunr stemmer support is not yet included */
    if ("undefined" === typeof lunr.stemmerSupport) {
      throw new Error(
        "Lunr stemmer support is not present. Please include / require Lunr stemmer support before this script."
      );
    }

    var isLunr2 = lunr.version && lunr.version[0] == "2";

    /* register specific locale function */
    lunr.lo = function() {
      this.pipeline.reset();
      this.pipeline.add(lunr.lo.trimmer, lunr.lo.stemmer);

      if (isLunr2) {
        // for lunr version 2.0.0
        this.tokenizer = lunr.lo.tokenizer;
      } else {
        if (lunr.tokenizer) {
          // for lunr version 0.6.0
          lunr.tokenizer = lunr.lo.tokenizer;
        }
        if (this.tokenizerFn) {
          // for lunr version 0.7.0 -> 1.0.0
          this.tokenizerFn = lunr.lo.tokenizer;
        }
      }
    };

    /* lunr trimmer function */
    // Expanded character set to include all Lao characters and tone marks
    lunr.lo.wordCharacters = [
      // Lao consonants
      "\u0E81",
      "\u0E82",
      "\u0E84",
      "\u0E87",
      "\u0E88",
      "\u0E8A",
      "\u0E8D",
      "\u0E94",
      "\u0E95",
      "\u0E96",
      "\u0E97",
      "\u0E99",
      "\u0E9A",
      "\u0E9B",
      "\u0E9C",
      "\u0E9D",
      "\u0E9E",
      "\u0E9F",
      "\u0EA1",
      "\u0EA2",
      "\u0EA3",
      "\u0EA5",
      "\u0EA7",
      "\u0EAA",
      "\u0EAB",
      "\u0EAD",
      "\u0EAE",
      "\u0EDC",
      "\u0EDD",
      "\u0EDC",
      "\u0EBC",
      // Lao vowels and tone marks
      "\u0EC8",
      "\u0EC9",
      "\u0ECA",
      "\u0ECB",
      "\u0ECD",
      "\u0EB4",
      "\u0EB5",
      "\u0EB6",
      "\u0EB8",
      "\u0EB9",
      "\u0EB7",
      "\u0EBB",
      "\u0EC0",
      "\u0EC2",
      "\u0EC3",
      "\u0EC4",
    ].join("");
    lunr.lo.trimmer = lunr.trimmerSupport.generateTrimmer(
      lunr.lo.wordCharacters
    );
    lunr.Pipeline.registerFunction(lunr.lo.trimmer, "trimmer-lo");

    /* lunr tokenizer function */
    lunr.lo.tokenizer = function(obj) {
      if (!arguments.length || obj == null || obj == undefined) return [];
      if (Array.isArray(obj))
        return obj.map(function(t) {
          return isLunr2 ? new lunr.Token(t.toLowerCase()) : t.toLowerCase();
        });

      var str = obj.toString().toLowerCase();

      // Check if this is a phrase search (enclosed in quotes)
      var isPhrase = /^".*"$/.test(str);
      if (isPhrase) {
        // For phrase searches, just return the phrase without quotes
        var phrase = str.substring(1, str.length - 1);
        if (isLunr2) {
          return [new lunr.Token(phrase)];
        } else {
          return [phrase];
        }
      }

      // For normal text, use comprehensive tokenization
      var tokens = [];

      // Add the whole string as a token
      if (isLunr2) {
        tokens.push(new lunr.Token(str));
      } else {
        tokens.push(str);
      }

      // Split by whitespace first
      var words = str.split(/[\s\u0020\u00a0\u3000]+/);
      for (var i = 0; i < words.length; i++) {
        var word = words[i].trim();
        if (word.length > 0) {
          // Add each word
          if (isLunr2) {
            tokens.push(new lunr.Token(word));
          } else {
            tokens.push(word);
          }
        }
      }

      // Add each character as a token
      for (var i = 0; i < str.length; i++) {
        if (isLunr2) {
          tokens.push(new lunr.Token(str[i]));
        } else {
          tokens.push(str[i]);
        }
      }

      // Add all possible substrings of length 2 or more
      for (var start = 0; start < str.length; start++) {
        for (var end = start + 2; end <= str.length; end++) {
          var substring = str.substring(start, end);
          if (isLunr2) {
            tokens.push(new lunr.Token(substring));
          } else {
            tokens.push(substring);
          }
        }
      }

      return tokens;
    };

    if (isLunr2) {
      // for lunr version 2.0.0
      lunr.Pipeline.registerFunction(lunr.lo.tokenizer, "tokenizer-lo");
    }

    /* lunr stemmer function */
    lunr.lo.stemmer = (function() {
      /* disable stemming for Lao */
      return function(word) {
        return word;
      };
    })();
    lunr.Pipeline.registerFunction(lunr.lo.stemmer, "stemmer-lo");

    /* stop word filter function */
    lunr.lo.stopWordFilter = function(token) {
      if (lunr.lo.stopWords.indexOf(token) === -1) {
        return token;
      }
    };

    // Common Lao stop words
    lunr.lo.stopWords = [
      "ແລະ",
      "ຫຼື",
      "ໃນ",
      "ທີ່",
      "ຂອງ",
      "ກັບ",
      "ໄດ້",
      "ແຕ່",
      "ຈາກ",
      "ເປັນ",
      "ການ",
      "ມີ",
      "ໃຫ້",
      "ຢູ່",
      "ວ່າ",
      "ດ້ວຍ",
      "ແລ້ວ",
      "ເມື່ອ",
      "ຕາມ",
      "ຄວາມ",
    ];

    lunr.Pipeline.registerFunction(lunr.lo.stopWordFilter, "stopWordFilter-lo");
  };
});