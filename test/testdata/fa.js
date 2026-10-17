module.exports = {
    fields: [
        {
            name: 'title',
            config: { boost: 10 }
        }, {
            name: 'body'
        }
    ],
    documents: [
        {
            "title": "لورم ایپسوم فارسی",
            "body": "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.",
            "id": 1
        }, {
            "title": "متن ادبی و آموزنده",
            "body": "مهم بودن را فراموش کنید تا آرامش نصیبتان شود. به یاد داشته باشید هر چه کمتر نیازمند تحسین دیگران باشید؛بیشتر تحسین میشوید. گاهی برتر بودن را به دیگران واگذار کنید و خوشبخت زندگی کنید. فراموش نکنید هر گز نمیتوانید عیب خود را با عیب جویی دیگران رفع کنید. یادتان باشد هر گاه در کار یا تصمیمی همه با شما هم عقیده اند یقین بدانید که اشتباه می کنید. اگر در مورد مردم قضاوت کنید دیگر وقتی برای رفع عیوب خود و دوست داشتن دیگران نخواهید داشت. انسان بسان رودخانه ایست؛هر چه عمیقتر باشد آرامتر است.تنها بک راه بسوی بهشت وجود دارد که در زمین آن را عشق مینامیم. او که برای ثروتمند شدن تعجیل میکند پاکدامن نخواهد ماند. تنفر از افراد؛مانند آن است که برای خلاص شدن از دست موش خانه اتان را آتش بزنید. آگاه باشید خنده و شادمانی بهترین نیایش جهان هستی است و نزدیکترین راه بسوی خداوند. انسان شاد دیگران را آزار نمیدهد بلکه آنها را نیز در شادی خود سهیم میکند. شاد باشيد و شاد زندگي كنيد",
            "id": 2
        }, {
            "title":"ایـــــــــــــــران",
            "body": "جمهوی اسلامی ایران در جنوب غرب آسیا واقع شده است.",
            "id": 3
        }, {
            "title": "بازار کتاب",
            "body": "این کتاب‌ها را از بازار خریدم. گوشی Samsung من خاموش شد و آب سرد خوردم.",
            "id": 4
        }, {
            // typed with an Arabic keyboard: Arabic yeh (ي) and kaf (ك)
            "title": "ميز كار",
            "body": "اين ميز براي كار در خانه است.",
            "id": 5
        }, {
            "title": "گوش",
            "body": "گوش اندام شنوایی است.",
            "id": 6
        }
    ],
    tests: [
        {
            what: "find the word %w",
            search: "فارسی",
            found: 1
        }, {
            what: "never find a word that does not exist, like %w",
            search: "استعمال",
            found: 0
        }, {
            what: "never find a word that does not exist, like %w",
            search: "بطيخ",
            found: 0
        }, {
            what: "find a word regardless of the differences in the number of expansions it has between it in the search and in the document, like %w",
            search: "ایــــــــران",
            found: 1
        }, {
            what: "find a word typed with Arabic kaf, like %w, in Persian documents",
            search: "كتاب",
            found: 2
        }, {
            what: "find a word typed with Persian yeh, like %w, in documents typed with Arabic yeh",
            search: "میز",
            found: 1
        }, {
            what: "find the singular from a plural with a half-space, like %w",
            search: "کتاب‌ها",
            found: 2
        }, {
            what: "find the plural with a half-space from a plural without one, like %w",
            search: "کتابها",
            found: 2
        }, {
            what: "find a word with alef madda when it is typed without, like %w",
            search: "اسیا",
            found: 1
        }, {
            what: "find a word with alef madda when it is typed with it, like %w",
            search: "آسیا",
            found: 1
        }, {
            what: "find the word %w",
            search: "بازار",
            found: 1
        }, {
            what: "not stem a word into an unrelated word, so that %w does not find بازار",
            search: "زار",
            found: 0
        }, {
            what: "keep %w (phone) apart from گوش (ear)",
            search: "گوشی",
            found: 1
        }, {
            what: "find an English word in a Persian document, like %w",
            search: "samsung",
            found: 1
        }, {
            what: "find a word with a wildcard typed with Arabic kaf, like %w",
            search: "كتا*",
            found: 2
        }
    ]
}
