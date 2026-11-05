// Generated from norwegian.sbl by Snowball 3.2.0 - https://snowballstem.org/

// deno-lint-ignore-file ban-unused-ignore no-constant-condition no-empty prefer-const

const a_0 = [
    ["", 1],
    ["ind", -1, 1],
    ["kk", -1, 2],
    ["nk", -1, 3],
    ["amm", -1, 4],
    ["omm", -1, 5],
    ["kap", -1, 6],
    ["skap", 1, 1],
    ["pp", -1, 8],
    ["lt", -1, 9],
    ["ast", -1, 10],
    ["\u00F8st", -1, 11],
    ["v", -1, 12],
    ["hav", 1, 1],
    ["giv", 1, 2]
];

const a_1 = [
    ["a", 1],
    ["e", 1],
    ["ede", 1, 1],
    ["ande", 1, 2],
    ["ende", 1, 3],
    ["ane", 1, 4],
    ["ene", 1, 5],
    ["hetene", 1, 1],
    ["erte", 4, 7],
    ["en", 1],
    ["heten", 1, 1],
    ["ar", 1],
    ["er", 1],
    ["heter", 1, 1],
    ["s", 3],
    ["as", 1, 1],
    ["es", 1, 2],
    ["edes", 1, 1],
    ["endes", 1, 2],
    ["enes", 1, 3],
    ["hetenes", 1, 1],
    ["ens", 1, 7],
    ["hetens", 1, 1],
    ["ers", 2, 9],
    ["ets", 1, 10],
    ["et", 1],
    ["het", 1, 1],
    ["ert", 4],
    ["ast", 1]
];

const a_2 = [
    ["dt", -1],
    ["vt", -1]
];

const a_3 = [
    ["leg", 1],
    ["eleg", 1, 1],
    ["ig", 1],
    ["eig", 1, 1],
    ["lig", 1, 2],
    ["elig", 1, 1],
    ["els", 1],
    ["lov", 1],
    ["elov", 1, 1],
    ["slov", 1, 2],
    ["hetslov", 1, 1]
];

const /**@type {Array<number>}*/ g_v = [17, 65, 16, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 48, 2, 142];

const /**@type {Array<number>}*/ g_s_ending = [119, 125, 148, 1];

import B from './base-stemmer.js'

export default class extends B {


    /** @return {boolean} */
    #stem() {
        let /**@type {number}*/ a;
        let /**@type {number}*/ I_p1;
        I_p1 = this.limit;
        const /**@type {number}*/ v_1 = this.c;
        // deno-lint-ignore no-unused-labels
        lab0: {
            // deno-lint-ignore no-unused-labels
            lab1: {
                const /**@type {number}*/ v_2 = this.c;
                // deno-lint-ignore no-unused-labels
                lab2: {
                    // deno-lint-ignore no-unused-labels
                    golab3: while (true)
                    {
                        // deno-lint-ignore no-unused-labels
                        lab4: {
                            if (!(this.eq_s("'"))) break lab4;
                            break golab3;
                        }
                        if (this.c >= this.limit) break lab2;
                        this.c++;
                    }
                    break lab1;
                }
                this.c = v_2;
                if (!this.go_out_grouping(g_v, 97, 248)) break lab0;
                this.c++;
                if (!this.go_in_grouping(g_v, 97, 248)) break lab0;
                this.c++;
            }
            I_p1 = this.c;
        }
        this.c = v_1;
        const /**@type {number}*/ v_3 = this.c;
        if (this.c + 3 > this.limit) return false;
        this.c += 3;
        // deno-lint-ignore no-unused-labels
        lab5: {
            if (/**@type {boolean}*/(I_p1 >= this.c)) break lab5;
            I_p1 = this.c;
        }
        this.c = v_3;
        this.limit_backward = this.c; this.c = this.limit;
        const /**@type {number}*/ v_4 = this.limit - this.c;
        // deno-lint-ignore no-unused-labels
        lab6: {
            if (this.c < I_p1) break lab6;
            const /**@type {number}*/ v_5 = this.limit_backward;
            this.limit_backward = I_p1;
            this.ket = this.c;
            a = this.find_among_b(a_1);
            if (a === 0) {
                this.limit_backward = v_5;
                break lab6;
            }
            this.bra = this.c;
            this.limit_backward = v_5;
            switch (a) {
                case 1: {
                    this.slice_del();
                    break;
                }
                case 2: {
                    a = this.find_among_b(a_0);
                    switch (a) {
                        case 1: {
                            this.slice_del();
                            break;
                        }
                    }
                    break;
                }
                case 3: {
                    // deno-lint-ignore no-unused-labels
                    lab7: {
                        const /**@type {number}*/ v_6 = this.limit - this.c;
                        // deno-lint-ignore no-unused-labels
                        lab8: {
                            if (!(this.in_grouping_b(g_s_ending, 98, 122))) break lab8;
                            break lab7;
                        }
                        this.c = this.limit - v_6;
                        // deno-lint-ignore no-unused-labels
                        lab9: {
                            if (!(this.eq_s_b("r"))) break lab9;
                            // deno-lint-ignore no-unused-labels
                            lab10: {
                                if (!(this.eq_s_b("e"))) break lab10;
                                break lab9;
                            }
                            break lab7;
                        }
                        this.c = this.limit - v_6;
                        if (!(this.eq_s_b("k"))) break lab6;
                        if (!(this.out_grouping_b(g_v, 97, 248))) break lab6;
                    }
                    this.slice_del();
                    break;
                }
                case 4: {
                    this.slice_from("er");
                    break;
                }
            }
        }
        this.c = this.limit - v_4;
        const /**@type {number}*/ v_7 = this.limit - this.c;
        // deno-lint-ignore no-unused-labels
        lab11: {
            const /**@type {number}*/ v_8 = this.limit - this.c;
            if (this.c < I_p1) break lab11;
            const /**@type {number}*/ v_9 = this.limit_backward;
            this.limit_backward = I_p1;
            this.ket = this.c;
            if (this.find_among_b(a_2) === 0) {
                this.limit_backward = v_9;
                break lab11;
            }
            this.bra = this.c;
            this.limit_backward = v_9;
            this.c = this.limit - v_8;
            if (this.c <= this.limit_backward) break lab11;
            this.c--;
            this.bra = this.c;
            this.slice_del();
        }
        this.c = this.limit - v_7;
        const /**@type {number}*/ v_10 = this.limit - this.c;
        // deno-lint-ignore no-unused-labels
        lab12: {
            if (this.c < I_p1) break lab12;
            const /**@type {number}*/ v_11 = this.limit_backward;
            this.limit_backward = I_p1;
            this.ket = this.c;
            if (this.find_among_b(a_3) === 0) {
                this.limit_backward = v_11;
                break lab12;
            }
            this.bra = this.c;
            this.limit_backward = v_11;
            this.slice_del();
        }
        this.c = this.limit - v_10;
        this.ket = this.c;
        if (!(this.eq_s_b("'"))) return false;
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

