/*!
 * Lightweight Polish stemmer for Lunr Languages
 *
 * Uses a small R1-based suffix stripping approach tuned for common
 * noun, adjective, and deverbal endings used in Lunr indexes.
 */

function PolishStemmer() {
	var derivationalSuffixes = ["owaniami", "owaniach", "owaniem", "owania", "owanie",
			"owania", "owego", "owemu", "owych", "owym", "owej", "aniem",
			"eniach", "eniami", "aniem", "eniem", "aniu", "eniu", "anie",
			"enie"], adjectivalSuffixes = ["niejszego", "niejszemu", "niejszym", "niejszej",
			"niejsi", "niejsza", "niejsze", "niejszy", "iego", "iemu",
			"ymi", "ami", "ach", "ego", "owa", "owe", "owi", "iej",
			"ych", "owym", "owej", "owy", "owa", "owe", "ymi", "ami",
			"ach", "ym", "im"], nominalSuffixes = ["owie", "owiek", "kami", "kach", "ami",
			"ach", "owie", "owie", "owi", "ami", "ach", "ów", "om", "em",
			"ie"], finalSuffixes = ["a", "e", "i", "y", "u", "\u0105", "\u0119"], current = "";

	this.setCurrent = function(word) {
		current = word;
	};
	this.getCurrent = function() {
		return current;
	};

	function isVowel(character) {
		return /[aeiouy\u0105\u0119\u00f3]/.test(character);
	}

	function calculateR1(word) {
		var i;

		for (i = 0; i < word.length - 1; i++) {
			if (isVowel(word.charAt(i)) && !isVowel(word.charAt(i + 1))) {
				return i + 2;
			}
		}

		return word.length;
	}

	function stripSuffix(word, suffixes, region, minStemLength) {
		var i, suffix, stemLength;

		for (i = 0; i < suffixes.length; i++) {
			suffix = suffixes[i];
			stemLength = word.length - suffix.length;

			if (stemLength < minStemLength || stemLength < region) {
				continue;
			}

			if (word.slice(stemLength) === suffix) {
				return word.slice(0, stemLength);
			}
		}

		return word;
	}

	this.stem = function() {
		var word = current.toLowerCase(), r1;

		if (word.length < 4) {
			current = word;
			return true;
		}

		r1 = calculateR1(word);
		word = stripSuffix(word, derivationalSuffixes, r1, 4);
		word = stripSuffix(word, adjectivalSuffixes, r1, 4);
		word = stripSuffix(word, nominalSuffixes, r1, 4);
		word = stripSuffix(word, finalSuffixes, r1, 3);

		current = word;
		return true;
	}
}