// Generated from esperanto.sbl by Snowball 3.2.0 - https://snowballstem.org/

// deno-lint-ignore-file ban-unused-ignore no-constant-condition no-empty prefer-const

const a_0 = [
    ["", 14],
    ["-", 13, 1],
    ["cx", 1, 2],
    ["gx", 2, 3],
    ["hx", 3, 4],
    ["jx", 4, 5],
    ["q", 12, 6],
    ["sx", 5, 7],
    ["ux", 6, 8],
    ["w", 12, 9],
    ["x", 12, 10],
    ["y", 12, 11],
    ["\u00E1", 7, 12],
    ["\u00E9", 8, 13],
    ["\u00ED", 9, 14],
    ["\u00F3", 10, 15],
    ["\u00FA", 11, 16]
];

const a_1 = [
    ["as", -1],
    ["i", -1],
    ["is", -1, 1],
    ["os", -1],
    ["u", -1],
    ["us", -1, 1]
];

const a_2 = [
    ["ci", -1],
    ["gi", -1],
    ["hi", -1],
    ["li", -1],
    ["ili", -1, 1],
    ["\u015Dli", -1, 2],
    ["mi", -1],
    ["ni", -1],
    ["oni", -1, 1],
    ["ri", -1],
    ["si", -1],
    ["vi", -1],
    ["ivi", -1, 1],
    ["\u011Di", -1],
    ["\u015Di", -1],
    ["i\u015Di", -1, 1],
    ["mal\u015Di", -1, 2]
];

const a_3 = [
    ["amb", -1],
    ["bald", -1],
    ["malbald", -1, 1],
    ["morg", -1],
    ["postmorg", -1, 1],
    ["adi", -1],
    ["hodi", -1],
    ["ank", -1],
    ["\u0109irk", -1],
    ["tut\u0109irk", -1, 1],
    ["presk", -1],
    ["almen", -1],
    ["apen", -1],
    ["hier", -1],
    ["anta\u016Dhier", -1, 1],
    ["malgr", -1],
    ["ankor", -1],
    ["kontr", -1],
    ["anstat", -1],
    ["kvaz", -1]
];

const a_4 = [
    ["aliu", -1],
    ["unu", -1]
];

const a_5 = [
    ["aha", -1],
    ["haha", -1, 1],
    ["haleluja", -1],
    ["hola", -1],
    ["hosana", -1],
    ["maltra", -1],
    ["hura", -1],
    ["\u0125a\u0125a", -1],
    ["ekde", -1],
    ["elde", -1],
    ["disde", -1],
    ["ehe", -1],
    ["maltre", -1],
    ["dirlididi", -1],
    ["malpli", -1],
    ["mal\u0109i", -1],
    ["malkaj", -1],
    ["amen", -1],
    ["tamen", -1, 1],
    ["oho", -1],
    ["maltro", -1],
    ["minus", -1],
    ["uhu", -1],
    ["muu", -1]
];

const a_6 = [
    ["tri", -1],
    ["du", -1],
    ["unu", -1]
];

const a_7 = [
    ["dek", -1],
    ["cent", -1]
];

const a_8 = [
    ["k", -1],
    ["kelk", -1, 1],
    ["nen", -1],
    ["t", -1],
    ["mult", -1, 1],
    ["samt", -1, 2],
    ["\u0109", -1]
];

const a_9 = [
    ["a", -1],
    ["e", -1],
    ["i", -1],
    ["j", 1],
    ["aj", -1, 1],
    ["oj", -1, 2],
    ["n", 1],
    ["an", -1, 1],
    ["en", -1, 2],
    ["jn", 1, 3],
    ["ajn", -1, 1],
    ["ojn", -1, 2],
    ["on", -1, 6],
    ["o", -1],
    ["as", -1],
    ["is", -1],
    ["os", -1],
    ["us", -1],
    ["u", -1]
];

const /**@type {Array<number>}*/ g_vowel = [17, 65, 16];

const /**@type {Array<number>}*/ g_aou = [1, 64, 16];

const /**@type {Array<number>}*/ g_digit = [255, 3];

import B from './base-stemmer.js'

export default class extends B {


    /** @return {boolean} */
    #stem() {
        let /**@type {number}*/ a;
        let /**@type {boolean}*/ B_foreign;
        const /**@type {number}*/ v_1 = this.c;
        B_foreign = false;
        while (true) {
            const /**@type {number}*/ v_2 = this.c;
            // deno-lint-ignore no-unused-labels
            lab0: {
                this.bra = this.c;
                a = this.find_among(a_0);
                this.ket = this.c;
                switch (a) {
                    case 1: {
                        this.slice_from("\u0109");
                        break;
                    }
                    case 2: {
                        this.slice_from("\u011D");
                        break;
                    }
                    case 3: {
                        this.slice_from("\u0125");
                        break;
                    }
                    case 4: {
                        this.slice_from("\u0135");
                        break;
                    }
                    case 5: {
                        this.slice_from("\u015D");
                        break;
                    }
                    case 6: {
                        this.slice_from("\u016D");
                        break;
                    }
                    case 7: {
                        this.slice_from("a");
                        B_foreign = true;
                        break;
                    }
                    case 8: {
                        this.slice_from("e");
                        B_foreign = true;
                        break;
                    }
                    case 9: {
                        this.slice_from("i");
                        B_foreign = true;
                        break;
                    }
                    case 10: {
                        this.slice_from("o");
                        B_foreign = true;
                        break;
                    }
                    case 11: {
                        this.slice_from("u");
                        B_foreign = true;
                        break;
                    }
                    case 12: {
                        B_foreign = true;
                        break;
                    }
                    case 13: {
                        B_foreign = false;
                        break;
                    }
                    case 14: {
                        if (this.c >= this.limit) break lab0;
                        this.c++;
                        break;
                    }
                }
                continue;
            }
            this.c = v_2;
            break;
        }
        if (B_foreign) return false;
        this.c = v_1;
        const /**@type {number}*/ v_3 = this.c;
        // deno-lint-ignore no-unused-labels
        lab1: {
            this.bra = this.c;
            if (!(this.eq_s("'"))) break lab1;
            this.ket = this.c;
            if (!(this.eq_s("st"))) break lab1;
            if (this.find_among(a_1) === 0) break lab1;
            if (/**@type {boolean}*/(this.c < this.limit)) break lab1;
            this.slice_from("e");
        }
        this.c = v_3;
        this.limit_backward = this.c; this.c = this.limit;
        {
            const /**@type {number}*/ v_4 = this.limit - this.c;
            // deno-lint-ignore no-unused-labels
            lab2: {
                this.ket = this.c;
                const /**@type {number}*/ v_5 = this.limit - this.c;
                // deno-lint-ignore no-unused-labels
                lab3: {
                    if (!(this.eq_s_b("n"))) {
                        this.c = this.limit - v_5;
                        break lab3;
                    }
                }
                this.bra = this.c;
                if (this.find_among_b(a_2) === 0) break lab2;
                // deno-lint-ignore no-unused-labels
                lab4: {
                    // deno-lint-ignore no-unused-labels
                    lab5: {
                        if (/**@type {boolean}*/(this.c > this.limit_backward)) break lab5;
                        break lab4;
                    }
                    if (!(this.eq_s_b("-"))) break lab2;
                }
                this.slice_del();
                return false;
            }
            this.c = this.limit - v_4;
        }
        const /**@type {number}*/ v_6 = this.limit - this.c;
        // deno-lint-ignore no-unused-labels
        lab6: {
            this.ket = this.c;
            if (!(this.eq_s_b("'"))) break lab6;
            this.bra = this.c;
            // deno-lint-ignore no-unused-labels
            lab7: {
                const /**@type {number}*/ v_7 = this.limit - this.c;
                // deno-lint-ignore no-unused-labels
                lab8: {
                    if (!(this.eq_s_b("l"))) break lab8;
                    if (/**@type {boolean}*/(this.c > this.limit_backward)) break lab8;
                    this.slice_from("a");
                    break lab7;
                }
                this.c = this.limit - v_7;
                // deno-lint-ignore no-unused-labels
                lab9: {
                    if (!(this.eq_s_b("un"))) break lab9;
                    if (/**@type {boolean}*/(this.c > this.limit_backward)) break lab9;
                    this.slice_from("u");
                    break lab7;
                }
                this.c = this.limit - v_7;
                // deno-lint-ignore no-unused-labels
                lab10: {
                    if (this.find_among_b(a_3) === 0) break lab10;
                    // deno-lint-ignore no-unused-labels
                    lab11: {
                        // deno-lint-ignore no-unused-labels
                        lab12: {
                            if (/**@type {boolean}*/(this.c > this.limit_backward)) break lab12;
                            break lab11;
                        }
                        if (!(this.eq_s_b("-"))) break lab10;
                    }
                    this.slice_from("a\u016D");
                    break lab7;
                }
                this.c = this.limit - v_7;
                this.slice_from("o");
            }
        }
        this.c = this.limit - v_6;
        {
            const /**@type {number}*/ v_8 = this.limit - this.c;
            // deno-lint-ignore no-unused-labels
            lab13: {
                this.ket = this.c;
                this.bra = this.c;
                const /**@type {number}*/ v_9 = this.limit - this.c;
                // deno-lint-ignore no-unused-labels
                lab14: {
                    const /**@type {number}*/ v_10 = this.limit - this.c;
                    // deno-lint-ignore no-unused-labels
                    lab15: {
                        const /**@type {number}*/ v_11 = this.limit - this.c;
                        // deno-lint-ignore no-unused-labels
                        lab16: {
                            if (!(this.eq_s_b("n"))) {
                                this.c = this.limit - v_11;
                                break lab16;
                            }
                        }
                        this.bra = this.c;
                        if (!(this.eq_s_b("e"))) break lab15;
                        break lab14;
                    }
                    this.c = this.limit - v_10;
                    const /**@type {number}*/ v_12 = this.limit - this.c;
                    // deno-lint-ignore no-unused-labels
                    lab17: {
                        if (!(this.eq_s_b("n"))) {
                            this.c = this.limit - v_12;
                            break lab17;
                        }
                    }
                    const /**@type {number}*/ v_13 = this.limit - this.c;
                    // deno-lint-ignore no-unused-labels
                    lab18: {
                        if (!(this.eq_s_b("j"))) {
                            this.c = this.limit - v_13;
                            break lab18;
                        }
                    }
                    this.bra = this.c;
                    if (!(this.in_grouping_b(g_aou, 97, 117))) break lab13;
                }
                if (!(this.eq_s_b("i"))) break lab13;
                const /**@type {number}*/ v_14 = this.limit - this.c;
                // deno-lint-ignore no-unused-labels
                lab19: {
                    if (this.find_among_b(a_8) === 0) {
                        this.c = this.limit - v_14;
                        break lab19;
                    }
                }
                // deno-lint-ignore no-unused-labels
                lab20: {
                    // deno-lint-ignore no-unused-labels
                    lab21: {
                        if (/**@type {boolean}*/(this.c > this.limit_backward)) break lab21;
                        break lab20;
                    }
                    if (!(this.eq_s_b("-"))) break lab13;
                }
                this.c = this.limit - v_9;
                this.slice_del();
                return false;
            }
            this.c = this.limit - v_8;
        }
        {
            const /**@type {number}*/ v_15 = this.limit - this.c;
            // deno-lint-ignore no-unused-labels
            lab22: {
                if (this.find_among_b(a_5) === 0) break lab22;
                // deno-lint-ignore no-unused-labels
                lab23: {
                    // deno-lint-ignore no-unused-labels
                    lab24: {
                        if (/**@type {boolean}*/(this.c > this.limit_backward)) break lab24;
                        break lab23;
                    }
                    if (!(this.eq_s_b("-"))) break lab22;
                }
                return false;
            }
            this.c = this.limit - v_15;
        }
        {
            const /**@type {number}*/ v_16 = this.limit - this.c;
            // deno-lint-ignore no-unused-labels
            lab25: {
                if (this.find_among_b(a_6) === 0) break lab25;
                if (this.find_among_b(a_7) === 0) break lab25;
                return false;
            }
            this.c = this.limit - v_16;
        }
        {
            const /**@type {number}*/ v_17 = this.limit - this.c;
            // deno-lint-ignore no-unused-labels
            lab26: {
                this.ket = this.c;
                const /**@type {number}*/ v_18 = this.limit - this.c;
                // deno-lint-ignore no-unused-labels
                lab27: {
                    if (!(this.eq_s_b("n"))) {
                        this.c = this.limit - v_18;
                        break lab27;
                    }
                }
                const /**@type {number}*/ v_19 = this.limit - this.c;
                // deno-lint-ignore no-unused-labels
                lab28: {
                    if (!(this.eq_s_b("j"))) {
                        this.c = this.limit - v_19;
                        break lab28;
                    }
                }
                this.bra = this.c;
                if (this.find_among_b(a_4) === 0) break lab26;
                // deno-lint-ignore no-unused-labels
                lab29: {
                    // deno-lint-ignore no-unused-labels
                    lab30: {
                        if (/**@type {boolean}*/(this.c > this.limit_backward)) break lab30;
                        break lab29;
                    }
                    if (!(this.eq_s_b("-"))) break lab26;
                }
                this.slice_del();
                return false;
            }
            this.c = this.limit - v_17;
        }
        const /**@type {number}*/ v_20 = this.limit - this.c;
        // deno-lint-ignore no-unused-labels
        lab31: {
            const /**@type {number}*/ v_21 = this.limit - this.c;
            // deno-lint-ignore no-unused-labels
            lab32: {
                for (let /**@type {number}*/ v_22 = 2; v_22 > 0; v_22--)
                {
                    if (!this.go_out_grouping_b(g_vowel, 97, 117)) break lab32;
                    this.c--;
                }
                break lab31;
            }
            this.c = this.limit - v_21;
            // deno-lint-ignore no-unused-labels
            lab33: {
                // deno-lint-ignore no-unused-labels
                golab34: while (true)
                {
                    // deno-lint-ignore no-unused-labels
                    lab35: {
                        if (!(this.eq_s_b("-"))) break lab35;
                        break golab34;
                    }
                    if (this.c <= this.limit_backward) break lab33;
                    this.c--;
                }
                if (this.c <= this.limit_backward) break lab33;
                this.c--;
                break lab31;
            }
            this.c = this.limit - v_21;
            if (!this.go_out_grouping_b(g_digit, 48, 57)) return false;
            this.c--;
        }
        this.c = this.limit - v_20;
        this.ket = this.c;
        a = this.find_among_b(a_9);
        if (a === 0) return false;
        switch (a) {
            case 1: {
                const /**@type {number}*/ v_23 = this.limit - this.c;
                // deno-lint-ignore no-unused-labels
                lab36: {
                    // deno-lint-ignore no-unused-labels
                    lab37: {
                        if (!(this.eq_s_b("-"))) break lab37;
                        break lab36;
                    }
                    if (!(this.in_grouping_b(g_digit, 48, 57))) return false;
                }
                this.c = this.limit - v_23;
                break;
            }
        }
        const /**@type {number}*/ v_24 = this.limit - this.c;
        // deno-lint-ignore no-unused-labels
        lab38: {
            if (!(this.eq_s_b("-"))) {
                this.c = this.limit - v_24;
                break lab38;
            }
        }
        this.bra = this.c;
        this.slice_del();
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

