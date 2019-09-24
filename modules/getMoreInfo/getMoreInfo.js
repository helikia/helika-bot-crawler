const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');
const jsonframe = require('jsonframe-cheerio');
const db = require('../../dist/database.json');



for(var i = 0; i < db.length; i++) {
    let slug = db[i].slug;
    console.log(slug);

  // for (let j = 1; j <= 10; j++) {
    //     setInterval(() => {            
    //         axios(`${route.uriBase}${zipcode}/0?page=${j}`)
    //         // axios(`${route.uriBase}${zipcode}/0?page=${j}`)
    //         .then((res) => {
    //             if (res.status === 200) {
    //                     let $ = cheerio.load(res.data); // on enregistre le contenu html dans une variable $
    //                     jsonframe($);
    //                     const frame = {
    //                         "EHPAD": {
    //                             _s: ".cnsa_results-item-inside",
    //                             _d: [{
    //                                 "name": ".cnsa_results-tags1",
    //                                 "street": ".result-addr1",
    //                                 "cp": ".result-addr2",
    //                                 "phone": ".cnsa_results-phone",
    //                                 "pricing": {
    //                                     _s: ".cnsa_result-compare-text .clearfix .prix",
    //                                     _d: [{
    //                                         "singleRoom": "strong",
    //                                         "doubleRoom": "strong"
    //                                     }]
    //                                 },
    //                                 "categories": ".cnsa_results-tags2"
    //                             }]
    //                         }
    //                     };
            
    //                     let result = $('body').scrape(frame, { string: true })
    //                     fs.writeFile(`../../dist/botDepartments/${zipcode}_0_${j}.json`, JSON.stringify(JSON.parse(result)), (err) => {
    //                         if (err) {
    //                             return console.log(err);
    //                         } else {
    //                             console.log("Le fichier est sauvegardé ! #OKLM");
    //                         }
    //                     });
    //                 }
    //             })
    //             .catch((err) => {
    //                 console.log(err, 'ERRRRROOOOORRRR');
    //             });
    //     }, 600000);
    // }
}
