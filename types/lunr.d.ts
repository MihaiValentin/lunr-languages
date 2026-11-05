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
    accentFold?: LunrLanguagesAccentFold;
    wildcardNormalizer?: LunrLanguagesWildcardNormalizer;
    specialCasing?: LunrLanguagesSpecialCasing;
    normalizer?: LunrLanguagesNormalizer;
    normalize?: LunrLanguagesFold;
    [key: string]: any;
  }

  function multiLanguage(...languages: string[]): LunrLanguagesPlugin;

  var ar: LunrLanguagesLanguage;
  var ca: LunrLanguagesLanguage;
  var da: LunrLanguagesLanguage;
  var de: LunrLanguagesLanguage;
  var el: LunrLanguagesLanguage;
  var en: LunrLanguagesLanguage;
  var es: LunrLanguagesLanguage;
  var fa: LunrLanguagesLanguage;
  var fi: LunrLanguagesLanguage;
  var fr: LunrLanguagesLanguage;
  var he: LunrLanguagesLanguage;
  var hi: LunrLanguagesLanguage;
  var hu: LunrLanguagesLanguage;
  var hy: LunrLanguagesLanguage;
  var id: LunrLanguagesLanguage;
  var it: LunrLanguagesLanguage;
  var ja: LunrLanguagesLanguage;
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

  /** Snowball's base class of the generated stemmers (base-stemmer.js). */
  interface LunrLanguagesBaseStemmer {
    setCurrent(value: string): void;
    getCurrent(): string;
    stemWord?(word: string): string;
    [key: string]: any;
  }

  /** A fold from a map; `^` keys apply only at the start of the word. */
  type LunrLanguagesFold = (word: string) => string;

  interface LunrLanguagesAccentFold extends LunrLanguagesPipelineFunction {
    /** The letter map, also used by the wildcard normalizer. */
    map: { [from: string]: string };
    /** Whether lunr.<locale> puts it into its pipelines (accent folding on by default). */
    isDefault?: boolean;
  }

  interface LunrLanguagesWildcardNormalizer {
    (term: string, pipeline?: any): string;
    /** The raw fold of the map. */
    fold: LunrLanguagesFold;
    label?: string;
    pipelineFunctionLabel?: string;
  }

  interface LunrLanguagesNormalizer extends LunrLanguagesPipelineFunction {
    map: { [from: string]: string };
    /** The fold on strings, applied until nothing changes. */
    normalize: LunrLanguagesFold;
  }

  interface LunrLanguagesSpecialCasing {
    (str: string): string;
    map: { [from: string]: string };
    label?: string;
    pipelineFunctionLabel?: string;
  }

  interface LunrLanguagesStemmerSupport {
    BaseStemmer: new () => LunrLanguagesBaseStemmer;
    generateFold(map: { [from: string]: string }): LunrLanguagesFold;
    generateAccentFold(map: { [from: string]: string }): LunrLanguagesAccentFold;
    generateWildcardNormalizer(
      map: { [from: string]: string },
      accent?: { label: string; accentFold: { [from: string]: string }; map: { [from: string]: string } }
    ): LunrLanguagesWildcardNormalizer;
    /** A pipeline function folding a token to one spelling before the stop words and the stemmer. */
    generateNormalizer(map: { [from: string]: string }): LunrLanguagesNormalizer;
    generateSpecialCasing(map: { [from: string]: string }): LunrLanguagesSpecialCasing;
    generateSpecialCasingTokenizer(specialCasing: LunrLanguagesSpecialCasing): (obj?: any, metadata?: any) => any[];
    /** The tokenizer of a language written without spaces: the registered segmenter, else Intl.Segmenter. */
    generateSegmentingTokenizer(
      locale: string,
      options: { intlLocale: string; missing: string; intlWords?: (words: Array<{ word: string; index: number }>, str: string) => Array<{ word: string; index: number }> }
    ): ((obj?: any, metadata?: any) => any[]) & { segmenter(): string };
    /** Registers the tokenizer a language indexes with, found by tokenizerFor() from `-<locale>` labels. */
    addTokenizer(locale: string, tokenizer: (obj?: any, metadata?: any) => any[]): void;
    combineTokenizers(tokenizers: Array<(obj?: any, metadata?: any) => any[]>): (obj?: any, metadata?: any) => any[];
    /** Adds the words of `text` to the query, split and prepared for the index like the query parser does. */
    addQueryTerms(query: any, text: string, options?: any): any;
    /** A term (or terms) prepared for query.term(): special casing, wildcard folding, lowercasing. */
    normalizeQueryTerm(term: any[], source: any): string[];
    normalizeQueryTerm(term: any, source: any): string;
    /** The tokenizer for query text of an index with this search pipeline. */
    tokenizerFor(pipeline: any): (obj?: any, metadata?: any) => any[];
    [key: string]: any;
  }

  var stemmerSupport: LunrLanguagesStemmerSupport;
  var trimmerSupport: any;
  var TinySegmenter: any;
  /** A word segmenter of a language written without spaces, registered by lunr.<locale>.<segmenter>.js. */
  interface LunrLanguagesSegmenter {
    name: string;
    /** The words of a string with their offsets. */
    segment(str: string): Array<{ word: string; index: number }>;
  }

  /** The optional segmenters loaded, by locale (lunr.th.wordcut.js registers `th`). */
  var segmenters: { [locale: string]: LunrLanguagesSegmenter } | undefined;
}
