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
            "title": "Barcelona",
            "body": "Barcelona és la capital de Catalunya. Les cançons populars de la ciutat parlen del mar i de les muntanyes.",
            "id": 1
        }, {
            "title": "El museu",
            "body": "La història de l’home i la col·lecció del museu d'art ocupen tres sales.",
            "id": 2
        }
    ],
    tests: [
        {
            what: "find the word %w",
            search: "Barcelona",
            found: 1
        }, {
            what: "find an inflected form, like %w for cançons",
            search: "cançons",
            found: 1
        }, {
            what: "find a word typed without accents, like %w for història",
            search: "historia",
            found: 1
        }, {
            what: "find a word after an elided article, like %w for l’home",
            search: "home",
            found: 1
        }, {
            what: "find a word with the punt volat typed as a period or left out, like %w for col·lecció",
            search: "colleccio",
            found: 1
        }, {
            what: "never find a word that does not exist, like %w",
            search: "inexistent",
            found: 0
        }, {
            what: "do not find the stop word %w",
            search: "de",
            found: 0
        }
    ]
}
