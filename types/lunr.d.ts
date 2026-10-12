declare namespace lunr {
  interface LunrLanguagesPlugin {
    (this: any, ...args: any[]): void;
  }

  interface LunrLanguagesPipelineFunction {
    (token: any, i?: number, tokens?: any[]): any;
    label?: string;
  }

  interface LunrLanguagesLanguage extends LunrLanguagesPlugin {
    wordCharacters?: string;
    trimmer?: LunrLanguagesPipelineFunction;
    stemmer?: LunrLanguagesPipelineFunction;
    stopWordFilter?: LunrLanguagesPipelineFunction;
    tokenizer?: (obj?: any, metadata?: any) => any[];
    accentFold?: LunrLanguagesPipelineFunction;
    [key: string]: any;
  }

  function multiLanguage(...languages: string[]): LunrLanguagesPlugin;

  var ar: LunrLanguagesLanguage;
  var da: LunrLanguagesLanguage;
  var de: LunrLanguagesLanguage;
  var du: LunrLanguagesLanguage;
  var el: LunrLanguagesLanguage;
  var es: LunrLanguagesLanguage;
  var fi: LunrLanguagesLanguage;
  var fr: LunrLanguagesLanguage;
  var he: LunrLanguagesLanguage;
  var hi: LunrLanguagesLanguage;
  var hu: LunrLanguagesLanguage;
  var hy: LunrLanguagesLanguage;
  var it: LunrLanguagesLanguage;
  var ja: LunrLanguagesLanguage;
  var jp: LunrLanguagesLanguage;
  var kn: LunrLanguagesLanguage;
  var ko: LunrLanguagesLanguage;
  var nl: LunrLanguagesLanguage;
  var no: LunrLanguagesLanguage;
  var pl: LunrLanguagesLanguage;
  var pt: LunrLanguagesLanguage;
  var ro: LunrLanguagesLanguage;
  var ru: LunrLanguagesLanguage;
  var sa: LunrLanguagesLanguage;
  var sv: LunrLanguagesLanguage;
  var ta: LunrLanguagesLanguage;
  var te: LunrLanguagesLanguage;
  var th: LunrLanguagesLanguage;
  var tr: LunrLanguagesLanguage;
  var vi: LunrLanguagesLanguage;
  var zh: LunrLanguagesLanguage;

  var stemmerSupport: any;
  var trimmerSupport: any;
  var TinySegmenter: any;
  var wordcut: any;
}
