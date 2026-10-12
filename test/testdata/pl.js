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
            "title": "Rower",
            "body": "Rowerami można podróżować po mieście i po lesie. Zielonego roweru używa wielu turystów.",
            "id": 1
        }, {
            "title": "Programowanie",
            "body": "Programowanie obiektowe pomaga w projektowaniu systemów. Programowania uczą się studenci.",
            "id": 2
        }
    ],
    tests: [
        {
            what: "find the word %w",
            search: "rower*",
            found: 1
        }, {
            what: "find the word %w",
            search: "turystów",
            found: 1
        }, {
            what: "never find a word that does not exist, like %w",
            search: "nieistniejace",
            found: 0
        }, {
            what: "find a correctly stemmed word %w",
            search: "zielony",
            found: 1
        }, {
            what: "find a correctly stemmed word %w",
            search: "programowania",
            found: 1
        }
    ]
}