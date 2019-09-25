/*!
 * Lunr languages, `Czech` language
 * https://github.com/MihaiValentin/lunr-languages
 *
 * Copyright 2014, Mihai Valentin
 * http://www.mozilla.org/MPL/
 */

/**
 * export the module via AMD, CommonJS or as a browser global
 * Export code from https://github.com/umdjs/umd/blob/master/returnExports.js
 */
;(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(factory)
    } else if (typeof exports === 'object') {
        /**
         * Node. Does not work with strict CommonJS, but
         * only CommonJS-like environments that support module.exports,
         * like Node.
         */
        module.exports = factory()
    } else {
        // Browser globals (root is window)
        factory()(root.lunr);
    }
}(this, function () {
    /**
     * Just return a value to define the module export.
     * This example returns an object, but the module
     * can return a function as the exported value.
     */
    return function(lunr) {
        /* throw error if lunr is not yet included */
        if ('undefined' === typeof lunr) {
            throw new Error('Lunr is not present. Please include / require Lunr before this script.');
        }

        /* throw error if lunr stemmer support is not yet included */
        if ('undefined' === typeof lunr.stemmerSupport) {
            throw new Error('Lunr stemmer support is not present. Please include / require Lunr stemmer support before this script.');
        }

        /* register specific locale function */
        lunr.cs = function () {
            this.pipeline.reset();
            this.pipeline.add(
                lunr.cs.trimmer,
                lunr.cs.stopWordFilter,
                lunr.cs.stemmer
            );

            // for lunr version 2
            // this is necessary so that every searched word is also stemmed before
            // in lunr <= 1 this is not needed, as it is done using the normal pipeline
            if (this.searchPipeline) {
                this.searchPipeline.reset();
                this.searchPipeline.add(lunr.cs.stemmer)
            }
        };

        /* lunr trimmer function */
        lunr.cs.wordCharacters = "A-Za-z\xAA\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02B8\u02E0-\u02E4\u1D00-\u1D25\u1D2C-\u1D5C\u1D62-\u1D65\u1D6B-\u1D77\u1D79-\u1DBE\u1E00-\u1EFF\u2071\u207F\u2090-\u209C\u212A\u212B\u2132\u214E\u2160-\u2188\u2C60-\u2C7F\uA722-\uA787\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA7FF\uAB30-\uAB5A\uAB5C-\uAB64\uFB00-\uFB06\uFF21-\uFF3A\uFF41-\uFF5A";
        lunr.cs.trimmer = lunr.trimmerSupport.generateTrimmer(lunr.cs.wordCharacters);

        lunr.Pipeline.registerFunction(lunr.cs.trimmer, 'trimmer-cs');

        /* lunr stemmer function */
        lunr.cs.stemmer = (function() {
		/* TODO Czech stemmer  */
		return function(word) {
			return word;
			  }
		})();
        lunr.Pipeline.registerFunction(lunr.cs.stemmer, 'stemmer-cs');

        lunr.cs.stopWordFilter = lunr.generateStopWordFilter('dnes cz timto budes budem byli jses muj svym ta tomto tohle tuto tyto jej zda proc mate tato kam tohoto kdo kteri mi nam tom tomuto mit nic proto kterou byla toho protoze asi ho nasi napiste re coz tim takze svych jeji svymi jste aj tu tedy teto bylo kde ke prave ji nad nejsou ci pod tema mezi pres ty pak vam ani kdyz vsak ne jsem tento clanku clanky aby jsme pred pta jejich byl jeste az bez take pouze prvni vase ktera nas novy tipy pokud muze design strana jeho sve jine zpravy nove neni vas jen podle zde clanek uz email byt vice bude jiz nez ktery by ktere co nebo ten tak ma pri od po jsou jak dalsi ale si ve to jako za zpet ze do pro je na'.split(' '));

        lunr.Pipeline.registerFunction(lunr.cs.stopWordFilter, 'stopWordFilter-cs');
    };
}))