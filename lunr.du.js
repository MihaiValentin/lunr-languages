/*!
 * Lunr languages, `Dutch` language
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

    console.warn("[Lunr Languages] Please use the \"nl\" instead of the \"du\". The \"nl\" code is the standard code for Dutch language, and \"du\" will be removed in the next major versions.");

    /* register specific locale function */
    lunr.du = function() {
      this.pipeline.reset();
      this.pipeline.add(
        lunr.du.trimmer,
        lunr.du.stopWordFilter,
        lunr.du.stemmer
      );

      // for lunr version 2
      // this is necessary so that every searched word is also stemmed before
      // in lunr <= 1 this is not needed, as it is done using the normal pipeline
      if (this.searchPipeline) {
        this.searchPipeline.reset();
        this.searchPipeline.add(lunr.du.stemmer)
      }
    };

    /* lunr trimmer function */
    lunr.du.wordCharacters = "[0-9A-Za-z\xAA\xB2\xB3\xB9\xBA\xBC-\xBE\xC0-\xD6\xD8-\xF6\xF8-\u02B8\u02E0-\u02E4\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u09F4-\u09F9\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0B72-\u0B77\u0BE6-\u0BF2\u0C66-\u0C6F\u0C78-\u0C7E\u0CE6-\u0CEF\u0D66-\u0D75\u0DE6-\u0DEF\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F33\u1040-\u1049\u1090-\u1099\u1369-\u137C\u16EE-\u16F0\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1946-\u194F\u19D0-\u19DA\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\u1D00-\u1D25\u1D2C-\u1D5C\u1D62-\u1D65\u1D6B-\u1D77\u1D79-\u1DBE\u1E00-\u1EFF\u2070\u2071\u2074-\u2079\u207F-\u2089\u2090-\u209C\u212A\u212B\u2132\u214E\u2150-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2C60-\u2C7F\u2CFD\u3007\u3021-\u3029\u3038-\u303A\u3192-\u3195\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\uA620-\uA629\uA6E6-\uA6EF\uA722-\uA787\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA7FF\uA830-\uA835\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uA9F0-\uA9F9\uAA50-\uAA59\uAB30-\uAB5A\uAB5C-\uAB64\uABF0-\uABF9\uFB00-\uFB06\uFF10-\uFF19\uFF21-\uFF3A\uFF41-\uFF5A]|\uD800[\uDD07-\uDD33\uDD40-\uDD78\uDD8A\uDD8B\uDEE1-\uDEFB\uDF20-\uDF23\uDF41\uDF4A\uDFD1-\uDFD5]|\uD801[\uDCA0-\uDCA9]|\uD802[\uDC58-\uDC5F\uDC79-\uDC7F\uDCA7-\uDCAF\uDCFB-\uDCFF\uDD16-\uDD1B\uDDBC\uDDBD\uDDC0-\uDDCF\uDDD2-\uDDFF\uDE40-\uDE47\uDE7D\uDE7E\uDE9D-\uDE9F\uDEEB-\uDEEF\uDF58-\uDF5F\uDF78-\uDF7F\uDFA9-\uDFAF]|\uD803[\uDCFA-\uDCFF\uDE60-\uDE7E]|\uD804[\uDC52-\uDC6F\uDCF0-\uDCF9\uDD36-\uDD3F\uDDD0-\uDDD9\uDDE1-\uDDF4\uDEF0-\uDEF9]|\uD805[\uDCD0-\uDCD9\uDE50-\uDE59\uDEC0-\uDEC9\uDF30-\uDF3B]|\uD806[\uDCE0-\uDCF2]|\uD809[\uDC00-\uDC6E]|\uD81A[\uDE60-\uDE69\uDF50-\uDF59\uDF5B-\uDF61]|\uD834[\uDF60-\uDF71]|\uD835[\uDFCE-\uDFFF]|\uD83A[\uDCC7-\uDCCF]|\uD83C[\uDD00-\uDD0C]";
    lunr.du.trimmer = lunr.trimmerSupport.generateTrimmer(lunr.du.wordCharacters);

    lunr.Pipeline.registerFunction(lunr.du.trimmer, 'trimmer-du');

    /* lunr stemmer function */
    lunr.du.stemmer = (function() {
      /* create the wrapped stemmer object */
      var Among = lunr.stemmerSupport.Among,
        SnowballProgram = lunr.stemmerSupport.SnowballProgram,
        st = new function DutchStemmer() {
          var a_0 = [new Among("", -1, 6), new Among("\u00E1", 0, 1),
              new Among("\u00E4", 0, 1), new Among("\u00E9", 0, 2),
              new Among("\u00EB", 0, 2), new Among("\u00ED", 0, 3),
              new Among("\u00EF", 0, 3), new Among("\u00F3", 0, 4),
              new Among("\u00F6", 0, 4), new Among("\u00FA", 0, 5),
              new Among("\u00FC", 0, 5)
            ],
            a_1 = [new Among("", -1, 3),
              new Among("I", 0, 2), new Among("Y", 0, 1)
            ],
            a_2 = [
              new Among("dd", -1, -1), new Among("kk", -1, -1),
              new Among("tt", -1, -1)
            ],
            a_3 = [new Among("ene", -1, 2),
              new Among("se", -1, 3), new Among("en", -1, 2),
              new Among("heden", 2, 1), new Among("s", -1, 3)
            ],
            a_4 = [
              new Among("end", -1, 1), new Among("ig", -1, 2),
              new Among("ing", -1, 1), new Among("lijk", -1, 3),
              new Among("baar", -1, 4), new Among("bar", -1, 5)
            ],
            a_5 = [
              new Among("aa", -1, -1), new Among("ee", -1, -1),
              new Among("oo", -1, -1), new Among("uu", -1, -1)
            ],
            g_v = [17, 65,
              16, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128
            ],
            g_v_I = [1, 0, 0,
              17, 65, 16, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128
            ],
            g_v_j = [
              17, 67, 16, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128
            ],
            I_p2, I_p1, B_e_found, sbp = new SnowballProgram();
          this.setCurrent = function(word) {
            sbp.setCurrent(word);
          };
          this.getCurrent = function() {
            return sbp.getCurrent();
          };

          function r_prelude() {
            var among_var, v_1 = sbp.cursor,
              v_2, v_3;
            while (true) {
              sbp.bra = sbp.cursor;
              among_var = sbp.find_among(a_0, 11);
              if (among_var) {
                sbp.ket = sbp.cursor;
                switch (among_var) {
                  case 1:
                    sbp.slice_from("a");
                    continue;
                  case 2:
                    sbp.slice_from("e");
                    continue;
                  case 3:
                    sbp.slice_from("i");
                    continue;
                  case 4:
                    sbp.slice_from("o");
                    continue;
                  case 5:
                    sbp.slice_from("u");
                    continue;
                  case 6:
                    if (sbp.cursor >= sbp.limit)
                      break;
                    sbp.cursor++;
                    continue;
                }
              }
              break;
            }
            sbp.cursor = v_1;
            sbp.bra = v_1;
            if (sbp.eq_s(1, "y")) {
              sbp.ket = sbp.cursor;
              sbp.slice_from("Y");
            } else
              sbp.cursor = v_1;
            while (true) {
              v_2 = sbp.cursor;
              if (sbp.in_grouping(g_v, 97, 232)) {
                v_3 = sbp.cursor;
                sbp.bra = v_3;
                if (sbp.eq_s(1, "i")) {
                  sbp.ket = sbp.cursor;
                  if (sbp.in_grouping(g_v, 97, 232)) {
                    sbp.slice_from("I");
                    sbp.cursor = v_2;
                  }
                } else {
                  sbp.cursor = v_3;
                  if (sbp.eq_s(1, "y")) {
                    sbp.ket = sbp.cursor;
                    sbp.slice_from("Y");
                    sbp.cursor = v_2;
                  } else if (habr1(v_2))
                    break;
                }
              } else if (habr1(v_2))
                break;
            }
          }

          function habr1(v_1) {
            sbp.cursor = v_1;
            if (v_1 >= sbp.limit)
              return true;
            sbp.cursor++;
            return false;
          }

          function r_mark_regions() {
            I_p1 = sbp.limit;
            I_p2 = I_p1;
            if (!habr2()) {
              I_p1 = sbp.cursor;
              if (I_p1 < 3)
                I_p1 = 3;
              if (!habr2())
                I_p2 = sbp.cursor;
            }
          }

          function habr2() {
            while (!sbp.in_grouping(g_v, 97, 232)) {
              if (sbp.cursor >= sbp.limit)
                return true;
              sbp.cursor++;
            }
            while (!sbp.out_grouping(g_v, 97, 232)) {
              if (sbp.cursor >= sbp.limit)
                return true;
              sbp.cursor++;
            }
            return false;
          }

          function r_postlude() {
            var among_var;
            while (true) {
              sbp.bra = sbp.cursor;
              among_var = sbp.find_among(a_1, 3);
              if (among_var) {
                sbp.ket = sbp.cursor;
                switch (among_var) {
                  case 1:
                    sbp.slice_from("y");
                    break;
                  case 2:
                    sbp.slice_from("i");
                    break;
                  case 3:
                    if (sbp.cursor >= sbp.limit)
                      return;
                    sbp.cursor++;
                    break;
                }
              }
            }
          }

          function r_R1() {
            return I_p1 <= sbp.cursor;
          }

          function r_R2() {
            return I_p2 <= sbp.cursor;
          }

          function r_undouble() {
            var v_1 = sbp.limit - sbp.cursor;
            if (sbp.find_among_b(a_2, 3)) {
              sbp.cursor = sbp.limit - v_1;
              sbp.ket = sbp.cursor;
              if (sbp.cursor > sbp.limit_backward) {
                sbp.cursor--;
                sbp.bra = sbp.cursor;
                sbp.slice_del();
              }
            }
          }

          function r_e_ending() {
            var v_1;
            B_e_found = false;
            sbp.ket = sbp.cursor;
            if (sbp.eq_s_b(1, "e")) {
              sbp.bra = sbp.cursor;
              if (r_R1()) {
                v_1 = sbp.limit - sbp.cursor;
                if (sbp.out_grouping_b(g_v, 97, 232)) {
                  sbp.cursor = sbp.limit - v_1;
                  sbp.slice_del();
                  B_e_found = true;
                  r_undouble();
                }
              }
            }
          }

          function r_en_ending() {
            var v_1;
            if (r_R1()) {
              v_1 = sbp.limit - sbp.cursor;
              if (sbp.out_grouping_b(g_v, 97, 232)) {
                sbp.cursor = sbp.limit - v_1;
                if (!sbp.eq_s_b(3, "gem")) {
                  sbp.cursor = sbp.limit - v_1;
                  sbp.slice_del();
                  r_undouble();
                }
              }
            }
          }

          function r_standard_suffix() {
            var among_var, v_1 = sbp.limit - sbp.cursor,
              v_2, v_3, v_4, v_5, v_6;
            sbp.ket = sbp.cursor;
            among_var = sbp.find_among_b(a_3, 5);
            if (among_var) {
              sbp.bra = sbp.cursor;
              switch (among_var) {
                case 1:
                  if (r_R1())
                    sbp.slice_from("heid");
                  break;
                case 2:
                  r_en_ending();
                  break;
                case 3:
                  if (r_R1() && sbp.out_grouping_b(g_v_j, 97, 232))
                    sbp.slice_del();
                  break;
              }
            }
            sbp.cursor = sbp.limit - v_1;
            r_e_ending();
            sbp.cursor = sbp.limit - v_1;
            sbp.ket = sbp.cursor;
            if (sbp.eq_s_b(4, "heid")) {
              sbp.bra = sbp.cursor;
              if (r_R2()) {
                v_2 = sbp.limit - sbp.cursor;
                if (!sbp.eq_s_b(1, "c")) {
                  sbp.cursor = sbp.limit - v_2;
                  sbp.slice_del();
                  sbp.ket = sbp.cursor;
                  if (sbp.eq_s_b(2, "en")) {
                    sbp.bra = sbp.cursor;
                    r_en_ending();
                  }
                }
              }
            }
            sbp.cursor = sbp.limit - v_1;
            sbp.ket = sbp.cursor;
            among_var = sbp.find_among_b(a_4, 6);
            if (among_var) {
              sbp.bra = sbp.cursor;
              switch (among_var) {
                case 1:
                  if (r_R2()) {
                    sbp.slice_del();
                    v_3 = sbp.limit - sbp.cursor;
                    sbp.ket = sbp.cursor;
                    if (sbp.eq_s_b(2, "ig")) {
                      sbp.bra = sbp.cursor;
                      if (r_R2()) {
                        v_4 = sbp.limit - sbp.cursor;
                        if (!sbp.eq_s_b(1, "e")) {
                          sbp.cursor = sbp.limit - v_4;
                          sbp.slice_del();
                          break;
                        }
                      }
                    }
                    sbp.cursor = sbp.limit - v_3;
                    r_undouble();
                  }
                  break;
                case 2:
                  if (r_R2()) {
                    v_5 = sbp.limit - sbp.cursor;
                    if (!sbp.eq_s_b(1, "e")) {
                      sbp.cursor = sbp.limit - v_5;
                      sbp.slice_del();
                    }
                  }
                  break;
                case 3:
                  if (r_R2()) {
                    sbp.slice_del();
                    r_e_ending();
                  }
                  break;
                case 4:
                  if (r_R2())
                    sbp.slice_del();
                  break;
                case 5:
                  if (r_R2() && B_e_found)
                    sbp.slice_del();
                  break;
              }
            }
            sbp.cursor = sbp.limit - v_1;
            if (sbp.out_grouping_b(g_v_I, 73, 232)) {
              v_6 = sbp.limit - sbp.cursor;
              if (sbp.find_among_b(a_5, 4) && sbp.out_grouping_b(g_v, 97, 232)) {
                sbp.cursor = sbp.limit - v_6;
                sbp.ket = sbp.cursor;
                if (sbp.cursor > sbp.limit_backward) {
                  sbp.cursor--;
                  sbp.bra = sbp.cursor;
                  sbp.slice_del();
                }
              }
            }
          }
          this.stem = function() {
            var v_1 = sbp.cursor;
            r_prelude();
            sbp.cursor = v_1;
            r_mark_regions();
            sbp.limit_backward = v_1;
            sbp.cursor = sbp.limit;
            r_standard_suffix();
            sbp.cursor = sbp.limit_backward;
            r_postlude();
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

    lunr.Pipeline.registerFunction(lunr.du.stemmer, 'stemmer-du');

    lunr.du.stopWordFilter = lunr.generateStopWordFilter(' aan al alles als altijd andere ben bij daar dan dat de der deze die dit doch doen door dus een eens en er ge geen geweest haar had heb hebben heeft hem het hier hij hoe hun iemand iets ik in is ja je kan kon kunnen maar me meer men met mij mijn moet na naar niet niets nog nu of om omdat onder ons ook op over reeds te tegen toch toen tot u uit uw van veel voor want waren was wat werd wezen wie wil worden wordt zal ze zelf zich zij zijn zo zonder zou'.split(' '));

    lunr.Pipeline.registerFunction(lunr.du.stopWordFilter, 'stopWordFilter-du');
  };
}))