// Generated from indonesian.sbl by Snowball 3.2.0 - https://snowballstem.org/

// deno-lint-ignore-file ban-unused-ignore no-constant-condition no-empty prefer-const

const a_0 = [
    ["kah", 1],
    ["lah", 1],
    ["pun", 1]
];

const a_1 = [
    ["nya", 1],
    ["ku", 1],
    ["mu", 1]
];

const a_2 = [
    ["i", 2],
    ["an", 1]
];

const a_3 = [
    ["di", 1],
    ["ke", 3],
    ["me", 1],
    ["mem", 5, 1],
    ["men", 2, 2],
    ["meng", 1, 1],
    ["pem", 6],
    ["pen", 4],
    ["peng", 3, 1],
    ["ter", 1]
];

const a_4 = [
    ["be", 2],
    ["pe", 1]
];

const /**@type {Array<number>}*/ g_vowel = [17, 65, 16];

import B from './base-stemmer.js'

export default class extends B {

    #I_prefix/**@type {number}*/ = 0;
    #I_measure/**@type {number}*/ = 0;


    /** @return {boolean} */
    #r_remove_suffix() {
        let /**@type {number}*/ a;
        this.ket = this.c;
        a = this.find_among_b(a_2);
        if (a === 0) return false;
        this.bra = this.c;
        switch (a) {
            case 1: {
                // deno-lint-ignore no-unused-labels
                lab0: {
                    const /**@type {number}*/ v_1 = this.limit - this.c;
                    // deno-lint-ignore no-unused-labels
                    lab1: {
                        if (/**@type {boolean}*/(this.#I_prefix === 3)) break lab1;
                        if (/**@type {boolean}*/(this.#I_prefix === 2)) break lab1;
                        if (!(this.eq_s_b("k"))) break lab1;
                        this.bra = this.c;
                        break lab0;
                    }
                    this.c = this.limit - v_1;
                    if (/**@type {boolean}*/(this.#I_prefix === 1)) return false;
                }
                break;
            }
            case 2: {
                if (/**@type {boolean}*/(this.#I_prefix > 2)) return false;
                // deno-lint-ignore no-unused-labels
                lab2: {
                    if (!(this.eq_s_b("s"))) break lab2;
                    return false;
                }
                break;
            }
        }
        this.slice_del();
        --this.#I_measure;
        return true;
    }

    /** @return {boolean} */
    #r_remove_second_order_prefix() {
        let /**@type {number}*/ a;
        this.bra = this.c;
        a = this.find_among(a_4);
        if (a === 0) return false;
        switch (a) {
            case 1: {
                // deno-lint-ignore no-unused-labels
                lab0: {
                    const /**@type {number}*/ v_1 = this.c;
                    // deno-lint-ignore no-unused-labels
                    lab1: {
                        if (!(this.eq_s("r"))) break lab1;
                        this.ket = this.c;
                        this.#I_prefix = 2;
                        break lab0;
                    }
                    this.c = v_1;
                    // deno-lint-ignore no-unused-labels
                    lab2: {
                        if (!(this.eq_s("l"))) break lab2;
                        this.ket = this.c;
                        if (!(this.eq_s("ajar"))) break lab2;
                        break lab0;
                    }
                    this.c = v_1;
                    this.ket = this.c;
                    this.#I_prefix = 2;
                }
                break;
            }
            case 2: {
                // deno-lint-ignore no-unused-labels
                lab3: {
                    const /**@type {number}*/ v_2 = this.c;
                    // deno-lint-ignore no-unused-labels
                    lab4: {
                        if (!(this.eq_s("r"))) break lab4;
                        this.ket = this.c;
                        break lab3;
                    }
                    this.c = v_2;
                    // deno-lint-ignore no-unused-labels
                    lab5: {
                        if (!(this.eq_s("l"))) break lab5;
                        this.ket = this.c;
                        if (!(this.eq_s("ajar"))) break lab5;
                        break lab3;
                    }
                    this.c = v_2;
                    this.ket = this.c;
                    if (!(this.out_grouping(g_vowel, 97, 117))) return false;
                    if (!(this.eq_s("er"))) return false;
                }
                this.#I_prefix = 4;
                break;
            }
        }
        --this.#I_measure;
        this.slice_del();
        return true;
    }

    /** @return {boolean} */
    #stem() {
        let /**@type {number}*/ a;
        this.#I_measure = 0;
        const /**@type {number}*/ v_1 = this.c;
        // deno-lint-ignore no-unused-labels
        lab0: {
            while (true) {
                const /**@type {number}*/ v_2 = this.c;
                // deno-lint-ignore no-unused-labels
                lab1: {
                    if (!this.go_out_grouping(g_vowel, 97, 117)) break lab1;
                    this.c++;
                    ++this.#I_measure;
                    continue;
                }
                this.c = v_2;
                break;
            }
        }
        this.c = v_1;
        if (/**@type {boolean}*/(this.#I_measure < 3)) return false;
        this.#I_prefix = 0;
        this.limit_backward = this.c; this.c = this.limit;
        const /**@type {number}*/ v_3 = this.limit - this.c;
        // deno-lint-ignore no-unused-labels
        lab2: {
            this.ket = this.c;
            if (this.find_among_b(a_0) === 0) break lab2;
            this.bra = this.c;
            this.slice_del();
            --this.#I_measure;
        }
        this.c = this.limit - v_3;
        if (/**@type {boolean}*/(this.#I_measure < 3)) return false;
        const /**@type {number}*/ v_4 = this.limit - this.c;
        // deno-lint-ignore no-unused-labels
        lab3: {
            this.ket = this.c;
            if (this.find_among_b(a_1) === 0) break lab3;
            this.bra = this.c;
            this.slice_del();
            --this.#I_measure;
        }
        this.c = this.limit - v_4;
        this.c = this.limit_backward;
        if (/**@type {boolean}*/(this.#I_measure < 3)) return false;
        // deno-lint-ignore no-unused-labels
        lab4: {
            const /**@type {number}*/ v_5 = this.c;
            // deno-lint-ignore no-unused-labels
            lab5: {
                const /**@type {number}*/ v_6 = this.c;
                this.bra = this.c;
                a = this.find_among(a_3);
                if (a === 0) break lab5;
                this.ket = this.c;
                switch (a) {
                    case 1: {
                        this.slice_del();
                        this.#I_prefix = 1;
                        --this.#I_measure;
                        break;
                    }
                    case 2: {
                        // deno-lint-ignore no-unused-labels
                        lab6: {
                            const /**@type {number}*/ v_7 = this.c;
                            // deno-lint-ignore no-unused-labels
                            lab7: {
                                if (!(this.eq_s("y"))) break lab7;
                                const /**@type {number}*/ v_8 = this.c;
                                if (!(this.in_grouping(g_vowel, 97, 117))) break lab7;
                                this.c = v_8;
                                this.ket = this.c;
                                this.slice_from("s");
                                this.#I_prefix = 1;
                                --this.#I_measure;
                                break lab6;
                            }
                            this.c = v_7;
                            this.slice_del();
                            this.#I_prefix = 1;
                            --this.#I_measure;
                        }
                        break;
                    }
                    case 3: {
                        this.slice_del();
                        this.#I_prefix = 3;
                        --this.#I_measure;
                        break;
                    }
                    case 4: {
                        // deno-lint-ignore no-unused-labels
                        lab8: {
                            const /**@type {number}*/ v_9 = this.c;
                            // deno-lint-ignore no-unused-labels
                            lab9: {
                                if (!(this.eq_s("y"))) break lab9;
                                const /**@type {number}*/ v_10 = this.c;
                                if (!(this.in_grouping(g_vowel, 97, 117))) break lab9;
                                this.c = v_10;
                                this.ket = this.c;
                                this.slice_from("s");
                                this.#I_prefix = 3;
                                --this.#I_measure;
                                break lab8;
                            }
                            this.c = v_9;
                            this.slice_del();
                            this.#I_prefix = 3;
                            --this.#I_measure;
                        }
                        break;
                    }
                    case 5: {
                        this.#I_prefix = 1;
                        --this.#I_measure;
                        // deno-lint-ignore no-unused-labels
                        lab10: {
                            const /**@type {number}*/ v_11 = this.c;
                            // deno-lint-ignore no-unused-labels
                            lab11: {
                                const /**@type {number}*/ v_12 = this.c;
                                if (!(this.in_grouping(g_vowel, 97, 117))) break lab11;
                                this.c = v_12;
                                this.slice_from("p");
                                break lab10;
                            }
                            this.c = v_11;
                            this.slice_del();
                        }
                        break;
                    }
                    case 6: {
                        this.#I_prefix = 3;
                        --this.#I_measure;
                        // deno-lint-ignore no-unused-labels
                        lab12: {
                            const /**@type {number}*/ v_13 = this.c;
                            // deno-lint-ignore no-unused-labels
                            lab13: {
                                const /**@type {number}*/ v_14 = this.c;
                                if (!(this.in_grouping(g_vowel, 97, 117))) break lab13;
                                this.c = v_14;
                                this.slice_from("p");
                                break lab12;
                            }
                            this.c = v_13;
                            this.slice_del();
                        }
                        break;
                    }
                }
                const /**@type {number}*/ v_15 = this.c;
                // deno-lint-ignore no-unused-labels
                lab14: {
                    const /**@type {number}*/ v_16 = this.c;
                    if (/**@type {boolean}*/(this.#I_measure < 3)) break lab14;
                    this.limit_backward = this.c; this.c = this.limit;
                    if (!this.#r_remove_suffix()) break lab14;
                    this.c = this.limit_backward;
                    this.c = v_16;
                    if (/**@type {boolean}*/(this.#I_measure < 3)) break lab14;
                    if (!this.#r_remove_second_order_prefix()) break lab14;
                }
                this.c = v_15;
                this.c = v_6;
                break lab4;
            }
            this.c = v_5;
            const /**@type {number}*/ v_17 = this.c;
            this.#r_remove_second_order_prefix();
            this.c = v_17;
            const /**@type {number}*/ v_18 = this.c;
            // deno-lint-ignore no-unused-labels
            lab15: {
                if (/**@type {boolean}*/(this.#I_measure < 3)) break lab15;
                this.limit_backward = this.c; this.c = this.limit;
                if (!this.#r_remove_suffix()) break lab15;
                this.c = this.limit_backward;
            }
            this.c = v_18;
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

