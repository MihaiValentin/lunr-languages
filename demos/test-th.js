var lunr = require('../test/lunr/lunr-2.0.1.js');
require('../lunr.stemmer.support.js')(lunr);
require('../lunr.th.js')(lunr);
var util = require('util');

/* init lunr */
var idx = lunr(function () {
    this.use(lunr.th);
    // then, the normal lunr index initialization
    this.field('title', { boost: 10 })
    this.field('body')

    /* add documents to index */
    this.add({
        "title": "สวัสดี",
        "body" : "กากากากา 123",
        "id": 1
    });
    this.add({
        "title": "สวัสดีโลก",
        "body" : "คาคาคาคา",
        "id": 2
    });
});

console.log('test 1', util.inspect(idx.search('สวัส~3')));
console.log('test 1.1', util.inspect(idx.search('สวัส')));
console.log('test 2', util.inspect(idx.search('คา')));
console.log('test 3', util.inspect(idx.search('123')));
