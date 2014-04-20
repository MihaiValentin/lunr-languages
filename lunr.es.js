/*!
 * Lunr languages, `Spanish` language
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

/* throw error if lunr is not yet included */
if ('undefined' === typeof lunr) {
  throw new Error('Lunr is not present. Please include / require Lunr before this script.');
}

/* throw error if lunr stemmer support is not yet included */
if ('undefined' === typeof lunr.stemmerSupport) {
  throw new Error('Lunr stemmer support is not present. Please include / require Lunr stemmer support before this script.');
}

/* register specific locale function */
lunr.es = function() {
  this.pipeline.reset();
  this.pipeline.add(
    lunr.es.stopWordFilter,
    lunr.es.stemmer
  );
};

/* lunr stemmer function */
lunr.es.stemmer = (function() {
  /* create the wrapped stemmer object */
  var Among = lunr.stemmerSupport.Among,
    SnowballProgram = lunr.stemmerSupport.SnowballProgram,
    st = new function SpanishStemmer() {
      var a_0 = [new Among("", -1, 6), new Among("\u00E1", 0, 1),
        new Among("\u00E9", 0, 2), new Among("\u00ED", 0, 3),
        new Among("\u00F3", 0, 4), new Among("\u00FA", 0, 5)
      ],
        a_1 = [
          new Among("la", -1, -1), new Among("sela", 0, -1),
          new Among("le", -1, -1), new Among("me", -1, -1),
          new Among("se", -1, -1), new Among("lo", -1, -1),
          new Among("selo", 5, -1), new Among("las", -1, -1),
          new Among("selas", 7, -1), new Among("les", -1, -1),
          new Among("los", -1, -1), new Among("selos", 10, -1),
          new Among("nos", -1, -1)
        ],
        a_2 = [new Among("ando", -1, 6),
          new Among("iendo", -1, 6), new Among("yendo", -1, 7),
          new Among("\u00E1ndo", -1, 2), new Among("i\u00E9ndo", -1, 1),
          new Among("ar", -1, 6), new Among("er", -1, 6),
          new Among("ir", -1, 6), new Among("\u00E1r", -1, 3),
          new Among("\u00E9r", -1, 4), new Among("\u00EDr", -1, 5)
        ],
        a_3 = [
          new Among("ic", -1, -1), new Among("ad", -1, -1),
          new Among("os", -1, -1), new Among("iv", -1, 1)
        ],
        a_4 = [
          new Among("able", -1, 1), new Among("ible", -1, 1),
          new Among("ante", -1, 1)
        ],
        a_5 = [new Among("ic", -1, 1),
          new Among("abil", -1, 1), new Among("iv", -1, 1)
        ],
        a_6 = [
          new Among("ica", -1, 1), new Among("ancia", -1, 2),
          new Among("encia", -1, 5), new Among("adora", -1, 2),
          new Among("osa", -1, 1), new Among("ista", -1, 1),
          new Among("iva", -1, 9), new Among("anza", -1, 1),
          new Among("log\u00EDa", -1, 3), new Among("idad", -1, 8),
          new Among("able", -1, 1), new Among("ible", -1, 1),
          new Among("ante", -1, 2), new Among("mente", -1, 7),
          new Among("amente", 13, 6), new Among("aci\u00F3n", -1, 2),
          new Among("uci\u00F3n", -1, 4), new Among("ico", -1, 1),
          new Among("ismo", -1, 1), new Among("oso", -1, 1),
          new Among("amiento", -1, 1), new Among("imiento", -1, 1),
          new Among("ivo", -1, 9), new Among("ador", -1, 2),
          new Among("icas", -1, 1), new Among("ancias", -1, 2),
          new Among("encias", -1, 5), new Among("adoras", -1, 2),
          new Among("osas", -1, 1), new Among("istas", -1, 1),
          new Among("ivas", -1, 9), new Among("anzas", -1, 1),
          new Among("log\u00EDas", -1, 3), new Among("idades", -1, 8),
          new Among("ables", -1, 1), new Among("ibles", -1, 1),
          new Among("aciones", -1, 2), new Among("uciones", -1, 4),
          new Among("adores", -1, 2), new Among("antes", -1, 2),
          new Among("icos", -1, 1), new Among("ismos", -1, 1),
          new Among("osos", -1, 1), new Among("amientos", -1, 1),
          new Among("imientos", -1, 1), new Among("ivos", -1, 9)
        ],
        a_7 = [
          new Among("ya", -1, 1), new Among("ye", -1, 1),
          new Among("yan", -1, 1), new Among("yen", -1, 1),
          new Among("yeron", -1, 1), new Among("yendo", -1, 1),
          new Among("yo", -1, 1), new Among("yas", -1, 1),
          new Among("yes", -1, 1), new Among("yais", -1, 1),
          new Among("yamos", -1, 1), new Among("y\u00F3", -1, 1)
        ],
        a_8 = [
          new Among("aba", -1, 2), new Among("ada", -1, 2),
          new Among("ida", -1, 2), new Among("ara", -1, 2),
          new Among("iera", -1, 2), new Among("\u00EDa", -1, 2),
          new Among("ar\u00EDa", 5, 2), new Among("er\u00EDa", 5, 2),
          new Among("ir\u00EDa", 5, 2), new Among("ad", -1, 2),
          new Among("ed", -1, 2), new Among("id", -1, 2),
          new Among("ase", -1, 2), new Among("iese", -1, 2),
          new Among("aste", -1, 2), new Among("iste", -1, 2),
          new Among("an", -1, 2), new Among("aban", 16, 2),
          new Among("aran", 16, 2), new Among("ieran", 16, 2),
          new Among("\u00EDan", 16, 2), new Among("ar\u00EDan", 20, 2),
          new Among("er\u00EDan", 20, 2), new Among("ir\u00EDan", 20, 2),
          new Among("en", -1, 1), new Among("asen", 24, 2),
          new Among("iesen", 24, 2), new Among("aron", -1, 2),
          new Among("ieron", -1, 2), new Among("ar\u00E1n", -1, 2),
          new Among("er\u00E1n", -1, 2), new Among("ir\u00E1n", -1, 2),
          new Among("ado", -1, 2), new Among("ido", -1, 2),
          new Among("ando", -1, 2), new Among("iendo", -1, 2),
          new Among("ar", -1, 2), new Among("er", -1, 2),
          new Among("ir", -1, 2), new Among("as", -1, 2),
          new Among("abas", 39, 2), new Among("adas", 39, 2),
          new Among("idas", 39, 2), new Among("aras", 39, 2),
          new Among("ieras", 39, 2), new Among("\u00EDas", 39, 2),
          new Among("ar\u00EDas", 45, 2), new Among("er\u00EDas", 45, 2),
          new Among("ir\u00EDas", 45, 2), new Among("es", -1, 1),
          new Among("ases", 49, 2), new Among("ieses", 49, 2),
          new Among("abais", -1, 2), new Among("arais", -1, 2),
          new Among("ierais", -1, 2), new Among("\u00EDais", -1, 2),
          new Among("ar\u00EDais", 55, 2), new Among("er\u00EDais", 55, 2),
          new Among("ir\u00EDais", 55, 2), new Among("aseis", -1, 2),
          new Among("ieseis", -1, 2), new Among("asteis", -1, 2),
          new Among("isteis", -1, 2), new Among("\u00E1is", -1, 2),
          new Among("\u00E9is", -1, 1), new Among("ar\u00E9is", 64, 2),
          new Among("er\u00E9is", 64, 2), new Among("ir\u00E9is", 64, 2),
          new Among("ados", -1, 2), new Among("idos", -1, 2),
          new Among("amos", -1, 2), new Among("\u00E1bamos", 70, 2),
          new Among("\u00E1ramos", 70, 2), new Among("i\u00E9ramos", 70, 2),
          new Among("\u00EDamos", 70, 2), new Among("ar\u00EDamos", 74, 2),
          new Among("er\u00EDamos", 74, 2), new Among("ir\u00EDamos", 74, 2),
          new Among("emos", -1, 1), new Among("aremos", 78, 2),
          new Among("eremos", 78, 2), new Among("iremos", 78, 2),
          new Among("\u00E1semos", 78, 2), new Among("i\u00E9semos", 78, 2),
          new Among("imos", -1, 2), new Among("ar\u00E1s", -1, 2),
          new Among("er\u00E1s", -1, 2), new Among("ir\u00E1s", -1, 2),
          new Among("\u00EDs", -1, 2), new Among("ar\u00E1", -1, 2),
          new Among("er\u00E1", -1, 2), new Among("ir\u00E1", -1, 2),
          new Among("ar\u00E9", -1, 2), new Among("er\u00E9", -1, 2),
          new Among("ir\u00E9", -1, 2), new Among("i\u00F3", -1, 2)
        ],
        a_9 = [
          new Among("a", -1, 1), new Among("e", -1, 2),
          new Among("o", -1, 1), new Among("os", -1, 1),
          new Among("\u00E1", -1, 1), new Among("\u00E9", -1, 2),
          new Among("\u00ED", -1, 1), new Among("\u00F3", -1, 1)
        ],
        g_v = [17,
          65, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 17, 4, 10
        ],
        I_p2, I_p1, I_pV, sbp = new SnowballProgram();
      this.setCurrent = function(word) {
        sbp.setCurrent(word);
      };
      this.getCurrent = function() {
        return sbp.getCurrent();
      };

      function habr1() {
        if (sbp.out_grouping(g_v, 97, 252)) {
          while (!sbp.in_grouping(g_v, 97, 252)) {
            if (sbp.cursor >= sbp.limit)
              return true;
            sbp.cursor++;
          }
          return false;
        }
        return true;
      }

      function habr2() {
        if (sbp.in_grouping(g_v, 97, 252)) {
          var v_1 = sbp.cursor;
          if (habr1()) {
            sbp.cursor = v_1;
            if (!sbp.in_grouping(g_v, 97, 252))
              return true;
            while (!sbp.out_grouping(g_v, 97, 252)) {
              if (sbp.cursor >= sbp.limit)
                return true;
              sbp.cursor++;
            }
          }
          return false;
        }
        return true;
      }

      function habr3() {
        var v_1 = sbp.cursor,
          v_2;
        if (habr2()) {
          sbp.cursor = v_1;
          if (!sbp.out_grouping(g_v, 97, 252))
            return;
          v_2 = sbp.cursor;
          if (habr1()) {
            sbp.cursor = v_2;
            if (!sbp.in_grouping(g_v, 97, 252) || sbp.cursor >= sbp.limit)
              return;
            sbp.cursor++;
          }
        }
        I_pV = sbp.cursor;
      }

      function habr4() {
        while (!sbp.in_grouping(g_v, 97, 252)) {
          if (sbp.cursor >= sbp.limit)
            return false;
          sbp.cursor++;
        }
        while (!sbp.out_grouping(g_v, 97, 252)) {
          if (sbp.cursor >= sbp.limit)
            return false;
          sbp.cursor++;
        }
        return true;
      }

      function r_mark_regions() {
        var v_1 = sbp.cursor;
        I_pV = sbp.limit;
        I_p1 = I_pV;
        I_p2 = I_pV;
        habr3();
        sbp.cursor = v_1;
        if (habr4()) {
          I_p1 = sbp.cursor;
          if (habr4())
            I_p2 = sbp.cursor;
        }
      }

      function r_postlude() {
        var among_var;
        while (true) {
          sbp.bra = sbp.cursor;
          among_var = sbp.find_among(a_0, 6);
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
      }

      function r_RV() {
        return I_pV <= sbp.cursor;
      }

      function r_R1() {
        return I_p1 <= sbp.cursor;
      }

      function r_R2() {
        return I_p2 <= sbp.cursor;
      }

      function r_attached_pronoun() {
        var among_var;
        sbp.ket = sbp.cursor;
        if (sbp.find_among_b(a_1, 13)) {
          sbp.bra = sbp.cursor;
          among_var = sbp.find_among_b(a_2, 11);
          if (among_var && r_RV())
            switch (among_var) {
              case 1:
                sbp.bra = sbp.cursor;
                sbp.slice_from("iendo");
                break;
              case 2:
                sbp.bra = sbp.cursor;
                sbp.slice_from("ando");
                break;
              case 3:
                sbp.bra = sbp.cursor;
                sbp.slice_from("ar");
                break;
              case 4:
                sbp.bra = sbp.cursor;
                sbp.slice_from("er");
                break;
              case 5:
                sbp.bra = sbp.cursor;
                sbp.slice_from("ir");
                break;
              case 6:
                sbp.slice_del();
                break;
              case 7:
                if (sbp.eq_s_b(1, "u"))
                  sbp.slice_del();
                break;
            }
        }
      }

      function habr5(a, n) {
        if (!r_R2())
          return true;
        sbp.slice_del();
        sbp.ket = sbp.cursor;
        var among_var = sbp.find_among_b(a, n);
        if (among_var) {
          sbp.bra = sbp.cursor;
          if (among_var == 1 && r_R2())
            sbp.slice_del();
        }
        return false;
      }

      function habr6(c1) {
        if (!r_R2())
          return true;
        sbp.slice_del();
        sbp.ket = sbp.cursor;
        if (sbp.eq_s_b(2, c1)) {
          sbp.bra = sbp.cursor;
          if (r_R2())
            sbp.slice_del();
        }
        return false;
      }

      function r_standard_suffix() {
        var among_var;
        sbp.ket = sbp.cursor;
        among_var = sbp.find_among_b(a_6, 46);
        if (among_var) {
          sbp.bra = sbp.cursor;
          switch (among_var) {
            case 1:
              if (!r_R2())
                return false;
              sbp.slice_del();
              break;
            case 2:
              if (habr6("ic"))
                return false;
              break;
            case 3:
              if (!r_R2())
                return false;
              sbp.slice_from("log");
              break;
            case 4:
              if (!r_R2())
                return false;
              sbp.slice_from("u");
              break;
            case 5:
              if (!r_R2())
                return false;
              sbp.slice_from("ente");
              break;
            case 6:
              if (!r_R1())
                return false;
              sbp.slice_del();
              sbp.ket = sbp.cursor;
              among_var = sbp.find_among_b(a_3, 4);
              if (among_var) {
                sbp.bra = sbp.cursor;
                if (r_R2()) {
                  sbp.slice_del();
                  if (among_var == 1) {
                    sbp.ket = sbp.cursor;
                    if (sbp.eq_s_b(2, "at")) {
                      sbp.bra = sbp.cursor;
                      if (r_R2())
                        sbp.slice_del();
                    }
                  }
                }
              }
              break;
            case 7:
              if (habr5(a_4, 3))
                return false;
              break;
            case 8:
              if (habr5(a_5, 3))
                return false;
              break;
            case 9:
              if (habr6("at"))
                return false;
              break;
          }
          return true;
        }
        return false;
      }

      function r_y_verb_suffix() {
        var among_var, v_1;
        if (sbp.cursor >= I_pV) {
          v_1 = sbp.limit_backward;
          sbp.limit_backward = I_pV;
          sbp.ket = sbp.cursor;
          among_var = sbp.find_among_b(a_7, 12);
          sbp.limit_backward = v_1;
          if (among_var) {
            sbp.bra = sbp.cursor;
            if (among_var == 1) {
              if (!sbp.eq_s_b(1, "u"))
                return false;
              sbp.slice_del();
            }
            return true;
          }
        }
        return false;
      }

      function r_verb_suffix() {
        var among_var, v_1, v_2, v_3;
        if (sbp.cursor >= I_pV) {
          v_1 = sbp.limit_backward;
          sbp.limit_backward = I_pV;
          sbp.ket = sbp.cursor;
          among_var = sbp.find_among_b(a_8, 96);
          sbp.limit_backward = v_1;
          if (among_var) {
            sbp.bra = sbp.cursor;
            switch (among_var) {
              case 1:
                v_2 = sbp.limit - sbp.cursor;
                if (sbp.eq_s_b(1, "u")) {
                  v_3 = sbp.limit - sbp.cursor;
                  if (sbp.eq_s_b(1, "g"))
                    sbp.cursor = sbp.limit - v_3;
                  else
                    sbp.cursor = sbp.limit - v_2;
                } else
                  sbp.cursor = sbp.limit - v_2;
                sbp.bra = sbp.cursor;
              case 2:
                sbp.slice_del();
                break;
            }
          }
        }
      }

      function r_residual_suffix() {
        var among_var, v_1;
        sbp.ket = sbp.cursor;
        among_var = sbp.find_among_b(a_9, 8);
        if (among_var) {
          sbp.bra = sbp.cursor;
          switch (among_var) {
            case 1:
              if (r_RV())
                sbp.slice_del();
              break;
            case 2:
              if (r_RV()) {
                sbp.slice_del();
                sbp.ket = sbp.cursor;
                if (sbp.eq_s_b(1, "u")) {
                  sbp.bra = sbp.cursor;
                  v_1 = sbp.limit - sbp.cursor;
                  if (sbp.eq_s_b(1, "g")) {
                    sbp.cursor = sbp.limit - v_1;
                    if (r_RV())
                      sbp.slice_del();
                  }
                }
              }
              break;
          }
        }
      }
      this.stem = function() {
        var v_1 = sbp.cursor;
        r_mark_regions();
        sbp.limit_backward = v_1;
        sbp.cursor = sbp.limit;
        r_attached_pronoun();
        sbp.cursor = sbp.limit;
        if (!r_standard_suffix()) {
          sbp.cursor = sbp.limit;
          if (!r_y_verb_suffix()) {
            sbp.cursor = sbp.limit;
            r_verb_suffix();
          }
        }
        sbp.cursor = sbp.limit;
        r_residual_suffix();
        sbp.cursor = sbp.limit_backward;
        r_postlude();
        return true;
      }
    };

  /* and return a function that stems a word for the current locale */
  return function(word) {
    st.setCurrent(word);
    st.stem();
    return st.getCurrent();
  }
})();

lunr.Pipeline.registerFunction(lunr.es.stemmer, 'stemmer-es');

/* stop word filter function */
lunr.es.stopWordFilter = function(token) {
  if (lunr.es.stopWordFilter.stopWords.indexOf(token) === -1) {
    return token;
  }
};

lunr.es.stopWordFilter.stopWords = new lunr.SortedSet();
lunr.es.stopWordFilter.stopWords.length = 309;

// The space at the beginning is crucial: It marks the empty string
// as a stop word. lunr.js crashes during search when documents
// processed by the pipeline still contain the empty string.
lunr.es.stopWordFilter.stopWords.elements = ' de la que el en y a los del se las por un para con no una su al lo como más pero sus le ya o este sí porque esta entre cuando muy sin sobre también me hasta hay donde quien desde todo nos durante todos uno les ni contra otros ese eso ante ellos e esto mí antes algunos qué unos yo otro otras otra él tanto esa estos mucho quienes nada muchos cual poco ella estar estas algunas algo nosotros mi mis tú te ti tu tus ellas nosotras vosotros vosotras os mío mía míos mías tuyo tuya tuyos tuyas suyo suya suyos suyas nuestro nuestra nuestros nuestras vuestro vuestra vuestros vuestras esos esas estoy estás está estamos estáis están esté estés estemos estéis estén estaré estarás estará estaremos estaréis estarán estaría estarías estaríamos estaríais estarían estaba estabas estábamos estabais estaban estuve estuviste estuvo estuvimos estuvisteis estuvieron estuviera estuvieras estuviéramos estuvierais estuvieran estuviese estuvieses estuviésemos estuvieseis estuviesen estando estado estada estados estadas estad he has ha hemos habéis han haya hayas hayamos hayáis hayan habré habrás habrá habremos habréis habrán habría habrías habríamos habríais habrían había habías habíamos habíais habían hube hubiste hubo hubimos hubisteis hubieron hubiera hubieras hubiéramos hubierais hubieran hubiese hubieses hubiésemos hubieseis hubiesen habiendo habido habida habidos habidas soy eres es somos sois son sea seas seamos seáis sean seré serás será seremos seréis serán sería serías seríamos seríais serían era eras éramos erais eran fui fuiste fue fuimos fuisteis fueron fuera fueras fuéramos fuerais fueran fuese fueses fuésemos fueseis fuesen siendo sido tengo tienes tiene tenemos tenéis tienen tenga tengas tengamos tengáis tengan tendré tendrás tendrá tendremos tendréis tendrán tendría tendrías tendríamos tendríais tendrían tenía tenías teníamos teníais tenían tuve tuviste tuvo tuvimos tuvisteis tuvieron tuviera tuvieras tuviéramos tuvierais tuvieran tuviese tuvieses tuviésemos tuvieseis tuviesen teniendo tenido tenida tenidos tenidas tened'.split(' ');

lunr.Pipeline.registerFunction(lunr.es.stopWordFilter, 'stopWordFilter-es');