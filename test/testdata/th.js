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
            "title": "สวัสดี",
            "body" : "สวัสดีชาวโลก",
            "id": 1
        }, {
            "title": "ฉัน",
            "body" : "ชาวบ้านกล่าวพร้อมกันว่าสวัสดี",
            "id": 2
        }
    ],
    tests: [
        {
            what: "find the word %w",
            search: "สวัสดี",
            found: 2
        }, {
            what: "find the word %w",
            search: "บ้าน",
            found: 1
        }, {
            what: "never find a word that does not exist, like %w",
            search: "เบื่อ",
            found: 0
        } 
        /*
        {
            what: "find a correctly stemmed word %w",
            search: "opparbeider",
            found: 1
        }
        */
    ]
}
