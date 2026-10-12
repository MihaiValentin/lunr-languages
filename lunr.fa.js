/*!
 * Lunr languages, `Persian` (Farsi) language
 * https://github.com/MihaiValentin/lunr-languages
 *
 * Copyright 2023, Seyed Masih Sajadi
 * http://www.mozilla.org/MPL/
 */
/*!
 * The stemmer is Snowball's Persian stemmer, generated from persian.sbl by
 * Snowball 3.1.1 (https://github.com/snowballstem/snowball, tag v3.1.1, commit
 * cd195b5) and its base-stemmer.js, ported by hand to ES5 so it runs without
 * classes or imports. The rules and tables are unchanged.
 *
 * Copyright (c) 2001, Dr Martin Porter
 * Copyright (c) 2004,2005, Richard Boulton
 * Copyright (c) 2013, Yoshiki Shibukawa
 * Copyright (c) 2006-2025, Olly Betts
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 *
 *   1. Redistributions of source code must retain the above copyright notice,
 *      this list of conditions and the following disclaimer.
 *   2. Redistributions in binary form must reproduce the above copyright notice,
 *      this list of conditions and the following disclaimer in the documentation
 *      and/or other materials provided with the distribution.
 *   3. Neither the name of the Snowball project nor the names of its contributors
 *      may be used to endorse or promote products derived from this software
 *      without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
 * ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * export the module via AMD, CommonJS or as a browser global
 * Export code from https://github.com/umdjs/umd/blob/master/returnExports.js
 */
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(factory);
  } else if (typeof exports === 'object') {
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
    if ('undefined' === typeof lunr) {
      throw new Error(
        'Lunr is not present. Please include / require Lunr before this script.'
      );
    }

    /* throw error if lunr stemmer support is not yet included */
    if ('undefined' === typeof lunr.stemmerSupport) {
      throw new Error(
        'Lunr stemmer support is not present. Please include / require Lunr stemmer support before this script.'
      );
    }

    /* register specific locale function */
    lunr.fa = function() {
      this.pipeline.reset();
      this.pipeline.add(
        lunr.fa.trimmer,
        lunr.fa.normalizer,
        lunr.fa.stopWordFilter,
        lunr.fa.stemmer
      );

      // for lunr version 2
      // this is necessary so that every searched word is also trimmed, normalized
      // and stemmed before; in lunr <= 1 this is done by the normal pipeline
      if (this.searchPipeline) {
        this.searchPipeline.reset();
        this.searchPipeline.add(
          lunr.fa.trimmer,
          lunr.fa.normalizer,
          lunr.fa.stemmer
        );
      }
    };

    /* lunr trimmer function */
    // Arabic-script letters and digits, plus ZWNJ (U+200C, the Persian
    // half-space) so it stays inside words: «می‌کنند», «کتاب‌ها». The stemmer
    // uses it to find prefixes and suffixes. Latin letters too: Persian pages
    // mix in English names and models («گوشی Samsung Galaxy»).
    lunr.fa.wordCharacters =
      '\u0621-\u065F\u0660-\u0669\u066E-\u06D3\u06D5\u06EE-\u06FF\u0640\u0670\u200C' +
      'A-Za-z\u00C0-\u024F';
    lunr.fa.trimmer = lunr.trimmerSupport.generateTrimmer(
      lunr.fa.wordCharacters
    );

    lunr.Pipeline.registerFunction(lunr.fa.trimmer, 'trimmer-fa');

    /* lunr normalizer function */
    // Persian text is typed with Arabic keyboards and fonts too, so the same
    // word comes in several spellings. Fold them to one:
    // - Arabic yeh and kaf (ي ى ك) to Persian (ی ک), teh marbuta and heh
    //   forms (ة ۀ ہ) to ه, hamza on alef and waw (أ إ ٱ ؤ) to ا and و
    // - drop harakat, superscript alef and tatweel (ـ), ZWJ and bidi marks
    // - keep ZWNJ only between letters, one at a time
    // آ is folded to ا after stemming (see lunr.fa.stemmer).
    var foldMap = {
      '\u064A': '\u06CC',
      '\u0649': '\u06CC',
      '\u0643': '\u06A9',
      '\u06AA': '\u06A9',
      '\u0629': '\u0647',
      '\u06C0': '\u0647',
      '\u06C1': '\u0647',
      '\u06C2': '\u0647',
      '\u0623': '\u0627',
      '\u0625': '\u0627',
      '\u0671': '\u0627',
      '\u0624': '\u0648'
    };
    var foldRegex = /[\u064A\u0649\u0643\u06AA\u0629\u06C0\u06C1\u06C2\u0623\u0625\u0671\u0624]/g;
    var removeRegex = /[\u064B-\u065F\u0670\u0640\u200D-\u200F\u202A-\u202E\u2066-\u2069\u061C\uFEFF]/g;

    function normalize(word) {
      return word
        .replace(removeRegex, '')
        .replace(foldRegex, function(ch) {
          return foldMap[ch];
        })
        .replace(/\u200B/g, '\u200C')
        .replace(/\u200C{2,}/g, '\u200C')
        .replace(/^\u200C+|\u200C+$/g, '');
    }

    lunr.fa.normalize = normalize;
    lunr.fa.normalizer = function(token) {
      // for lunr version 2
      if (typeof token.update === 'function') {
        var normalized = normalize(token.toString());
        if (normalized === '') return undefined;
        return token.update(function() {
          return normalized;
        });
      } else {
        // for lunr version <= 1
        return normalize(token);
      }
    };

    lunr.Pipeline.registerFunction(lunr.fa.normalizer, 'normalizer-fa');

    /* lunr stemmer function */
    lunr.fa.stemmer = (function() {
      var st = new PersianStemmer();

      function stem(word) {
        st.setCurrent(word);
        st.stem();
        return st.getCurrent().replace(/\u0622/g, '\u0627');
      }

      /* and return a function that stems a word for the current locale */
      return function(token) {
        // for lunr version 2
        if (typeof token.update === 'function') {
          return token.update(stem);
        } else {
          // for lunr version <= 1
          return stem(token);
        }
      };
    })();

    lunr.Pipeline.registerFunction(lunr.fa.stemmer, 'stemmer-fa');

    /* wildcard searches skip the search pipeline in lunr 2; fold them too */
    lunr.fa.wildcardNormalizer = function(term) {
      return normalize(term).replace(/\u0622/g, '\u0627');
    };
    lunr.fa.wildcardNormalizer.label = 'wildcardNormalizer-fa';
    lunr.fa.wildcardNormalizer.pipelineFunctionLabel = 'stemmer-fa';
    lunr.stemmerSupport.addQueryParserWildcardNormalizer(
      lunr,
      lunr.fa.wildcardNormalizer
    );

    /* stop words */
    // Function words only (prepositions, conjunctions, particles), taken from
    // https://github.com/kharazi/persian-stopwords. The full list also drops
    // content words (خدمات, نام, راه, جدید...) and verbs, which cost recall
    // when measured on 60,000 Persian pages; this short list does not.
    var stopWords = 'و در به از که را با برای این آن تا یا اما هم نیز بر اگر پس چه ای ها های می نمی'.split(' ');

    lunr.fa.stopWordFilter = lunr.generateStopWordFilter(stopWords);
    lunr.Pipeline.registerFunction(lunr.fa.stopWordFilter, 'stopWordFilter-fa');

    /* Snowball's Persian stemmer (ES5 port of the generated code, see header) */
    function Among(s, result, substring_i) {
      return [s, result, substring_i];
    }

    var a_0 = [
      Among('', 7),
      Among(' ', 6, 1),
      Among('\u0623', 4, 2),
      Among('\u0624', 5, 3),
      Among('\u0625', 4, 4),
      Among('\u0626', 2, 5),
      Among('\u0629', 3, 6),
      Among('\u0643', 1, 7),
      Among('\u064A', 2, 8),
      Among('\u06C1', 3, 9),
      Among('\u200D', 6, 10)
    ];

    var a_1 = [
      Among('\u0645\u06CC\u200C', 2),
      Among('\u0646\u0645\u06CC\u200C', 1)
    ];

    var a_2 = [
      Among('\u0633\u062A\u0627\u0646', -1),
      Among('\u0631\u0627\u0646', -1),
      Among('\u0633\u0627\u0646', -1),
      Among('\u0648\u0627\u0646', -1)
    ];

    var a_3 = [
      Among('\u0622\u0630\u0631\u0628\u0627\u06CC\u062C\u0627\u0646', 1),
      Among('\u0647\u0645\u062F\u0627\u0646', 1),
      Among('\u062E\u0627\u0646\u062F\u0627\u0646', 1),
      Among('\u0632\u0646\u062F\u0627\u0646', 1),
      Among('\u0645\u06CC\u0632\u0627\u0646', 1),
      Among('\u062F\u0631\u062E\u0634\u0627\u0646', 1),
      Among('\u0622\u062A\u0634\u0641\u0634\u0627\u0646', 1),
      Among('\u0646\u0634\u0627\u0646', 1),
      Among('\u06A9\u0647\u06A9\u0634\u0627\u0646', 1),
      Among('\u0627\u06CC\u0634\u0627\u0646', 1),
      Among('\u067E\u0631\u06CC\u0634\u0627\u0646', 1),
      Among('\u0633\u0644\u0637\u0627\u0646', 1),
      Among('\u06AF\u06CC\u0644\u0627\u0646', 1),
      Among('\u0633\u0627\u062E\u062A\u0645\u0627\u0646', 1),
      Among('\u0631\u0645\u0627\u0646', 1),
      Among('\u062F\u0631\u0645\u0627\u0646', 1, 1),
      Among('\u0642\u0647\u0631\u0645\u0627\u0646', 1, 2),
      Among('\u06A9\u0631\u0645\u0627\u0646', 1, 3),
      Among('\u0633\u0627\u0632\u0645\u0627\u0646', 1),
      Among('\u0647\u0645\u0632\u0645\u0627\u0646', 1),
      Among('\u0622\u0633\u0645\u0627\u0646', 1),
      Among('\u0622\u0644\u0645\u0627\u0646', 1),
      Among('\u0645\u0633\u0644\u0645\u0627\u0646', 1),
      Among('\u0627\u06CC\u0645\u0627\u0646', 1),
      Among('\u0633\u0644\u06CC\u0645\u0627\u0646', 1),
      Among('\u067E\u06CC\u0645\u0627\u0646', 1),
      Among('\u0644\u0628\u0646\u0627\u0646', 1),
      Among('\u06CC\u0648\u0646\u0627\u0646', 1),
      Among('\u0627\u0635\u0641\u0647\u0627\u0646', 1),
      Among('\u0627\u0645\u06A9\u0627\u0646', 1),
      Among('\u067E\u0627\u06CC\u0627\u0646', 1),
      Among('\u0628\u06CC\u0627\u0646', 1),
      Among('\u062C\u0631\u06CC\u0627\u0646', 1)
    ];

    var a_4 = [
      Among('\u0627\u0633\u0627\u062A\u06CC\u062F', 2),
      Among('\u0627\u062E\u0628\u0627\u0631', 1)
    ];

    var as_4 = ['\u062E\u0628\u0631', '\u0627\u0633\u062A\u0627\u062F'];

    var a_5 = [
      Among('\u0647\u0627', 1),
      Among('\u0627\u062A', 1),
      Among('\u06CC\u062A', 1),
      Among('\u0645\u0646\u062F', 1),
      Among('\u0648\u0627\u0631', 1),
      Among('\u06AF\u0627\u0631', 1),
      Among('\u062A\u0631', 2),
      Among('\u0627\u0634', 1),
      Among('\u0627\u0645', 1),
      Among('\u0627\u0646', 1),
      Among('\u0628\u0627\u0646', 1, 1),
      Among('\u06AF\u0627\u0646', 1, 2),
      Among('\u06CC\u0627\u0646', 1, 3),
      Among('\u06CC\u0646', 1),
      Among('\u062A\u0631\u06CC\u0646', 1, 1),
      Among('\u06AF\u0627\u0647', 1),
      Among('\u0627\u0646\u0647', 1),
      Among('\u0646\u0627\u06A9', 1),
      Among('\u0647\u0627\u06CC', 1),
      Among('\u0627\u0646\u06CC', 1),
      Among('\u06AF\u06CC', 1),
      Among('\u06CC\u06CC', 1)
    ];

    var a_6 = [
      Among('\u0627\u0633\u062A', 1),
      Among('\u0627\u0646\u062F', 1),
      Among('\u06CC\u062F', 1),
      Among('\u0627\u06CC\u062F', 1, 1),
      Among('\u0627\u0633', 1),
      Among('\u06CC\u0645', 1),
      Among('\u0627\u06CC\u0645', 1, 1),
      Among('\u0627\u06CC', 1)
    ];

    var a_7 = [
      Among('\u062F', 1),
      Among('\u0627\u0646\u062F', 1, 1),
      Among('\u0631\u0641\u062A\u0627\u0646\u062F', 2, 1),
      Among('\u06CC\u062F', 1, 3),
      Among('\u0631\u0641\u062A\u06CC\u062F', 2, 1),
      Among('\u0645', 1),
      Among('\u0627\u0645', 1, 1),
      Among('\u0631\u0641\u062A\u0645', 2, 2),
      Among('\u06CC\u0645', 1, 3),
      Among('\u0631\u0641\u062A\u06CC\u0645', 2, 1),
      Among('\u0627\u0646', 3),
      Among('\u062A\u0647', 5),
      Among('\u062F\u0647', 4),
      Among('\u0646\u062F\u0647', 3, 1),
      Among('\u0631\u0641\u062A\u06CC', 2)
    ];

    function PersianStemmer() {
      // base-stemmer.js state
      var current = '',
        c = 0,
        limit = 0,
        limit_backward = 0,
        bra = 0,
        ket = 0;
      // persian.sbl state
      var I_p1 = 0,
        B_remove_verb_person_endings = false,
        B_saw_present_prefix = false;

      this.setCurrent = function(value) {
        current = value;
        c = 0;
        limit = current.length;
        limit_backward = 0;
        bra = c;
        ket = limit;
      };

      this.getCurrent = function() {
        return current;
      };

      /* base-stemmer.js */

      function eq_s(s) {
        if (limit - c < s.length) return false;
        if (current.slice(c, c + s.length) !== s) return false;
        c += s.length;
        return true;
      }

      function find_among(v) {
        var i = 0,
          j = v.length,
          c0 = c,
          l = limit,
          common_i = 0,
          common_j = 0,
          first_key_inspected = false,
          k, diff, common, w, i2;
        while (true) {
          k = i + ((j - i) >>> 1);
          diff = 0;
          common = common_i < common_j ? common_i : common_j;
          w = v[k];
          for (i2 = common; i2 < w[0].length; i2++) {
            if (c0 + common === l) {
              diff = -1;
              break;
            }
            diff = current.charCodeAt(c0 + common) - w[0].charCodeAt(i2);
            if (diff !== 0) break;
            common++;
          }
          if (diff < 0) {
            j = k;
            common_j = common;
          } else {
            i = k;
            common_i = common;
          }
          if (j - i <= 1) {
            if (i > 0) break;
            if (j === i) break;
            if (first_key_inspected) break;
            first_key_inspected = true;
          }
        }
        while (true) {
          w = v[i];
          if (common_i >= w[0].length) {
            c = c0 + w[0].length;
            return w[1];
          }
          if (!w[2]) return 0;
          i -= w[2];
        }
      }

      function find_among_b(v) {
        var i = 0,
          j = v.length,
          c0 = c,
          lb = limit_backward,
          common_i = 0,
          common_j = 0,
          first_key_inspected = false,
          k, diff, common, w, i2;
        while (true) {
          k = i + ((j - i) >> 1);
          diff = 0;
          common = common_i < common_j ? common_i : common_j;
          w = v[k];
          for (i2 = w[0].length - 1 - common; i2 >= 0; i2--) {
            if (c0 - common === lb) {
              diff = -1;
              break;
            }
            diff = current.charCodeAt(c0 - 1 - common) - w[0].charCodeAt(i2);
            if (diff !== 0) break;
            common++;
          }
          if (diff < 0) {
            j = k;
            common_j = common;
          } else {
            i = k;
            common_i = common;
          }
          if (j - i <= 1) {
            if (i > 0) break;
            if (j === i) break;
            if (first_key_inspected) break;
            first_key_inspected = true;
          }
        }
        while (true) {
          w = v[i];
          if (common_i >= w[0].length) {
            c = c0 - w[0].length;
            return w[1];
          }
          if (!w[2]) return 0;
          i -= w[2];
        }
      }

      function replace_s(c_bra, c_ket, s) {
        var adjustment = s.length - (c_ket - c_bra);
        current = current.slice(0, c_bra) + s + current.slice(c_ket);
        limit += adjustment;
        if (c >= c_ket) c += adjustment;
        else if (c > c_bra) c = c_bra;
        return adjustment;
      }

      function slice_from(s) {
        replace_s(bra, ket, s);
        ket = bra + s.length;
      }

      function slice_del() {
        slice_from('');
      }

      /* persian.sbl */

      function r_Normalize_Characters() {
        var a, v_1;
        while (true) {
          v_1 = c;
          lab0: {
            bra = c;
            a = find_among(a_0);
            ket = c;
            switch (a) {
              case 1:
                slice_from('\u06A9');
                break;
              case 2:
                slice_from('\u06CC');
                break;
              case 3:
                slice_from('\u0647');
                break;
              case 4:
                slice_from('\u0627');
                break;
              case 5:
                slice_from('\u0648');
                break;
              case 6:
                slice_del();
                break;
              case 7:
                if (c >= limit) break lab0;
                c++;
                break;
            }
            continue;
          }
          c = v_1;
          break;
        }
        return true;
      }

      function r_Prefixes() {
        var a;
        bra = c;
        a = find_among(a_1);
        if (a === 0) return false;
        ket = c;
        switch (a) {
          case 1:
            if (c + 2 > limit) return false;
            c += 2;
            B_saw_present_prefix = true;
            break;
          case 2:
            if (c + 2 > limit) return false;
            c += 2;
            slice_del();
            B_saw_present_prefix = true;
            break;
        }
        return true;
      }

      function r_Delete_ZWNJ() {
        var v_1, v_2;
        while (true) {
          v_1 = c;
          lab0: {
            golab1: while (true) {
              v_2 = c;
              lab2: {
                bra = c;
                if (!eq_s('\u200C')) break lab2;
                ket = c;
                slice_del();
                c = v_2;
                break golab1;
              }
              c = v_2;
              if (c >= limit) break lab0;
              c++;
            }
            continue;
          }
          c = v_1;
          break;
        }
        return true;
      }

      function r_R1() {
        return I_p1 <= c;
      }

      function r_Protect_Lexical_AN() {
        var v_1 = limit - c;
        lab0: {
          if (!r_AN_Exception()) break lab0;
          return false;
        }
        c = limit - v_1;
        var v_2 = limit - c;
        lab1: {
          if (find_among_b(a_2) === 0) break lab1;
          return false;
        }
        c = limit - v_2;
        return true;
      }

      function r_AN_Exception() {
        if (find_among_b(a_3) === 0) return false;
        if (c > limit_backward) return false;
        return true;
      }

      function r_Irregular_Noun() {
        var a;
        ket = c;
        a = find_among_b(a_4);
        if (a === 0) return false;
        bra = c;
        slice_from(as_4[a - 1]);
        return true;
      }

      function r_Stem_Noun_or_Adjective() {
        var a, v_1, v_2;
        lab0: {
          v_1 = limit - c;
          lab1: {
            if (!r_Irregular_Noun()) break lab1;
            break lab0;
          }
          c = limit - v_1;
          if (c < I_p1) return false;
          v_2 = limit_backward;
          limit_backward = I_p1;
          ket = c;
          a = find_among_b(a_5);
          if (a === 0) {
            limit_backward = v_2;
            return false;
          }
          bra = c;
          switch (a) {
            case 1:
              slice_del();
              break;
            case 2:
              if (c <= limit_backward) {
                limit_backward = v_2;
                return false;
              }
              slice_del();
              break;
          }
          limit_backward = v_2;
        }
        return true;
      }

      function r_Stem_Verb() {
        var a, v_1;
        lab0: {
          v_1 = limit - c;
          lab1: {
            ket = c;
            if (find_among_b(a_6) === 0) break lab1;
            bra = c;
            if (!r_R1()) break lab1;
            slice_del();
            break lab0;
          }
          c = limit - v_1;
          ket = c;
          a = find_among_b(a_7);
          if (a === 0) return false;
          bra = c;
          switch (a) {
            case 1:
              if (!B_remove_verb_person_endings) return false;
              if (!r_R1()) return false;
              slice_del();
              break;
            case 2:
              slice_from('\u0631\u0641\u062A');
              break;
            case 3:
              if (!r_R1()) return false;
              slice_del();
              B_remove_verb_person_endings = true;
              break;
            case 4:
              if (c <= limit_backward) return false;
              slice_from('\u062F');
              B_remove_verb_person_endings = true;
              break;
            case 5:
              if (c <= limit_backward) return false;
              slice_from('\u062A');
              B_remove_verb_person_endings = true;
              break;
          }
        }
        return true;
      }

      this.stem = function() {
        var v_1, v_2, v_3, v_4, v_5, v_6, v_7;
        B_saw_present_prefix = false;
        v_1 = c;
        r_Normalize_Characters();
        c = v_1;
        v_2 = c;
        r_Prefixes();
        c = v_2;
        v_3 = c;
        r_Delete_ZWNJ();
        c = v_3;
        I_p1 = limit;
        v_4 = c;
        lab0: {
          if (c + 3 > limit) break lab0;
          c += 3;
          I_p1 = c;
        }
        c = v_4;
        limit_backward = c;
        c = limit;
        while (true) {
          v_5 = limit - c;
          lab1: {
            v_6 = limit - c;
            B_remove_verb_person_endings = false;
            lab2: {
              if (!B_saw_present_prefix) break lab2;
              B_remove_verb_person_endings = true;
            }
            if (!r_Protect_Lexical_AN()) break lab1;
            lab3: {
              v_7 = limit - c;
              lab4: {
                if (!r_Stem_Noun_or_Adjective()) break lab4;
                break lab3;
              }
              c = limit - v_7;
              if (!r_Stem_Verb()) break lab1;
            }
            c = limit - v_6;
            continue;
          }
          c = limit - v_5;
          break;
        }
        c = limit_backward;
        return true;
      };
    }
  };
});