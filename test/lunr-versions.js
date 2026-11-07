/*
 * The lunr versions the tests run with, listed once, in the devDependencies of package.json:
 * "lunr" is the current version, every other version is an alias, "lunr-<version>": "npm:lunr@<version>",
 * each pinned exactly (npm install --save-dev --save-exact lunr-2.3.5@npm:lunr@2.3.5).
 *
 * A test that depends on the lunr version runs its tests once per entry of `packages`, each with a lunr from
 * fresh(name); a test that doesn't uses fresh() (the current version) and runs once.
 *
 *   npm test                every listed version
 *   npm run test:current    the current version ("lunr") only
 */
var devDependencies = require('../package.json').devDependencies;

// "lunr" first, then the aliases in the order of package.json
var all = Object.keys(devDependencies).filter(function (name) {
    return name === 'lunr' || /^npm:lunr@/.test(devDependencies[name]);
}).sort(function (a, b) {
    return (a === 'lunr' ? 0 : 1) - (b === 'lunr' ? 0 : 1);
});

// a range ("^2.3.8") could resolve to another listed version, so the matrix would test it twice
all.forEach(function (name) {
    if (!/^(npm:lunr@)?\d+\.\d+\.\d+$/.test(devDependencies[name])) {
        throw new Error('package.json: pin the lunr version of ' + name + ' exactly, e.g. "npm:lunr@2.3.8", not "' + devDependencies[name] + '"');
    }
});

module.exports = {
    // every listed version (for the checks of the list itself)
    all: all,
    // the versions to test with: all of them, the current one only for npm run test:current (npm sets
    // npm_lifecycle_event to the name of the script it runs, also in the processes node --test starts)
    packages: process.env.npm_lifecycle_event === 'test:current' ? ['lunr'] : all,
    version: function (name) {
        return require((name || 'lunr') + '/package.json').version;
    },
    // a fresh lunr of the package (the current version by default), so the languages loaded for one test
    // don't leak into the next
    fresh: function (name) {
        name = name || 'lunr';
        delete require.cache[require.resolve(name)];
        return require(name);
    }
};
