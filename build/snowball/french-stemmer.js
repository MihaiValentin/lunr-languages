// Generated from french.sbl by Snowball 3.2.0 - https://snowballstem.org/

// deno-lint-ignore-file ban-unused-ignore no-constant-condition no-empty prefer-const

const a_0 = [
    ["col", -1],
    ["ni", 1],
    ["par", -1],
    ["tap", -1]
];

const a_1 = [
    ["", 7],
    ["H", 6, 1],
    ["He", 4, 1],
    ["Hi", 5, 2],
    ["I", 1, 4],
    ["U", 2, 5],
    ["Y", 3, 6]
];

const a_2 = [
    ["iqU", 3],
    ["abl", 3],
    ["I\u00E8r", 4],
    ["i\u00E8r", 4],
    ["eus", 2],
    ["iv", 1]
];

const a_3 = [
    ["ic", 2],
    ["abil", 1],
    ["iv", 3]
];

const a_4 = [
    ["iqUe", 1],
    ["atrice", 2],
    ["ance", 1],
    ["ence", 5],
    ["logie", 3],
    ["able", 1],
    ["isme", 1],
    ["euse", 12],
    ["iste", 1],
    ["ive", 8],
    ["if", 8],
    ["usion", 4],
    ["ation", 2],
    ["ution", 4],
    ["ateur", 2],
    ["iqUes", 1],
    ["atrices", 2],
    ["ances", 1],
    ["ences", 5],
    ["logies", 3],
    ["ables", 1],
    ["ismes", 1],
    ["euses", 12],
    ["istes", 1],
    ["ives", 8],
    ["ifs", 8],
    ["usions", 4],
    ["ations", 2],
    ["utions", 4],
    ["ateurs", 2],
    ["ments", 16],
    ["ements", 6, 1],
    ["issements", 13, 1],
    ["it\u00E9s", 7],
    ["ment", 16],
    ["ement", 6, 1],
    ["issement", 13, 1],
    ["amment", 14, 3],
    ["emment", 15, 4],
    ["aux", 10],
    ["eaux", 9, 1],
    ["eux", 1],
    ["oux", 11],
    ["it\u00E9", 7]
];

const a_5 = [
    ["ira", 1],
    ["ie", 1],
    ["isse", 1],
    ["issante", 1],
    ["i", 1],
    ["irai", 1, 1],
    ["ir", 1],
    ["iras", 1],
    ["ies", 1],
    ["\u00EEmes", 1],
    ["isses", 1],
    ["issantes", 1],
    ["\u00EEtes", 1],
    ["is", 1],
    ["irais", 1, 1],
    ["issais", 1, 2],
    ["irions", 1],
    ["issions", 1],
    ["irons", 1],
    ["issons", 1],
    ["issants", 1],
    ["it", 1],
    ["irait", 1, 1],
    ["issait", 1, 2],
    ["issant", 1],
    ["iraIent", 1],
    ["issaIent", 1],
    ["irent", 1],
    ["issent", 1],
    ["iront", 1],
    ["\u00EEt", 1],
    ["iriez", 1],
    ["issiez", 1],
    ["irez", 1],
    ["issez", 1]
];

const a_6 = [
    ["al", 1],
    ["\u00E9pl", -1],
    ["auv", -1]
];

const a_7 = [
    ["a", 3],
    ["era", 2, 1],
    ["aise", 4],
    ["asse", 3],
    ["ante", 3],
    ["\u00E9e", 2],
    ["ai", 3],
    ["erai", 2, 1],
    ["er", 2],
    ["as", 3],
    ["eras", 2, 1],
    ["\u00E2mes", 3],
    ["aises", 4],
    ["asses", 3],
    ["antes", 3],
    ["\u00E2tes", 3],
    ["\u00E9es", 2],
    ["ais", 4],
    ["eais", 2, 1],
    ["erais", 2, 2],
    ["ions", 1],
    ["erions", 2, 1],
    ["assions", 3, 2],
    ["erons", 2],
    ["ants", 3],
    ["\u00E9s", 2],
    ["ait", 3],
    ["erait", 2, 1],
    ["ant", 3],
    ["aIent", 3],
    ["eraIent", 2, 1],
    ["\u00E8rent", 2],
    ["assent", 3],
    ["eront", 2],
    ["\u00E2t", 3],
    ["ez", 2],
    ["iez", 2, 1],
    ["eriez", 2, 1],
    ["assiez", 3, 2],
    ["erez", 2, 4],
    ["\u00E9", 2]
];

const a_8 = [
    ["e", 3],
    ["I\u00E8re", 2, 1],
    ["i\u00E8re", 2, 2],
    ["ion", 1],
    ["Ier", 2],
    ["ier", 2]
];

const a_9 = [
    ["ell", -1],
    ["eill", -1],
    ["enn", -1],
    ["onn", -1],
    ["ett", -1]
];

const /**@type {Array<number>}*/ g_v = [17, 65, 16, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128, 130, 103, 8, 5];

const /**@type {Array<number>}*/ g_oux_ending = [65, 85];

const /**@type {Array<number>}*/ g_elision_char = [131, 14, 131];

const /**@type {Array<number>}*/ g_keep_with_s = [1, 65, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128];

import B from './base-stemmer.js'

export default class extends B {


    /** @return {boolean} */
    #stem() {
        let /**@type {number}*/ a;
        let /**@type {number}*/ I_p2;
        let /**@type {number}*/ I_p1;
        let /**@type {number}*/ I_pV;
        const /**@type {number}*/ v_1 = this.c;
        // deno-lint-ignore no-unused-labels
        lab0: {
            this.bra = this.c;
            // deno-lint-ignore no-unused-labels
            lab1: {
                // deno-lint-ignore no-unused-labels
                lab2: {
                    if (!(this.in_grouping(g_elision_char, 99, 122))) break lab2;
                    break lab1;
                }
                if (!(this.eq_s("qu"))) break lab0;
            }
            if (!(this.eq_s("'"))) break lab0;
            this.ket = this.c;
            if (/**@type {boolean}*/(this.c >= this.limit)) break lab0;
            this.slice_del();
        }
        this.c = v_1;
        const /**@type {number}*/ v_2 = this.c;
        // deno-lint-ignore no-unused-labels
        lab3: {
            while (true) {
                const /**@type {number}*/ v_3 = this.c;
                // deno-lint-ignore no-unused-labels
                lab4: {
                    // deno-lint-ignore no-unused-labels
                    golab5: while (true)
                    {
                        const /**@type {number}*/ v_4 = this.c;
                        // deno-lint-ignore no-unused-labels
                        lab6: {
                            // deno-lint-ignore no-unused-labels
                            lab7: {
                                const /**@type {number}*/ v_5 = this.c;
                                // deno-lint-ignore no-unused-labels
                                lab8: {
                                    if (!(this.in_grouping(g_v, 97, 251))) break lab8;
                                    this.bra = this.c;
                                    // deno-lint-ignore no-unused-labels
                                    lab9: {
                                        const /**@type {number}*/ v_6 = this.c;
                                        // deno-lint-ignore no-unused-labels
                                        lab10: {
                                            if (!(this.eq_s("u"))) break lab10;
                                            this.ket = this.c;
                                            if (!(this.in_grouping(g_v, 97, 251))) break lab10;
                                            this.slice_from("U");
                                            break lab9;
                                        }
                                        this.c = v_6;
                                        // deno-lint-ignore no-unused-labels
                                        lab11: {
                                            if (!(this.eq_s("i"))) break lab11;
                                            this.ket = this.c;
                                            if (!(this.in_grouping(g_v, 97, 251))) break lab11;
                                            this.slice_from("I");
                                            break lab9;
                                        }
                                        this.c = v_6;
                                        if (!(this.eq_s("y"))) break lab8;
                                        this.ket = this.c;
                                        this.slice_from("Y");
                                    }
                                    break lab7;
                                }
                                this.c = v_5;
                                // deno-lint-ignore no-unused-labels
                                lab12: {
                                    this.bra = this.c;
                                    if (!(this.eq_s("\u00EB"))) break lab12;
                                    this.ket = this.c;
                                    this.slice_from("He");
                                    break lab7;
                                }
                                this.c = v_5;
                                // deno-lint-ignore no-unused-labels
                                lab13: {
                                    this.bra = this.c;
                                    if (!(this.eq_s("\u00EF"))) break lab13;
                                    this.ket = this.c;
                                    this.slice_from("Hi");
                                    break lab7;
                                }
                                this.c = v_5;
                                // deno-lint-ignore no-unused-labels
                                lab14: {
                                    this.bra = this.c;
                                    if (!(this.eq_s("y"))) break lab14;
                                    this.ket = this.c;
                                    if (!(this.in_grouping(g_v, 97, 251))) break lab14;
                                    this.slice_from("Y");
                                    break lab7;
                                }
                                this.c = v_5;
                                if (!(this.eq_s("q"))) break lab6;
                                this.bra = this.c;
                                if (!(this.eq_s("u"))) break lab6;
                                this.ket = this.c;
                                this.slice_from("U");
                            }
                            this.c = v_4;
                            break golab5;
                        }
                        this.c = v_4;
                        if (this.c >= this.limit) break lab4;
                        this.c++;
                    }
                    continue;
                }
                this.c = v_3;
                break;
            }
        }
        this.c = v_2;
        // deno-lint-ignore no-unused-labels
        lab15: {
            I_pV = this.limit;
            I_p1 = this.limit;
            I_p2 = this.limit;
            const /**@type {number}*/ v_7 = this.c;
            // deno-lint-ignore no-unused-labels
            lab16: {
                // deno-lint-ignore no-unused-labels
                lab17: {
                    const /**@type {number}*/ v_8 = this.c;
                    // deno-lint-ignore no-unused-labels
                    lab18: {
                        if (!(this.in_grouping(g_v, 97, 251))) break lab18;
                        if (!(this.in_grouping(g_v, 97, 251))) break lab18;
                        if (this.c >= this.limit) break lab18;
                        this.c++;
                        break lab17;
                    }
                    this.c = v_8;
                    // deno-lint-ignore no-unused-labels
                    lab19: {
                        a = this.find_among(a_0);
                        if (a === 0) break lab19;
                        switch (a) {
                            case 1: {
                                if (!(this.in_grouping(g_v, 97, 251))) break lab19;
                                break;
                            }
                        }
                        break lab17;
                    }
                    this.c = v_8;
                    if (this.c >= this.limit) break lab16;
                    this.c++;
                    if (!this.go_out_grouping(g_v, 97, 251)) break lab16;
                    this.c++;
                }
                I_pV = this.c;
            }
            this.c = v_7;
            const /**@type {number}*/ v_9 = this.c;
            // deno-lint-ignore no-unused-labels
            lab20: {
                if (!this.go_out_grouping(g_v, 97, 251)) break lab20;
                this.c++;
                if (!this.go_in_grouping(g_v, 97, 251)) break lab20;
                this.c++;
                I_p1 = this.c;
                if (!this.go_out_grouping(g_v, 97, 251)) break lab20;
                this.c++;
                if (!this.go_in_grouping(g_v, 97, 251)) break lab20;
                this.c++;
                I_p2 = this.c;
            }
            this.c = v_9;
        }
        this.limit_backward = this.c; this.c = this.limit;
        const /**@type {number}*/ v_10 = this.limit - this.c;
        // deno-lint-ignore no-unused-labels
        lab21: {
            // deno-lint-ignore no-unused-labels
            lab22: {
                const /**@type {number}*/ v_11 = this.limit - this.c;
                // deno-lint-ignore no-unused-labels
                lab23: {
                    const /**@type {number}*/ v_12 = this.limit - this.c;
                    // deno-lint-ignore no-unused-labels
                    lab24: {
                        const /**@type {number}*/ v_13 = this.limit - this.c;
                        // deno-lint-ignore no-unused-labels
                        lab25: {
                            this.ket = this.c;
                            a = this.find_among_b(a_4);
                            if (a === 0) break lab25;
                            this.bra = this.c;
                            switch (a) {
                                case 1: {
                                    if (/**@type {boolean}*/(I_p2 > this.c)) break lab25;
                                    this.slice_del();
                                    break;
                                }
                                case 2: {
                                    if (/**@type {boolean}*/(I_p2 > this.c)) break lab25;
                                    this.slice_del();
                                    const /**@type {number}*/ v_14 = this.limit - this.c;
                                    // deno-lint-ignore no-unused-labels
                                    lab26: {
                                        this.ket = this.c;
                                        if (!(this.eq_s_b("ic"))) {
                                            this.c = this.limit - v_14;
                                            break lab26;
                                        }
                                        this.bra = this.c;
                                        // deno-lint-ignore no-unused-labels
                                        lab27: {
                                            const /**@type {number}*/ v_15 = this.limit - this.c;
                                            // deno-lint-ignore no-unused-labels
                                            lab28: {
                                                if (/**@type {boolean}*/(I_p2 > this.c)) break lab28;
                                                this.slice_del();
                                                break lab27;
                                            }
                                            this.c = this.limit - v_15;
                                            this.slice_from("iqU");
                                        }
                                    }
                                    break;
                                }
                                case 3: {
                                    if (/**@type {boolean}*/(I_p2 > this.c)) break lab25;
                                    this.slice_from("log");
                                    break;
                                }
                                case 4: {
                                    if (/**@type {boolean}*/(I_p2 > this.c)) break lab25;
                                    this.slice_from("u");
                                    break;
                                }
                                case 5: {
                                    if (/**@type {boolean}*/(I_p2 > this.c)) break lab25;
                                    this.slice_from("ent");
                                    break;
                                }
                                case 6: {
                                    if (/**@type {boolean}*/(I_pV > this.c)) break lab25;
                                    this.slice_del();
                                    const /**@type {number}*/ v_16 = this.limit - this.c;
                                    // deno-lint-ignore no-unused-labels
                                    lab29: {
                                        this.ket = this.c;
                                        a = this.find_among_b(a_2);
                                        if (a === 0) {
                                            this.c = this.limit - v_16;
                                            break lab29;
                                        }
                                        this.bra = this.c;
                                        switch (a) {
                                            case 1: {
                                                if (/**@type {boolean}*/(I_p2 > this.c)) {
                                                    this.c = this.limit - v_16;
                                                    break lab29;
                                                }
                                                this.slice_del();
                                                this.ket = this.c;
                                                if (!(this.eq_s_b("at"))) {
                                                    this.c = this.limit - v_16;
                                                    break lab29;
                                                }
                                                this.bra = this.c;
                                                if (/**@type {boolean}*/(I_p2 > this.c)) {
                                                    this.c = this.limit - v_16;
                                                    break lab29;
                                                }
                                                this.slice_del();
                                                break;
                                            }
                                            case 2: {
                                                // deno-lint-ignore no-unused-labels
                                                lab30: {
                                                    const /**@type {number}*/ v_17 = this.limit - this.c;
                                                    // deno-lint-ignore no-unused-labels
                                                    lab31: {
                                                        if (/**@type {boolean}*/(I_p2 > this.c)) break lab31;
                                                        this.slice_del();
                                                        break lab30;
                                                    }
                                                    this.c = this.limit - v_17;
                                                    if (/**@type {boolean}*/(I_p1 > this.c)) {
                                                        this.c = this.limit - v_16;
                                                        break lab29;
                                                    }
                                                    this.slice_from("eux");
                                                }
                                                break;
                                            }
                                            case 3: {
                                                if (/**@type {boolean}*/(I_p2 > this.c)) {
                                                    this.c = this.limit - v_16;
                                                    break lab29;
                                                }
                                                this.slice_del();
                                                break;
                                            }
                                            case 4: {
                                                if (/**@type {boolean}*/(I_pV > this.c)) {
                                                    this.c = this.limit - v_16;
                                                    break lab29;
                                                }
                                                this.slice_from("i");
                                                break;
                                            }
                                        }
                                    }
                                    break;
                                }
                                case 7: {
                                    if (/**@type {boolean}*/(I_p2 > this.c)) break lab25;
                                    this.slice_del();
                                    const /**@type {number}*/ v_18 = this.limit - this.c;
                                    // deno-lint-ignore no-unused-labels
                                    lab32: {
                                        this.ket = this.c;
                                        a = this.find_among_b(a_3);
                                        if (a === 0) {
                                            this.c = this.limit - v_18;
                                            break lab32;
                                        }
                                        this.bra = this.c;
                                        switch (a) {
                                            case 1: {
                                                // deno-lint-ignore no-unused-labels
                                                lab33: {
                                                    const /**@type {number}*/ v_19 = this.limit - this.c;
                                                    // deno-lint-ignore no-unused-labels
                                                    lab34: {
                                                        if (/**@type {boolean}*/(I_p2 > this.c)) break lab34;
                                                        this.slice_del();
                                                        break lab33;
                                                    }
                                                    this.c = this.limit - v_19;
                                                    this.slice_from("abl");
                                                }
                                                break;
                                            }
                                            case 2: {
                                                // deno-lint-ignore no-unused-labels
                                                lab35: {
                                                    const /**@type {number}*/ v_20 = this.limit - this.c;
                                                    // deno-lint-ignore no-unused-labels
                                                    lab36: {
                                                        if (/**@type {boolean}*/(I_p2 > this.c)) break lab36;
                                                        this.slice_del();
                                                        break lab35;
                                                    }
                                                    this.c = this.limit - v_20;
                                                    this.slice_from("iqU");
                                                }
                                                break;
                                            }
                                            case 3: {
                                                if (/**@type {boolean}*/(I_p2 > this.c)) {
                                                    this.c = this.limit - v_18;
                                                    break lab32;
                                                }
                                                this.slice_del();
                                                break;
                                            }
                                        }
                                    }
                                    break;
                                }
                                case 8: {
                                    if (/**@type {boolean}*/(I_p2 > this.c)) break lab25;
                                    this.slice_del();
                                    const /**@type {number}*/ v_21 = this.limit - this.c;
                                    // deno-lint-ignore no-unused-labels
                                    lab37: {
                                        this.ket = this.c;
                                        if (!(this.eq_s_b("at"))) {
                                            this.c = this.limit - v_21;
                                            break lab37;
                                        }
                                        this.bra = this.c;
                                        if (/**@type {boolean}*/(I_p2 > this.c)) {
                                            this.c = this.limit - v_21;
                                            break lab37;
                                        }
                                        this.slice_del();
                                        this.ket = this.c;
                                        if (!(this.eq_s_b("ic"))) {
                                            this.c = this.limit - v_21;
                                            break lab37;
                                        }
                                        this.bra = this.c;
                                        // deno-lint-ignore no-unused-labels
                                        lab38: {
                                            const /**@type {number}*/ v_22 = this.limit - this.c;
                                            // deno-lint-ignore no-unused-labels
                                            lab39: {
                                                if (/**@type {boolean}*/(I_p2 > this.c)) break lab39;
                                                this.slice_del();
                                                break lab38;
                                            }
                                            this.c = this.limit - v_22;
                                            this.slice_from("iqU");
                                        }
                                    }
                                    break;
                                }
                                case 9: {
                                    this.slice_from("eau");
                                    break;
                                }
                                case 10: {
                                    if (/**@type {boolean}*/(I_p1 > this.c)) break lab25;
                                    this.slice_from("al");
                                    break;
                                }
                                case 11: {
                                    if (!(this.in_grouping_b(g_oux_ending, 98, 112))) break lab25;
                                    this.slice_from("ou");
                                    break;
                                }
                                case 12: {
                                    // deno-lint-ignore no-unused-labels
                                    lab40: {
                                        const /**@type {number}*/ v_23 = this.limit - this.c;
                                        // deno-lint-ignore no-unused-labels
                                        lab41: {
                                            if (/**@type {boolean}*/(I_p2 > this.c)) break lab41;
                                            this.slice_del();
                                            break lab40;
                                        }
                                        this.c = this.limit - v_23;
                                        if (/**@type {boolean}*/(I_p1 > this.c)) break lab25;
                                        this.slice_from("eux");
                                    }
                                    break;
                                }
                                case 13: {
                                    if (/**@type {boolean}*/(I_p1 > this.c)) break lab25;
                                    if (!(this.out_grouping_b(g_v, 97, 251))) break lab25;
                                    this.slice_del();
                                    break;
                                }
                                case 14: {
                                    if (/**@type {boolean}*/(I_pV > this.c)) break lab25;
                                    this.slice_from("ant");
                                    break lab25;
                                }
                                case 15: {
                                    if (/**@type {boolean}*/(I_pV > this.c)) break lab25;
                                    this.slice_from("ent");
                                    break lab25;
                                }
                                case 16: {
                                    const /**@type {number}*/ v_24 = this.limit - this.c;
                                    if (!(this.in_grouping_b(g_v, 97, 251))) break lab25;
                                    if (/**@type {boolean}*/(I_pV > this.c)) break lab25;
                                    this.c = this.limit - v_24;
                                    this.slice_del();
                                    break lab25;
                                }
                            }
                            break lab24;
                        }
                        this.c = this.limit - v_13;
                        // deno-lint-ignore no-unused-labels
                        lab42: {
                            if (this.c < I_pV) break lab42;
                            const /**@type {number}*/ v_25 = this.limit_backward;
                            this.limit_backward = I_pV;
                            this.ket = this.c;
                            if (this.find_among_b(a_5) === 0) {
                                this.limit_backward = v_25;
                                break lab42;
                            }
                            this.bra = this.c;
                            // deno-lint-ignore no-unused-labels
                            lab43: {
                                if (!(this.eq_s_b("H"))) break lab43;
                                this.limit_backward = v_25;
                                break lab42;
                            }
                            if (!(this.out_grouping_b(g_v, 97, 251))) {
                                this.limit_backward = v_25;
                                break lab42;
                            }
                            this.slice_del();
                            this.limit_backward = v_25;
                            break lab24;
                        }
                        this.c = this.limit - v_13;
                        if (this.c < I_pV) break lab23;
                        const /**@type {number}*/ v_26 = this.limit_backward;
                        this.limit_backward = I_pV;
                        this.ket = this.c;
                        a = this.find_among_b(a_7);
                        if (a === 0) {
                            this.limit_backward = v_26;
                            break lab23;
                        }
                        this.bra = this.c;
                        this.limit_backward = v_26;
                        switch (a) {
                            case 1: {
                                if (/**@type {boolean}*/(I_p2 > this.c)) break lab23;
                                this.slice_del();
                                break;
                            }
                            case 2: {
                                this.slice_del();
                                break;
                            }
                            case 3: {
                                const /**@type {number}*/ v_27 = this.limit - this.c;
                                // deno-lint-ignore no-unused-labels
                                lab44: {
                                    if (!(this.eq_s_b("e"))) {
                                        this.c = this.limit - v_27;
                                        break lab44;
                                    }
                                    if (/**@type {boolean}*/(I_pV > this.c)) {
                                        this.c = this.limit - v_27;
                                        break lab44;
                                    }
                                    this.bra = this.c;
                                }
                                this.slice_del();
                                break;
                            }
                            case 4: {
                                {
                                    const /**@type {number}*/ v_28 = this.limit - this.c;
                                    // deno-lint-ignore no-unused-labels
                                    lab45: {
                                        a = this.find_among_b(a_6);
                                        if (a === 0) break lab45;
                                        switch (a) {
                                            case 1: {
                                                if (this.c <= this.limit_backward) break lab45;
                                                this.c--;
                                                if (/**@type {boolean}*/(this.c > this.limit_backward)) break lab45;
                                                break;
                                            }
                                        }
                                        break lab23;
                                    }
                                    this.c = this.limit - v_28;
                                }
                                this.slice_del();
                                break;
                            }
                        }
                    }
                    this.c = this.limit - v_12;
                    const /**@type {number}*/ v_29 = this.limit - this.c;
                    // deno-lint-ignore no-unused-labels
                    lab46: {
                        this.ket = this.c;
                        // deno-lint-ignore no-unused-labels
                        lab47: {
                            const /**@type {number}*/ v_30 = this.limit - this.c;
                            // deno-lint-ignore no-unused-labels
                            lab48: {
                                if (!(this.eq_s_b("Y"))) break lab48;
                                this.bra = this.c;
                                this.slice_from("i");
                                break lab47;
                            }
                            this.c = this.limit - v_30;
                            if (!(this.eq_s_b("\u00E7"))) {
                                this.c = this.limit - v_29;
                                break lab46;
                            }
                            this.bra = this.c;
                            this.slice_from("c");
                        }
                    }
                    break lab22;
                }
                this.c = this.limit - v_11;
                const /**@type {number}*/ v_31 = this.limit - this.c;
                // deno-lint-ignore no-unused-labels
                lab49: {
                    this.ket = this.c;
                    if (!(this.eq_s_b("s"))) {
                        this.c = this.limit - v_31;
                        break lab49;
                    }
                    this.bra = this.c;
                    const /**@type {number}*/ v_32 = this.limit - this.c;
                    // deno-lint-ignore no-unused-labels
                    lab50: {
                        // deno-lint-ignore no-unused-labels
                        lab51: {
                            if (!(this.eq_s_b("Hi"))) break lab51;
                            break lab50;
                        }
                        if (!(this.out_grouping_b(g_keep_with_s, 97, 232))) {
                            this.c = this.limit - v_31;
                            break lab49;
                        }
                    }
                    this.c = this.limit - v_32;
                    this.slice_del();
                }
                if (this.c < I_pV) break lab21;
                const /**@type {number}*/ v_33 = this.limit_backward;
                this.limit_backward = I_pV;
                this.ket = this.c;
                a = this.find_among_b(a_8);
                if (a === 0) {
                    this.limit_backward = v_33;
                    break lab21;
                }
                this.bra = this.c;
                switch (a) {
                    case 1: {
                        if (/**@type {boolean}*/(I_p2 > this.c)) {
                            this.limit_backward = v_33;
                            break lab21;
                        }
                        // deno-lint-ignore no-unused-labels
                        lab52: {
                            // deno-lint-ignore no-unused-labels
                            lab53: {
                                if (!(this.eq_s_b("s"))) break lab53;
                                break lab52;
                            }
                            if (!(this.eq_s_b("t"))) {
                                this.limit_backward = v_33;
                                break lab21;
                            }
                        }
                        this.slice_del();
                        break;
                    }
                    case 2: {
                        this.slice_from("i");
                        break;
                    }
                    case 3: {
                        this.slice_del();
                        break;
                    }
                }
                this.limit_backward = v_33;
            }
        }
        this.c = this.limit - v_10;
        const /**@type {number}*/ v_34 = this.limit - this.c;
        // deno-lint-ignore no-unused-labels
        lab54: {
            const /**@type {number}*/ v_35 = this.limit - this.c;
            if (this.find_among_b(a_9) === 0) break lab54;
            this.c = this.limit - v_35;
            this.ket = this.c;
            if (this.c <= this.limit_backward) break lab54;
            this.c--;
            this.bra = this.c;
            this.slice_del();
        }
        this.c = this.limit - v_34;
        const /**@type {number}*/ v_36 = this.limit - this.c;
        // deno-lint-ignore no-unused-labels
        lab55: {
            {
                let v_37 = 1;
                while (true) {
                    // deno-lint-ignore no-unused-labels
                    lab56: {
                        if (!(this.out_grouping_b(g_v, 97, 251))) break lab56;
                        v_37--;
                        continue;
                    }
                    break;
                }
                if (v_37 > 0) break lab55;
            }
            this.ket = this.c;
            // deno-lint-ignore no-unused-labels
            lab57: {
                // deno-lint-ignore no-unused-labels
                lab58: {
                    if (!(this.eq_s_b("\u00E9"))) break lab58;
                    break lab57;
                }
                if (!(this.eq_s_b("\u00E8"))) break lab55;
            }
            this.bra = this.c;
            this.slice_from("e");
        }
        this.c = this.limit - v_36;
        this.c = this.limit_backward;
        const /**@type {number}*/ v_38 = this.c;
        // deno-lint-ignore no-unused-labels
        lab59: {
            while (true) {
                const /**@type {number}*/ v_39 = this.c;
                // deno-lint-ignore no-unused-labels
                lab60: {
                    this.bra = this.c;
                    a = this.find_among(a_1);
                    this.ket = this.c;
                    switch (a) {
                        case 1: {
                            this.slice_from("i");
                            break;
                        }
                        case 2: {
                            this.slice_from("u");
                            break;
                        }
                        case 3: {
                            this.slice_from("y");
                            break;
                        }
                        case 4: {
                            this.slice_from("\u00EB");
                            break;
                        }
                        case 5: {
                            this.slice_from("\u00EF");
                            break;
                        }
                        case 6: {
                            this.slice_del();
                            break;
                        }
                        case 7: {
                            if (this.c >= this.limit) break lab60;
                            this.c++;
                            break;
                        }
                    }
                    continue;
                }
                this.c = v_39;
                break;
            }
        }
        this.c = v_38;
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

