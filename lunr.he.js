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
        'cleanWord  ',
        'removeDiacritics',
        'removeStopWords',
        'normalizeHebrewCharacters',
        'wordCheck'
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

      /*remove elongating character and test that the word does not contain non-arabic characters.
      If the word contains special characters, don't stem. */
      self.cleanWord = function() {
        var wordCharacters = "\u0591-\u05F4\u05D0-\u05EA";
        var testRegex = new RegExp("[^" + wordCharacters + "]");
        self.word = self.word.replace(testRegex, '');
        if (testRegex.test(self.word)) {
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
        var stopWords = 'את לא של אני על זה עם כל הוא אם או גם יותר יש לי מה אבל פורום אז טוב רק כי שלי היה בפורום אין עוד היא אחד ב ל עד לך כמו להיות אתה כמה אנחנו הם כבר אנשים אפשר תודה שלא אותו ה מאוד הרבה ולא ממש לו א מי חיים בית שאני יכול שהוא כך הזה איך היום קצת עכשיו שם בכל יהיה תמיד י שלך הכי ש בו לעשות צריך כן פעם לכם ואני משהו אל שלו שיש ו וגם אתכם אחרי בנושא כדי פשוט לפני שזה אותי אנו למה דבר כ כאן אולי טובים רוצה שנה בעלי החיים למען אתם מ בין יום זאת איזה ביותר לה אחת הכל הפורומים לכל אלא פה יודע שלום דקות לנו השנה דרך אדם נראה זו היחידה רוצים בכלל טובה שלנו האם הייתי הלב היו ח שדרות בלי להם שאתה אותה מקום ואתם חלק בן בואו אחר האחת אותך כמובן בגלל באמת מישהו ילדים אותם הפורום טיפוח וזה ר שהם אך מזמין ישראל כוס זמן ועוד הילדים עדיין כזה עושה שום לקחת העולם תפוז לראות לפורום וכל לקבל נכון יוצא לעולם גדול אפילו ניתן שני אוכל קשה משחק ביום ככה אמא בת השבוע נוספים לגבי בבית אחרת לפי ללא שנים הזמן שמן מעט לפחות אף שוב שלהם במקום כולם נועית הבא מעל לב המון לדבר ע אוהב מוסיפים חצי בעיקר כפות לפעמים שהיא הנהלת ועל ק אוהבים ת יודעת ד גרוע שאנחנו מים לילדים בארץ מודיע אשמח שלכם פחות לכולם די אהבה יכולה דברים הקהילה לעזור פרטים בדיוק מלח קל הראשי שלה להוסיף השני לדעתי בר למרות שגם מוזמנים לאחר במה חושב מאד יפה להגשים חדש קטן מחפשים שמח מדברים ואם במיוחד עבודה מדי ואז חשוב שאם אוהבת פעמים מנהלת אומר מול קשר מנהל שיהיה שאין שאנו האהבה ס הצטרפו כפית בשביל החגים אופן לתת כף בתוך סוכר גיל בהצלחה והוא מקווה סתם ויש נגד כמעט שאת עולה אי מספר ראשון לדרך נהיה לעצב עושים ולנהל היתה עליו מזה הייתה בא בפרס חלות ראש מזמינים טיפים מכבי רבה הורים ‡ מקרה קרן המוצלח להגיע גדולה כנראה החמשיר הראשון פלפל המשחק וכאן לדעת ואת גרועים ספר אגב אחרים להגיד בתפוז והעולם אופנה דווקא מספיק שעות תמונות כשאנחנו שוקולד ולכן ג לקרוא לניהול שבוע ויופי חלום בה שהיה שאלה מקומה הזו בפורומים החדש מתאמצים שחקן שמזינים נשמת בערך מכל ומה רגל כסף רואה קטנה בצל בעולם אינטרנט חוץ ברור הולך חושבת לזה כלום הן כאלה בטוח הדבר תהיה מגיע סוף האמת ממנו מיכל החדשה לתרום האנשים ועד בדרך אצלי ההורים בני מתוך כאשר לבד ראיתי מצב מלא לבחור נשמח החג רע עוף מן להביא מצאתי כתובות מעניין צריכה להכנס לחלוטין שעה מתכון קודם תשובות מדובר ניהול מזל כדאי יהיו ההודעות בוקר נילוות איפה בעיה קמח ללכת פורומים אמר נושא ההכנה בבקשה שכל הזאת למשחק פנינה תחרות חבר לקנות מהם רגע גרם אלו עצמו מראש הכלב כולנו עדיף איתו למשל לבשל למי רעיונות הבלוג רוב אביב כרגע בסוף אלה לחג ערוץ שווה באופן מאמין לבן בזה הכבוד לראש ם ימי שחור בצורה בעמוד ועם וחצי האלה תמונה בשלב משחקים נו'.split(' ');
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

    lunr.he.stopWordFilter = lunr.generateStopWordFilter('את לא של אני על זה עם כל הוא אם או גם יותר יש לי מה אבל פורום אז טוב רק כי שלי היה בפורום אין עוד היא אחד ב ל עד לך כמו להיות אתה כמה אנחנו הם כבר אנשים אפשר תודה שלא אותו ה מאוד הרבה ולא ממש לו א מי חיים בית שאני יכול שהוא כך הזה איך היום קצת עכשיו שם בכל יהיה תמיד י שלך הכי ש בו לעשות צריך כן פעם לכם ואני משהו אל שלו שיש ו וגם אתכם אחרי בנושא כדי פשוט לפני שזה אותי אנו למה דבר כ כאן אולי טובים רוצה שנה בעלי החיים למען אתם מ בין יום זאת איזה ביותר לה אחת הכל הפורומים לכל אלא פה יודע שלום דקות לנו השנה דרך אדם נראה זו היחידה רוצים בכלל טובה שלנו האם הייתי הלב היו ח שדרות בלי להם שאתה אותה מקום ואתם חלק בן בואו אחר האחת אותך כמובן בגלל באמת מישהו ילדים אותם הפורום טיפוח וזה ר שהם אך מזמין ישראל כוס זמן ועוד הילדים עדיין כזה עושה שום לקחת העולם תפוז לראות לפורום וכל לקבל נכון יוצא לעולם גדול אפילו ניתן שני אוכל קשה משחק ביום ככה אמא בת השבוע נוספים לגבי בבית אחרת לפי ללא שנים הזמן שמן מעט לפחות אף שוב שלהם במקום כולם נועית הבא מעל לב המון לדבר ע אוהב מוסיפים חצי בעיקר כפות לפעמים שהיא הנהלת ועל ק אוהבים ת יודעת ד גרוע שאנחנו מים לילדים בארץ מודיע אשמח שלכם פחות לכולם די אהבה יכולה דברים הקהילה לעזור פרטים בדיוק מלח קל הראשי שלה להוסיף השני לדעתי בר למרות שגם מוזמנים לאחר במה חושב מאד יפה להגשים חדש קטן מחפשים שמח מדברים ואם במיוחד עבודה מדי ואז חשוב שאם אוהבת פעמים מנהלת אומר מול קשר מנהל שיהיה שאין שאנו האהבה ס הצטרפו כפית בשביל החגים אופן לתת כף בתוך סוכר גיל בהצלחה והוא מקווה סתם ויש נגד כמעט שאת עולה אי מספר ראשון לדרך נהיה לעצב עושים ולנהל היתה עליו מזה הייתה בא בפרס חלות ראש מזמינים טיפים מכבי רבה הורים ‡ מקרה קרן המוצלח להגיע גדולה כנראה החמשיר הראשון פלפל המשחק וכאן לדעת ואת גרועים ספר אגב אחרים להגיד בתפוז והעולם אופנה דווקא מספיק שעות תמונות כשאנחנו שוקולד ולכן ג לקרוא לניהול שבוע ויופי חלום בה שהיה שאלה מקומה הזו בפורומים החדש מתאמצים שחקן שמזינים נשמת בערך מכל ומה רגל כסף רואה קטנה בצל בעולם אינטרנט חוץ ברור הולך חושבת לזה כלום הן כאלה בטוח הדבר תהיה מגיע סוף האמת ממנו מיכל החדשה לתרום האנשים ועד בדרך אצלי ההורים בני מתוך כאשר לבד ראיתי מצב מלא לבחור נשמח החג רע עוף מן להביא מצאתי כתובות מעניין צריכה להכנס לחלוטין שעה מתכון קודם תשובות מדובר ניהול מזל כדאי יהיו ההודעות בוקר נילוות איפה בעיה קמח ללכת פורומים אמר נושא ההכנה בבקשה שכל הזאת למשחק פנינה תחרות חבר לקנות מהם רגע גרם אלו עצמו מראש הכלב כולנו עדיף איתו למשל לבשל למי רעיונות הבלוג רוב אביב כרגע בסוף אלה לחג ערוץ שווה באופן מאמין לבן בזה הכבוד לראש ם ימי שחור בצורה בעמוד ועם וחצי האלה תמונה בשלב משחקים נו'.split(' '));

    lunr.Pipeline.registerFunction(lunr.he.stopWordFilter, 'stopWordFilter-he');
  };
}))