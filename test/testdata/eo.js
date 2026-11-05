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
            "title": "Esperanto",
            "body": "Esperanto estas planlingvo. La esperantistoj loĝas en multaj landoj kaj kantas belajn kantojn.",
            "id": 1
        }, {
            "title": "La ŝipo",
            "body": "La ĉambroj de la ŝipo estas malgrandaj, sed ni manĝas en la granda ĉambro.",
            "id": 2
        }
    ],
    tests: [
        {
            what: "find the word %w",
            search: "Esperanto",
            found: 1
        }, {
            what: "find an inflected form, like %w for ĉambroj",
            search: "ĉambro",
            found: 1
        }, {
            what: "find a word typed without its diacritics, like %w for ŝipo",
            search: "sipo",
            found: 1
        }, {
            what: "find a word typed in the x-system, like %w for manĝas",
            search: "mangxi",
            found: 1
        }, {
            what: "never find a word that does not exist, like %w",
            search: "inexistent",
            found: 0
        }, {
            what: "do not find the stop word %w",
            search: "estas",
            found: 0
        }
    ]
}
