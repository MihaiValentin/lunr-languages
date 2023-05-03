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
            "title": "సంస్కృత క్షేత్రం",
            "body": "రామో సీతయా సః వనం అయోధ్యాయ గచ్ఛతి । రామో యోధః. అయి గిరినందిని నందితమేదిని విశ్వవినోదిని నందినుతే. సహస్రశీర్ష పురుషః సహస్రాక్షః సహస్రపాత్",
            "id": 1
        }
    ],
    tests: [
        {
            what: "find the word %w",
            search: "వనం",
            found: 1
        },
        {
            what: "find the word %w",
            search: "సహస్రశీర్ష",
            found: 1
        },
        {
            what: "find the word %w",
            search: "*నం",
            found: 1
        },
        {
            what: "never find a word that does not exist, like %w",
            search: "వ్యాకరణం",
            found: 0
        }, 
        {
            what: "never find a word that does not exist, like %w",
            search: "రామః",
            found: 0
        },{
            what: "find a correctly stemmed word %w",
            search: "గిరినందిని",
            found: 1
        }
    ]
}