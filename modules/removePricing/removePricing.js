const data = require('../../dist/db/db.json');
const fs = require('fs');

for ( var i in data ) {
    for ( var k in data[i] ) {
        // console.log(data[i][k].categories, '....................................................'); 
        data[i][k].pricing = null;
        data[i][k].categories = null;
    }
}

let dbJson = JSON.stringify(data);

fs.writeFile('../../dist/db/db.json', dbJson, function(err, result) {
    if(err) console.log('error', err);
});