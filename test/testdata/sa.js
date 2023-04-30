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
            "title": "संस्कृत क्षेत्र",
            "body": "रामो सीतया सह वनम् अयोध्याया गच्छति। रामो योधः। अयि गिरिनन्दिनि नन्दितमेदिनि विश्वविनोदिनि नन्दिनुते। सहस्रशीर्षा पुरुषः सहस्राक्षः सहस्रपात्",
            "id": 1
        }
    ],
    tests: [
        {
            what: "find the word %w",
            search: "सहस्रशीर्षा",
            found: 1
        },
        {
            what: "find the word %w",
            search: "योधः।",
            found: 1
        },
        {
            what: "never find a word that does not exist, like %w",
            search: "व्याकरण",
            found: 0
        }, 
        {
            what: "never find a word that does not exist, like %w",
            search: "रामः",
            found: 0
        }
    ]
}