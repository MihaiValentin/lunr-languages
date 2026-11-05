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
            "title": "Ελλάδα",
            "body": "Η Ελλάδα (επίσημη ονομασία: Ελληνική Δημοκρατία) είναι χώρα της νοτιοανατολικής Ευρώπης, ευρισκόμενη στο νοτιότερο άκρο της Βαλκανικής χερσονήσου. Σύμφωνα με την απογραφή του 2021, ο μόνιμος πληθυσμός της ανέρχεται σε 10.482.487 κατοίκους. Πρωτεύουσα και μεγαλύτερη πόλη της είναι η Αθήνα.",
            "id": 1
        }, {
            "title": "Ονομασία",
            "body": "Στη σύγχρονη ελληνική γλώσσα η χώρα αποκαλείται Ελλάδα. Η αντίστοιχη μορφή του ονόματος στα αρχαία ελληνικά και την καθαρεύουσα είναι η «Ελλάς». Από εκεί πηγάζει το όνομα Hellas, το οποίο στις περισσότερες ευρωπαϊκές γλώσσες χρησιμοποιείται σε αρχαϊκά και ποιητικά πλαίσια σήμερα.",
            "id": 2
        }
    ],
    tests: [
        {
            // Snowball stems Ελλάδα and Ελλάδας to ελλαδ; a wildcard matches stems, so it is a prefix of the stem
            // (the stemmer of lunr-languages 1.x did not stem at all under lunr 2, so Ελλάδα* matched the words)
            what: "find the word %w",
            search: "Ελλάδ*",
            found: 2
        }, {
            what: "find an inflected form of a word, like %w for Ελλάδα",
            search: "Ελλάδας",
            found: 2
        }, {
            what: "find the word %w",
            search: "απογραφή",
            found: 1
        }, {
            what: "never find a word that does not exist, like %w",
            search: "πολιτισμός",
            found: 0
        }, {
            what: "find a correctly stemmed word %w",
            search: "όνομα",
            found: 1
        }
    ]
}
