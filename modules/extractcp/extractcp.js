const db = require('../../dist/database.json');
const fs = require('fs');

var regex = /(([0-8][0-9])|(9[0-5]))[0-9]{3}/g;
for(var i = 0; i < db.length; i++) {
    let newdb = db[i].cp.replace(regex, '');
    console.log(newdb)
    // db[i]['zipcode'] = newdb
}
