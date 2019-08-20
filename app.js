const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');
const jsonframe = require('jsonframe-cheerio');

const route = require('./route.json');


for (let i = 1; i <= 95; i++) {
    let zipcode;

    if (i < 10) {
        zipcode = '0' + i;
    } else {
        zipcode = i;
    }

    for (let j = 1; j < 10; j++) {
        setInterval(() => {            
            axios(`${route.uriBase}${zipcode}/0?page=${j}`)
            .then((res) => {

                // CHECK SI ON PEUT PAS FAIRE UN ASYNC AWAIT pour ne pas bloquer le call


                if (res.status === 200) {
                        let $ = cheerio.load(res.data); // on enregistre le contenu html dans une variable $
                        jsonframe($);
                        const frame = {
                            "ehpad": {
                                _s: ".cnsa_results-item-inside",
                                _d: [{
                                    "name": ".cnsa_results-tags1",
                                    "street": ".result-addr1",
                                    "cp": ".result-addr2",
                                    "phone": ".cnsa_results-phone",
                                    "pricing": {
                                        _s: ".cnsa_result-compare-text .clearfix .prix",
                                        _d: [{
                                            "singleRoom": "strong",
                                            "doubleRoom": "strong"
                                        }]
                                    },
                                    "categories": ".cnsa_results-tags2"
                                }]
                            },
        
                        };
            
                        let result = $('body').scrape(frame, { string: true })
                        fs.writeFile(`./dist/${zipcode}_0_${j}.json`, JSON.stringify(result), (err) => {
                            if (err) {
                                return console.log(err);
                            } else {
                                console.log("Le fichier est sauvegardé ! #OKLM");
                            }
                        });
                    }
                })
                .catch((err) => {
                    console.log(err, 'ERRRRROOOOORRRR');
                });
        }, 600000);
    }
}
