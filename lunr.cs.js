/*!
 * Lunr languages, `Czech` language
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
    lunr.cs = function() {
      this.pipeline.reset();
      this.pipeline.add(
        lunr.cs.trimmer,
        lunr.cs.stopWordFilter,
        lunr.cs.stemmer
      );

      // for lunr version 2
      // this is necessary so that every searched word is also stemmed before
      // in lunr <= 1 this is not needed, as it is done using the normal pipeline
      if (this.searchPipeline) {
        this.searchPipeline.reset();
        this.searchPipeline.add(lunr.cs.stemmer)
      }
    };

    /* lunr trimmer function */
    lunr.cs.wordCharacters = "A-Za-z\xAA\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02B8\u02E0-\u02E4\u1D00-\u1D25\u1D2C-\u1D5C\u1D62-\u1D65\u1D6B-\u1D77\u1D79-\u1DBE\u1E00-\u1EFF\u2071\u207F\u2090-\u209C\u212A\u212B\u2132\u214E\u2160-\u2188\u2C60-\u2C7F\uA722-\uA787\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA7FF\uAB30-\uAB5A\uAB5C-\uAB64\uFB00-\uFB06\uFF21-\uFF3A\uFF41-\uFF5A";
    lunr.cs.trimmer = lunr.trimmerSupport.generateTrimmer(lunr.cs.wordCharacters);

    lunr.Pipeline.registerFunction(lunr.cs.trimmer, 'trimmer-cs');

    /* lunr stemmer function */
    lunr.cs.stemmer = (function() {
      /* create the wrapped stemmer object */
      var Among = lunr.stemmerSupport.Among,
        SnowballProgram = lunr.stemmerSupport.SnowballProgram,
        st = new function() {
          var base = new BaseStemmer();
          /** @const */
          var a_0 = [
            ["ce", -1, 1],
            ["ze", -1, 2],
            ["\u017Ee", -1, 2],
            ["ci", -1, 1],
            ["\u010Dti", -1, 3],
            ["\u0161ti", -1, 4],
            ["zi", -1, 2],
            ["\u010Di", -1, 1],
            ["\u017Ei", -1, 2],
            ["\u010Dt\u00E9", -1, 3],
            ["\u0161t\u00E9", -1, 4],
            ["\u010D", -1, 1],
            ["\u010Dt\u011B", -1, 3],
            ["\u0161t\u011B", -1, 4]
          ];

          /** @const */
          var a_1 = [
            ["in", -1, 2],
            ["ov", -1, 1],
            ["\u016Fv", -1, 1]
          ];

          /** @const */
          var a_2 = [
            ["a", -1, 1],
            ["ama", 0, 1],
            ["ata", 0, 1],
            ["e", -1, 2],
            ["\u011Bte", 3, 2],
            ["ech", -1, 2],
            ["atech", 5, 1],
            ["ich", -1, 2],
            ["\u00E1ch", -1, 1],
            ["\u00EDch", -1, 2],
            ["\u00FDch", -1, 1],
            ["i", -1, 2],
            ["mi", 11, 1],
            ["ami", 12, 1],
            ["emi", 12, 2],
            ["\u00EDmi", 12, 2],
            ["\u00FDmi", 12, 1],
            ["\u011Bmi", 12, 2],
            ["\u011Bti", 11, 2],
            ["ovi", 11, 1],
            ["em", -1, 3],
            ["\u011Btem", 20, 1],
            ["\u00E1m", -1, 1],
            ["\u00E9m", -1, 2],
            ["\u00EDm", -1, 2],
            ["\u00FDm", -1, 1],
            ["at\u016Fm", -1, 1],
            ["o", -1, 1],
            ["iho", 27, 2],
            ["\u00E9ho", 27, 2],
            ["\u00EDho", 27, 2],
            ["es", -1, 2],
            ["os", -1, 1],
            ["us", -1, 1],
            ["at", -1, 1],
            ["u", -1, 1],
            ["imu", 35, 2],
            ["\u00E9mu", 35, 2],
            ["ou", 35, 1],
            ["y", -1, 1],
            ["aty", 39, 1],
            ["\u00E1", -1, 1],
            ["\u00E9", -1, 1],
            ["ov\u00E9", 42, 1],
            ["\u00ED", -1, 2],
            ["\u00FD", -1, 1],
            ["\u011B", -1, 2],
            ["\u016F", -1, 1]
          ];

          /** @const */
          var a_3 = [
            ["ob", -1, 1],
            ["itb", -1, 2],
            ["ec", -1, 3],
            ["inec", 2, 2],
            ["obinec", 3, 1],
            ["ovec", 2, 1],
            ["ic", -1, 2],
            ["enic", 6, 3],
            ["och", -1, 1],
            ["\u00E1sek", -1, 1],
            ["nk", -1, 1],
            ["isk", -1, 2],
            ["ovisk", 11, 1],
            ["tk", -1, 1],
            ["vk", -1, 1],
            ["n\u00EDk", -1, 1],
            ["ovn\u00EDk", 15, 1],
            ["ov\u00EDk", -1, 1],
            ["\u010Dk", -1, 1],
            ["i\u0161k", -1, 2],
            ["u\u0161k", -1, 1],
            ["dl", -1, 1],
            ["itel", -1, 2],
            ["ul", -1, 1],
            ["an", -1, 1],
            ["\u010Dan", 24, 1],
            ["en", -1, 3],
            ["in", -1, 2],
            ["\u0161tin", 27, 1],
            ["ovin", 27, 1],
            ["teln", -1, 1],
            ["\u00E1rn", -1, 1],
            ["\u00EDrn", -1, 6],
            ["oun", -1, 1],
            ["loun", 33, 1],
            ["ovn", -1, 1],
            ["yn", -1, 1],
            ["kyn", 36, 1],
            ["\u00E1n", -1, 1],
            ["i\u00E1n", 38, 2],
            ["\u00EDn", -1, 6],
            ["\u010Dn", -1, 1],
            ["\u011Bn", -1, 5],
            ["as", -1, 1],
            ["it", -1, 2],
            ["ot", -1, 1],
            ["ist", -1, 2],
            ["ost", -1, 1],
            ["nost", 47, 1],
            ["out", -1, 1],
            ["ovi\u0161t", -1, 1],
            ["iv", -1, 2],
            ["ov", -1, 1],
            ["tv", -1, 1],
            ["ctv", 53, 1],
            ["stv", 53, 1],
            ["ovstv", 55, 1],
            ["ovtv", 53, 1],
            ["a\u010D", -1, 1],
            ["\u00E1\u010D", -1, 1],
            ["o\u0148", -1, 1],
            ["\u00E1\u0159", -1, 1],
            ["k\u00E1\u0159", 61, 1],
            ["ion\u00E1\u0159", 61, 2],
            ["\u00E9\u0159", -1, 4],
            ["n\u00E9\u0159", 64, 1],
            ["\u00ED\u0159", -1, 6],
            ["ou\u0161", -1, 1]
          ];

          /** @const */
          var a_4 = [
            ["c", -1, 1],
            ["k", -1, 1],
            ["l", -1, 1],
            ["n", -1, 1],
            ["t", -1, 1],
            ["\u010D", -1, 1]
          ];

          /** @const */
          var a_5 = [
            ["isk", -1, 2],
            ["\u00E1k", -1, 1],
            ["izn", -1, 2],
            ["ajzn", -1, 1]
          ];

          /** @const */
          var a_6 = [
            ["k", -1, 1],
            ["ak", 0, 7],
            ["ek", 0, 2],
            ["anek", 2, 1],
            ["enek", 2, 2],
            ["inek", 2, 4],
            ["onek", 2, 1],
            ["unek", 2, 1],
            ["\u00E1nek", 2, 1],
            ["a\u010Dek", 2, 1],
            ["e\u010Dek", 2, 2],
            ["i\u010Dek", 2, 4],
            ["o\u010Dek", 2, 1],
            ["u\u010Dek", 2, 1],
            ["\u00E1\u010Dek", 2, 1],
            ["\u00E9\u010Dek", 2, 3],
            ["\u00ED\u010Dek", 2, 5],
            ["ou\u0161ek", 2, 1],
            ["ik", 0, 4],
            ["ank", 0, 1],
            ["enk", 0, 1],
            ["ink", 0, 1],
            ["onk", 0, 1],
            ["unk", 0, 1],
            ["\u00E1nk", 0, 1],
            ["\u00E9nk", 0, 1],
            ["\u00EDnk", 0, 1],
            ["ok", 0, 8],
            ["\u00E1tk", 0, 1],
            ["uk", 0, 9],
            ["\u00E1k", 0, 6],
            ["\u00E9k", 0, 3],
            ["\u00EDk", 0, 5],
            ["a\u010Dk", 0, 1],
            ["e\u010Dk", 0, 1],
            ["i\u010Dk", 0, 1],
            ["o\u010Dk", 0, 1],
            ["u\u010Dk", 0, 1],
            ["\u00E1\u010Dk", 0, 1],
            ["\u00E9\u010Dk", 0, 1],
            ["\u00ED\u010Dk", 0, 1],
            ["u\u0161k", 0, 1]
          ];

          /** @const */
          var a_7 = [
            ["ej\u0161", -1, 2],
            ["\u011Bj\u0161", -1, 1]
          ];

          /** @const */
          var /** Array<int> */ g_v = [17, 65, 16, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 17, 4, 18, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64];

          var /** number */ I_p1 = 0;
          var /** number */ I_pV = 0;


          /** @return {boolean} */
          function r_mark_regions() {
            // (, line 41
            I_pV = base.limit;
            I_p1 = base.limit;
            // do, line 46
            var /** number */ v_1 = base.cursor;
            lab0: {
              // (, line 46
              // gopast, line 47
              golab1: while (true) {
                lab2: {
                  if (!(base.out_grouping(g_v, 97, 367))) {
                    break lab2;
                  }
                  break golab1;
                }
                if (base.cursor >= base.limit) {
                  break lab0;
                }
                base.cursor++;
              }
              // setmark pV, line 47
              I_pV = base.cursor;
              // gopast, line 48
              golab3: while (true) {
                lab4: {
                  if (!(base.out_grouping(g_v, 97, 367))) {
                    break lab4;
                  }
                  break golab3;
                }
                if (base.cursor >= base.limit) {
                  break lab0;
                }
                base.cursor++;
              }
              // gopast, line 48
              golab5: while (true) {
                lab6: {
                  if (!(base.in_grouping(g_v, 97, 367))) {
                    break lab6;
                  }
                  break golab5;
                }
                if (base.cursor >= base.limit) {
                  break lab0;
                }
                base.cursor++;
              }
              // setmark p1, line 48
              I_p1 = base.cursor;
            }
            base.cursor = v_1;
            return true;
          };

          /** @return {boolean} */
          function r_RV() {
            if (!(I_pV <= base.cursor)) {
              return false;
            }
            return true;
          };

          /** @return {boolean} */
          function r_R1() {
            if (!(I_p1 <= base.cursor)) {
              return false;
            }
            return true;
          };

          /** @return {boolean} */
          function r_palatalise() {
            var /** number */ among_var;
            // (, line 57
            // [, line 58
            base.ket = base.cursor;
            // substring, line 58
            among_var = base.find_among_b(a_0);
            if (among_var == 0) {
              return false;
            }
            // ], line 58
            base.bra = base.cursor;
            // call RV, line 58
            if (!r_RV()) {
              return false;
            }
            switch (among_var) {
              case 1:
                // (, line 60
                // <-, line 60
                if (!base.slice_from("k")) {
                  return false;
                }
                break;
              case 2:
                // (, line 62
                // <-, line 62
                if (!base.slice_from("h")) {
                  return false;
                }
                break;
              case 3:
                // (, line 64
                // <-, line 64
                if (!base.slice_from("ck")) {
                  return false;
                }
                break;
              case 4:
                // (, line 66
                // <-, line 66
                if (!base.slice_from("sk")) {
                  return false;
                }
                break;
            }
            return true;
          };

          /** @return {boolean} */
          function r_do_possessive() {
            var /** number */ among_var;
            // (, line 70
            // [, line 71
            base.ket = base.cursor;
            // substring, line 71
            among_var = base.find_among_b(a_1);
            if (among_var == 0) {
              return false;
            }
            // ], line 71
            base.bra = base.cursor;
            // call RV, line 71
            if (!r_RV()) {
              return false;
            }
            switch (among_var) {
              case 1:
                // (, line 73
                // delete, line 73
                if (!base.slice_del()) {
                  return false;
                }
                break;
              case 2:
                // (, line 75
                // delete, line 76
                if (!base.slice_del()) {
                  return false;
                }
                // try, line 77
                var /** number */ v_1 = base.limit - base.cursor;
                lab0: {
                  // call palatalise, line 77
                  if (!r_palatalise()) {
                    base.cursor = base.limit - v_1;
                    break lab0;
                  }
                }
                break;
            }
            return true;
          };

          /** @return {boolean} */
          function r_do_case() {
            var /** number */ among_var;
            // (, line 82
            // [, line 83
            base.ket = base.cursor;
            // substring, line 83
            among_var = base.find_among_b(a_2);
            if (among_var == 0) {
              return false;
            }
            // ], line 83
            base.bra = base.cursor;
            switch (among_var) {
              case 1:
                // (, line 90
                // delete, line 90
                if (!base.slice_del()) {
                  return false;
                }
                break;
              case 2:
                // (, line 96
                // delete, line 97
                if (!base.slice_del()) {
                  return false;
                }
                // try, line 98
                var /** number */ v_1 = base.limit - base.cursor;
                lab0: {
                  // call palatalise, line 98
                  if (!r_palatalise()) {
                    base.cursor = base.limit - v_1;
                    break lab0;
                  }
                }
                break;
              case 3:
                // (, line 101
                // <-, line 102
                if (!base.slice_from("e")) {
                  return false;
                }
                // try, line 103
                var /** number */ v_2 = base.limit - base.cursor;
                lab1: {
                  // call palatalise, line 103
                  if (!r_palatalise()) {
                    base.cursor = base.limit - v_2;
                    break lab1;
                  }
                }
                break;
            }
            return true;
          };

          /** @return {boolean} */
          function r_do_derivational() {
            var /** number */ among_var;
            // (, line 108
            // [, line 109
            base.ket = base.cursor;
            // substring, line 109
            among_var = base.find_among_b(a_3);
            if (among_var == 0) {
              return false;
            }
            // ], line 109
            base.bra = base.cursor;
            // call R1, line 109
            if (!r_R1()) {
              return false;
            }
            switch (among_var) {
              case 1:
                // (, line 118
                // delete, line 118
                if (!base.slice_del()) {
                  return false;
                }
                break;
              case 2:
                // (, line 123
                // <-, line 124
                if (!base.slice_from("i")) {
                  return false;
                }
                // call palatalise, line 125
                if (!r_palatalise()) {
                  return false;
                }
                break;
              case 3:
                // (, line 128
                // <-, line 129
                if (!base.slice_from("e")) {
                  return false;
                }
                // call palatalise, line 130
                if (!r_palatalise()) {
                  return false;
                }
                break;
              case 4:
                // (, line 133
                // <-, line 134
                if (!base.slice_from("\u00E9")) {
                  return false;
                }
                // call palatalise, line 135
                if (!r_palatalise()) {
                  return false;
                }
                break;
              case 5:
                // (, line 138
                // <-, line 139
                if (!base.slice_from("\u011B")) {
                  return false;
                }
                // call palatalise, line 140
                if (!r_palatalise()) {
                  return false;
                }
                break;
              case 6:
                // (, line 144
                // <-, line 145
                if (!base.slice_from("\u00ED")) {
                  return false;
                }
                // call palatalise, line 146
                if (!r_palatalise()) {
                  return false;
                }
                break;
            }
            return true;
          };

          /** @return {boolean} */
          function r_do_deriv_single() {
            // (, line 150
            // [, line 151
            base.ket = base.cursor;
            // substring, line 151
            if (base.find_among_b(a_4) == 0) {
              return false;
            }
            // ], line 151
            base.bra = base.cursor;
            // (, line 153
            // delete, line 153
            if (!base.slice_del()) {
              return false;
            }
            return true;
          };

          /** @return {boolean} */
          function r_do_augmentative() {
            var /** number */ among_var;
            // (, line 158
            // [, line 159
            base.ket = base.cursor;
            // substring, line 159
            among_var = base.find_among_b(a_5);
            if (among_var == 0) {
              return false;
            }
            // ], line 159
            base.bra = base.cursor;
            switch (among_var) {
              case 1:
                // (, line 161
                // delete, line 161
                if (!base.slice_del()) {
                  return false;
                }
                break;
              case 2:
                // (, line 163
                // <-, line 164
                if (!base.slice_from("i")) {
                  return false;
                }
                // call palatalise, line 165
                if (!r_palatalise()) {
                  return false;
                }
                break;
            }
            return true;
          };

          /** @return {boolean} */
          function r_do_diminutive() {
            var /** number */ among_var;
            // (, line 170
            // [, line 171
            base.ket = base.cursor;
            // substring, line 171
            among_var = base.find_among_b(a_6);
            if (among_var == 0) {
              return false;
            }
            // ], line 171
            base.bra = base.cursor;
            switch (among_var) {
              case 1:
                // (, line 178
                // delete, line 178
                if (!base.slice_del()) {
                  return false;
                }
                break;
              case 2:
                // (, line 180
                // <-, line 181
                if (!base.slice_from("e")) {
                  return false;
                }
                // call palatalise, line 182
                if (!r_palatalise()) {
                  return false;
                }
                break;
              case 3:
                // (, line 185
                // <-, line 186
                if (!base.slice_from("\u00E9")) {
                  return false;
                }
                // call palatalise, line 187
                if (!r_palatalise()) {
                  return false;
                }
                break;
              case 4:
                // (, line 190
                // <-, line 191
                if (!base.slice_from("i")) {
                  return false;
                }
                // call palatalise, line 192
                if (!r_palatalise()) {
                  return false;
                }
                break;
              case 5:
                // (, line 195
                // <-, line 196
                if (!base.slice_from("\u00ED")) {
                  return false;
                }
                // call palatalise, line 197
                if (!r_palatalise()) {
                  return false;
                }
                break;
              case 6:
                // (, line 200
                // <-, line 200
                if (!base.slice_from("\u00E1")) {
                  return false;
                }
                break;
              case 7:
                // (, line 202
                // <-, line 202
                if (!base.slice_from("a")) {
                  return false;
                }
                break;
              case 8:
                // (, line 204
                // <-, line 204
                if (!base.slice_from("o")) {
                  return false;
                }
                break;
              case 9:
                // (, line 206
                // <-, line 206
                if (!base.slice_from("u")) {
                  return false;
                }
                break;
            }
            return true;
          };

          /** @return {boolean} */
          function r_do_comparative() {
            var /** number */ among_var;
            // (, line 210
            // [, line 211
            base.ket = base.cursor;
            // substring, line 211
            among_var = base.find_among_b(a_7);
            if (among_var == 0) {
              return false;
            }
            // ], line 211
            base.bra = base.cursor;
            switch (among_var) {
              case 1:
                // (, line 213
                // <-, line 214
                if (!base.slice_from("\u011B")) {
                  return false;
                }
                // call palatalise, line 215
                if (!r_palatalise()) {
                  return false;
                }
                break;
              case 2:
                // (, line 218
                // <-, line 219
                if (!base.slice_from("e")) {
                  return false;
                }
                // call palatalise, line 220
                if (!r_palatalise()) {
                  return false;
                }
                break;
            }
            return true;
          };

          /** @return {boolean} */
          function r_do_aggressive() {
            // (, line 225
            // do, line 226
            var /** number */ v_1 = base.limit - base.cursor;
            lab0: {
              // call do_comparative, line 226
              if (!r_do_comparative()) {
                break lab0;
              }
            }
            base.cursor = base.limit - v_1;
            // do, line 227
            var /** number */ v_2 = base.limit - base.cursor;
            lab1: {
              // call do_diminutive, line 227
              if (!r_do_diminutive()) {
                break lab1;
              }
            }
            base.cursor = base.limit - v_2;
            // do, line 228
            var /** number */ v_3 = base.limit - base.cursor;
            lab2: {
              // call do_augmentative, line 228
              if (!r_do_augmentative()) {
                break lab2;
              }
            }
            base.cursor = base.limit - v_3;
            // or, line 229
            lab3: {
              var /** number */ v_4 = base.limit - base.cursor;
              lab4: {
                // call do_derivational, line 229
                if (!r_do_derivational()) {
                  break lab4;
                }
                break lab3;
              }
              base.cursor = base.limit - v_4;
              // call do_deriv_single, line 229
              if (!r_do_deriv_single()) {
                return false;
              }
            }
            return true;
          };

          this.stem = /** @return {boolean} */ function() {
            // (, line 233
            // do, line 234
            lab0: {
              // call mark_regions, line 234
              if (!r_mark_regions()) {
                break lab0;
              }
            }
            // backwards, line 235
            base.limit_backward = base.cursor;base.cursor = base.limit;
            // (, line 235
            // call do_case, line 236
            if (!r_do_case()) {
              return false;
            }
            // call do_possessive, line 237
            if (!r_do_possessive()) {
              return false;
            }
            // call do_aggressive, line 240
            if (!r_do_aggressive()) {
              return false;
            }
            base.cursor = base.limit_backward;
            return true;
          };

          /**@return{string}*/
          this['stemWord'] = function( /**string*/ word) {
            base.setCurrent(word);
            this.stem();
            return base.getCurrent();
          };
        };;

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

    lunr.Pipeline.registerFunction(lunr.cs.stemmer, 'stemmer-cs');

    lunr.cs.stopWordFilter = lunr.generateStopWordFilter('a aby ahoj aj ale anebo ani aniž ano asi aspoåˆ aspoň atd atp az aäkoli ačkoli až bez beze blã­zko blízko bohuå¾el bohužel brzo bude budem budeme budes budete budeå¡ budeš budou budu by byl byla byli bylo byly bys byt bä›hem být během chce chceme chcete chceå¡ chceš chci chtã­t chtä›jã­ chtít chtějí chut\' chuti ci clanek clanku clanky co coz což cz daleko dalsi další den deset design devatenáct devatenã¡ct devä›t devět dnes do dobrã½ dobrý docela dva dvacet dvanáct dvanã¡ct dvä› dvě dál dále dã¡l dã¡le dä›kovat dä›kujeme dä›kuji děkovat děkujeme děkuji email ho hodnä› hodně i jak jakmile jako jakož jde je jeden jedenáct jedenã¡ct jedna jedno jednou jedou jeho jehož jej jeji jejich jejã­ její jelikož jemu jen jenom jenž jeste jestli jestliå¾e jestliže jeå¡tä› ještě jež ji jich jimi jinak jine jiné jiz již jsem jses jseš jsi jsme jsou jste já jã¡ jã­ jã­m jí jím jíž jšte k kam každý kde kdo kdy kdyz kdyå¾ když ke kolik kromä› kromě ktera ktere kteri kterou ktery která kterã¡ kterã© kterã½ které který kteå™ã­ kteři kteří ku kvå¯li kvůli ma majã­ mají mate me mezi mi mit mne mnou mnä› mně moc mohl mohou moje moji moå¾nã¡ možná muj musã­ musí muze my má málo mám máme máte máš mã¡ mã¡lo mã¡m mã¡me mã¡te mã¡å¡ mã© mã­ mã­t mä› må¯j må¯å¾e mé mí mít mě můj může na nad nade nam napiste napište naproti nas nasi naå¡e naå¡i načež naše naši ne nebo nebyl nebyla nebyli nebyly nechť nedä›lajã­ nedä›lã¡ nedä›lã¡m nedä›lã¡me nedä›lã¡te nedä›lã¡å¡ nedělají nedělá nedělám neděláme neděláte neděláš neg nejsi nejsou nemajã­ nemají nemáme nemáte nemã¡me nemã¡te nemä›l neměl neni nenã­ není nestaäã­ nestačí nevadã­ nevadí nez neå¾ než nic nich nimi nove novy nové nový nula ná nám námi nás náš nã¡m nã¡mi nã¡s nã¡å¡ nã­m nä› nä›co nä›jak nä›kde nä›kdo nä›mu ní ním ně něco nějak někde někdo němu němuž o od ode on ona oni ono ony osm osmnáct osmnã¡ct pak patnáct patnã¡ct po pod podle pokud potom pouze pozdä› pozdě poå™ã¡d pořád prave pravé pred pres pri pro proc prostä› prostě prosã­m prosím proti proto protoze protoå¾e protože proä proč prvni první práve pta pä›t på™ed på™es på™ese pět před přede přes přese při přičemž re rovnä› rovně s se sedm sedmnáct sedmnã¡ct si sice skoro smã­ smä›jã­ smí smějí snad spolu sta sto strana stã© sté sve svych svym svymi své svých svým svými svůj ta tady tak take takhle taky takze také takže tam tamhle tamhleto tamto tato te tebe tebou ted\' tedy tema ten tento teto ti tim timto tipy tisã­c tisã­ce tisíc tisíce to tobä› tobě tohle toho tohoto tom tomto tomu tomuto toto troå¡ku trošku tu tuto tvoje tvá tvã¡ tvã© två¯j tvé tvůj ty tyto tä› tå™eba tå™i tå™inã¡ct téma této tím tímto tě těm těma těmu třeba tři třináct u uräitä› určitě uz uå¾ už v vam vas vase vaå¡e vaå¡i vaše vaši ve vedle veäer večer vice vlastnä› vlastně vsak vy vám vámi vás váš vã¡m vã¡mi vã¡s vã¡å¡ vå¡echno vå¡ichni vå¯bec vå¾dy více však všechen všechno všichni vůbec vždy z za zatã­mco zatímco zaä zač zda zde ze zpet zpravy zprávy zpět äau ätrnã¡ct ätyå™i å¡est å¡estnã¡ct å¾e čau či článek článku články čtrnáct čtyři šest šestnáct že'.split(' '));

    lunr.Pipeline.registerFunction(lunr.cs.stopWordFilter, 'stopWordFilter-cs');
  };
}))