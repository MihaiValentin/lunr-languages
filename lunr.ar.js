!function (e, r) {
    "function" == typeof define && define.amd ? define(r) : "object" == typeof exports ? module.exports = r() : r()(e.lunr)
}
(this, function () {
    return function (e) {
        if (void 0 === e)
            throw new Error("Lunr is not present. Please include / require Lunr before this script.");
        if (void 0 === e.stemmerSupport)
            throw new Error("Lunr stemmer support is not present. Please include / require Lunr stemmer support before this script.");
        e.ar = function () {
            this.pipeline.reset(),
            this.pipeline.add(e.ar.trimmer, e.ar.stopWordFilter, e.ar.stemmer),
            this.searchPipeline && (this.searchPipeline.reset(), this.searchPipeline.add(e.ar.stemmer))
        },
        e.ar.wordCharacters = "ء-ٛٱـa-zA-Z0-9",
        e.ar.trimmer = e.trimmerSupport.generateTrimmer(e.ar.wordCharacters),
        e.Pipeline.registerFunction(e.ar.trimmer, "trimmer-ar"),
        e.ar.stemmer = function () {
            var e = this;
            return e.result = !1,
            e.preRemoved = !1,
            e.sufRemoved = !1,
            e.pre = {
                pre1: "ف ك ب و س ل ن ا ي ت",
                pre2: "ال لل",
                pre3: "بال وال فال تال كال ولل",
                pre4: "فبال كبال وبال وكال"
            },
            e.suf = {
                suf1: "ه ك ت ن ا ي",
                suf2: "نك نه ها وك يا اه ون ين تن تم نا وا ان كم كن ني نن ما هم هن تك ته ات يه",
                suf3: "تين كهم نيه نهم ونه وها يهم ونا ونك وني وهم تكم تنا تها تني تهم كما كها ناه نكم هنا تان يها",
                suf4: "كموه ناها ونني ونهم تكما تموه تكاه كماه ناكم ناهم نيها وننا"
            },
            e.patterns = JSON.parse('{"pt43":[{"pt":[{"c":"ا","l":1}]},{"pt":[{"c":"ا,ت,ن,ي","l":0}],"mPt":[{"c":"ف","l":0,"m":1},{"c":"ع","l":1,"m":2},{"c":"ل","l":2,"m":3}]},{"pt":[{"c":"و","l":2}],"mPt":[{"c":"ف","l":0,"m":0},{"c":"ع","l":1,"m":1},{"c":"ل","l":2,"m":3}]},{"pt":[{"c":"ا","l":2}]},{"pt":[{"c":"ي","l":2}],"mPt":[{"c":"ف","l":0,"m":0},{"c":"ع","l":1,"m":1},{"c":"ا","l":2},{"c":"ل","l":3,"m":3}]},{"pt":[{"c":"م","l":0}]}],"pt53":[{"pt":[{"c":"ت","l":0},{"c":"ا","l":2}]},{"pt":[{"c":"ا,ن,ت,ي","l":0},{"c":"ت","l":2}],"mPt":[{"c":"ا","l":0},{"c":"ف","l":1,"m":1},{"c":"ت","l":2},{"c":"ع","l":3,"m":3},{"c":"ا","l":4},{"c":"ل","l":5,"m":4}]},{"pt":[{"c":"ا","l":0},{"c":"ا","l":2}],"mPt":[{"c":"ا","l":0},{"c":"ف","l":1,"m":1},{"c":"ع","l":2,"m":3},{"c":"ل","l":3,"m":4},{"c":"ا","l":4},{"c":"ل","l":5,"m":4}]},{"pt":[{"c":"ا","l":0},{"c":"ا","l":3}],"mPt":[{"c":"ف","l":0,"m":1},{"c":"ع","l":1,"m":2},{"c":"ل","l":2,"m":4}]},{"pt":[{"c":"ا","l":3},{"c":"ن","l":4}]},{"pt":[{"c":"ت","l":0},{"c":"ي","l":3}]},{"pt":[{"c":"م","l":0},{"c":"و","l":3}]},{"pt":[{"c":"ا","l":1},{"c":"و","l":3}]},{"pt":[{"c":"و","l":1},{"c":"ا","l":2}]},{"pt":[{"c":"م","l":0},{"c":"ا","l":3}]},{"pt":[{"c":"م","l":0},{"c":"ي","l":3}]},{"pt":[{"c":"ا","l":2},{"c":"ن","l":3}]},{"pt":[{"c":"م","l":0},{"c":"ن","l":1}],"mPt":[{"c":"ا","l":0},{"c":"ن","l":1},{"c":"ف","l":2,"m":2},{"c":"ع","l":3,"m":3},{"c":"ا","l":4},{"c":"ل","l":5,"m":4}]},{"pt":[{"c":"م","l":0},{"c":"ت","l":2}],"mPt":[{"c":"ا","l":0},{"c":"ف","l":1,"m":1},{"c":"ت","l":2},{"c":"ع","l":3,"m":3},{"c":"ا","l":4},{"c":"ل","l":5,"m":4}]},{"pt":[{"c":"م","l":0},{"c":"ا","l":2}]},{"pt":[{"c":"م","l":1},{"c":"ا","l":3}]},{"pt":[{"c":"ي,ت,ا,ن","l":0},{"c":"ت","l":1}],"mPt":[{"c":"ف","l":0,"m":2},{"c":"ع","l":1,"m":3},{"c":"ا","l":2},{"c":"ل","l":3,"m":4}]},{"pt":[{"c":"ت,ي,ا,ن","l":0},{"c":"ت","l":2}],"mPt":[{"c":"ا","l":0},{"c":"ف","l":1,"m":1},{"c":"ت","l":2},{"c":"ع","l":3,"m":3},{"c":"ا","l":4},{"c":"ل","l":5,"m":4}]},{"pt":[{"c":"ا","l":2},{"c":"ي","l":3}]},{"pt":[{"c":"ا,ي,ت,ن","l":0},{"c":"ن","l":1}],"mPt":[{"c":"ا","l":0},{"c":"ن","l":1},{"c":"ف","l":2,"m":2},{"c":"ع","l":3,"m":3},{"c":"ا","l":4},{"c":"ل","l":5,"m":4}]},{"pt":[{"c":"ا","l":3},{"c":"ء","l":4}]}],"pt63":[{"pt":[{"c":"ا","l":0},{"c":"ت","l":2},{"c":"ا","l":4}]},{"pt":[{"c":"ا,ت,ن,ي","l":0},{"c":"س","l":1},{"c":"ت","l":2}],"mPt":[{"c":"ا","l":0},{"c":"س","l":1},{"c":"ت","l":2},{"c":"ف","l":3,"m":3},{"c":"ع","l":4,"m":4},{"c":"ا","l":5},{"c":"ل","l":6,"m":5}]},{"pt":[{"c":"ا,ن,ت,ي","l":0},{"c":"و","l":3}]},{"pt":[{"c":"م","l":0},{"c":"س","l":1},{"c":"ت","l":2}],"mPt":[{"c":"ا","l":0},{"c":"س","l":1},{"c":"ت","l":2},{"c":"ف","l":3,"m":3},{"c":"ع","l":4,"m":4},{"c":"ا","l":5},{"c":"ل","l":6,"m":5}]},{"pt":[{"c":"ي","l":1},{"c":"ي","l":3},{"c":"ا","l":4},{"c":"ء","l":5}]},{"pt":[{"c":"ا","l":0},{"c":"ن","l":1},{"c":"ا","l":4}]}],"pt54":[{"pt":[{"c":"ت","l":0}]},{"pt":[{"c":"ا,ي,ت,ن","l":0}],"mPt":[{"c":"ا","l":0},{"c":"ف","l":1,"m":1},{"c":"ع","l":2,"m":2},{"c":"ل","l":3,"m":3},{"c":"ر","l":4,"m":4},{"c":"ا","l":5},{"c":"ر","l":6,"m":4}]},{"pt":[{"c":"م","l":0}],"mPt":[{"c":"ا","l":0},{"c":"ف","l":1,"m":1},{"c":"ع","l":2,"m":2},{"c":"ل","l":3,"m":3},{"c":"ر","l":4,"m":4},{"c":"ا","l":5},{"c":"ر","l":6,"m":4}]},{"pt":[{"c":"ا","l":2}]},{"pt":[{"c":"ا","l":0},{"c":"ن","l":2}]}],"pt64":[{"pt":[{"c":"ا","l":0},{"c":"ا","l":4}]},{"pt":[{"c":"م","l":0},{"c":"ت","l":1}]}],"pt73":[{"pt":[{"c":"ا","l":0},{"c":"س","l":1},{"c":"ت","l":2},{"c":"ا","l":5}]}],"pt75":[{"pt":[{"c":"ا","l":0},{"c":"ا","l":5}]}]}'),
            e.execArray = ["cleanWord", "removeDiacritics", "cleanAlef", "removeStopWords", "normalizeHamzaAndAlef", "removeStartWaw", "removePre432", "removeEndTaa", "wordCheck"],
            e.stem = function () {
                var r = 0;
                for (e.result = !1, e.preRemoved = !1, e.sufRemoved = !1; r < e.execArray.length && 1 != e.result; )
                    e.result = e[e.execArray[r]](), r++
            },
            e.setCurrent = function (r) {
                e.word = r
            },
            e.getCurrent = function () {
                return e.word
            },
            e.cleanWord = function () {
                var r = new RegExp("[^ء-ٛٱـ]");
                return e.word = e.word.replace("ـ", ""),
                !!r.test("")
            },
            e.removeDiacritics = function () {
                new RegExp("[ً-ٛ]");
                return e.word = e.word.replace(/[\u064b-\u065b]/gi, ""),
                !1
            },
            e.cleanAlef = function () {
                var r = new RegExp("[آأإٱى]");
                return e.word = e.word.replace(r, "ا"),
                !1
            },
            e.removeStopWords = function () {
                if ("، اض امين اه اها اي ا اب اجل اجمع اخ اخذ اصبح اضحى اقبل اقل اكثر الا ام اما امامك امامك امسى اما ان انا انت انتم انتما انتن انت انشا انى او اوشك اولئك اولئكم اولاء اولالك اوه اي ايا اين اينما اي ان اي اف اذ اذا اذا اذما اذن الى اليكم اليكما اليكن اليك اليك الا اما ان انما اي اياك اياكم اياكما اياكن ايانا اياه اياها اياهم اياهما اياهن اياي ايه ان ا ابتدا اثر اجل احد اخرى اخلولق اذا اربعة ارتد استحال اطار اعادة اعلنت اف اكثر اكد الالاء الالى الا الاخيرة الان الاول الاولى التى التي الثاني الثانية الذاتي الذى الذي الذين السابق الف اللائي اللاتي اللتان اللتيا اللتين اللذان اللذين اللواتي الماضي المقبل الوقت الى اليوم اما امام امس ان انبرى انقلب انه انها او اول اي ايار ايام ايضا ب بات باسم بان بخ برس بسبب بس بشكل بضع بطان بعد بعض بك بكم بكما بكن بل بلى بما بماذا بمن بن بنا به بها بي بيد بين بس بله بئس تان تانك تبدل تجاه تحول تلقاء تلك تلكم تلكما تم تينك تين ته تي ثلاثة ثم ثم ثمة ثم جعل جلل جميع جير حار حاشا حاليا حاي حتى حرى حسب حم حوالى حول حيث حيثما حين حي حبذا حتى حذار خلا خلال دون دونك ذا ذات ذاك ذانك ذان ذلك ذلكم ذلكما ذلكن ذو ذوا ذواتا ذواتي ذيت ذينك ذين ذه ذي راح رجع رويدك ريث رب زيارة سبحان سرعان سنة سنوات سوف سوى ساء ساءما شبه شخصا شرع شتان صار صباح صفر صه صه ضد ضمن طاق طالما طفق طق ظل عاد عام عاما عامة عدا عدة عدد عدم عسى عشر عشرة علق على عليك عليه عليها عل عن عند عندما عوض عين عدس عما غدا غير  ف فان فلان فو فى في فيم فيما فيه فيها قال قام قبل قد قط قلما قوة كانما كاين كاي كاين كاد كان كانت كذا كذلك كرب كل كلا كلاهما كلتا كلم كليكما كليهما كلما كلا كم كما كي كيت كيف كيفما كان كخ لئن لا لات لاسيما لدن لدى لعمر لقاء لك لكم لكما لكن لكنما لكي لكيلا للامم لم لما لما لن لنا له لها لو لوكالة لولا لوما لي لست لست لستم لستما لستن لست لسن لعل لكن ليت ليس ليسا ليستا ليست ليسوا لسنا ما ماانفك مابرح مادام ماذا مازال مافتئ مايو متى مثل مذ مساء مع معاذ مقابل مكانكم مكانكما مكانكن مكانك مليار مليون مما ممن من منذ منها مه مهما من من نحن نحو نعم نفس نفسه نهاية نخ نعما نعم ها هاؤم هاك هاهنا هب هذا هذه هكذا هل هلم هلا هم هما هن هنا هناك هنالك هو هي هيا هيت هيا هؤلاء هاتان هاتين هاته هاتي هج هذا هذان هذين هذه هذي هيهات و وا واحد واضاف واضافت واكد وان واها واوضح وراءك وفي وقال وقالت وقد وقف وكان وكانت ولا ولم ومن وهو وهي ويكان وي وشكان يكون يمكن يوم ايان".split(" ").indexOf(e.word) >= 0)
                    return !0
            },
            e.normalizeHamzaAndAlef = function () {
                return e.word = e.word.replace("ؤ", "ء"),
                e.word = e.word.replace("ئ", "ء"),
                e.word = e.word.replace(/([\u0627])\1+/gi, "ا"),
                !1
            },
            e.removeEndTaa = function () {
                return !(e.word.length > 2) || (e.word = e.word.replace(/[\u0627]$/, ""), e.word = e.word.replace("ة", ""), !1)
            },
            e.removeStartWaw = function () {
                return e.word.length > 3 && "و" == e.word[0] && "و" == e.word[1] && (e.word = e.word.slice(1)),
                !1
            },
            e.removePre432 = function () {
                var r = e.word;
                if (e.word.length >= 7) {
                    var t = new RegExp("^(" + e.pre.pre4.split(" ").join("|") + ")");
                    e.word = e.word.replace(t, "")
                }
                if (e.word == r && e.word.length >= 6) {
                    var c = new RegExp("^(" + e.pre.pre3.split(" ").join("|") + ")");
                    e.word = e.word.replace(c, "")
                }
                if (e.word == r && e.word.length >= 5) {
                    var l = new RegExp("^(" + e.pre.pre2.split(" ").join("|") + ")");
                    e.word = e.word.replace(l, "")
                }
                return r != e.word && (e.preRemoved = !0),
                !1
            },
            e.patternCheck = function (r) {
                for (var t = 0; t < r.length; t++) {
                    for (var c = !0, l = 0; l < r[t].pt.length; l++) {
                        var o = r[t].pt[l].c.split(","),
                        n = !1;
                        if (o.forEach(function (c) {
                                e.word[r[t].pt[l].l] == c && (n = !0)
                            }), !n) {
                            c = !1;
                            break
                        }
                    }
                    if (1 == c) {
                        if (r[t].mPt) {
                            for (var p = [], m = 0; m < r[t].mPt.length; m++)
                                null != r[t].mPt[m].m ? p[r[t].mPt[m].l] = e.word[r[t].mPt[m].m] : p[r[t].mPt[m].l] = r[t].mPt[m].c;
                            e.word = p.join("")
                        }
                        e.result = !0;
                        break
                    }
                }
            },
            e.removePre1 = function () {
                var r = e.word;
                if (0 == e.preRemoved && e.word.length > 3) {
                    var t = new RegExp("^(" + e.pre.pre1.split(" ").join("|") + ")");
                    e.word = e.word.replace(t, "")
                }
                return r != e.word && (e.preRemoved = !0),
                !1
            },
            e.removeSuf1 = function () {
                var r = e.word;
                if (0 == e.sufRemoved && e.word.length > 3) {
                    var t = new RegExp("(" + e.suf.suf1.split(" ").join("|") + ")$");
                    e.word = e.word.replace(t, "")
                }
                return r != e.word && (e.sufRemoved = !0),
                !1
            },
            e.removeSuf432 = function () {
                var r = e.word;
                if (e.word.length >= 6) {
                    var t = new RegExp("(" + e.suf.suf4.split(" ").join("|") + ")$");
                    e.word = e.word.replace(t, "")
                }
                if (e.word == r && e.word.length >= 5) {
                    var c = new RegExp("(" + e.suf.suf3.split(" ").join("|") + ")$");
                    e.word = e.word.replace(c, "")
                }
                if (e.word == r && e.word.length >= 4) {
                    var l = new RegExp("(" + e.suf.suf2.split(" ").join("|") + ")$");
                    e.word = e.word.replace(l, "")
                }
                return r != e.word && (e.sufRemoved = !0),
                !1
            },
            e.wordCheck = function () {
                for (var r = (e.word, [e.removeSuf432, e.removeSuf1, e.removePre1]), t = 0, c = !1; e.word.length >= 7 && !e.result && t < r.length; )
                    7 != e.word.length || c ? (r[t](), t++, c = !1) : (e.checkPattern73(), c = !0);
                var l = [e.checkPattern63, e.removeSuf432, e.removeSuf1, e.removePre1, e.checkPattern64];
                for (t = 0; 6 == e.word.length && !e.result && t < l.length; )
                    l[t](), t++;
                var o = [e.checkPattern53, e.removeSuf432, e.removeSuf1, e.removePre1, e.checkPattern54];
                for (t = 0; 5 == e.word.length && !e.result && t < o.length; )
                    o[t](), t++;
                var n = [e.checkPattern43, e.removeSuf1, e.removePre1, e.removeSuf432];
                for (t = 0; 4 == e.word.length && !e.result && t < n.length; )
                    n[t](), t++;
                return !0
            },
            e.checkPattern43 = function () {
                e.patternCheck(e.patterns.pt43)
            },
            e.checkPattern53 = function () {
                e.patternCheck(e.patterns.pt53)
            },
            e.checkPattern54 = function () {
                e.patternCheck(e.patterns.pt54)
            },
            e.checkPattern63 = function () {
                e.patternCheck(e.patterns.pt63)
            },
            e.checkPattern64 = function () {
                e.patternCheck(e.patterns.pt64)
            },
            e.checkPattern73 = function () {
                e.patternCheck(e.patterns.pt73)
            },
            function (r) {
                return "function" == typeof r.update ? r.update(function (r) {
                    return e.setCurrent(r),
                    e.stem(),
                    e.getCurrent()
                }) : (e.setCurrent(r), e.stem(), e.getCurrent())
            }
        }
        (),
        e.Pipeline.registerFunction(e.ar.stemmer, "stemmer-ar"),
        e.ar.stopWordFilter = e.generateStopWordFilter("، اض امين اه اها اي ا اب اجل اجمع اخ اخذ اصبح اضحى اقبل اقل اكثر الا ام اما امامك امامك امسى اما ان انا انت انتم انتما انتن انت انشا انى او اوشك اولئك اولئكم اولاء اولالك اوه اي ايا اين اينما اي ان اي اف اذ اذا اذا اذما اذن الى اليكم اليكما اليكن اليك اليك الا اما ان انما اي اياك اياكم اياكما اياكن ايانا اياه اياها اياهم اياهما اياهن اياي ايه ان ا ابتدا اثر اجل احد اخرى اخلولق اذا اربعة ارتد استحال اطار اعادة اعلنت اف اكثر اكد الالاء الالى الا الاخيرة الان الاول الاولى التى التي الثاني الثانية الذاتي الذى الذي الذين السابق الف اللائي اللاتي اللتان اللتيا اللتين اللذان اللذين اللواتي الماضي المقبل الوقت الى اليوم اما امام امس ان انبرى انقلب انه انها او اول اي ايار ايام ايضا ب بات باسم بان بخ برس بسبب بس بشكل بضع بطان بعد بعض بك بكم بكما بكن بل بلى بما بماذا بمن بن بنا به بها بي بيد بين بس بله بئس تان تانك تبدل تجاه تحول تلقاء تلك تلكم تلكما تم تينك تين ته تي ثلاثة ثم ثم ثمة ثم جعل جلل جميع جير حار حاشا حاليا حاي حتى حرى حسب حم حوالى حول حيث حيثما حين حي حبذا حتى حذار خلا خلال دون دونك ذا ذات ذاك ذانك ذان ذلك ذلكم ذلكما ذلكن ذو ذوا ذواتا ذواتي ذيت ذينك ذين ذه ذي راح رجع رويدك ريث رب زيارة سبحان سرعان سنة سنوات سوف سوى ساء ساءما شبه شخصا شرع شتان صار صباح صفر صه صه ضد ضمن طاق طالما طفق طق ظل عاد عام عاما عامة عدا عدة عدد عدم عسى عشر عشرة علق على عليك عليه عليها عل عن عند عندما عوض عين عدس عما غدا غير  ف فان فلان فو فى في فيم فيما فيه فيها قال قام قبل قد قط قلما قوة كانما كاين كاي كاين كاد كان كانت كذا كذلك كرب كل كلا كلاهما كلتا كلم كليكما كليهما كلما كلا كم كما كي كيت كيف كيفما كان كخ لئن لا لات لاسيما لدن لدى لعمر لقاء لك لكم لكما لكن لكنما لكي لكيلا للامم لم لما لما لن لنا له لها لو لوكالة لولا لوما لي لست لست لستم لستما لستن لست لسن لعل لكن ليت ليس ليسا ليستا ليست ليسوا لسنا ما ماانفك مابرح مادام ماذا مازال مافتئ مايو متى مثل مذ مساء مع معاذ مقابل مكانكم مكانكما مكانكن مكانك مليار مليون مما ممن من منذ منها مه مهما من من نحن نحو نعم نفس نفسه نهاية نخ نعما نعم ها هاؤم هاك هاهنا هب هذا هذه هكذا هل هلم هلا هم هما هن هنا هناك هنالك هو هي هيا هيت هيا هؤلاء هاتان هاتين هاته هاتي هج هذا هذان هذين هذه هذي هيهات وا واحد واضاف واضافت واكد وان واها واوضح وراءك وفي وقال وقالت وقد وقف وكان وكانت ولا ولم ومن وهو وهي ويكان وي وشكان يكون يمكن يوم ايان".split(" ")),
        e.Pipeline.registerFunction(e.ar.stopWordFilter, "stopWordFilter-ar")
    }
});
