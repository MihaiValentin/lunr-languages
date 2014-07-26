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
        lunr.ru.stopWordFilter,
        lunr.ru.stemmer
      );
    };

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
      return function(word) {
        st.setCurrent(word);
        st.stem();
        return st.getCurrent();
      }
    })();

    lunr.Pipeline.registerFunction(lunr.ru.stemmer, 'stemmer-ru');

    /* stop word filter function */
    lunr.ru.stopWordFilter = function(token) {
      if (lunr.ru.stopWordFilter.stopWords.indexOf(token) === -1) {
        return token;
      }
    };

    lunr.ru.stopWordFilter.stopWords = new lunr.SortedSet();
    lunr.ru.stopWordFilter.stopWords.length = 422;

    // The space at the beginning is crucial: It marks the empty string
    // as a stop word. lunr.js crashes during search when documents
    // processed by the pipeline still contain the empty string.
    lunr.ru.stopWordFilter.stopWords.elements = ' ﻿а е и ж м о на не ни об но он мне мои мож она они оно мной много многочисленное многочисленная многочисленные многочисленный мною мой мог могут можно может можхо мор моя моё мочь над нее оба нам нем нами ними мимо немного одной одного менее однажды однако меня нему меньше ней наверху него ниже мало надо один одиннадцать одиннадцатый назад наиболее недавно миллионов недалеко между низко меля нельзя нибудь непрерывно наконец никогда никуда нас наш нет нею неё них мира наша наше наши ничего начала нередко несколько обычно опять около мы ну нх от отовсюду особенно нужно очень отсюда в во вон вниз внизу вокруг вот восемнадцать восемнадцатый восемь восьмой вверх вам вами важное важная важные важный вдали везде ведь вас ваш ваша ваше ваши впрочем весь вдруг вы все второй всем всеми времени время всему всего всегда всех всею всю вся всё всюду г год говорил говорит года году где да ее за из ли же им до по ими под иногда довольно именно долго позже более должно пожалуйста значит иметь больше пока ему имя пор пора потом потому после почему почти посреди ей два две двенадцать двенадцатый двадцать двадцатый двух его дел или без день занят занята занято заняты действительно давно девятнадцать девятнадцатый девять девятый даже алло жизнь далеко близко здесь дальше для лет зато даром первый перед затем зачем лишь десять десятый ею её их бы еще при был про процентов против просто бывает бывь если люди была были было будем будет будете будешь прекрасно буду будь будто будут ещё пятнадцать пятнадцатый друго другое другой другие другая других есть пять быть лучше пятый к ком конечно кому кого когда которой которого которая которые который которых кем каждое каждая каждые каждый кажется как какой какая кто кроме куда кругом с т у я та те уж со то том снова тому совсем того тогда тоже собой тобой собою тобою сначала только уметь тот тою хорошо хотеть хочешь хоть хотя свое свои твой своей своего своих свою твоя твоё раз уже сам там тем чем сама сами теми само рано самом самому самой самого семнадцать семнадцатый самим самими самих саму семь чему раньше сейчас чего сегодня себе тебе сеаой человек разве теперь себя тебя седьмой спасибо слишком так такое такой такие также такая сих тех чаще четвертый через часто шестой шестнадцать шестнадцатый шесть четыре четырнадцать четырнадцатый сколько сказал сказала сказать ту ты три эта эти что это чтоб этом этому этой этого чтобы этот стал туда этим этими рядом тринадцать тринадцатый этих третий тут эту суть чуть тысяч'.split(' ');

    lunr.Pipeline.registerFunction(lunr.ru.stopWordFilter, 'stopWordFilter-ru');
  };
}))