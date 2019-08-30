const mongoose = require('mongoose');
const Fixtures = require('node-mongodb-fixtures');

// CONNECT TO DATABASE
const fixtures = new Fixtures({
    dir: './fixtures/etablishement'
});

const Database = 'mongodb://localhost:27017/helikia-app';
mongoose.connect(Database, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
});
fixtures.connect(Database)
    .then(() => fixtures.unload())
    .then(() => fixtures.load())
    .catch(console.error)
    .finally(() => fixtures.disconnect());

// for ( var i in data ) {
//     for ( var k in data[i] ) {
//         console.log(data[i][k]);
//     }
// }

// let dbJson = JSON.stringify(data);

// fs.writeFile('../../dist/db/db.json', dbJson, function(err, result) {
//     if(err) console.log('error', err);
// });