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
            "title": "test",
            "body": "Դուք չեք կարող փորձել աղալ միսը պատահականորեն, քանի որ ոչ բոլոր միսն է նույնը: Օրինակ՝ խոզի փորը աղալիս կարեւոր բաներ կան։",
            "id": 1
        }, {
            "title": "թեստ",
            "body": "test Այն չի տրամադրում կորեերեն stop լեզվի տվյալներ: Դա պայմանավորված է նրանով, որ դուք կարող եք հեռացնել անհարկի հետաքննությունները եւ զուգակցումները տոկենիզացիայի փուլում:",
            "id": 2
        }, 
    ],
    tests: [
        {
            what: "find the word %w",
            search: "test",
            found: 2
        }, {
            what: "find the word %w",
            search: "միսը",
            found: 1
        }, {
            what: "never find a word that does not exist, like %w",
            search: "ձուկ",
            found: 0
        }
    ]
}
