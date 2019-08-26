const data = require('../../dist/db/db.json');
const fs = require('fs');
let toto;
for ( var i in data ) {
    for ( var k in data[i] ) {
        // console.log(data[i][k].categories, '....................................................'); 
        data[i][k].pricing = null;
        data[i][k].categories = null;
    }
}

toto = JSON.stringify(data);

fs.writeFile('../../dist/db/good.json', toto, function(err, result) {
    if(err) console.log('error', err);
});