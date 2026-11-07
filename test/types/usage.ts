/// <reference path="../../types/lunr.d.ts" />
// Compiled by test/tests/TypesTest.js: typical uses of the declared API must type-check.
import de = require('../../types/plugin');

const plugin = lunr.multiLanguage('en', 'de');
const characters: string | undefined = lunr.de.wordCharacters;
const trimmer = lunr.de.trimmer;
const label: string | undefined = trimmer && trimmer.label;
const tokens: any[] | undefined = lunr.zh.tokenizer && lunr.zh.tokenizer('中文');
const accentFold = lunr.es.accentFold;
const register: (lunr: { [key: string]: any }) => void = de;

export { plugin, characters, label, tokens, accentFold, register };
