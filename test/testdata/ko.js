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
            "body": "고기를 아무렇게나 구우려고 하면 안 돼. 고기라고 다 같은 게 아니거든. 예컨대 삼겹살을 구울 때는 중요한 게 있지.",
            "id": 1
        }, {
            "title": "테스트",
            "body": "test 한국어 불용어 데이터를 제공하지 않습니다. 왜냐하면 토큰화 단계에서 필요없는 조사, 접속사를 제거하면 되기 때문입니다.",
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
            search: "한국어",
            found: 1
        }, {
            what: "never find a word that does not exist, like %w",
            search: "사람",
            found: 0
        }
    ]
}
