/*!
 * Lunr languages, `Hebrew` language
 * https://github.com/avisaradir/lunr-languages-he
 *
 * Copyright 2023, Adir Avisar
 * http://www.mozilla.org/MPL/
 */
/*!
 * based on
 * Kazem Taghva, Rania Elkhoury, and Jeffrey Coombs (2005)
 * Meryeme Hadni, Abdelmonaime Lachkar, and S. Alaoui Ouatik (2012)
 *
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
    lunr.he = function() {
      this.pipeline.reset();
      this.pipeline.add(
        lunr.he.trimmer,
        lunr.he.stopWordFilter,
        lunr.he.stemmer
      );

      // for lunr version 2
      // this is necessary so that every searched word is also stemmed before
      // in lunr <= 1 this is not needed, as it is done using the normal pipeline
      if (this.searchPipeline) {
        this.searchPipeline.reset();
        this.searchPipeline.add(lunr.he.stemmer)
      }
    };

    /* lunr trimmer function */
    lunr.he.wordCharacters = "\u0591-\u05F4\u05D0-\u05EAa-zA-Zａ-ｚＡ-Ｚ0-9０-９";
    lunr.he.trimmer = lunr.trimmerSupport.generateTrimmer(lunr.he.wordCharacters);

    lunr.Pipeline.registerFunction(lunr.he.trimmer, 'trimmer-he');

    /* lunr stemmer function */
    lunr.he.stemmer = (function() {
      var self = this;
      var word = '';
      self.result = false;
      self.preRemoved = false;
      self.sufRemoved = false;

      //prefix data
      self.pre = {
        pre1: 'ה ו י ת', // Definite article, conjunction, and verb prefixes
        pre2: 'ב כ ל מ ש כש', // Prepositions
        pre3: 'הב הכ הל המ הש בש לכ', // Combinations of definite article and prepositions
        pre4: 'וב וכ ול ומ וש', // Combinations of conjunction "and" with prepositions
        pre5: 'מה שה כל', // Additional common prefixes
        pre6: 'מב מכ מל ממ מש', // Combinations of "מ" with prepositions
        pre7: 'בה בו בי בת כה כו כי כת לה לו לי לת', // Combinations of prepositions with pronouns
        pre8: 'ובה ובו ובי ובת וכה וכו וכי וכת ולה ולו ולי ולת' // Combinations of conjunction "and" with prepositions and pronouns
      };


      //suffix data
      self.suf = {
        suf1: 'ך כ ם ן נ', // Singular pronominal suffixes
        suf2: 'ים ות וך וכ ום ון ונ הם הן יכ יך ינ ים', // Plural and dual suffixes
        suf3: 'תי תך תכ תם תן תנ', // First person singular and plural forms
        suf4: 'ותי ותך ותכ ותם ותן ותנ', // Combinations of conjunctions with first person suffixes
        suf5: 'נו כם כן הם הן', // More pronominal suffixes
        suf6: 'ונו וכם וכן והם והן', // Combinations with conjunction "and"
        suf7: 'תכם תכן תנו תהם תהן', // More combinations for various persons and numbers
        suf8: 'הוא היא הם הן אני אתה את אנו אתם אתן', // Pronouns
        suf9: 'ני נו כי כו כם כן תי תך תכ תם תן', // More pronominal suffixes
        suf10: 'י ך כ ם ן נ ת' // Additional pronominal suffixes
      };

      //hebrew language patterns and alternative mapping for patterns
      self.patterns = JSON.parse('{"hebrewPatterns": [{"pt1": [{"c": "ה", "l": 0}]}, {"pt2": [{"c": "ו", "l": 0}]}, {"pt3": [{"c": "י", "l": 0}]}, {"pt4": [{"c": "ת", "l": 0}]}, {"pt5": [{"c": "מ", "l": 0}]}, {"pt6": [{"c": "ל", "l": 0}]}, {"pt7": [{"c": "ב", "l": 0}]}, {"pt8": [{"c": "כ", "l": 0}]}, {"pt9": [{"c": "ש", "l": 0}]}, {"pt10": [{"c": "כש", "l": 0}]}, {"pt11": [{"c": "בה", "l": 0}]}, {"pt12": [{"c": "וב", "l": 0}]}, {"pt13": [{"c": "וכ", "l": 0}]}, {"pt14": [{"c": "ול", "l": 0}]}, {"pt15": [{"c": "ומ", "l": 0}]}, {"pt16": [{"c": "וש", "l": 0}]}, {"pt17": [{"c": "הב", "l": 0}]}, {"pt18": [{"c": "הכ", "l": 0}]}, {"pt19": [{"c": "הל", "l": 0}]}, {"pt20": [{"c": "המ", "l": 0}]}, {"pt21": [{"c": "הש", "l": 0}]}, {"pt22": [{"c": "מה", "l": 0}]}, {"pt23": [{"c": "שה", "l": 0}]}, {"pt24": [{"c": "כל", "l": 0}]}]}');

      self.execArray = [
        'cleanWord',
        'removeDiacritics',
        'removeStopWords',
        'normalizeHebrewCharacters'
      ];

      self.stem = function() {
        var counter = 0;
        self.result = false;
        self.preRemoved = false;
        self.sufRemoved = false;
        while (counter < self.execArray.length && self.result != true) {
          self.result = self[self.execArray[counter]]();
          counter++;
        }
      }

      self.setCurrent = function(word) {
        self.word = word;
      }

      self.getCurrent = function() {
        return self.word
      }

      /*remove elongating character and test that the word does not contain non-hebrew characters.
      If the word contains special characters, don't stem. */
      self.cleanWord = function() {
        var wordCharacters = "\u0591-\u05F4\u05D0-\u05EA";
        var testRegex = new RegExp("[^" + wordCharacters + "]");
        if (testRegex.test(word)) {
          return true;
        }
        return false;
      }

      self.removeDiacritics = function() {
        // Hebrew Niqqud character range: U+05B0 to U+05BF
        var diacriticsRegex = new RegExp("[\u05B0-\u05BF]", "g");
        self.word = self.word.replace(diacriticsRegex, '');
        return false;
      }

      /* if the word is a stop word, don't stem*/
      self.removeStopWords = function() {
        var stopWords = 'אבל או אולי אותו אותי אותך אותם אותן אותנו אז אחר אחרות אחרי אחריכן אחרים אחרת אי איזה איך אין איפה אל אלה אלו אם אנחנו אני אף אפשר את אתה אתכם אתכן אתם אתן באיזה באיזו בגלל בין בלבד בעבור בעזרת בכל בכן בלי במידה במקום שבו ברוב בשביל בשעה ש בתוך גם דרך הוא היא היה היי היכן היתה היתי הם הן הנה הסיבה שבגללה הרי ואילו ואת זאת זה זות יהיה יוכל יוכלו יותר מדי יכול יכולה יכולות יכולים יכל יכלה יכלו יש כאן כאשר כולם כולן כזה כי כיצד כך כל כלל כמו כן כפי כש לא לאו לאיזותך לאן לבין לה להיות להם להן לו לזה לזות לי לך לכם לכן למה למעלה למעלה מ למטה למטה מ למעט למקום שבו למרות לנו לעבר לעיכן לפיכך לפני מאד מאחורי מאיזו סיבה מאין מאיפה מבלי מבעד מדוע מה מהיכן מול מחוץ מי מידע מכאן מכל מכן מלבד מן מנין מסוגל מעט מעטים מעל מצד מקום בו מתחת מתי נגד נגר נו עד עז על עלי עליו עליה עליהם עליך עלינו עם עצמה עצמהם עצמהן עצמו עצמי עצמם עצמן עצמנו פה רק שוב של שלה שלהם שלהן שלו שלי שלך שלכה שלכם שלכן שלנו שם תהיה תחת'.split(' ');
        if (stopWords.indexOf(self.word) >= 0) {
          return true;
        }
      }

      self.normalizeHebrewCharacters = function() {
        // Replace final forms of letters with their regular forms
        self.word = self.word.replace('\u05DA', '\u05DB'); // Replace final kaf with kaf
        self.word = self.word.replace('\u05DD', '\u05DE'); // Replace final mem with mem
        self.word = self.word.replace('\u05DF', '\u05E0'); // Replace final nun with nun
        self.word = self.word.replace('\u05E3', '\u05E4'); // Replace final pe with pe
        self.word = self.word.replace('\u05E5', '\u05E6'); // Replace final tsadi with tsadi
        return false;
      }

      /* and return a function that stems a word for the current locale */
      return function(token) {
        // for lunr version 2
        if (typeof token.update === "function") {
          return token.update(function(word) {
            self.setCurrent(word);
            self.stem();
            return self.getCurrent();
          })
        } else { // for lunr version <= 1
          self.setCurrent(token);
          self.stem();
          return self.getCurrent();
        }

      }
    })();

    lunr.Pipeline.registerFunction(lunr.he.stemmer, 'stemmer-he');

    lunr.he.stopWordFilter = lunr.generateStopWordFilter('אבל או אולי אותו אותי אותך אותם אותן אותנו אז אחר אחרות אחרי אחריכן אחרים אחרת אי איזה איך אין איפה אל אלה אלו אם אנחנו אני אף אפשר את אתה אתכם אתכן אתם אתן באיזה באיזו בגלל בין בלבד בעבור בעזרת בכל בכן בלי במידה במקום שבו ברוב בשביל בשעה ש בתוך גם דרך הוא היא היה היי היכן היתה היתי הם הן הנה הסיבה שבגללה הרי ואילו ואת זאת זה זות יהיה יוכל יוכלו יותר מדי יכול יכולה יכולות יכולים יכל יכלה יכלו יש כאן כאשר כולם כולן כזה כי כיצד כך כל כלל כמו כן כפי כש לא לאו לאיזותך לאן לבין לה להיות להם להן לו לזה לזות לי לך לכם לכן למה למעלה למעלה מ למטה למטה מ למעט למקום שבו למרות לנו לעבר לעיכן לפיכך לפני מאד מאחורי מאיזו סיבה מאין מאיפה מבלי מבעד מדוע מה מהיכן מול מחוץ מי מידע מכאן מכל מכן מלבד מן מנין מסוגל מעט מעטים מעל מצד מקום בו מתחת מתי נגד נגר נו עד עז על עלי עליו עליה עליהם עליך עלינו עם עצמה עצמהם עצמהן עצמו עצמי עצמם עצמן עצמנו פה רק שוב של שלה שלהם שלהן שלו שלי שלך שלכה שלכם שלכן שלנו שם תהיה תחת'.split(' '));

    lunr.Pipeline.registerFunction(lunr.he.stopWordFilter, 'stopWordFilter-he');
  };
}))