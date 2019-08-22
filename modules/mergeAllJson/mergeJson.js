const jsons = require('require-all') ('../../dist/botDepartments');
const fs = require('fs');

let data = JSON.stringify(jsons);

fs.writeFile('../../dist/db/database.json', data, function(err, result) {
    if(err) console.log('error', err);
});