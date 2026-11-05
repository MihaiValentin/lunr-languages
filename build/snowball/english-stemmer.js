// Generated from english.sbl by Snowball 3.2.0 - https://snowballstem.org/

// deno-lint-ignore-file ban-unused-ignore no-constant-condition no-empty prefer-const

const a_0 = [
    ["arsen", -1],
    ["commun", -1],
    ["emerg", -1],
    ["gener", -1],
    ["inter", -1],
    ["later", -1],
    ["organ", -1],
    ["past", -1],
    ["univers", -1]
];

const a_1 = [
    ["'", 1],
    ["'s'", 1, 1],
    ["'s", 1]
];

const a_2 = [
    ["ied", 2],
    ["s", 3],
    ["ies", 2, 1],
    ["sses", 1, 2],
    ["ss", -1, 3],
    ["us", -1, 4]
];

const a_3 = [
    ["succ", 1],
    ["proc", 1],
    ["exc", 1]
];

const a_4 = [
    ["even", 2],
    ["cann", 2],
    ["inn", 2],
    ["earr", 2],
    ["herr", 2],
    ["out", 2],
    ["y", 1]
];

const a_5 = [
    ["", -1],
    ["ed", 2, 1],
    ["eed", 1, 1],
    ["ing", 3, 3],
    ["edly", 2, 4],
    ["eedly", 1, 1],
    ["ingly", 2, 6]
];

const a_6 = [
    ["", 3],
    ["bb", 2, 1],
    ["dd", 2, 2],
    ["ff", 2, 3],
    ["gg", 2, 4],
    ["bl", 1, 5],
    ["mm", 2, 6],
    ["nn", 2, 7],
    ["pp", 2, 8],
    ["rr", 2, 9],
    ["at", 1, 10],
    ["tt", 2, 11],
    ["iz", 1, 12]
];

const a_7 = [
    ["anci", 3],
    ["enci", 2],
    ["ogi", 14],
    ["li", 16],
    ["bli", 12, 1],
    ["abli", 4, 1],
    ["alli", 8, 3],
    ["fulli", 9, 4],
    ["lessli", 15, 5],
    ["ousli", 10, 6],
    ["entli", 5, 7],
    ["aliti", 8],
    ["biliti", 12],
    ["iviti", 11],
    ["tional", 1],
    ["ational", 7, 1],
    ["alism", 8],
    ["ation", 7],
    ["ization", 6, 1],
    ["izer", 6],
    ["ator", 7],
    ["iveness", 11],
    ["fulness", 9],
    ["ousness", 10],
    ["ogist", 13]
];

const a_8 = [
    ["icate", 4],
    ["ative", 6],
    ["alize", 3],
    ["iciti", 4],
    ["ical", 4],
    ["tional", 1],
    ["ational", 2, 1],
    ["ful", 5],
    ["ness", 5]
];

const a_9 = [
    ["ic", 1],
    ["ance", 1],
    ["ence", 1],
    ["able", 1],
    ["ible", 1],
    ["ate", 1],
    ["ive", 1],
    ["ize", 1],
    ["iti", 1],
    ["al", 1],
    ["ism", 1],
    ["ion", 2],
    ["er", 1],
    ["ous", 1],
    ["ant", 1],
    ["ent", 1],
    ["ment", 1, 1],
    ["ement", 1, 1]
];

const a_10 = [
    ["e", 1],
    ["l", 2]
];

const a_11 = [
    ["andes", -1],
    ["atlas", -1],
    ["bias", -1],
    ["cosmos", -1],
    ["early", 6],
    ["gently", 4],
    ["howe", -1],
    ["idly", 3],
    ["news", -1],
    ["only", 7],
    ["singly", 8],
    ["skies", 2],
    ["skis", 1],
    ["sky", -1],
    ["ugly", 5]
];

const /**@type {Array<string>}*/ as_11 = ["ski", "sky", "idl", "gentl", "ugli", "earli", "onli", "singl"];

const /**@type {Array<number>}*/ g_aeo = [17, 64];

const /**@type {Array<number>}*/ g_v = [17, 65, 16, 1];

const /**@type {Array<number>}*/ g_v_WXY = [1, 17, 65, 208, 1];

const /**@type {Array<number>}*/ g_valid_LI = [55, 141, 2];

import B from './base-stemmer.js'

export default class extends B {


    /** @return {boolean} */
    #r_shortv() {
        // deno-lint-ignore no-unused-labels
        lab0: {
            const /**@type {number}*/ v_1 = this.limit - this.c;
            // deno-lint-ignore no-unused-labels
            lab1: {
                if (!(this.out_grouping_b(g_v_WXY, 89, 121))) break lab1;
                if (!(this.in_grouping_b(g_v, 97, 121))) break lab1;
                if (!(this.out_grouping_b(g_v, 97, 121))) break lab1;
                break lab0;
            }
            this.c = this.limit - v_1;
            // deno-lint-ignore no-unused-labels
            lab2: {
                if (!(this.out_grouping_b(g_v, 97, 121))) break lab2;
                if (!(this.in_grouping_b(g_v, 97, 121))) break lab2;
                if (/**@type {boolean}*/(this.c > this.limit_backward)) break lab2;
                break lab0;
            }
            this.c = this.limit - v_1;
            if (!(this.eq_s_b("past"))) return false;
        }
        return true;
    }

    /** @return {boolean} */
    #stem() {
        let /**@type {number}*/ a;
        let /**@type {boolean}*/ B_Y_found;
        let /**@type {number}*/ I_p2;
        let /**@type {number}*/ I_p1;
        // deno-lint-ignore no-unused-labels
        lab0: {
            const /**@type {number}*/ v_1 = this.c;
            // deno-lint-ignore no-unused-labels
            lab1: {
                this.bra = this.c;
                a = this.find_among(a_11);
                if (a === 0) break lab1;
                this.ket = this.c;
                if (/**@type {boolean}*/(this.c < this.limit)) break lab1;
                if (a > 0) {
                    this.slice_from(as_11[a - 1]);
                }
                break lab0;
            }
            this.c = v_1;
            // deno-lint-ignore no-unused-labels
            lab2: {
                // deno-lint-ignore no-unused-labels
                lab3: {
                    if (this.c + 3 > this.limit) break lab3;
                    this.c += 3;
                    break lab2;
                }
                break lab0;
            }
            this.c = v_1;
            // deno-lint-ignore no-unused-labels
            lab4: {
                B_Y_found = false;
                const /**@type {number}*/ v_2 = this.c;
                // deno-lint-ignore no-unused-labels
                lab5: {
                    this.bra = this.c;
                    if (!(this.eq_s("'"))) break lab5;
                    this.ket = this.c;
                    this.slice_del();
                }
                this.c = v_2;
                const /**@type {number}*/ v_3 = this.c;
                // deno-lint-ignore no-unused-labels
                lab6: {
                    this.bra = this.c;
                    if (!(this.eq_s("y"))) break lab6;
                    this.ket = this.c;
                    this.slice_from("Y");
                    B_Y_found = true;
                }
                this.c = v_3;
                const /**@type {number}*/ v_4 = this.c;
                // deno-lint-ignore no-unused-labels
                lab7: {
                    while (true) {
                        const /**@type {number}*/ v_5 = this.c;
                        // deno-lint-ignore no-unused-labels
                        lab8: {
                            // deno-lint-ignore no-unused-labels
                            golab9: while (true)
                            {
                                const /**@type {number}*/ v_6 = this.c;
                                // deno-lint-ignore no-unused-labels
                                lab10: {
                                    if (!(this.in_grouping(g_v, 97, 121))) break lab10;
                                    this.bra = this.c;
                                    if (!(this.eq_s("y"))) break lab10;
                                    this.ket = this.c;
                                    this.c = v_6;
                                    break golab9;
                                }
                                this.c = v_6;
                                if (this.c >= this.limit) break lab8;
                                this.c++;
                            }
                            this.slice_from("Y");
                            B_Y_found = true;
                            continue;
                        }
                        this.c = v_5;
                        break;
                    }
                }
                this.c = v_4;
            }
            // deno-lint-ignore no-unused-labels
            lab11: {
                I_p1 = this.limit;
                I_p2 = this.limit;
                const /**@type {number}*/ v_7 = this.c;
                // deno-lint-ignore no-unused-labels
                lab12: {
                    // deno-lint-ignore no-unused-labels
                    lab13: {
                        const /**@type {number}*/ v_8 = this.c;
                        // deno-lint-ignore no-unused-labels
                        lab14: {
                            if (this.find_among(a_0) === 0) break lab14;
                            break lab13;
                        }
                        this.c = v_8;
                        if (!this.go_out_grouping(g_v, 97, 121)) break lab12;
                        this.c++;
                        if (!this.go_in_grouping(g_v, 97, 121)) break lab12;
                        this.c++;
                    }
                    I_p1 = this.c;
                    if (!this.go_out_grouping(g_v, 97, 121)) break lab12;
                    this.c++;
                    if (!this.go_in_grouping(g_v, 97, 121)) break lab12;
                    this.c++;
                    I_p2 = this.c;
                }
                this.c = v_7;
            }
            this.limit_backward = this.c; this.c = this.limit;
            const /**@type {number}*/ v_9 = this.limit - this.c;
            // deno-lint-ignore no-unused-labels
            lab15: {
                const /**@type {number}*/ v_10 = this.limit - this.c;
                // deno-lint-ignore no-unused-labels
                lab16: {
                    this.ket = this.c;
                    if (this.find_among_b(a_1) === 0) {
                        this.c = this.limit - v_10;
                        break lab16;
                    }
                    this.bra = this.c;
                    this.slice_del();
                }
                this.ket = this.c;
                a = this.find_among_b(a_2);
                if (a === 0) break lab15;
                this.bra = this.c;
                switch (a) {
                    case 1: {
                        this.slice_from("ss");
                        break;
                    }
                    case 2: {
                        // deno-lint-ignore no-unused-labels
                        lab17: {
                            const /**@type {number}*/ v_11 = this.limit - this.c;
                            // deno-lint-ignore no-unused-labels
                            lab18: {
                                if (this.c - 2 < this.limit_backward) break lab18;
                                this.c -= 2;
                                this.slice_from("i");
                                break lab17;
                            }
                            this.c = this.limit - v_11;
                            this.slice_from("ie");
                        }
                        break;
                    }
                    case 3: {
                        if (this.c <= this.limit_backward) break lab15;
                        this.c--;
                        if (!this.go_out_grouping_b(g_v, 97, 121)) break lab15;
                        this.c--;
                        this.slice_del();
                        break;
                    }
                }
            }
            this.c = this.limit - v_9;
            const /**@type {number}*/ v_12 = this.limit - this.c;
            // deno-lint-ignore no-unused-labels
            lab19: {
                this.ket = this.c;
                a = this.find_among_b(a_5);
                this.bra = this.c;
                // deno-lint-ignore no-unused-labels
                lab20: {
                    const /**@type {number}*/ v_13 = this.limit - this.c;
                    // deno-lint-ignore no-unused-labels
                    lab21: {
                        switch (a) {
                            case 1: {
                                const /**@type {number}*/ v_14 = this.limit - this.c;
                                // deno-lint-ignore no-unused-labels
                                lab22: {
                                    if (/**@type {boolean}*/(I_p1 > this.c)) break lab22;
                                    // deno-lint-ignore no-unused-labels
                                    lab23: {
                                        const /**@type {number}*/ v_15 = this.limit - this.c;
                                        // deno-lint-ignore no-unused-labels
                                        lab24: {
                                            if (this.find_among_b(a_3) === 0) break lab24;
                                            if (/**@type {boolean}*/(this.c > this.limit_backward)) break lab24;
                                            break lab23;
                                        }
                                        this.c = this.limit - v_15;
                                        this.slice_from("ee");
                                    }
                                }
                                this.c = this.limit - v_14;
                                break;
                            }
                            case 2: {
                                break lab21;
                            }
                            case 3: {
                                a = this.find_among_b(a_4);
                                if (a === 0) break lab21;
                                switch (a) {
                                    case 1: {
                                        const /**@type {number}*/ v_16 = this.limit - this.c;
                                        if (!(this.out_grouping_b(g_v, 97, 121))) break lab21;
                                        if (/**@type {boolean}*/(this.c > this.limit_backward)) break lab21;
                                        this.c = this.limit - v_16;
                                        this.bra = this.c;
                                        this.slice_from("ie");
                                        break;
                                    }
                                    case 2: {
                                        if (/**@type {boolean}*/(this.c > this.limit_backward)) break lab21;
                                        break;
                                    }
                                }
                                break;
                            }
                        }
                        break lab20;
                    }
                    this.c = this.limit - v_13;
                    const /**@type {number}*/ v_17 = this.limit - this.c;
                    if (!this.go_out_grouping_b(g_v, 97, 121)) break lab19;
                    this.c--;
                    this.c = this.limit - v_17;
                    this.slice_del();
                    this.ket = this.c;
                    this.bra = this.c;
                    const /**@type {number}*/ v_18 = this.limit - this.c;
                    a = this.find_among_b(a_6);
                    switch (a) {
                        case 1: {
                            this.slice_from("e");
                            break lab19;
                        }
                        case 2: {
                            {
                                const /**@type {number}*/ v_19 = this.limit - this.c;
                                // deno-lint-ignore no-unused-labels
                                lab25: {
                                    if (!(this.in_grouping_b(g_aeo, 97, 111))) break lab25;
                                    if (/**@type {boolean}*/(this.c > this.limit_backward)) break lab25;
                                    break lab19;
                                }
                                this.c = this.limit - v_19;
                            }
                            break;
                        }
                        case 3: {
                            if (/**@type {boolean}*/(this.c !== I_p1)) break lab19;
                            const /**@type {number}*/ v_20 = this.limit - this.c;
                            if (!this.#r_shortv()) break lab19;
                            this.c = this.limit - v_20;
                            this.slice_from("e");
                            break lab19;
                        }
                    }
                    this.c = this.limit - v_18;
                    this.ket = this.c;
                    if (this.c <= this.limit_backward) break lab19;
                    this.c--;
                    this.bra = this.c;
                    this.slice_del();
                }
            }
            this.c = this.limit - v_12;
            const /**@type {number}*/ v_21 = this.limit - this.c;
            // deno-lint-ignore no-unused-labels
            lab26: {
                this.ket = this.c;
                // deno-lint-ignore no-unused-labels
                lab27: {
                    // deno-lint-ignore no-unused-labels
                    lab28: {
                        if (!(this.eq_s_b("y"))) break lab28;
                        break lab27;
                    }
                    if (!(this.eq_s_b("Y"))) break lab26;
                }
                this.bra = this.c;
                if (!(this.out_grouping_b(g_v, 97, 121))) break lab26;
                if (/**@type {boolean}*/(this.c <= this.limit_backward)) break lab26;
                this.slice_from("i");
            }
            this.c = this.limit - v_21;
            const /**@type {number}*/ v_22 = this.limit - this.c;
            // deno-lint-ignore no-unused-labels
            lab29: {
                this.ket = this.c;
                a = this.find_among_b(a_7);
                if (a === 0) break lab29;
                this.bra = this.c;
                if (/**@type {boolean}*/(I_p1 > this.c)) break lab29;
                switch (a) {
                    case 1: {
                        this.slice_from("tion");
                        break;
                    }
                    case 2: {
                        this.slice_from("ence");
                        break;
                    }
                    case 3: {
                        this.slice_from("ance");
                        break;
                    }
                    case 4: {
                        this.slice_from("able");
                        break;
                    }
                    case 5: {
                        this.slice_from("ent");
                        break;
                    }
                    case 6: {
                        this.slice_from("ize");
                        break;
                    }
                    case 7: {
                        this.slice_from("ate");
                        break;
                    }
                    case 8: {
                        this.slice_from("al");
                        break;
                    }
                    case 9: {
                        this.slice_from("ful");
                        break;
                    }
                    case 10: {
                        this.slice_from("ous");
                        break;
                    }
                    case 11: {
                        this.slice_from("ive");
                        break;
                    }
                    case 12: {
                        this.slice_from("ble");
                        break;
                    }
                    case 13: {
                        this.slice_from("og");
                        break;
                    }
                    case 14: {
                        if (!(this.eq_s_b("l"))) break lab29;
                        this.slice_from("og");
                        break;
                    }
                    case 15: {
                        this.slice_from("less");
                        break;
                    }
                    case 16: {
                        if (!(this.in_grouping_b(g_valid_LI, 99, 116))) break lab29;
                        this.slice_del();
                        break;
                    }
                }
            }
            this.c = this.limit - v_22;
            const /**@type {number}*/ v_23 = this.limit - this.c;
            // deno-lint-ignore no-unused-labels
            lab30: {
                this.ket = this.c;
                a = this.find_among_b(a_8);
                if (a === 0) break lab30;
                this.bra = this.c;
                if (/**@type {boolean}*/(I_p1 > this.c)) break lab30;
                switch (a) {
                    case 1: {
                        this.slice_from("tion");
                        break;
                    }
                    case 2: {
                        this.slice_from("ate");
                        break;
                    }
                    case 3: {
                        this.slice_from("al");
                        break;
                    }
                    case 4: {
                        this.slice_from("ic");
                        break;
                    }
                    case 5: {
                        this.slice_del();
                        break;
                    }
                    case 6: {
                        if (/**@type {boolean}*/(I_p2 > this.c)) break lab30;
                        this.slice_del();
                        break;
                    }
                }
            }
            this.c = this.limit - v_23;
            const /**@type {number}*/ v_24 = this.limit - this.c;
            // deno-lint-ignore no-unused-labels
            lab31: {
                this.ket = this.c;
                a = this.find_among_b(a_9);
                if (a === 0) break lab31;
                this.bra = this.c;
                if (/**@type {boolean}*/(I_p2 > this.c)) break lab31;
                switch (a) {
                    case 1: {
                        this.slice_del();
                        break;
                    }
                    case 2: {
                        // deno-lint-ignore no-unused-labels
                        lab32: {
                            // deno-lint-ignore no-unused-labels
                            lab33: {
                                if (!(this.eq_s_b("s"))) break lab33;
                                break lab32;
                            }
                            if (!(this.eq_s_b("t"))) break lab31;
                        }
                        this.slice_del();
                        break;
                    }
                }
            }
            this.c = this.limit - v_24;
            const /**@type {number}*/ v_25 = this.limit - this.c;
            // deno-lint-ignore no-unused-labels
            lab34: {
                this.ket = this.c;
                a = this.find_among_b(a_10);
                if (a === 0) break lab34;
                this.bra = this.c;
                switch (a) {
                    case 1: {
                        // deno-lint-ignore no-unused-labels
                        lab35: {
                            // deno-lint-ignore no-unused-labels
                            lab36: {
                                if (/**@type {boolean}*/(I_p2 > this.c)) break lab36;
                                break lab35;
                            }
                            if (/**@type {boolean}*/(I_p1 > this.c)) break lab34;
                            {
                                const /**@type {number}*/ v_26 = this.limit - this.c;
                                // deno-lint-ignore no-unused-labels
                                lab37: {
                                    if (!this.#r_shortv()) break lab37;
                                    break lab34;
                                }
                                this.c = this.limit - v_26;
                            }
                        }
                        this.slice_del();
                        break;
                    }
                    case 2: {
                        if (/**@type {boolean}*/(I_p2 > this.c)) break lab34;
                        if (!(this.eq_s_b("l"))) break lab34;
                        this.slice_del();
                        break;
                    }
                }
            }
            this.c = this.limit - v_25;
            this.c = this.limit_backward;
            const /**@type {number}*/ v_27 = this.c;
            // deno-lint-ignore no-unused-labels
            lab38: {
                if (!B_Y_found) break lab38;
                while (true) {
                    const /**@type {number}*/ v_28 = this.c;
                    // deno-lint-ignore no-unused-labels
                    lab39: {
                        // deno-lint-ignore no-unused-labels
                        golab40: while (true)
                        {
                            const /**@type {number}*/ v_29 = this.c;
                            // deno-lint-ignore no-unused-labels
                            lab41: {
                                this.bra = this.c;
                                if (!(this.eq_s("Y"))) break lab41;
                                this.ket = this.c;
                                this.c = v_29;
                                break golab40;
                            }
                            this.c = v_29;
                            if (this.c >= this.limit) break lab39;
                            this.c++;
                        }
                        this.slice_from("y");
                        continue;
                    }
                    this.c = v_28;
                    break;
                }
            }
            this.c = v_27;
        }
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

