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
            "title": "ಸಂಸ್ಕೃತ ಕ್ಷೇತ್ರ",
            "body": "ರಾಮೋ ಸೀತಯಾ ಸಹ ವನಮ್ ಅಯೋಧ್ಯಾಯ ಗಚ್ಛತಿ । ರಾಮೋ ಯೋಧಃ । ಅಯಿ ಗಿರಿನಂದಿನಿ ನಂದಿತಮೇದಿನಿ ವಿಶ್ವವಿನೋದಿನಿ ನಂದಿನುತೇ । ಸಹಸ್ರಶೀರ್ಷ ಪುರುಷಃ ಸಹಸ್ರಾಕ್ಷಃ ಸಹಸ್ರಪಾತ್",
            "id": 1
        }
    ],
    tests: [
        {
            what: "find the word %w",
            search: "ಸಂಸ್ಕೃತ",
            found: 1
        },
        // {
        //     what: "find the word %w",
        //     search: "ರಾಮೋ",
        //     found: 2
        // },
        {
            what: "find the word %w",
            search: "ಯೋಧಃ",
            found: 1
        },
        {
            what: "never find a word that does not exist, like %w",
            search: "ವ್ಯಾಕರಣ",
            found: 0
        }, 
        {
            what: "never find a word that does not exist, like %w",
            search: "ಕುರಿತು",
            found: 0
        },{
            what: "find a correctly stemmed word %w",
            search: "ಗಿರಿನಂದಿನಿ",
            found: 1
        // },{
        //     what: "find a correctly stemmed word %w",
        //     search: "ವಿಶ್ವವಿನೋ",
        //     found: 1
        }
    ]
}