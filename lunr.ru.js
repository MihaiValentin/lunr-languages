/*!
 * Lunr languages, `Russian` language
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
    lunr.ru = function() {
      this.pipeline.reset();
      this.pipeline.add(
        lunr.ru.trimmer,
        lunr.ru.stopWordFilter,
        lunr.ru.stemmer
      );

      // for lunr version 2
      // this is necessary so that every searched word is also stemmed before
      // in lunr <= 1 this is not needed, as it is done using the normal pipeline
      if (this.searchPipeline) {
        this.searchPipeline.reset();
        this.searchPipeline.add(lunr.ru.stemmer)
      }
    };

    /* lunr trimmer function */
    lunr.ru.wordCharacters = "[0-9\xB2\xB3\xB9\xBC-\xBE\u0400-\u0484\u0487-\u052F\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u09F4-\u09F9\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0B72-\u0B77\u0BE6-\u0BF2\u0C66-\u0C6F\u0C78-\u0C7E\u0CE6-\u0CEF\u0D66-\u0D75\u0DE6-\u0DEF\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F33\u1040-\u1049\u1090-\u1099\u1369-\u137C\u16EE-\u16F0\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1946-\u194F\u19D0-\u19DA\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\u1D2B\u1D78\u2070\u2074-\u2079\u2080-\u2089\u2150-\u2182\u2185-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2CFD\u2DE0-\u2DFF\u3007\u3021-\u3029\u3038-\u303A\u3192-\u3195\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\uA620-\uA629\uA640-\uA69F\uA6E6-\uA6EF\uA830-\uA835\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uA9F0-\uA9F9\uAA50-\uAA59\uABF0-\uABF9\uFE2E\uFE2F\uFF10-\uFF19]|\uD800[\uDD07-\uDD33\uDD40-\uDD78\uDD8A\uDD8B\uDEE1-\uDEFB\uDF20-\uDF23\uDF41\uDF4A\uDFD1-\uDFD5]|\uD801[\uDCA0-\uDCA9]|\uD802[\uDC58-\uDC5F\uDC79-\uDC7F\uDCA7-\uDCAF\uDCFB-\uDCFF\uDD16-\uDD1B\uDDBC\uDDBD\uDDC0-\uDDCF\uDDD2-\uDDFF\uDE40-\uDE47\uDE7D\uDE7E\uDE9D-\uDE9F\uDEEB-\uDEEF\uDF58-\uDF5F\uDF78-\uDF7F\uDFA9-\uDFAF]|\uD803[\uDCFA-\uDCFF\uDE60-\uDE7E]|\uD804[\uDC52-\uDC6F\uDCF0-\uDCF9\uDD36-\uDD3F\uDDD0-\uDDD9\uDDE1-\uDDF4\uDEF0-\uDEF9]|\uD805[\uDCD0-\uDCD9\uDE50-\uDE59\uDEC0-\uDEC9\uDF30-\uDF3B]|\uD806[\uDCE0-\uDCF2]|\uD809[\uDC00-\uDC6E]|\uD81A[\uDE60-\uDE69\uDF50-\uDF59\uDF5B-\uDF61]|\uD834[\uDF60-\uDF71]|\uD835[\uDFCE-\uDFFF]|\uD83A[\uDCC7-\uDCCF]|\uD83C[\uDD00-\uDD0C]";
    lunr.ru.trimmer = lunr.trimmerSupport.generateTrimmer(lunr.ru.wordCharacters);

    lunr.Pipeline.registerFunction(lunr.ru.trimmer, 'trimmer-ru');

    /* lunr stemmer function */
    lunr.ru.stemmer = (function() {
      /* create the wrapped stemmer object */
      var Among = lunr.stemmerSupport.Among,
        SnowballProgram = lunr.stemmerSupport.SnowballProgram,
        st = new function RussianStemmer() {
          var a_0 = [new Among("\u0432", -1, 1), new Among("\u0438\u0432", 0, 2),
              new Among("\u044B\u0432", 0, 2),
              new Among("\u0432\u0448\u0438", -1, 1),
              new Among("\u0438\u0432\u0448\u0438", 3, 2),
              new Among("\u044B\u0432\u0448\u0438", 3, 2),
              new Among("\u0432\u0448\u0438\u0441\u044C", -1, 1),
              new Among("\u0438\u0432\u0448\u0438\u0441\u044C", 6, 2),
              new Among("\u044B\u0432\u0448\u0438\u0441\u044C", 6, 2)
            ],
            a_1 = [
              new Among("\u0435\u0435", -1, 1), new Among("\u0438\u0435", -1, 1),
              new Among("\u043E\u0435", -1, 1), new Among("\u044B\u0435", -1, 1),
              new Among("\u0438\u043C\u0438", -1, 1),
              new Among("\u044B\u043C\u0438", -1, 1),
              new Among("\u0435\u0439", -1, 1), new Among("\u0438\u0439", -1, 1),
              new Among("\u043E\u0439", -1, 1), new Among("\u044B\u0439", -1, 1),
              new Among("\u0435\u043C", -1, 1), new Among("\u0438\u043C", -1, 1),
              new Among("\u043E\u043C", -1, 1), new Among("\u044B\u043C", -1, 1),
              new Among("\u0435\u0433\u043E", -1, 1),
              new Among("\u043E\u0433\u043E", -1, 1),
              new Among("\u0435\u043C\u0443", -1, 1),
              new Among("\u043E\u043C\u0443", -1, 1),
              new Among("\u0438\u0445", -1, 1), new Among("\u044B\u0445", -1, 1),
              new Among("\u0435\u044E", -1, 1), new Among("\u043E\u044E", -1, 1),
              new Among("\u0443\u044E", -1, 1), new Among("\u044E\u044E", -1, 1),
              new Among("\u0430\u044F", -1, 1), new Among("\u044F\u044F", -1, 1)
            ],
            a_2 = [
              new Among("\u0435\u043C", -1, 1), new Among("\u043D\u043D", -1, 1),
              new Among("\u0432\u0448", -1, 1),
              new Among("\u0438\u0432\u0448", 2, 2),
              new Among("\u044B\u0432\u0448", 2, 2), new Among("\u0449", -1, 1),
              new Among("\u044E\u0449", 5, 1),
              new Among("\u0443\u044E\u0449", 6, 2)
            ],
            a_3 = [
              new Among("\u0441\u044C", -1, 1), new Among("\u0441\u044F", -1, 1)
            ],
            a_4 = [
              new Among("\u043B\u0430", -1, 1),
              new Among("\u0438\u043B\u0430", 0, 2),
              new Among("\u044B\u043B\u0430", 0, 2),
              new Among("\u043D\u0430", -1, 1),
              new Among("\u0435\u043D\u0430", 3, 2),
              new Among("\u0435\u0442\u0435", -1, 1),
              new Among("\u0438\u0442\u0435", -1, 2),
              new Among("\u0439\u0442\u0435", -1, 1),
              new Among("\u0435\u0439\u0442\u0435", 7, 2),
              new Among("\u0443\u0439\u0442\u0435", 7, 2),
              new Among("\u043B\u0438", -1, 1),
              new Among("\u0438\u043B\u0438", 10, 2),
              new Among("\u044B\u043B\u0438", 10, 2), new Among("\u0439", -1, 1),
              new Among("\u0435\u0439", 13, 2), new Among("\u0443\u0439", 13, 2),
              new Among("\u043B", -1, 1), new Among("\u0438\u043B", 16, 2),
              new Among("\u044B\u043B", 16, 2), new Among("\u0435\u043C", -1, 1),
              new Among("\u0438\u043C", -1, 2), new Among("\u044B\u043C", -1, 2),
              new Among("\u043D", -1, 1), new Among("\u0435\u043D", 22, 2),
              new Among("\u043B\u043E", -1, 1),
              new Among("\u0438\u043B\u043E", 24, 2),
              new Among("\u044B\u043B\u043E", 24, 2),
              new Among("\u043D\u043E", -1, 1),
              new Among("\u0435\u043D\u043E", 27, 2),
              new Among("\u043D\u043D\u043E", 27, 1),
              new Among("\u0435\u0442", -1, 1),
              new Among("\u0443\u0435\u0442", 30, 2),
              new Among("\u0438\u0442", -1, 2), new Among("\u044B\u0442", -1, 2),
              new Among("\u044E\u0442", -1, 1),
              new Among("\u0443\u044E\u0442", 34, 2),
              new Among("\u044F\u0442", -1, 2), new Among("\u043D\u044B", -1, 1),
              new Among("\u0435\u043D\u044B", 37, 2),
              new Among("\u0442\u044C", -1, 1),
              new Among("\u0438\u0442\u044C", 39, 2),
              new Among("\u044B\u0442\u044C", 39, 2),
              new Among("\u0435\u0448\u044C", -1, 1),
              new Among("\u0438\u0448\u044C", -1, 2), new Among("\u044E", -1, 2),
              new Among("\u0443\u044E", 44, 2)
            ],
            a_5 = [
              new Among("\u0430", -1, 1), new Among("\u0435\u0432", -1, 1),
              new Among("\u043E\u0432", -1, 1), new Among("\u0435", -1, 1),
              new Among("\u0438\u0435", 3, 1), new Among("\u044C\u0435", 3, 1),
              new Among("\u0438", -1, 1), new Among("\u0435\u0438", 6, 1),
              new Among("\u0438\u0438", 6, 1),
              new Among("\u0430\u043C\u0438", 6, 1),
              new Among("\u044F\u043C\u0438", 6, 1),
              new Among("\u0438\u044F\u043C\u0438", 10, 1),
              new Among("\u0439", -1, 1), new Among("\u0435\u0439", 12, 1),
              new Among("\u0438\u0435\u0439", 13, 1),
              new Among("\u0438\u0439", 12, 1), new Among("\u043E\u0439", 12, 1),
              new Among("\u0430\u043C", -1, 1), new Among("\u0435\u043C", -1, 1),
              new Among("\u0438\u0435\u043C", 18, 1),
              new Among("\u043E\u043C", -1, 1), new Among("\u044F\u043C", -1, 1),
              new Among("\u0438\u044F\u043C", 21, 1), new Among("\u043E", -1, 1),
              new Among("\u0443", -1, 1), new Among("\u0430\u0445", -1, 1),
              new Among("\u044F\u0445", -1, 1),
              new Among("\u0438\u044F\u0445", 26, 1), new Among("\u044B", -1, 1),
              new Among("\u044C", -1, 1), new Among("\u044E", -1, 1),
              new Among("\u0438\u044E", 30, 1), new Among("\u044C\u044E", 30, 1),
              new Among("\u044F", -1, 1), new Among("\u0438\u044F", 33, 1),
              new Among("\u044C\u044F", 33, 1)
            ],
            a_6 = [
              new Among("\u043E\u0441\u0442", -1, 1),
              new Among("\u043E\u0441\u0442\u044C", -1, 1)
            ],
            a_7 = [
              new Among("\u0435\u0439\u0448\u0435", -1, 1),
              new Among("\u043D", -1, 2), new Among("\u0435\u0439\u0448", -1, 1),
              new Among("\u044C", -1, 3)
            ],
            g_v = [33, 65, 8, 232],
            I_p2, I_pV, sbp = new SnowballProgram();
          this.setCurrent = function(word) {
            sbp.setCurrent(word);
          };
          this.getCurrent = function() {
            return sbp.getCurrent();
          };

          function habr3() {
            while (!sbp.in_grouping(g_v, 1072, 1103)) {
              if (sbp.cursor >= sbp.limit)
                return false;
              sbp.cursor++;
            }
            return true;
          }

          function habr4() {
            while (!sbp.out_grouping(g_v, 1072, 1103)) {
              if (sbp.cursor >= sbp.limit)
                return false;
              sbp.cursor++;
            }
            return true;
          }

          function r_mark_regions() {
            I_pV = sbp.limit;
            I_p2 = I_pV;
            if (habr3()) {
              I_pV = sbp.cursor;
              if (habr4())
                if (habr3())
                  if (habr4())
                    I_p2 = sbp.cursor;
            }
          }

          function r_R2() {
            return I_p2 <= sbp.cursor;
          }

          function habr2(a, n) {
            var among_var, v_1;
            sbp.ket = sbp.cursor;
            among_var = sbp.find_among_b(a, n);
            if (among_var) {
              sbp.bra = sbp.cursor;
              switch (among_var) {
                case 1:
                  v_1 = sbp.limit - sbp.cursor;
                  if (!sbp.eq_s_b(1, "\u0430")) {
                    sbp.cursor = sbp.limit - v_1;
                    if (!sbp.eq_s_b(1, "\u044F"))
                      return false;
                  }
                  case 2:
                    sbp.slice_del();
                    break;
              }
              return true;
            }
            return false;
          }

          function r_perfective_gerund() {
            return habr2(a_0, 9);
          }

          function habr1(a, n) {
            var among_var;
            sbp.ket = sbp.cursor;
            among_var = sbp.find_among_b(a, n);
            if (among_var) {
              sbp.bra = sbp.cursor;
              if (among_var == 1)
                sbp.slice_del();
              return true;
            }
            return false;
          }

          function r_adjective() {
            return habr1(a_1, 26);
          }

          function r_adjectival() {
            var among_var;
            if (r_adjective()) {
              habr2(a_2, 8);
              return true;
            }
            return false;
          }

          function r_reflexive() {
            return habr1(a_3, 2);
          }

          function r_verb() {
            return habr2(a_4, 46);
          }

          function r_noun() {
            habr1(a_5, 36);
          }

          function r_derivational() {
            var among_var;
            sbp.ket = sbp.cursor;
            among_var = sbp.find_among_b(a_6, 2);
            if (among_var) {
              sbp.bra = sbp.cursor;
              if (r_R2() && among_var == 1)
                sbp.slice_del();
            }
          }

          function r_tidy_up() {
            var among_var;
            sbp.ket = sbp.cursor;
            among_var = sbp.find_among_b(a_7, 4);
            if (among_var) {
              sbp.bra = sbp.cursor;
              switch (among_var) {
                case 1:
                  sbp.slice_del();
                  sbp.ket = sbp.cursor;
                  if (!sbp.eq_s_b(1, "\u043D"))
                    break;
                  sbp.bra = sbp.cursor;
                case 2:
                  if (!sbp.eq_s_b(1, "\u043D"))
                    break;
                case 3:
                  sbp.slice_del();
                  break;
              }
            }
          }
          this.stem = function() {
            r_mark_regions();
            sbp.cursor = sbp.limit;
            if (sbp.cursor < I_pV)
              return false;
            sbp.limit_backward = I_pV;
            if (!r_perfective_gerund()) {
              sbp.cursor = sbp.limit;
              if (!r_reflexive())
                sbp.cursor = sbp.limit;
              if (!r_adjectival()) {
                sbp.cursor = sbp.limit;
                if (!r_verb()) {
                  sbp.cursor = sbp.limit;
                  r_noun();
                }
              }
            }
            sbp.cursor = sbp.limit;
            sbp.ket = sbp.cursor;
            if (sbp.eq_s_b(1, "\u0438")) {
              sbp.bra = sbp.cursor;
              sbp.slice_del();
            } else
              sbp.cursor = sbp.limit;
            r_derivational();
            sbp.cursor = sbp.limit;
            r_tidy_up();
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

    lunr.Pipeline.registerFunction(lunr.ru.stemmer, 'stemmer-ru');

    lunr.ru.stopWordFilter = lunr.generateStopWordFilter('алло без близко более больше будем будет будете будешь будто буду будут будь бы бывает бывь был была были было быть в важная важное важные важный вам вами вас ваш ваша ваше ваши вверх вдали вдруг ведь везде весь вниз внизу во вокруг вон восемнадцатый восемнадцать восемь восьмой вот впрочем времени время все всегда всего всем всеми всему всех всею всю всюду вся всё второй вы г где говорил говорит год года году да давно даже далеко дальше даром два двадцатый двадцать две двенадцатый двенадцать двух девятнадцатый девятнадцать девятый девять действительно дел день десятый десять для до довольно долго должно другая другие других друго другое другой е его ее ей ему если есть еще ещё ею её ж же жизнь за занят занята занято заняты затем зато зачем здесь значит и из или им именно иметь ими имя иногда их к каждая каждое каждые каждый кажется как какая какой кем когда кого ком кому конечно которая которого которой которые который которых кроме кругом кто куда лет ли лишь лучше люди м мало между меля менее меньше меня миллионов мимо мира мне много многочисленная многочисленное многочисленные многочисленный мной мною мог могут мож может можно можхо мои мой мор мочь моя моё мы на наверху над надо назад наиболее наконец нам нами нас начала наш наша наше наши не него недавно недалеко нее ней нельзя нем немного нему непрерывно нередко несколько нет нею неё ни нибудь ниже низко никогда никуда ними них ничего но ну нужно нх о об оба обычно один одиннадцатый одиннадцать однажды однако одного одной около он она они оно опять особенно от отовсюду отсюда очень первый перед по под пожалуйста позже пока пор пора после посреди потом потому почему почти прекрасно при про просто против процентов пятнадцатый пятнадцать пятый пять раз разве рано раньше рядом с сам сама сами самим самими самих само самого самой самом самому саму свое своего своей свои своих свою сеаой себе себя сегодня седьмой сейчас семнадцатый семнадцать семь сих сказал сказала сказать сколько слишком сначала снова со собой собою совсем спасибо стал суть т та так такая также такие такое такой там твой твоя твоё те тебе тебя тем теми теперь тех то тобой тобою тогда того тоже только том тому тот тою третий три тринадцатый тринадцать ту туда тут ты тысяч у уж уже уметь хорошо хотеть хоть хотя хочешь часто чаще чего человек чем чему через четвертый четыре четырнадцатый четырнадцать что чтоб чтобы чуть шестнадцатый шестнадцать шестой шесть эта эти этим этими этих это этого этой этом этому этот эту я ﻿а'.split(' '));

    lunr.Pipeline.registerFunction(lunr.ru.stopWordFilter, 'stopWordFilter-ru');
  };
}))