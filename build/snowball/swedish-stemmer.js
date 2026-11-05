// Generated from swedish.sbl by Snowball 3.2.0 - https://snowballstem.org/

// deno-lint-ignore-file ban-unused-ignore no-constant-condition no-empty prefer-const

const a_0 = [
    ["fab", -1],
    ["h", -1],
    ["pak", -1],
    ["rak", -1],
    ["stak", -1],
    ["kom", -1],
    ["iet", -1],
    ["cit", -1],
    ["dit", -1],
    ["alit", -1],
    ["ilit", -1],
    ["mit", -1],
    ["nit", -1],
    ["pit", -1],
    ["rit", -1],
    ["sit", -1],
    ["tit", -1],
    ["uit", -1],
    ["ivit", -1],
    ["kvit", -1],
    ["xit", -1]
];

const a_1 = [
    ["a", 1],
    ["arna", 1, 1],
    ["erna", 1, 2],
    ["heterna", 1, 1],
    ["orna", 1, 4],
    ["ad", 1],
    ["e", 1],
    ["ade", 1, 1],
    ["ande", 1, 2],
    ["arne", 1, 3],
    ["are", 1, 4],
    ["aste", 1, 5],
    ["en", 1],
    ["anden", 1, 1],
    ["aren", 1, 2],
    ["heten", 1, 3],
    ["ern", 1],
    ["ar", 1],
    ["er", 1],
    ["heter", 1, 1],
    ["or", 1],
    ["s", 2],
    ["as", 1, 1],
    ["arnas", 1, 1],
    ["ernas", 1, 2],
    ["ornas", 1, 3],
    ["es", 1, 5],
    ["ades", 1, 1],
    ["andes", 1, 2],
    ["ens", 1, 8],
    ["arens", 1, 1],
    ["hetens", 1, 2],
    ["erns", 1, 11],
    ["at", 1],
    ["et", 3],
    ["andet", 1, 1],
    ["het", 1, 2],
    ["ast", 1]
];

const a_2 = [
    ["dd", -1],
    ["gd", -1],
    ["nn", -1],
    ["dt", -1],
    ["gt", -1],
    ["kt", -1],
    ["tt", -1]
];

const a_3 = [
    ["ig", 1],
    ["lig", 1, 1],
    ["els", 1],
    ["fullt", 3],
    ["\u00F6st", 2]
];

const /**@type {Array<number>}*/ g_v = [17, 65, 16, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 0, 32];

const /**@type {Array<number>}*/ g_s_ending = [119, 127, 149];

const /**@type {Array<number>}*/ g_ost_ending = [173, 58];

import B from './base-stemmer.js'

export default class extends B {


    /** @return {boolean} */
    #r_et_condition() {
        const /**@type {number}*/ v_1 = this.limit - this.c;
        if (!(this.out_grouping_b(g_v, 97, 246))) return false;
        if (!(this.in_grouping_b(g_v, 97, 246))) return false;
        if (/**@type {boolean}*/(this.c <= this.limit_backward)) return false;
        this.c = this.limit - v_1;
        {
            const /**@type {number}*/ v_2 = this.limit - this.c;
            // deno-lint-ignore no-unused-labels
            lab0: {
                if (this.find_among_b(a_0) === 0) break lab0;
                return false;
            }
            this.c = this.limit - v_2;
        }
        return true;
    }

    /** @return {boolean} */
    #stem() {
        let /**@type {number}*/ a;
        let /**@type {number}*/ I_x;
        let /**@type {number}*/ I_p1;
        const /**@type {number}*/ v_1 = this.c;
        // deno-lint-ignore no-unused-labels
        lab0: {
            I_p1 = this.limit;
            const /**@type {number}*/ v_2 = this.c;
            if (this.c + 3 > this.limit) break lab0;
            this.c += 3;
            I_x = this.c;
            this.c = v_2;
            if (!this.go_out_grouping(g_v, 97, 246)) break lab0;
            this.c++;
            if (!this.go_in_grouping(g_v, 97, 246)) break lab0;
            this.c++;
            I_p1 = this.c;
            // deno-lint-ignore no-unused-labels
            lab1: {
                if (/**@type {boolean}*/(I_p1 >= I_x)) break lab1;
                I_p1 = I_x;
            }
        }
        this.c = v_1;
        this.limit_backward = this.c; this.c = this.limit;
        const /**@type {number}*/ v_3 = this.limit - this.c;
        // deno-lint-ignore no-unused-labels
        lab2: {
            if (this.c < I_p1) break lab2;
            const /**@type {number}*/ v_4 = this.limit_backward;
            this.limit_backward = I_p1;
            this.ket = this.c;
            a = this.find_among_b(a_1);
            if (a === 0) {
                this.limit_backward = v_4;
                break lab2;
            }
            this.bra = this.c;
            this.limit_backward = v_4;
            switch (a) {
                case 1: {
                    this.slice_del();
                    break;
                }
                case 2: {
                    // deno-lint-ignore no-unused-labels
                    lab3: {
                        const /**@type {number}*/ v_5 = this.limit - this.c;
                        // deno-lint-ignore no-unused-labels
                        lab4: {
                            if (!(this.eq_s_b("et"))) break lab4;
                            if (!this.#r_et_condition()) break lab4;
                            this.bra = this.c;
                            break lab3;
                        }
                        this.c = this.limit - v_5;
                        if (!(this.in_grouping_b(g_s_ending, 98, 121))) break lab2;
                    }
                    this.slice_del();
                    break;
                }
                case 3: {
                    if (!this.#r_et_condition()) break lab2;
                    this.slice_del();
                    break;
                }
            }
        }
        this.c = this.limit - v_3;
        const /**@type {number}*/ v_6 = this.limit - this.c;
        // deno-lint-ignore no-unused-labels
        lab5: {
            if (this.c < I_p1) break lab5;
            const /**@type {number}*/ v_7 = this.limit_backward;
            this.limit_backward = I_p1;
            const /**@type {number}*/ v_8 = this.limit - this.c;
            if (this.find_among_b(a_2) === 0) {
                this.limit_backward = v_7;
                break lab5;
            }
            this.c = this.limit - v_8;
            this.ket = this.c;
            if (this.c <= this.limit_backward) {
                this.limit_backward = v_7;
                break lab5;
            }
            this.c--;
            this.bra = this.c;
            this.slice_del();
            this.limit_backward = v_7;
        }
        this.c = this.limit - v_6;
        const /**@type {number}*/ v_9 = this.limit - this.c;
        // deno-lint-ignore no-unused-labels
        lab6: {
            if (this.c < I_p1) break lab6;
            const /**@type {number}*/ v_10 = this.limit_backward;
            this.limit_backward = I_p1;
            this.ket = this.c;
            a = this.find_among_b(a_3);
            if (a === 0) {
                this.limit_backward = v_10;
                break lab6;
            }
            this.bra = this.c;
            this.limit_backward = v_10;
            switch (a) {
                case 1: {
                    this.slice_del();
                    break;
                }
                case 2: {
                    if (!(this.in_grouping_b(g_ost_ending, 105, 118))) break lab6;
                    this.slice_from("\u00F6s");
                    break;
                }
                case 3: {
                    this.slice_from("full");
                    break;
                }
            }
        }
        this.c = this.limit - v_9;
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

