/*!
 * Lunr languages, `Danish` language
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
    lunr.da = function() {
      this.pipeline.reset();
      this.pipeline.add(
        lunr.da.trimmer,
        lunr.da.stopWordFilter,
        lunr.da.stemmer
      );

      // for lunr version 2
      // this is necessary so that every searched word is also stemmed before
      // in lunr <= 1 this is not needed, as it is done using the normal pipeline
      if (this.searchPipeline) {
        this.searchPipeline.reset();
        this.searchPipeline.add(lunr.da.stemmer)
      }
    };

    /* lunr trimmer function */
    lunr.da.wordCharacters = "[0-9A-Za-z\xAA\xB2\xB3\xB9\xBA\xBC-\xBE\xC0-\xD6\xD8-\xF6\xF8-\u02B8\u02E0-\u02E4\u0300-\u036F\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u09F4-\u09F9\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0B72-\u0B77\u0BE6-\u0BF2\u0C66-\u0C6F\u0C78-\u0C7E\u0CE6-\u0CEF\u0D66-\u0D75\u0DE6-\u0DEF\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F33\u1040-\u1049\u1090-\u1099\u1369-\u137C\u16EE-\u16F0\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1946-\u194F\u19D0-\u19DA\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\u1D00-\u1D25\u1D2C-\u1D5C\u1D62-\u1D65\u1D6B-\u1D77\u1D79-\u1DBE\u1E00-\u1EFF\u2070\u2071\u2074-\u2079\u207F-\u2089\u2090-\u209C\u212A\u212B\u2132\u214E\u2150-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2C60-\u2C7F\u2CFD\u3007\u3021-\u3029\u3038-\u303A\u3192-\u3195\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\uA620-\uA629\uA6E6-\uA6EF\uA722-\uA787\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA7FF\uA830-\uA835\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uA9F0-\uA9F9\uAA50-\uAA59\uAB30-\uAB5A\uAB5C-\uAB64\uABF0-\uABF9\uFB00-\uFB06\uFF10-\uFF19\uFF21-\uFF3A\uFF41-\uFF5A]|\uD800[\uDD07-\uDD33\uDD40-\uDD78\uDD8A\uDD8B\uDEE1-\uDEFB\uDF20-\uDF23\uDF41\uDF4A\uDFD1-\uDFD5]|\uD801[\uDCA0-\uDCA9]|\uD802[\uDC58-\uDC5F\uDC79-\uDC7F\uDCA7-\uDCAF\uDCFB-\uDCFF\uDD16-\uDD1B\uDDBC\uDDBD\uDDC0-\uDDCF\uDDD2-\uDDFF\uDE40-\uDE47\uDE7D\uDE7E\uDE9D-\uDE9F\uDEEB-\uDEEF\uDF58-\uDF5F\uDF78-\uDF7F\uDFA9-\uDFAF]|\uD803[\uDCFA-\uDCFF\uDE60-\uDE7E]|\uD804[\uDC52-\uDC6F\uDCF0-\uDCF9\uDD36-\uDD3F\uDDD0-\uDDD9\uDDE1-\uDDF4\uDEF0-\uDEF9]|\uD805[\uDCD0-\uDCD9\uDE50-\uDE59\uDEC0-\uDEC9\uDF30-\uDF3B]|\uD806[\uDCE0-\uDCF2]|\uD809[\uDC00-\uDC6E]|\uD81A[\uDE60-\uDE69\uDF50-\uDF59\uDF5B-\uDF61]|\uD834[\uDF60-\uDF71]|\uD835[\uDFCE-\uDFFF]|\uD83A[\uDCC7-\uDCCF]|\uD83C[\uDD00-\uDD0C]";
    lunr.da.trimmer = lunr.trimmerSupport.generateTrimmer(lunr.da.wordCharacters);

    lunr.Pipeline.registerFunction(lunr.da.trimmer, 'trimmer-da');

    /* lunr stemmer function */
    lunr.da.stemmer = (function() {
      /* create the wrapped stemmer object */
      var Among = lunr.stemmerSupport.Among,
        SnowballProgram = lunr.stemmerSupport.SnowballProgram,
        st = new function DanishStemmer() {
          var a_0 = [new Among("hed", -1, 1), new Among("ethed", 0, 1),
              new Among("ered", -1, 1), new Among("e", -1, 1),
              new Among("erede", 3, 1), new Among("ende", 3, 1),
              new Among("erende", 5, 1), new Among("ene", 3, 1),
              new Among("erne", 3, 1), new Among("ere", 3, 1),
              new Among("en", -1, 1), new Among("heden", 10, 1),
              new Among("eren", 10, 1), new Among("er", -1, 1),
              new Among("heder", 13, 1), new Among("erer", 13, 1),
              new Among("s", -1, 2), new Among("heds", 16, 1),
              new Among("es", 16, 1), new Among("endes", 18, 1),
              new Among("erendes", 19, 1), new Among("enes", 18, 1),
              new Among("ernes", 18, 1), new Among("eres", 18, 1),
              new Among("ens", 16, 1), new Among("hedens", 24, 1),
              new Among("erens", 24, 1), new Among("ers", 16, 1),
              new Among("ets", 16, 1), new Among("erets", 28, 1),
              new Among("et", -1, 1), new Among("eret", 30, 1)
            ],
            a_1 = [
              new Among("gd", -1, -1), new Among("dt", -1, -1),
              new Among("gt", -1, -1), new Among("kt", -1, -1)
            ],
            a_2 = [
              new Among("ig", -1, 1), new Among("lig", 0, 1),
              new Among("elig", 1, 1), new Among("els", -1, 1),
              new Among("l\u00F8st", -1, 2)
            ],
            g_v = [17, 65, 16, 1, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 48, 0, 128
            ],
            g_s_ending = [239, 254, 42, 3,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16
            ],
            I_x, I_p1, S_ch, sbp = new SnowballProgram();
          this.setCurrent = function(word) {
            sbp.setCurrent(word);
          };
          this.getCurrent = function() {
            return sbp.getCurrent();
          };

          function r_mark_regions() {
            var v_1, c = sbp.cursor + 3;
            I_p1 = sbp.limit;
            if (0 <= c && c <= sbp.limit) {
              I_x = c;
              while (true) {
                v_1 = sbp.cursor;
                if (sbp.in_grouping(g_v, 97, 248)) {
                  sbp.cursor = v_1;
                  break;
                }
                sbp.cursor = v_1;
                if (v_1 >= sbp.limit)
                  return;
                sbp.cursor++;
              }
              while (!sbp.out_grouping(g_v, 97, 248)) {
                if (sbp.cursor >= sbp.limit)
                  return;
                sbp.cursor++;
              }
              I_p1 = sbp.cursor;
              if (I_p1 < I_x)
                I_p1 = I_x;
            }
          }

          function r_main_suffix() {
            var among_var, v_1;
            if (sbp.cursor >= I_p1) {
              v_1 = sbp.limit_backward;
              sbp.limit_backward = I_p1;
              sbp.ket = sbp.cursor;
              among_var = sbp.find_among_b(a_0, 32);
              sbp.limit_backward = v_1;
              if (among_var) {
                sbp.bra = sbp.cursor;
                switch (among_var) {
                  case 1:
                    sbp.slice_del();
                    break;
                  case 2:
                    if (sbp.in_grouping_b(g_s_ending, 97, 229))
                      sbp.slice_del();
                    break;
                }
              }
            }
          }

          function r_consonant_pair() {
            var v_1 = sbp.limit - sbp.cursor,
              v_2;
            if (sbp.cursor >= I_p1) {
              v_2 = sbp.limit_backward;
              sbp.limit_backward = I_p1;
              sbp.ket = sbp.cursor;
              if (sbp.find_among_b(a_1, 4)) {
                sbp.bra = sbp.cursor;
                sbp.limit_backward = v_2;
                sbp.cursor = sbp.limit - v_1;
                if (sbp.cursor > sbp.limit_backward) {
                  sbp.cursor--;
                  sbp.bra = sbp.cursor;
                  sbp.slice_del();
                }
              } else
                sbp.limit_backward = v_2;
            }
          }

          function r_other_suffix() {
            var among_var, v_1 = sbp.limit - sbp.cursor,
              v_2, v_3;
            sbp.ket = sbp.cursor;
            if (sbp.eq_s_b(2, "st")) {
              sbp.bra = sbp.cursor;
              if (sbp.eq_s_b(2, "ig"))
                sbp.slice_del();
            }
            sbp.cursor = sbp.limit - v_1;
            if (sbp.cursor >= I_p1) {
              v_2 = sbp.limit_backward;
              sbp.limit_backward = I_p1;
              sbp.ket = sbp.cursor;
              among_var = sbp.find_among_b(a_2, 5);
              sbp.limit_backward = v_2;
              if (among_var) {
                sbp.bra = sbp.cursor;
                switch (among_var) {
                  case 1:
                    sbp.slice_del();
                    v_3 = sbp.limit - sbp.cursor;
                    r_consonant_pair();
                    sbp.cursor = sbp.limit - v_3;
                    break;
                  case 2:
                    sbp.slice_from("l\u00F8s");
                    break;
                }
              }
            }
          }

          function r_undouble() {
            var v_1;
            if (sbp.cursor >= I_p1) {
              v_1 = sbp.limit_backward;
              sbp.limit_backward = I_p1;
              sbp.ket = sbp.cursor;
              if (sbp.out_grouping_b(g_v, 97, 248)) {
                sbp.bra = sbp.cursor;
                S_ch = sbp.slice_to(S_ch);
                sbp.limit_backward = v_1;
                if (sbp.eq_v_b(S_ch))
                  sbp.slice_del();
              } else
                sbp.limit_backward = v_1;
            }
          }
          this.stem = function() {
            var v_1 = sbp.cursor;
            r_mark_regions();
            sbp.limit_backward = v_1;
            sbp.cursor = sbp.limit;
            r_main_suffix();
            sbp.cursor = sbp.limit;
            r_consonant_pair();
            sbp.cursor = sbp.limit;
            r_other_suffix();
            sbp.cursor = sbp.limit;
            r_undouble();
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

    lunr.Pipeline.registerFunction(lunr.da.stemmer, 'stemmer-da');

    lunr.da.stopWordFilter = lunr.generateStopWordFilter('ad af alle alt anden at blev blive bliver da de dem den denne der deres det dette dig din disse dog du efter eller en end er et for fra ham han hans har havde have hende hendes her hos hun hvad hvis hvor i ikke ind jeg jer jo kunne man mange med meget men mig min mine mit mod ned noget nogle nu når og også om op os over på selv sig sin sine sit skal skulle som sådan thi til ud under var vi vil ville vor være været'.split(' '));

    lunr.Pipeline.registerFunction(lunr.da.stopWordFilter, 'stopWordFilter-da');
  };
}))