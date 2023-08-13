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
            "title": "בקשה צנועה",
            "body": "יש לי בקשה צנועה שתמשיכו להדריך בזה אותנו בעתיד עם ההצעות והתגובות שלכם. תודה רבה",
            "id": 1
        }
    ],
    tests: [
        {
            what: "find the word %w",
            search: "בקשה",
            found: 1
        },
        {
            what: "find the word %w",
            search: "בזה",
            found: 1
        },
        {
            what: "never find a word that does not exist, like %w",
            search: "לא קיים",
            found: 0
        },
        {
            what: "find the word %w",
            search: "בעתיד",
            found: 1
        },
        {
            what: "find the word %w",
            search: "להדריך",
            found: 1
        },
        {
            what: "find a phrase that contains both %w",
            search: "בקשה צנועה",
            found: 1
        }
    ]
}
