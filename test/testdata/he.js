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
            "body": "יש לי בקשה צנועה שתמשיכו להדריך אותנו בעתיד עם ההצעות והתגובות שלכם. תודה רבה",
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
            search: "תודה רבה",
            found: 1
        },
        {
            what: "never find a word that does not exist, like %w",
            search: "לא קיים",
            found: 0
        },
        {
            what: "find the word %w",
            search: "עתיד",
            found: 1
        },
        {
            what: "find the word %w",
            search: "הדריך",
            found: 1
        },
        {
            what: "find a phrase that contains both %w and %w",
            search: "בקשה צנועה",
            found: 1
        },
        {
            what: "find a word with different casing, like %w",
            search: "תודה רבה",
            found: 1
        }
    ]
}
