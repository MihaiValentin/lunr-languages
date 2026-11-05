/// <reference path="../../types/lunr.d.ts" />
// Compiled by test/TypesTest.js: typical uses of the declared API must type-check.

const support = lunr.stemmerSupport;

const fold: string = support.generateFold({ 'ä': 'a', '^ge': '' })('Käse');
const accent = support.generateAccentFold({ 'é': 'e' });
const accentMap: { [from: string]: string } = accent.map;
const normalizer = support.generateWildcardNormalizer({ 'ä': 'a' }, { label: 'accentFold-de', accentFold: accentMap, map: {} });
const folded: string = normalizer('Käs*') + normalizer.fold('ä');

const stemmer = new support.BaseStemmer();
stemmer.setCurrent('word');
const current: string = stemmer.getCurrent();

const persian = support.generateNormalizer({ 'ي': 'ی' });
const normalized: string = persian.normalize('ميز');

const casing = support.generateSpecialCasing({ 'I': 'ı' });
const tokenizer = support.generateSpecialCasingTokenizer(casing);
support.addTokenizer('tr', tokenizer);

const terms: string[] = support.normalizeQueryTerm(['KIZ*'], {});
const term: string = support.normalizeQueryTerm('KIZ*', {});

const isDefault: boolean | undefined = lunr.fr.accentFold && lunr.fr.accentFold.isDefault;
const wildcard = lunr.de.wildcardNormalizer;
const plugin = lunr.multiLanguage('en', 'de');

export { fold, folded, current, normalized, terms, term, isDefault, wildcard, plugin };
