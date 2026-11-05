// Generated from german.sbl by Snowball 3.2.0 - https://snowballstem.org/

// deno-lint-ignore-file ban-unused-ignore no-constant-condition no-empty prefer-const

const a_0 = [
    ["", 5],
    ["ae", 2, 1],
    ["oe", 3, 2],
    ["qu", -1, 3],
    ["ue", 4, 4],
    ["\u00DF", 1, 5]
];

const a_1 = [
    ["", 5],
    ["U", 2, 1],
    ["Y", 1, 2],
    ["\u00E4", 3, 3],
    ["\u00F6", 4, 4],
    ["\u00FC", 2, 5]
];

const a_2 = [
    ["e", 3],
    ["em", 1],
    ["en", 3],
    ["erinnen", 2, 1],
    ["erin", 2],
    ["ln", 5],
    ["ern", 2],
    ["er", 2],
    ["s", 4],
    ["es", 3, 1],
    ["lns", 5, 2]
];

const a_3 = [
    ["tick", -1],
    ["plan", -1],
    ["geordn", -1],
    ["intern", -1],
    ["tr", -1]
];

const a_4 = [
    ["en", 1],
    ["er", 1],
    ["et", 3],
    ["st", 2],
    ["est", 1, 1]
];

const a_5 = [
    ["ig", 1],
    ["lich", 1]
];

const a_6 = [
    ["end", 1],
    ["ig", 2],
    ["ung", 1],
    ["lich", 3],
    ["isch", 2],
    ["ik", 2],
    ["heit", 3],
    ["keit", 4]
];

const a_7 = [
    ["'", 1],
    ["'sch", 1],
    ["'s", 1]
];

const /**@type {Array<number>}*/ g_v = [17, 65, 16, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 32, 8];

const /**@type {Array<number>}*/ g_et_ending = [1, 128, 198, 227, 32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128];

const /**@type {Array<number>}*/ g_s_ending = [117, 30, 5];

const /**@type {Array<number>}*/ g_st_ending = [117, 30, 4];

import B from './base-stemmer.js'

export default class extends B {


    /** @return {boolean} */
    #stem() {
        let /**@type {number}*/ a;
        let /**@type {number}*/ I_x;
        let /**@type {number}*/ I_p2;
        let /**@type {number}*/ I_p1;
        const /**@type {number}*/ v_1 = this.c;
        // deno-lint-ignore no-unused-labels
        lab0: {
            const /**@type {number}*/ v_2 = this.c;
            while (true) {
                const /**@type {number}*/ v_3 = this.c;
                // deno-lint-ignore no-unused-labels
                lab1: {
                    // deno-lint-ignore no-unused-labels
                    golab2: while (true)
                    {
                        const /**@type {number}*/ v_4 = this.c;
                        // deno-lint-ignore no-unused-labels
                        lab3: {
                            if (!(this.in_grouping(g_v, 97, 252))) break lab3;
                            this.bra = this.c;
                            // deno-lint-ignore no-unused-labels
                            lab4: {
                                const /**@type {number}*/ v_5 = this.c;
                                // deno-lint-ignore no-unused-labels
                                lab5: {
                                    if (!(this.eq_s("u"))) break lab5;
                                    this.ket = this.c;
                                    if (!(this.in_grouping(g_v, 97, 252))) break lab5;
                                    this.slice_from("U");
                                    break lab4;
                                }
                                this.c = v_5;
                                if (!(this.eq_s("y"))) break lab3;
                                this.ket = this.c;
                                if (!(this.in_grouping(g_v, 97, 252))) break lab3;
                                this.slice_from("Y");
                            }
                            this.c = v_4;
                            break golab2;
                        }
                        this.c = v_4;
                        if (this.c >= this.limit) break lab1;
                        this.c++;
                    }
                    continue;
                }
                this.c = v_3;
                break;
            }
            this.c = v_2;
            while (true) {
                const /**@type {number}*/ v_6 = this.c;
                // deno-lint-ignore no-unused-labels
                lab6: {
                    this.bra = this.c;
                    a = this.find_among(a_0);
                    this.ket = this.c;
                    switch (a) {
                        case 1: {
                            this.slice_from("ss");
                            break;
                        }
                        case 2: {
                            this.slice_from("\u00E4");
                            break;
                        }
                        case 3: {
                            this.slice_from("\u00F6");
                            break;
                        }
                        case 4: {
                            this.slice_from("\u00FC");
                            break;
                        }
                        case 5: {
                            if (this.c >= this.limit) break lab6;
                            this.c++;
                            break;
                        }
                    }
                    continue;
                }
                this.c = v_6;
                break;
            }
        }
        this.c = v_1;
        const /**@type {number}*/ v_7 = this.c;
        // deno-lint-ignore no-unused-labels
        lab7: {
            I_p1 = this.limit;
            I_p2 = this.limit;
            const /**@type {number}*/ v_8 = this.c;
            if (this.c + 3 > this.limit) break lab7;
            this.c += 3;
            I_x = this.c;
            this.c = v_8;
            if (!this.go_out_grouping(g_v, 97, 252)) break lab7;
            this.c++;
            if (!this.go_in_grouping(g_v, 97, 252)) break lab7;
            this.c++;
            I_p1 = this.c;
            // deno-lint-ignore no-unused-labels
            lab8: {
                if (/**@type {boolean}*/(I_p1 >= I_x)) break lab8;
                I_p1 = I_x;
            }
            if (!this.go_out_grouping(g_v, 97, 252)) break lab7;
            this.c++;
            if (!this.go_in_grouping(g_v, 97, 252)) break lab7;
            this.c++;
            I_p2 = this.c;
        }
        this.c = v_7;
        this.limit_backward = this.c; this.c = this.limit;
        // deno-lint-ignore no-unused-labels
        lab9: {
            const /**@type {number}*/ v_9 = this.limit - this.c;
            // deno-lint-ignore no-unused-labels
            lab10: {
                this.ket = this.c;
                a = this.find_among_b(a_2);
                if (a === 0) break lab10;
                this.bra = this.c;
                if (/**@type {boolean}*/(I_p1 > this.c)) break lab10;
                switch (a) {
                    case 1: {
                        // deno-lint-ignore no-unused-labels
                        lab11: {
                            if (!(this.eq_s_b("syst"))) break lab11;
                            break lab10;
                        }
                        this.slice_del();
                        break;
                    }
                    case 2: {
                        this.slice_del();
                        break;
                    }
                    case 3: {
                        this.slice_del();
                        const /**@type {number}*/ v_10 = this.limit - this.c;
                        // deno-lint-ignore no-unused-labels
                        lab12: {
                            this.ket = this.c;
                            if (!(this.eq_s_b("s"))) {
                                this.c = this.limit - v_10;
                                break lab12;
                            }
                            this.bra = this.c;
                            if (!(this.eq_s_b("nis"))) {
                                this.c = this.limit - v_10;
                                break lab12;
                            }
                            this.slice_del();
                        }
                        break;
                    }
                    case 4: {
                        if (!(this.in_grouping_b(g_s_ending, 98, 116))) break lab10;
                        this.slice_del();
                        break;
                    }
                    case 5: {
                        this.slice_from("l");
                        break;
                    }
                }
            }
            this.c = this.limit - v_9;
            const /**@type {number}*/ v_11 = this.limit - this.c;
            // deno-lint-ignore no-unused-labels
            lab13: {
                this.ket = this.c;
                a = this.find_among_b(a_4);
                if (a === 0) break lab13;
                this.bra = this.c;
                if (/**@type {boolean}*/(I_p1 > this.c)) break lab13;
                switch (a) {
                    case 1: {
                        this.slice_del();
                        break;
                    }
                    case 2: {
                        if (!(this.in_grouping_b(g_st_ending, 98, 116))) break lab13;
                        if (this.c - 3 < this.limit_backward) break lab13;
                        this.c -= 3;
                        this.slice_del();
                        break;
                    }
                    case 3: {
                        const /**@type {number}*/ v_12 = this.limit - this.c;
                        if (!(this.in_grouping_b(g_et_ending, 85, 228))) break lab13;
                        this.c = this.limit - v_12;
                        {
                            const /**@type {number}*/ v_13 = this.limit - this.c;
                            // deno-lint-ignore no-unused-labels
                            lab14: {
                                if (this.find_among_b(a_3) === 0) break lab14;
                                break lab13;
                            }
                            this.c = this.limit - v_13;
                        }
                        this.slice_del();
                        break;
                    }
                }
            }
            this.c = this.limit - v_11;
            const /**@type {number}*/ v_14 = this.limit - this.c;
            // deno-lint-ignore no-unused-labels
            lab15: {
                this.ket = this.c;
                a = this.find_among_b(a_6);
                if (a === 0) break lab15;
                this.bra = this.c;
                if (/**@type {boolean}*/(I_p2 > this.c)) break lab15;
                switch (a) {
                    case 1: {
                        this.slice_del();
                        const /**@type {number}*/ v_15 = this.limit - this.c;
                        // deno-lint-ignore no-unused-labels
                        lab16: {
                            this.ket = this.c;
                            if (!(this.eq_s_b("ig"))) {
                                this.c = this.limit - v_15;
                                break lab16;
                            }
                            this.bra = this.c;
                            // deno-lint-ignore no-unused-labels
                            lab17: {
                                if (!(this.eq_s_b("e"))) break lab17;
                                this.c = this.limit - v_15;
                                break lab16;
                            }
                            if (/**@type {boolean}*/(I_p2 > this.c)) {
                                this.c = this.limit - v_15;
                                break lab16;
                            }
                            this.slice_del();
                        }
                        break;
                    }
                    case 2: {
                        // deno-lint-ignore no-unused-labels
                        lab18: {
                            if (!(this.eq_s_b("e"))) break lab18;
                            break lab15;
                        }
                        this.slice_del();
                        break;
                    }
                    case 3: {
                        this.slice_del();
                        const /**@type {number}*/ v_16 = this.limit - this.c;
                        // deno-lint-ignore no-unused-labels
                        lab19: {
                            this.ket = this.c;
                            // deno-lint-ignore no-unused-labels
                            lab20: {
                                // deno-lint-ignore no-unused-labels
                                lab21: {
                                    if (!(this.eq_s_b("er"))) break lab21;
                                    break lab20;
                                }
                                if (!(this.eq_s_b("en"))) {
                                    this.c = this.limit - v_16;
                                    break lab19;
                                }
                            }
                            this.bra = this.c;
                            if (/**@type {boolean}*/(I_p1 > this.c)) {
                                this.c = this.limit - v_16;
                                break lab19;
                            }
                            this.slice_del();
                        }
                        break;
                    }
                    case 4: {
                        this.slice_del();
                        const /**@type {number}*/ v_17 = this.limit - this.c;
                        // deno-lint-ignore no-unused-labels
                        lab22: {
                            this.ket = this.c;
                            if (this.find_among_b(a_5) === 0) {
                                this.c = this.limit - v_17;
                                break lab22;
                            }
                            this.bra = this.c;
                            if (/**@type {boolean}*/(I_p2 > this.c)) {
                                this.c = this.limit - v_17;
                                break lab22;
                            }
                            this.slice_del();
                        }
                        break;
                    }
                }
            }
            this.c = this.limit - v_14;
            const /**@type {number}*/ v_18 = this.limit - this.c;
            // deno-lint-ignore no-unused-labels
            lab23: {
                this.ket = this.c;
                if (this.find_among_b(a_7) === 0) break lab23;
                this.bra = this.c;
                if (this.c <= this.limit_backward) break lab23;
                this.c--;
                if (/**@type {boolean}*/(this.c <= this.limit_backward)) break lab23;
                this.slice_del();
            }
            this.c = this.limit - v_18;
        }
        this.c = this.limit_backward;
        const /**@type {number}*/ v_19 = this.c;
        // deno-lint-ignore no-unused-labels
        lab24: {
            while (true) {
                const /**@type {number}*/ v_20 = this.c;
                // deno-lint-ignore no-unused-labels
                lab25: {
                    this.bra = this.c;
                    a = this.find_among(a_1);
                    this.ket = this.c;
                    switch (a) {
                        case 1: {
                            this.slice_from("y");
                            break;
                        }
                        case 2: {
                            this.slice_from("u");
                            break;
                        }
                        case 3: {
                            this.slice_from("a");
                            break;
                        }
                        case 4: {
                            this.slice_from("o");
                            break;
                        }
                        case 5: {
                            if (this.c >= this.limit) break lab25;
                            this.c++;
                            break;
                        }
                    }
                    continue;
                }
                this.c = v_20;
                break;
            }
        }
        this.c = v_19;
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

