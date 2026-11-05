// Generated from dutch.sbl by Snowball 3.2.0 - https://snowballstem.org/

// deno-lint-ignore-file ban-unused-ignore no-constant-condition no-empty prefer-const

const a_0 = [
    ["a", 1],
    ["e", 2],
    ["o", 1],
    ["u", 1],
    ["\u00E0", 1],
    ["\u00E1", 1],
    ["\u00E2", 1],
    ["\u00E4", 1],
    ["\u00E8", 2],
    ["\u00E9", 2],
    ["\u00EA", 2],
    ["e\u00EB", 3],
    ["i\u00EB", 4],
    ["\u00F2", 1],
    ["\u00F3", 1],
    ["\u00F4", 1],
    ["\u00F6", 1],
    ["\u00F9", 1],
    ["\u00FA", 1],
    ["\u00FB", 1],
    ["\u00FC", 1]
];

const a_1 = [
    ["nde", 8],
    ["en", 7],
    ["s", 2],
    ["'s", 1, 1],
    ["es", 4, 2],
    ["ies", 3, 1],
    ["aus", 6, 4],
    ["\u00E9s", 5, 5]
];

const a_2 = [
    ["de", 5],
    ["ge", 2],
    ["ische", 4],
    ["je", 1],
    ["lijke", 3],
    ["le", 9],
    ["ene", 10],
    ["re", 8],
    ["se", 7],
    ["te", 6],
    ["ieve", 11]
];

const a_3 = [
    ["heid", 3],
    ["fie", 7],
    ["gie", 8],
    ["atie", 1],
    ["isme", 5],
    ["ing", 5],
    ["arij", 6],
    ["erij", 5],
    ["sel", 3],
    ["rder", 4],
    ["ster", 3],
    ["iteit", 2],
    ["dst", 10],
    ["tst", 9]
];

const a_4 = [
    ["end", 9],
    ["atief", 2],
    ["erig", 9],
    ["achtig", 3],
    ["ioneel", 1],
    ["baar", 3],
    ["laar", 5],
    ["naar", 4],
    ["raar", 6],
    ["eriger", 9],
    ["achtiger", 3],
    ["lijker", 8],
    ["tant", 7],
    ["erigst", 9],
    ["achtigst", 3],
    ["lijkst", 8]
];

const a_5 = [
    ["ig", 1],
    ["iger", 1],
    ["igst", 1]
];

const a_6 = [
    ["ft", 2],
    ["kt", 1],
    ["pt", 3]
];

const /**@type {Array<string>}*/ as_6 = ["k", "f", "p"];

const a_7 = [
    ["bb", 1],
    ["cc", 2],
    ["dd", 3],
    ["ff", 4],
    ["gg", 5],
    ["hh", 6],
    ["jj", 7],
    ["kk", 8],
    ["ll", 9],
    ["mm", 10],
    ["nn", 11],
    ["pp", 12],
    ["qq", 13],
    ["rr", 14],
    ["ss", 15],
    ["tt", 16],
    ["v", 4],
    ["vv", 17, 1],
    ["ww", 18],
    ["xx", 19],
    ["z", 15],
    ["zz", 20, 1]
];

const a_8 = [
    ["d", 1],
    ["t", 2]
];

const a_9 = [
    ["", -1],
    ["eft", 1, 1],
    ["vaa", 1, 2],
    ["val", 1, 3],
    ["vali", -1, 1],
    ["vare", 1, 5]
];

const a_10 = [
    ["\u00EB", 1],
    ["\u00EF", 2]
];

const /**@type {Array<string>}*/ as_10 = ["e", "i"];

const a_11 = [
    ["\u00EB", 1],
    ["\u00EF", 2]
];

const /**@type {Array<string>}*/ as_11 = ["e", "i"];

const /**@type {Array<number>}*/ g_E = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 120];

const /**@type {Array<number>}*/ g_AIOU = [1, 65, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128, 11, 120, 46, 15];

const /**@type {Array<number>}*/ g_AEIOU = [17, 65, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128, 139, 127, 46, 15];

const /**@type {Array<number>}*/ g_v = [17, 65, 16, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128, 139, 127, 46, 15];

const /**@type {Array<number>}*/ g_v_WX = [17, 65, 208, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128, 139, 127, 46, 15];

import B from './base-stemmer.js'

export default class extends B {

    #I_p2/**@type {number}*/ = 0;
    #I_p1/**@type {number}*/ = 0;


    /** @return {boolean} */
    #r_V() {
        const /**@type {number}*/ v_1 = this.limit - this.c;
        // deno-lint-ignore no-unused-labels
        lab0: {
            // deno-lint-ignore no-unused-labels
            lab1: {
                if (!(this.in_grouping_b(g_v, 97, 252))) break lab1;
                break lab0;
            }
            if (!(this.eq_s_b("ij"))) return false;
        }
        this.c = this.limit - v_1;
        return true;
    }

    /** @return {boolean} */
    #r_C() {
        const /**@type {number}*/ v_1 = this.limit - this.c;
        // deno-lint-ignore no-unused-labels
        lab0: {
            if (!(this.eq_s_b("ij"))) break lab0;
            return false;
        }
        if (!(this.out_grouping_b(g_v, 97, 252))) return false;
        this.c = this.limit - v_1;
        return true;
    }

    /** @return {boolean} */
    #r_lengthen_V() {
        let /**@type {number}*/ a;
        let /**@type {string}*/ S_ch;
        const /**@type {number}*/ v_1 = this.limit - this.c;
        // deno-lint-ignore no-unused-labels
        lab0: {
            if (!(this.out_grouping_b(g_v_WX, 97, 252))) break lab0;
            this.ket = this.c;
            a = this.find_among_b(a_0);
            if (a === 0) break lab0;
            this.bra = this.c;
            switch (a) {
                case 1: {
                    const /**@type {number}*/ v_2 = this.limit - this.c;
                    // deno-lint-ignore no-unused-labels
                    lab1: {
                        // deno-lint-ignore no-unused-labels
                        lab2: {
                            if (!(this.out_grouping_b(g_AEIOU, 97, 252))) break lab2;
                            break lab1;
                        }
                        if (/**@type {boolean}*/(this.c > this.limit_backward)) break lab0;
                    }
                    this.c = this.limit - v_2;
                    S_ch = this.slice_to();
                    {
                        const /**@type {number}*/ c = this.c;
                        this.insert(c, c, S_ch);
                        this.c = c;
                    }
                    break;
                }
                case 2: {
                    const /**@type {number}*/ v_3 = this.limit - this.c;
                    // deno-lint-ignore no-unused-labels
                    lab3: {
                        // deno-lint-ignore no-unused-labels
                        lab4: {
                            if (!(this.out_grouping_b(g_AEIOU, 97, 252))) break lab4;
                            break lab3;
                        }
                        if (/**@type {boolean}*/(this.c > this.limit_backward)) break lab0;
                    }
                    {
                        const /**@type {number}*/ v_4 = this.limit - this.c;
                        // deno-lint-ignore no-unused-labels
                        lab5: {
                            // deno-lint-ignore no-unused-labels
                            lab6: {
                                // deno-lint-ignore no-unused-labels
                                lab7: {
                                    if (!(this.in_grouping_b(g_AIOU, 97, 252))) break lab7;
                                    break lab6;
                                }
                                if (!(this.in_grouping_b(g_E, 101, 235))) break lab5;
                                if (/**@type {boolean}*/(this.c > this.limit_backward)) break lab5;
                            }
                            break lab0;
                        }
                        this.c = this.limit - v_4;
                    }
                    {
                        const /**@type {number}*/ v_5 = this.limit - this.c;
                        // deno-lint-ignore no-unused-labels
                        lab8: {
                            if (this.c <= this.limit_backward) break lab8;
                            this.c--;
                            if (!(this.in_grouping_b(g_AIOU, 97, 252))) break lab8;
                            if (!(this.out_grouping_b(g_AEIOU, 97, 252))) break lab8;
                            break lab0;
                        }
                        this.c = this.limit - v_5;
                    }
                    this.c = this.limit - v_3;
                    S_ch = this.slice_to();
                    {
                        const /**@type {number}*/ c = this.c;
                        this.insert(c, c, S_ch);
                        this.c = c;
                    }
                    break;
                }
                case 3: {
                    this.slice_from("e\u00EBe");
                    break;
                }
                case 4: {
                    this.slice_from("iee");
                    break;
                }
            }
        }
        this.c = this.limit - v_1;
        return true;
    }

    /** @return {boolean} */
    #r_Step_1c() {
        let /**@type {number}*/ a;
        this.ket = this.c;
        a = this.find_among_b(a_8);
        if (a === 0) return false;
        this.bra = this.c;
        if (/**@type {boolean}*/(this.#I_p1 > this.c)) return false;
        if (!this.#r_C()) return false;
        switch (a) {
            case 1: {
                {
                    const /**@type {number}*/ v_1 = this.limit - this.c;
                    // deno-lint-ignore no-unused-labels
                    lab0: {
                        if (!(this.eq_s_b("n"))) break lab0;
                        if (/**@type {boolean}*/(this.#I_p1 > this.c)) break lab0;
                        return false;
                    }
                    this.c = this.limit - v_1;
                }
                // deno-lint-ignore no-unused-labels
                lab1: {
                    const /**@type {number}*/ v_2 = this.limit - this.c;
                    // deno-lint-ignore no-unused-labels
                    lab2: {
                        if (!(this.eq_s_b("in"))) break lab2;
                        if (/**@type {boolean}*/(this.c > this.limit_backward)) break lab2;
                        this.slice_from("n");
                        break lab1;
                    }
                    this.c = this.limit - v_2;
                    this.slice_del();
                }
                break;
            }
            case 2: {
                {
                    const /**@type {number}*/ v_3 = this.limit - this.c;
                    // deno-lint-ignore no-unused-labels
                    lab3: {
                        if (!(this.eq_s_b("h"))) break lab3;
                        if (/**@type {boolean}*/(this.#I_p1 > this.c)) break lab3;
                        return false;
                    }
                    this.c = this.limit - v_3;
                }
                {
                    const /**@type {number}*/ v_4 = this.limit - this.c;
                    // deno-lint-ignore no-unused-labels
                    lab4: {
                        if (!(this.eq_s_b("en"))) break lab4;
                        if (/**@type {boolean}*/(this.c > this.limit_backward)) break lab4;
                        return false;
                    }
                    this.c = this.limit - v_4;
                }
                this.slice_del();
                break;
            }
        }
        return true;
    }

    /** @return {boolean} */
    #r_measure() {
        this.#I_p1 = this.limit;
        this.#I_p2 = this.limit;
        const /**@type {number}*/ v_1 = this.c;
        // deno-lint-ignore no-unused-labels
        lab0: {
            while (true) {
                // deno-lint-ignore no-unused-labels
                lab1: {
                    if (!(this.out_grouping(g_v, 97, 252))) break lab1;
                    continue;
                }
                break;
            }
            {
                let v_2 = 1;
                while (true) {
                    const /**@type {number}*/ v_3 = this.c;
                    // deno-lint-ignore no-unused-labels
                    lab2: {
                        // deno-lint-ignore no-unused-labels
                        lab3: {
                            // deno-lint-ignore no-unused-labels
                            lab4: {
                                if (!(this.eq_s("ij"))) break lab4;
                                break lab3;
                            }
                            if (!(this.in_grouping(g_v, 97, 252))) break lab2;
                        }
                        v_2--;
                        continue;
                    }
                    this.c = v_3;
                    break;
                }
                if (v_2 > 0) break lab0;
            }
            if (!(this.out_grouping(g_v, 97, 252))) break lab0;
            this.#I_p1 = this.c;
            while (true) {
                // deno-lint-ignore no-unused-labels
                lab5: {
                    if (!(this.out_grouping(g_v, 97, 252))) break lab5;
                    continue;
                }
                break;
            }
            {
                let v_4 = 1;
                while (true) {
                    const /**@type {number}*/ v_5 = this.c;
                    // deno-lint-ignore no-unused-labels
                    lab6: {
                        // deno-lint-ignore no-unused-labels
                        lab7: {
                            // deno-lint-ignore no-unused-labels
                            lab8: {
                                if (!(this.eq_s("ij"))) break lab8;
                                break lab7;
                            }
                            if (!(this.in_grouping(g_v, 97, 252))) break lab6;
                        }
                        v_4--;
                        continue;
                    }
                    this.c = v_5;
                    break;
                }
                if (v_4 > 0) break lab0;
            }
            if (!(this.out_grouping(g_v, 97, 252))) break lab0;
            this.#I_p2 = this.c;
        }
        this.c = v_1;
        return true;
    }

    /** @return {boolean} */
    #stem() {
        let /**@type {number}*/ a;
        let /**@type {boolean}*/ B_GE_removed;
        let /**@type {boolean}*/ B_stemmed;
        B_stemmed = false;
        this.#r_measure();
        this.limit_backward = this.c; this.c = this.limit;
        const /**@type {number}*/ v_1 = this.limit - this.c;
        // deno-lint-ignore no-unused-labels
        lab0: {
            this.ket = this.c;
            a = this.find_among_b(a_1);
            if (a === 0) break lab0;
            this.bra = this.c;
            switch (a) {
                case 1: {
                    this.slice_del();
                    break;
                }
                case 2: {
                    if (/**@type {boolean}*/(this.#I_p1 > this.c)) break lab0;
                    {
                        const /**@type {number}*/ v_2 = this.limit - this.c;
                        // deno-lint-ignore no-unused-labels
                        lab1: {
                            if (!(this.eq_s_b("t"))) break lab1;
                            if (/**@type {boolean}*/(this.#I_p1 > this.c)) break lab1;
                            break lab0;
                        }
                        this.c = this.limit - v_2;
                    }
                    if (!this.#r_C()) break lab0;
                    this.slice_del();
                    break;
                }
                case 3: {
                    if (/**@type {boolean}*/(this.#I_p1 > this.c)) break lab0;
                    this.slice_from("ie");
                    break;
                }
                case 4: {
                    // deno-lint-ignore no-unused-labels
                    lab2: {
                        const /**@type {number}*/ v_3 = this.limit - this.c;
                        // deno-lint-ignore no-unused-labels
                        lab3: {
                            const /**@type {number}*/ v_4 = this.limit - this.c;
                            if (!(this.eq_s_b("ar"))) break lab3;
                            if (/**@type {boolean}*/(this.#I_p1 > this.c)) break lab3;
                            if (!this.#r_C()) break lab3;
                            this.c = this.limit - v_4;
                            this.slice_del();
                            this.#r_lengthen_V();
                            break lab2;
                        }
                        this.c = this.limit - v_3;
                        // deno-lint-ignore no-unused-labels
                        lab4: {
                            const /**@type {number}*/ v_5 = this.limit - this.c;
                            if (!(this.eq_s_b("er"))) break lab4;
                            if (/**@type {boolean}*/(this.#I_p1 > this.c)) break lab4;
                            if (!this.#r_C()) break lab4;
                            this.c = this.limit - v_5;
                            this.slice_del();
                            break lab2;
                        }
                        this.c = this.limit - v_3;
                        if (/**@type {boolean}*/(this.#I_p1 > this.c)) break lab0;
                        if (!this.#r_C()) break lab0;
                        this.slice_from("e");
                    }
                    break;
                }
                case 5: {
                    if (/**@type {boolean}*/(this.#I_p1 > this.c)) break lab0;
                    this.slice_from("\u00E9");
                    break;
                }
                case 6: {
                    if (/**@type {boolean}*/(this.#I_p1 > this.c)) break lab0;
                    if (!this.#r_V()) break lab0;
                    this.slice_from("au");
                    break;
                }
                case 7: {
                    // deno-lint-ignore no-unused-labels
                    lab5: {
                        const /**@type {number}*/ v_6 = this.limit - this.c;
                        // deno-lint-ignore no-unused-labels
                        lab6: {
                            if (!(this.eq_s_b("hed"))) break lab6;
                            if (/**@type {boolean}*/(this.#I_p1 > this.c)) break lab6;
                            this.bra = this.c;
                            this.slice_from("heid");
                            break lab5;
                        }
                        this.c = this.limit - v_6;
                        // deno-lint-ignore no-unused-labels
                        lab7: {
                            if (!(this.eq_s_b("nd"))) break lab7;
                            this.slice_del();
                            break lab5;
                        }
                        this.c = this.limit - v_6;
                        // deno-lint-ignore no-unused-labels
                        lab8: {
                            if (!(this.eq_s_b("d"))) break lab8;
                            if (/**@type {boolean}*/(this.#I_p1 > this.c)) break lab8;
                            if (!this.#r_C()) break lab8;
                            this.bra = this.c;
                            this.slice_del();
                            break lab5;
                        }
                        this.c = this.limit - v_6;
                        // deno-lint-ignore no-unused-labels
                        lab9: {
                            // deno-lint-ignore no-unused-labels
                            lab10: {
                                // deno-lint-ignore no-unused-labels
                                lab11: {
                                    if (!(this.eq_s_b("i"))) break lab11;
                                    break lab10;
                                }
                                if (!(this.eq_s_b("j"))) break lab9;
                            }
                            if (!this.#r_V()) break lab9;
                            this.slice_del();
                            break lab5;
                        }
                        this.c = this.limit - v_6;
                        if (/**@type {boolean}*/(this.#I_p1 > this.c)) break lab0;
                        if (!this.#r_C()) break lab0;
                        this.slice_del();
                        this.#r_lengthen_V();
                    }
                    break;
                }
                case 8: {
                    this.slice_from("nd");
                    break;
                }
            }
            B_stemmed = true;
        }
        this.c = this.limit - v_1;
        const /**@type {number}*/ v_7 = this.limit - this.c;
        // deno-lint-ignore no-unused-labels
        lab12: {
            this.ket = this.c;
            a = this.find_among_b(a_2);
            if (a === 0) break lab12;
            this.bra = this.c;
            switch (a) {
                case 1: {
                    // deno-lint-ignore no-unused-labels
                    lab13: {
                        const /**@type {number}*/ v_8 = this.limit - this.c;
                        // deno-lint-ignore no-unused-labels
                        lab14: {
                            if (!(this.eq_s_b("'t"))) break lab14;
                            this.bra = this.c;
                            this.slice_del();
                            break lab13;
                        }
                        this.c = this.limit - v_8;
                        // deno-lint-ignore no-unused-labels
                        lab15: {
                            if (!(this.eq_s_b("et"))) break lab15;
                            this.bra = this.c;
                            if (/**@type {boolean}*/(this.#I_p1 > this.c)) break lab15;
                            if (!this.#r_C()) break lab15;
                            this.slice_del();
                            break lab13;
                        }
                        this.c = this.limit - v_8;
                        // deno-lint-ignore no-unused-labels
                        lab16: {
                            if (!(this.eq_s_b("rnt"))) break lab16;
                            this.bra = this.c;
                            this.slice_from("rn");
                            break lab13;
                        }
                        this.c = this.limit - v_8;
                        // deno-lint-ignore no-unused-labels
                        lab17: {
                            if (!(this.eq_s_b("t"))) break lab17;
                            this.bra = this.c;
                            if (/**@type {boolean}*/(this.#I_p1 > this.c)) break lab17;
                            const /**@type {number}*/ v_9 = this.limit - this.c;
                            if (this.c <= this.limit_backward) break lab17;
                            this.c--;
                            // deno-lint-ignore no-unused-labels
                            lab18: {
                                // deno-lint-ignore no-unused-labels
                                lab19: {
                                    if (!(this.in_grouping_b(g_v, 97, 252))) break lab19;
                                    break lab18;
                                }
                                if (!(this.eq_s_b("ij"))) break lab17;
                            }
                            this.c = this.limit - v_9;
                            this.slice_del();
                            break lab13;
                        }
                        this.c = this.limit - v_8;
                        // deno-lint-ignore no-unused-labels
                        lab20: {
                            if (!(this.eq_s_b("ink"))) break lab20;
                            this.bra = this.c;
                            this.slice_from("ing");
                            break lab13;
                        }
                        this.c = this.limit - v_8;
                        // deno-lint-ignore no-unused-labels
                        lab21: {
                            if (!(this.eq_s_b("mp"))) break lab21;
                            this.bra = this.c;
                            this.slice_from("m");
                            break lab13;
                        }
                        this.c = this.limit - v_8;
                        // deno-lint-ignore no-unused-labels
                        lab22: {
                            if (!(this.eq_s_b("'"))) break lab22;
                            this.bra = this.c;
                            if (/**@type {boolean}*/(this.#I_p1 > this.c)) break lab22;
                            this.slice_del();
                            break lab13;
                        }
                        this.c = this.limit - v_8;
                        this.bra = this.c;
                        if (/**@type {boolean}*/(this.#I_p1 > this.c)) break lab12;
                        if (!this.#r_C()) break lab12;
                        this.slice_del();
                    }
                    break;
                }
                case 2: {
                    if (/**@type {boolean}*/(this.#I_p1 > this.c)) break lab12;
                    this.slice_from("g");
                    break;
                }
                case 3: {
                    if (/**@type {boolean}*/(this.#I_p1 > this.c)) break lab12;
                    this.slice_from("lijk");
                    break;
                }
                case 4: {
                    if (/**@type {boolean}*/(this.#I_p1 > this.c)) break lab12;
                    this.slice_from("isch");
                    break;
                }
                case 5: {
                    if (/**@type {boolean}*/(this.#I_p1 > this.c)) break lab12;
                    if (!this.#r_C()) break lab12;
                    this.slice_del();
                    break;
                }
                case 6: {
                    if (/**@type {boolean}*/(this.#I_p1 > this.c)) break lab12;
                    this.slice_from("t");
                    break;
                }
                case 7: {
                    if (/**@type {boolean}*/(this.#I_p1 > this.c)) break lab12;
                    this.slice_from("s");
                    break;
                }
                case 8: {
                    if (/**@type {boolean}*/(this.#I_p1 > this.c)) break lab12;
                    this.slice_from("r");
                    break;
                }
                case 9: {
                    if (/**@type {boolean}*/(this.#I_p1 > this.c)) break lab12;
                    this.slice_del();
                    this.insert(this.c, this.c, "l");
                    this.#r_lengthen_V();
                    break;
                }
                case 10: {
                    if (/**@type {boolean}*/(this.#I_p1 > this.c)) break lab12;
                    if (!this.#r_C()) break lab12;
                    this.slice_del();
                    this.insert(this.c, this.c, "en");
                    this.#r_lengthen_V();
                    break;
                }
                case 11: {
                    if (/**@type {boolean}*/(this.#I_p1 > this.c)) break lab12;
                    if (!this.#r_C()) break lab12;
                    this.slice_from("ief");
                    break;
                }
            }
            B_stemmed = true;
        }
        this.c = this.limit - v_7;
        const /**@type {number}*/ v_10 = this.limit - this.c;
        // deno-lint-ignore no-unused-labels
        lab23: {
            this.ket = this.c;
            a = this.find_among_b(a_3);
            if (a === 0) break lab23;
            this.bra = this.c;
            switch (a) {
                case 1: {
                    if (/**@type {boolean}*/(this.#I_p1 > this.c)) break lab23;
                    this.slice_from("eer");
                    break;
                }
                case 2: {
                    if (/**@type {boolean}*/(this.#I_p1 > this.c)) break lab23;
                    this.slice_del();
                    this.#r_lengthen_V();
                    break;
                }
                case 3: {
                    if (/**@type {boolean}*/(this.#I_p1 > this.c)) break lab23;
                    this.slice_del();
                    break;
                }
                case 4: {
                    this.slice_from("r");
                    break;
                }
                case 5: {
                    // deno-lint-ignore no-unused-labels
                    lab24: {
                        const /**@type {number}*/ v_11 = this.limit - this.c;
                        // deno-lint-ignore no-unused-labels
                        lab25: {
                            if (!(this.eq_s_b("ild"))) break lab25;
                            this.slice_from("er");
                            break lab24;
                        }
                        this.c = this.limit - v_11;
                        if (/**@type {boolean}*/(this.#I_p1 > this.c)) break lab23;
                        this.slice_del();
                        this.#r_lengthen_V();
                    }
                    break;
                }
                case 6: {
                    if (/**@type {boolean}*/(this.#I_p1 > this.c)) break lab23;
                    if (!this.#r_C()) break lab23;
                    this.slice_from("aar");
                    break;
                }
                case 7: {
                    if (/**@type {boolean}*/(this.#I_p2 > this.c)) break lab23;
                    this.slice_del();
                    this.insert(this.c, this.c, "f");
                    this.#r_lengthen_V();
                    break;
                }
                case 8: {
                    if (/**@type {boolean}*/(this.#I_p2 > this.c)) break lab23;
                    this.slice_del();
                    this.insert(this.c, this.c, "g");
                    this.#r_lengthen_V();
                    break;
                }
                case 9: {
                    if (/**@type {boolean}*/(this.#I_p1 > this.c)) break lab23;
                    if (!this.#r_C()) break lab23;
                    this.slice_from("t");
                    break;
                }
                case 10: {
                    if (/**@type {boolean}*/(this.#I_p1 > this.c)) break lab23;
                    if (!this.#r_C()) break lab23;
                    this.slice_from("d");
                    break;
                }
            }
            B_stemmed = true;
        }
        this.c = this.limit - v_10;
        const /**@type {number}*/ v_12 = this.limit - this.c;
        // deno-lint-ignore no-unused-labels
        lab26: {
            // deno-lint-ignore no-unused-labels
            lab27: {
                const /**@type {number}*/ v_13 = this.limit - this.c;
                // deno-lint-ignore no-unused-labels
                lab28: {
                    this.ket = this.c;
                    a = this.find_among_b(a_4);
                    if (a === 0) break lab28;
                    this.bra = this.c;
                    switch (a) {
                        case 1: {
                            if (/**@type {boolean}*/(this.#I_p1 > this.c)) break lab28;
                            this.slice_from("ie");
                            break;
                        }
                        case 2: {
                            if (/**@type {boolean}*/(this.#I_p1 > this.c)) break lab28;
                            this.slice_from("eer");
                            break;
                        }
                        case 3: {
                            if (/**@type {boolean}*/(this.#I_p1 > this.c)) break lab28;
                            this.slice_del();
                            break;
                        }
                        case 4: {
                            if (/**@type {boolean}*/(this.#I_p1 > this.c)) break lab28;
                            if (!this.#r_V()) break lab28;
                            this.slice_from("n");
                            break;
                        }
                        case 5: {
                            if (/**@type {boolean}*/(this.#I_p1 > this.c)) break lab28;
                            if (!this.#r_V()) break lab28;
                            this.slice_from("l");
                            break;
                        }
                        case 6: {
                            if (/**@type {boolean}*/(this.#I_p1 > this.c)) break lab28;
                            if (!this.#r_V()) break lab28;
                            this.slice_from("r");
                            break;
                        }
                        case 7: {
                            if (/**@type {boolean}*/(this.#I_p1 > this.c)) break lab28;
                            this.slice_from("teer");
                            break;
                        }
                        case 8: {
                            if (/**@type {boolean}*/(this.#I_p1 > this.c)) break lab28;
                            this.slice_from("lijk");
                            break;
                        }
                        case 9: {
                            if (/**@type {boolean}*/(this.#I_p1 > this.c)) break lab28;
                            if (!this.#r_C()) break lab28;
                            this.slice_del();
                            this.#r_lengthen_V();
                            break;
                        }
                    }
                    break lab27;
                }
                this.c = this.limit - v_13;
                this.ket = this.c;
                if (this.find_among_b(a_5) === 0) break lab26;
                this.bra = this.c;
                if (/**@type {boolean}*/(this.#I_p1 > this.c)) break lab26;
                {
                    const /**@type {number}*/ v_14 = this.limit - this.c;
                    // deno-lint-ignore no-unused-labels
                    lab29: {
                        if (!(this.eq_s_b("inn"))) break lab29;
                        if (/**@type {boolean}*/(this.c > this.limit_backward)) break lab29;
                        break lab26;
                    }
                    this.c = this.limit - v_14;
                }
                if (!this.#r_C()) break lab26;
                this.slice_del();
                this.#r_lengthen_V();
            }
            B_stemmed = true;
        }
        this.c = this.limit - v_12;
        this.c = this.limit_backward;
        B_GE_removed = false;
        const /**@type {number}*/ v_15 = this.c;
        // deno-lint-ignore no-unused-labels
        lab30: {
            const /**@type {number}*/ v_16 = this.c;
            this.bra = this.c;
            if (!(this.eq_s("ge"))) break lab30;
            this.ket = this.c;
            const /**@type {number}*/ v_17 = this.c;
            if (this.c + 3 > this.limit) break lab30;
            this.c += 3;
            this.c = v_17;
            const /**@type {number}*/ v_18 = this.c;
            // deno-lint-ignore no-unused-labels
            golab31: while (true)
            {
                const /**@type {number}*/ v_19 = this.c;
                // deno-lint-ignore no-unused-labels
                lab32: {
                    // deno-lint-ignore no-unused-labels
                    lab33: {
                        // deno-lint-ignore no-unused-labels
                        lab34: {
                            if (!(this.eq_s("ij"))) break lab34;
                            break lab33;
                        }
                        if (!(this.in_grouping(g_v, 97, 252))) break lab32;
                    }
                    break golab31;
                }
                this.c = v_19;
                if (this.c >= this.limit) break lab30;
                this.c++;
            }
            while (true) {
                const /**@type {number}*/ v_20 = this.c;
                // deno-lint-ignore no-unused-labels
                lab35: {
                    // deno-lint-ignore no-unused-labels
                    lab36: {
                        // deno-lint-ignore no-unused-labels
                        lab37: {
                            if (!(this.eq_s("ij"))) break lab37;
                            break lab36;
                        }
                        if (!(this.in_grouping(g_v, 97, 252))) break lab35;
                    }
                    continue;
                }
                this.c = v_20;
                break;
            }
            if (/**@type {boolean}*/(this.c >= this.limit)) break lab30;
            this.c = v_18;
            a = this.find_among(a_9);
            switch (a) {
                case 1: {
                    break lab30;
                }
            }
            B_GE_removed = true;
            this.slice_del();
            const /**@type {number}*/ v_21 = this.c;
            // deno-lint-ignore no-unused-labels
            lab38: {
                this.bra = this.c;
                a = this.find_among(a_10);
                if (a === 0) break lab38;
                this.ket = this.c;
                this.slice_from(as_10[a - 1]);
            }
            this.c = v_21;
            this.c = v_16;
            this.#r_measure();
        }
        this.c = v_15;
        this.limit_backward = this.c; this.c = this.limit;
        const /**@type {number}*/ v_22 = this.limit - this.c;
        // deno-lint-ignore no-unused-labels
        lab39: {
            if (!B_GE_removed) break lab39;
            B_stemmed = true;
            if (!this.#r_Step_1c()) break lab39;
        }
        this.c = this.limit - v_22;
        this.c = this.limit_backward;
        B_GE_removed = false;
        const /**@type {number}*/ v_23 = this.c;
        // deno-lint-ignore no-unused-labels
        lab40: {
            const /**@type {number}*/ v_24 = this.c;
            if (this.c >= this.limit) break lab40;
            this.c++;
            // deno-lint-ignore no-unused-labels
            golab41: while (true)
            {
                // deno-lint-ignore no-unused-labels
                lab42: {
                    this.bra = this.c;
                    if (!(this.eq_s("ge"))) break lab42;
                    this.ket = this.c;
                    break golab41;
                }
                if (this.c >= this.limit) break lab40;
                this.c++;
            }
            const /**@type {number}*/ v_25 = this.c;
            if (this.c + 3 > this.limit) break lab40;
            this.c += 3;
            this.c = v_25;
            const /**@type {number}*/ v_26 = this.c;
            // deno-lint-ignore no-unused-labels
            golab43: while (true)
            {
                const /**@type {number}*/ v_27 = this.c;
                // deno-lint-ignore no-unused-labels
                lab44: {
                    // deno-lint-ignore no-unused-labels
                    lab45: {
                        // deno-lint-ignore no-unused-labels
                        lab46: {
                            if (!(this.eq_s("ij"))) break lab46;
                            break lab45;
                        }
                        if (!(this.in_grouping(g_v, 97, 252))) break lab44;
                    }
                    break golab43;
                }
                this.c = v_27;
                if (this.c >= this.limit) break lab40;
                this.c++;
            }
            while (true) {
                const /**@type {number}*/ v_28 = this.c;
                // deno-lint-ignore no-unused-labels
                lab47: {
                    // deno-lint-ignore no-unused-labels
                    lab48: {
                        // deno-lint-ignore no-unused-labels
                        lab49: {
                            if (!(this.eq_s("ij"))) break lab49;
                            break lab48;
                        }
                        if (!(this.in_grouping(g_v, 97, 252))) break lab47;
                    }
                    continue;
                }
                this.c = v_28;
                break;
            }
            if (/**@type {boolean}*/(this.c >= this.limit)) break lab40;
            this.c = v_26;
            B_GE_removed = true;
            this.slice_del();
            const /**@type {number}*/ v_29 = this.c;
            // deno-lint-ignore no-unused-labels
            lab50: {
                this.bra = this.c;
                a = this.find_among(a_11);
                if (a === 0) break lab50;
                this.ket = this.c;
                this.slice_from(as_11[a - 1]);
            }
            this.c = v_29;
            this.c = v_24;
            this.#r_measure();
        }
        this.c = v_23;
        this.limit_backward = this.c; this.c = this.limit;
        const /**@type {number}*/ v_30 = this.limit - this.c;
        // deno-lint-ignore no-unused-labels
        lab51: {
            if (!B_GE_removed) break lab51;
            B_stemmed = true;
            if (!this.#r_Step_1c()) break lab51;
        }
        this.c = this.limit - v_30;
        this.c = this.limit_backward;
        this.limit_backward = this.c; this.c = this.limit;
        const /**@type {number}*/ v_31 = this.limit - this.c;
        // deno-lint-ignore no-unused-labels
        lab52: {
            this.ket = this.c;
            a = this.find_among_b(a_6);
            if (a === 0) break lab52;
            this.bra = this.c;
            this.slice_from(as_6[a - 1]);
            B_stemmed = true;
        }
        this.c = this.limit - v_31;
        const /**@type {number}*/ v_32 = this.limit - this.c;
        // deno-lint-ignore no-unused-labels
        lab53: {
            if (!B_stemmed) break lab53;
            this.ket = this.c;
            a = this.find_among_b(a_7);
            if (a === 0) break lab53;
            this.bra = this.c;
            switch (a) {
                case 1: {
                    this.slice_from("b");
                    break;
                }
                case 2: {
                    this.slice_from("c");
                    break;
                }
                case 3: {
                    this.slice_from("d");
                    break;
                }
                case 4: {
                    this.slice_from("f");
                    break;
                }
                case 5: {
                    this.slice_from("g");
                    break;
                }
                case 6: {
                    this.slice_from("h");
                    break;
                }
                case 7: {
                    this.slice_from("j");
                    break;
                }
                case 8: {
                    this.slice_from("k");
                    break;
                }
                case 9: {
                    this.slice_from("l");
                    break;
                }
                case 10: {
                    this.slice_from("m");
                    break;
                }
                case 11: {
                    {
                        const /**@type {number}*/ v_33 = this.limit - this.c;
                        // deno-lint-ignore no-unused-labels
                        lab54: {
                            if (!(this.eq_s_b("i"))) break lab54;
                            if (/**@type {boolean}*/(this.c > this.limit_backward)) break lab54;
                            break lab53;
                        }
                        this.c = this.limit - v_33;
                    }
                    this.slice_from("n");
                    break;
                }
                case 12: {
                    this.slice_from("p");
                    break;
                }
                case 13: {
                    this.slice_from("q");
                    break;
                }
                case 14: {
                    this.slice_from("r");
                    break;
                }
                case 15: {
                    this.slice_from("s");
                    break;
                }
                case 16: {
                    this.slice_from("t");
                    break;
                }
                case 17: {
                    this.slice_from("v");
                    break;
                }
                case 18: {
                    this.slice_from("w");
                    break;
                }
                case 19: {
                    this.slice_from("x");
                    break;
                }
                case 20: {
                    this.slice_from("z");
                    break;
                }
            }
        }
        this.c = this.limit - v_32;
        this.c = this.limit_backward;
        return true;
    }

    /**@return{string}*/
    stem(/**@type {string}*/input) {
        this.setCurrent(input);
        this.#stem();
        return this.getCurrent();
    }

    stemWord = this.stem;
}

