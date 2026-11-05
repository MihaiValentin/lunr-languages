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
            "title": "Indonesia",
            "body": "Indonesia adalah negara kepulauan terbesar di dunia. Bahasa Indonesia digunakan oleh lebih dari dua ratus juta penutur.",
            "id": 1
        }, {
            "title": "Perpustakaan",
            "body": "Saya sedang membaca buku di perpustakaan kota. Bacaan anak-anak ditulis oleh penulis terkenal.",
            "id": 2
        }
    ],
    tests: [
        {
            what: "find the word %w",
            search: "Indonesia",
            found: 1
        }, {
            what: "find a word by its stem, like %w for membaca and bacaan",
            search: "baca",
            found: 1
        }, {
            what: "find a word with its prefix, like %w for perpustakaan",
            search: "pustaka*",
            found: 1
        }, {
            what: "never find a word that does not exist, like %w",
            search: "inexistent",
            found: 0
        }, {
            what: "do not find the stop word %w",
            search: "di",
            found: 0
        }
    ]
}
