// Generated from finnish.sbl by Snowball 3.2.0 - https://snowballstem.org/

// deno-lint-ignore-file ban-unused-ignore no-constant-condition no-empty prefer-const

const a_0 = [
    ["pa", 1],
    ["sti", 2],
    ["kaan", 1],
    ["han", 1],
    ["kin", 1],
    ["h\u00E4n", 1],
    ["k\u00E4\u00E4n", 1],
    ["ko", 1],
    ["p\u00E4", 1],
    ["k\u00F6", 1]
];

const a_1 = [
    ["lla", -1],
    ["na", -1],
    ["ssa", -1],
    ["ta", -1],
    ["lta", -1, 1],
    ["sta", -1, 2]
];

const a_2 = [
    ["ll\u00E4", -1],
    ["n\u00E4", -1],
    ["ss\u00E4", -1],
    ["t\u00E4", -1],
    ["lt\u00E4", -1, 1],
    ["st\u00E4", -1, 2]
];

const a_3 = [
    ["lle", -1],
    ["ine", -1]
];

const a_4 = [
    ["nsa", 3],
    ["mme", 3],
    ["nne", 3],
    ["ni", 2],
    ["si", 1],
    ["an", 4],
    ["en", 6],
    ["\u00E4n", 5],
    ["ns\u00E4", 3]
];

const a_5 = [
    ["aa", -1],
    ["ee", -1],
    ["ii", -1],
    ["oo", -1],
    ["uu", -1],
    ["\u00E4\u00E4", -1],
    ["\u00F6\u00F6", -1]
];

const a_6 = [
    ["'", -1],
    ["ai", -1],
    ["ei", -1],
    ["ii", -1],
    ["oi", -1],
    ["ui", -1],
    ["\u00E4i", -1],
    ["\u00F6i", -1]
];

const a_7 = [
    ["a", 2],
    ["lla", -1, 1],
    ["na", -1, 2],
    ["ssa", -1, 3],
    ["ta", -1, 4],
    ["lta", -1, 1],
    ["sta", -1, 2],
    ["tta", 3, 3],
    ["lle", -1],
    ["ine", -1],
    ["ksi", -1],
    ["n", 1],
    ["han", -1, 1, 3],
    ["den", -1, 2, 8],
    ["seen", -1, 3, 9],
    ["hen", -1, 4, 4],
    ["tten", -1, 5, 8],
    ["hin", -1, 6, 5],
    ["siin", -1, 7, 8],
    ["hon", -1, 8, 6],
    ["hun", -1, 9, 7],
    ["h\u00E4n", -1, 10, 1],
    ["h\u00F6n", -1, 11, 2],
    ["\u00E4", 2],
    ["ll\u00E4", -1, 1],
    ["n\u00E4", -1, 2],
    ["ss\u00E4", -1, 3],
    ["t\u00E4", -1, 4],
    ["lt\u00E4", -1, 1],
    ["st\u00E4", -1, 2],
    ["tt\u00E4", 3, 3]
];

const a_8 = [
    ["eja", -1],
    ["mma", 1],
    ["imma", -1, 1],
    ["mpa", 1],
    ["impa", -1, 1],
    ["mmi", 1],
    ["immi", -1, 1],
    ["mpi", 1],
    ["impi", -1, 1],
    ["ej\u00E4", -1],
    ["mm\u00E4", 1],
    ["imm\u00E4", -1, 1],
    ["mp\u00E4", 1],
    ["imp\u00E4", -1, 1]
];

const a_9 = [
    ["i", -1],
    ["j", -1]
];

const a_10 = [
    ["mma", 1],
    ["imma", -1, 1]
];

const /**@type {Array<number>}*/ g_AEI = [17, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8];

const /**@type {Array<number>}*/ g_C = [119, 223, 119, 1];

const /**@type {Array<number>}*/ g_v = [17, 65, 16, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 32];

const /**@type {Array<number>}*/ g_particle_end = [17, 97, 24, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 32];

import B from './base-stemmer.js'

export default class extends B {


    /** @return {boolean} */
    #af_7() {
        switch (this.af) {
            case 1: return this.#r_A_();
            case 2: return this.#r_O_();
            case 3: return this.#r_A();
            case 4: return this.#r_E();
            case 5: return this.#r_I();
            case 6: return this.#r_O();
            case 7: return this.#r_U();
            case 8: return this.#r_VI();
            case 9: return this.#r_LV();
        }
        return false;
    }

    /** @return {boolean} */
    #r_LV() {
        return this.find_among_b(a_5) !== 0;
    }

    /** @return {boolean} */
    #r_VI() {
        return this.find_among_b(a_6) !== 0;
    }

    /** @return {boolean} */
    #r_A() {
        // deno-lint-ignore no-unused-labels
        lab0: {
            // deno-lint-ignore no-unused-labels
            lab1: {
                if (!(this.eq_s_b("a"))) break lab1;
                break lab0;
            }
            if (!(this.eq_s_b("'"))) return false;
        }
        return true;
    }

    /** @return {boolean} */
    #r_E() {
        // deno-lint-ignore no-unused-labels
        lab0: {
            // deno-lint-ignore no-unused-labels
            lab1: {
                if (!(this.eq_s_b("e"))) break lab1;
                break lab0;
            }
            if (!(this.eq_s_b("'"))) return false;
        }
        return true;
    }

    /** @return {boolean} */
    #r_I() {
        // deno-lint-ignore no-unused-labels
        lab0: {
            // deno-lint-ignore no-unused-labels
            lab1: {
                if (!(this.eq_s_b("i"))) break lab1;
                break lab0;
            }
            if (!(this.eq_s_b("'"))) return false;
        }
        return true;
    }

    /** @return {boolean} */
    #r_O() {
        // deno-lint-ignore no-unused-labels
        lab0: {
            // deno-lint-ignore no-unused-labels
            lab1: {
                if (!(this.eq_s_b("o"))) break lab1;
                break lab0;
            }
            if (!(this.eq_s_b("'"))) return false;
        }
        return true;
    }

    /** @return {boolean} */
    #r_U() {
        // deno-lint-ignore no-unused-labels
        lab0: {
            // deno-lint-ignore no-unused-labels
            lab1: {
                if (!(this.eq_s_b("u"))) break lab1;
                break lab0;
            }
            if (!(this.eq_s_b("'"))) return false;
        }
        return true;
    }

    /** @return {boolean} */
    #r_A_() {
        // deno-lint-ignore no-unused-labels
        lab0: {
            // deno-lint-ignore no-unused-labels
            lab1: {
                if (!(this.eq_s_b("\u00E4"))) break lab1;
                break lab0;
            }
            if (!(this.eq_s_b("'"))) return false;
        }
        return true;
    }

    /** @return {boolean} */
    #r_O_() {
        // deno-lint-ignore no-unused-labels
        lab0: {
            // deno-lint-ignore no-unused-labels
            lab1: {
                if (!(this.eq_s_b("\u00F6"))) break lab1;
                break lab0;
            }
            // deno-lint-ignore no-unused-labels
            lab2: {
                if (!(this.eq_s_b("\u00F8"))) break lab2;
                break lab0;
            }
            if (!(this.eq_s_b("'"))) return false;
        }
        return true;
    }

    /** @return {boolean} */
    #stem() {
        let /**@type {number}*/ a;
        let /**@type {boolean}*/ B_ending_removed;
        let /**@type {string}*/ S_x;
        let /**@type {number}*/ I_p2;
        let /**@type {number}*/ I_p1;
        const /**@type {number}*/ v_1 = this.c;
        // deno-lint-ignore no-unused-labels
        lab0: {
            I_p1 = this.limit;
            I_p2 = this.limit;
            if (!this.go_out_grouping(g_v, 97, 246)) break lab0;
            this.c++;
            if (!this.go_in_grouping(g_v, 97, 246)) break lab0;
            this.c++;
            I_p1 = this.c;
            if (!this.go_out_grouping(g_v, 97, 246)) break lab0;
            this.c++;
            if (!this.go_in_grouping(g_v, 97, 246)) break lab0;
            this.c++;
            I_p2 = this.c;
        }
        this.c = v_1;
        B_ending_removed = false;
        this.limit_backward = this.c; this.c = this.limit;
        const /**@type {number}*/ v_2 = this.limit - this.c;
        // deno-lint-ignore no-unused-labels
        lab1: {
            if (this.c < I_p1) break lab1;
            const /**@type {number}*/ v_3 = this.limit_backward;
            this.limit_backward = I_p1;
            this.ket = this.c;
            a = this.find_among_b(a_0);
            if (a === 0) {
                this.limit_backward = v_3;
                break lab1;
            }
            this.bra = this.c;
            this.limit_backward = v_3;
            switch (a) {
                case 1: {
                    if (!(this.in_grouping_b(g_particle_end, 97, 246))) break lab1;
                    break;
                }
                case 2: {
                    if (/**@type {boolean}*/(I_p2 > this.c)) break lab1;
                    break;
                }
            }
            this.slice_del();
        }
        this.c = this.limit - v_2;
        const /**@type {number}*/ v_4 = this.limit - this.c;
        // deno-lint-ignore no-unused-labels
        lab2: {
            if (this.c < I_p1) break lab2;
            const /**@type {number}*/ v_5 = this.limit_backward;
            this.limit_backward = I_p1;
            this.ket = this.c;
            a = this.find_among_b(a_4);
            if (a === 0) {
                this.limit_backward = v_5;
                break lab2;
            }
            this.bra = this.c;
            this.limit_backward = v_5;
            switch (a) {
                case 1: {
                    // deno-lint-ignore no-unused-labels
                    lab3: {
                        if (!(this.eq_s_b("k"))) break lab3;
                        break lab2;
                    }
                    this.slice_del();
                    break;
                }
                case 2: {
                    this.slice_del();
                    this.ket = this.c;
                    if (!(this.eq_s_b("kse"))) break lab2;
                    this.bra = this.c;
                    this.slice_from("ksi");
                    break;
                }
                case 3: {
                    this.slice_del();
                    break;
                }
                case 4: {
                    if (this.find_among_b(a_1) === 0) break lab2;
                    this.slice_del();
                    break;
                }
                case 5: {
                    if (this.find_among_b(a_2) === 0) break lab2;
                    this.slice_del();
                    break;
                }
                case 6: {
                    if (this.find_among_b(a_3) === 0) break lab2;
                    this.slice_del();
                    break;
                }
            }
        }
        this.c = this.limit - v_4;
        const /**@type {number}*/ v_6 = this.limit - this.c;
        // deno-lint-ignore no-unused-labels
        lab4: {
            if (this.c < I_p1) break lab4;
            const /**@type {number}*/ v_7 = this.limit_backward;
            this.limit_backward = I_p1;
            this.ket = this.c;
            a = this.find_among_b(a_7, this.#af_7);
            if (a === 0) {
                this.limit_backward = v_7;
                break lab4;
            }
            this.bra = this.c;
            this.limit_backward = v_7;
            switch (a) {
                case 1: {
                    const /**@type {number}*/ v_8 = this.limit - this.c;
                    // deno-lint-ignore no-unused-labels
                    lab5: {
                        const /**@type {number}*/ v_9 = this.limit - this.c;
                        // deno-lint-ignore no-unused-labels
                        lab6: {
                            const /**@type {number}*/ v_10 = this.limit - this.c;
                            // deno-lint-ignore no-unused-labels
                            lab7: {
                                if (!this.#r_LV()) break lab7;
                                break lab6;
                            }
                            this.c = this.limit - v_10;
                            if (!(this.eq_s_b("ie"))) {
                                this.c = this.limit - v_8;
                                break lab5;
                            }
                        }
                        this.c = this.limit - v_9;
                        if (this.c <= this.limit_backward) {
                            this.c = this.limit - v_8;
                            break lab5;
                        }
                        this.c--;
                        this.bra = this.c;
                    }
                    break;
                }
                case 2: {
                    if (!(this.in_grouping_b(g_v, 97, 246))) break lab4;
                    if (!(this.in_grouping_b(g_C, 98, 122))) break lab4;
                    break;
                }
                case 3: {
                    if (!(this.eq_s_b("e"))) break lab4;
                    break;
                }
            }
            this.slice_del();
            B_ending_removed = true;
        }
        this.c = this.limit - v_6;
        const /**@type {number}*/ v_11 = this.limit - this.c;
        // deno-lint-ignore no-unused-labels
        lab8: {
            if (this.c < I_p2) break lab8;
            const /**@type {number}*/ v_12 = this.limit_backward;
            this.limit_backward = I_p2;
            this.ket = this.c;
            a = this.find_among_b(a_8);
            if (a === 0) {
                this.limit_backward = v_12;
                break lab8;
            }
            this.bra = this.c;
            this.limit_backward = v_12;
            switch (a) {
                case 1: {
                    // deno-lint-ignore no-unused-labels
                    lab9: {
                        if (!(this.eq_s_b("po"))) break lab9;
                        break lab8;
                    }
                    break;
                }
            }
            this.slice_del();
        }
        this.c = this.limit - v_11;
        // deno-lint-ignore no-unused-labels
        lab10: {
            // deno-lint-ignore no-unused-labels
            lab11: {
                if (!B_ending_removed) break lab11;
                const /**@type {number}*/ v_13 = this.limit - this.c;
                // deno-lint-ignore no-unused-labels
                lab12: {
                    if (this.c < I_p1) break lab12;
                    const /**@type {number}*/ v_14 = this.limit_backward;
                    this.limit_backward = I_p1;
                    this.ket = this.c;
                    if (this.find_among_b(a_9) === 0) {
                        this.limit_backward = v_14;
                        break lab12;
                    }
                    this.bra = this.c;
                    this.limit_backward = v_14;
                    this.slice_del();
                }
                this.c = this.limit - v_13;
                break lab10;
            }
            const /**@type {number}*/ v_15 = this.limit - this.c;
            // deno-lint-ignore no-unused-labels
            lab13: {
                if (this.c < I_p1) break lab13;
                const /**@type {number}*/ v_16 = this.limit_backward;
                this.limit_backward = I_p1;
                this.ket = this.c;
                if (!(this.eq_s_b("t"))) {
                    this.limit_backward = v_16;
                    break lab13;
                }
                this.bra = this.c;
                const /**@type {number}*/ v_17 = this.limit - this.c;
                if (!(this.in_grouping_b(g_v, 97, 246))) {
                    this.limit_backward = v_16;
                    break lab13;
                }
                this.c = this.limit - v_17;
                this.slice_del();
                this.limit_backward = v_16;
                if (this.c < I_p2) break lab13;
                const /**@type {number}*/ v_18 = this.limit_backward;
                this.limit_backward = I_p2;
                this.ket = this.c;
                a = this.find_among_b(a_10);
                if (a === 0) {
                    this.limit_backward = v_18;
                    break lab13;
                }
                this.bra = this.c;
                this.limit_backward = v_18;
                switch (a) {
                    case 1: {
                        // deno-lint-ignore no-unused-labels
                        lab14: {
                            if (!(this.eq_s_b("po"))) break lab14;
                            break lab13;
                        }
                        break;
                    }
                }
                this.slice_del();
            }
            this.c = this.limit - v_15;
        }
        const /**@type {number}*/ v_19 = this.limit - this.c;
        // deno-lint-ignore no-unused-labels
        lab15: {
            if (this.c < I_p1) break lab15;
            const /**@type {number}*/ v_20 = this.limit_backward;
            this.limit_backward = I_p1;
            const /**@type {number}*/ v_21 = this.limit - this.c;
            // deno-lint-ignore no-unused-labels
            lab16: {
                const /**@type {number}*/ v_22 = this.limit - this.c;
                if (!this.#r_LV()) break lab16;
                this.c = this.limit - v_22;
                this.ket = this.c;
                if (this.c <= this.limit_backward) break lab16;
                this.c--;
                this.bra = this.c;
                this.slice_del();
            }
            this.c = this.limit - v_21;
            const /**@type {number}*/ v_23 = this.limit - this.c;
            // deno-lint-ignore no-unused-labels
            lab17: {
                this.ket = this.c;
                if (!(this.in_grouping_b(g_AEI, 97, 228))) break lab17;
                this.bra = this.c;
                if (!(this.in_grouping_b(g_C, 98, 122))) break lab17;
                this.slice_del();
            }
            this.c = this.limit - v_23;
            const /**@type {number}*/ v_24 = this.limit - this.c;
            // deno-lint-ignore no-unused-labels
            lab18: {
                this.ket = this.c;
                if (!(this.eq_s_b("j"))) break lab18;
                this.bra = this.c;
                // deno-lint-ignore no-unused-labels
                lab19: {
                    // deno-lint-ignore no-unused-labels
                    lab20: {
                        if (!(this.eq_s_b("o"))) break lab20;
                        break lab19;
                    }
                    if (!(this.eq_s_b("u"))) break lab18;
                }
                this.slice_del();
            }
            this.c = this.limit - v_24;
            const /**@type {number}*/ v_25 = this.limit - this.c;
            // deno-lint-ignore no-unused-labels
            lab21: {
                this.ket = this.c;
                if (!(this.eq_s_b("o"))) break lab21;
                this.bra = this.c;
                if (!(this.eq_s_b("j"))) break lab21;
                this.slice_del();
            }
            this.c = this.limit - v_25;
            this.limit_backward = v_20;
            const /**@type {number}*/ v_26 = this.limit - this.c;
            // deno-lint-ignore no-unused-labels
            lab22: {
                if (!this.go_in_grouping_b(g_v, 97, 246)) break lab22;
                this.ket = this.c;
                if (!(this.in_grouping_b(g_C, 98, 122))) break lab22;
                this.bra = this.c;
                S_x = this.slice_to();
                if (!(this.eq_s_b(S_x))) break lab22;
                this.slice_del();
            }
            this.c = this.limit - v_26;
            this.ket = this.c;
            if (!(this.eq_s_b("'"))) break lab15;
            this.bra = this.c;
            this.slice_del();
        }
        this.c = this.limit - v_19;
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

