// du is not the language code, while nl is the language code
// a new lunr.nl.js has been created, but in order to
// keep the backward compatibility, we'll leave the lunr.du.js
// here for a while, and just make it use the new lunr.nl.js
module.exports = require('./lunr.nl');
