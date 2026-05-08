/*!
 * Lunr languages, `Polish` language
 * https://github.com/MihaiValentin/lunr-languages
 *
 * Copyright 2014, Mihai Valentin
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
    lunr.pl = function() {
      this.pipeline.reset();
      this.pipeline.add(
        lunr.pl.trimmer,
        lunr.pl.stopWordFilter,
        lunr.pl.stemmer
      );

      // for lunr version 2
      // this is necessary so that every searched word is also trimmed and stemmed before
      // in lunr <= 1 this is not needed, as it is done using the normal pipeline
      if (this.searchPipeline) {
        this.searchPipeline.reset();
        this.searchPipeline.add(
          lunr.pl.trimmer,
          lunr.pl.stemmer
        )
      }
    };

    /* lunr trimmer function */
    lunr.pl.wordCharacters = "A-Za-z\xAA\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02B8\u02E0-\u02E4\u1D00-\u1D25\u1D2C-\u1D5C\u1D62-\u1D65\u1D6B-\u1D77\u1D79-\u1DBE\u1E00-\u1EFF\u2071\u207F\u2090-\u209C\u212A\u212B\u2132\u214E\u2160-\u2188\u2C60-\u2C7F\uA722-\uA787\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA7FF\uAB30-\uAB5A\uAB5C-\uAB64\uFB00-\uFB06\uFF21-\uFF3A\uFF41-\uFF5A";
    lunr.pl.trimmer = lunr.trimmerSupport.generateTrimmer(lunr.pl.wordCharacters);

    lunr.Pipeline.registerFunction(lunr.pl.trimmer, 'trimmer-pl');

    /* lunr stemmer function */
    lunr.pl.stemmer = (function() {
      /* create the wrapped stemmer object */
      var Among = lunr.stemmerSupport.Among,
        SnowballProgram = lunr.stemmerSupport.SnowballProgram,
        st = new function PolishStemmer() {
          var derivationalSuffixes = ["owaniami", "owaniach", "owaniem", "owania", "owanie",
              "owania", "owego", "owemu", "owych", "owym", "owej", "aniem",
              "eniach", "eniami", "aniem", "eniem", "aniu", "eniu", "anie",
              "enie"
            ],
            adjectivalSuffixes = ["niejszego", "niejszemu", "niejszym", "niejszej",
              "niejsi", "niejsza", "niejsze", "niejszy", "iego", "iemu",
              "ymi", "ami", "ach", "ego", "owa", "owe", "owi", "iej",
              "ych", "owym", "owej", "owy", "owa", "owe", "ymi", "ami",
              "ach", "ym", "im"
            ],
            nominalSuffixes = ["owie", "owiek", "kami", "kach", "ami",
              "ach", "owie", "owie", "owi", "ami", "ach", "ów", "om", "em",
              "ie"
            ],
            finalSuffixes = ["a", "e", "i", "y", "u", "\u0105", "\u0119"],
            current = "";

          this.setCurrent = function(word) {
            current = word;
          };
          this.getCurrent = function() {
            return current;
          };

          function isVowel(character) {
            return /[aeiouy\u0105\u0119\u00f3]/.test(character);
          }

          function calculateR1(word) {
            var i;

            for (i = 0; i < word.length - 1; i++) {
              if (isVowel(word.charAt(i)) && !isVowel(word.charAt(i + 1))) {
                return i + 2;
              }
            }

            return word.length;
          }

          function stripSuffix(word, suffixes, region, minStemLength) {
            var i, suffix, stemLength;

            for (i = 0; i < suffixes.length; i++) {
              suffix = suffixes[i];
              stemLength = word.length - suffix.length;

              if (stemLength < minStemLength || stemLength < region) {
                continue;
              }

              if (word.slice(stemLength) === suffix) {
                return word.slice(0, stemLength);
              }
            }

            return word;
          }

          this.stem = function() {
            var word = current.toLowerCase(),
              r1;

            if (word.length < 4) {
              current = word;
              return true;
            }

            r1 = calculateR1(word);
            word = stripSuffix(word, derivationalSuffixes, r1, 4);
            word = stripSuffix(word, adjectivalSuffixes, r1, 4);
            word = stripSuffix(word, nominalSuffixes, r1, 4);
            word = stripSuffix(word, finalSuffixes, r1, 3);

            current = word;
            return true;
          }
        };

      /* and return a function that stems a word for the current locale */
      return function(token) {
        // for lunr version 2
        if (typeof token.update === "function") {
          return token.update(function(word) {
            st.setCurrent(word);
            st.stem();
            return st.getCurrent();
          })
        } else { // for lunr version <= 1
          st.setCurrent(token);
          st.stem();
          return st.getCurrent();
        }
      }
    })();

    lunr.Pipeline.registerFunction(lunr.pl.stemmer, 'stemmer-pl');


    lunr.pl.stopWordFilter = lunr.generateStopWordFilter('aby acz aczkolwiek ale ależ ani aż bardziej bardzo bez bo bowiem by byli być był była było były co czy dla do dobrze dość dużo dwa dwie gdy gdzie go i ich im inaczej ja jak jednak jego jej jemu jeszcze jeśli już każdy kiedy kto która które który którzy ku lat lecz lub ma mają mi mimo mnie może mu my na nad nam nas nasz nasza nasze naszego natomiast nawet nie nim niż o od oraz po pod ponieważ przed przez przy sie się sobie sobą sposób swoje są ta tak taka taki te tego tej temu ten to tobie tobą tu twoje tych tychże tylko tym więc więcej wszyscy wszystko z za zawsze że'.split(' '));

    lunr.Pipeline.registerFunction(lunr.pl.stopWordFilter, 'stopWordFilter-pl');
  };
}))