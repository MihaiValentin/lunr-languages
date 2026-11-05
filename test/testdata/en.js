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
            "title": "England",
            "body": "England is a country that is part of the United Kingdom. It shares land borders with Wales to its west and Scotland to its north. The Irish Sea lies northwest of England and the Celtic Sea to the southwest. England is separated from continental Europe by the North Sea to the east and the English Channel to the south. The country covers five-eighths of the island of Great Britain, which lies in the North Atlantic, and includes over 100 smaller islands, such as the Isles of Scilly and the Isle of Wight.",
            "id": 1
        }, {
            "title": "Economy",
            "body": "England's economy is one of the largest and most dynamic in the world. London is home to the London Stock Exchange, generously supported by the financial services that dominate the city. Manufacturing, however, remains a significant part of the economy. The café on the corner doesn't open on Sundays.",
            "id": 2
        }
    ],
    tests: [
        {
            what: "find the word %w",
            search: "England*",
            found: 2
        }, {
            what: "find the word %w",
            search: "economy",
            found: 1
        }, {
            what: "never find a word that does not exist, like %w",
            search: "inexistent",
            found: 0
        }, {
            what: "find a correctly stemmed word %w",
            search: "islanders",
            found: 1
        }, {
            what: "find a word stemmed by Porter2, but not by lunr's Porter stemmer, %w",
            search: "generous",
            found: 1
        }, {
            what: "not conflate words that lunr's Porter stemmer conflates, like %w",
            search: "general",
            found: 0
        }, {
            what: "find a word with an accent, like %w",
            search: "café",
            found: 1
        }, {
            what: "not find a stop word from Snowball's list, like %w",
            search: "doesn't",
            found: 0
        }
    ]
}
