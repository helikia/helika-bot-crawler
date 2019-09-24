const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');
const jsonframe = require('jsonframe-cheerio');
const route = 'https://www.pour-les-personnes-agees.gouv.fr/annuaire-ehpad-en-hebergement-permanent/';
let result;
for (let i = 1; i <= 95; i++) {
    let zipcode;

    if (i < 10) {
        zipcode = '0' + i;
    } else {
        zipcode = i;
    }

    for (let j = 1; j <= 10; j++) {
        setInterval(() => {            
            axios(`${route}${zipcode}/0?page=${j}`)
            // axios(`${route.uriBase}${zipcode}/0?page=${j}`)
            .then((res) => {
                if (res.status === 200) {
                        let $ = cheerio.load(res.data); // on enregistre le contenu html dans une variable $
                        jsonframe($);
                        const frame = {
                            "EHPAD": [{
                                _s: ".cnsa_results-item-inside",
                                _d: [{
                                    "phone": ".cnsa_results-phone",
                                    "link": ".cnsa_results-infoscol"
                                }]
                            }]
                        };
            
                        result += $('body').scrape(frame, { string: true });
                    }
                })
                .catch((err) => {
                    console.log(err, 'ERRRRROOOOORRRR');
                });
        }, 60000);
    }
    console.log(result,'------------')
    fs.writeFile(`../../dist`, JSON.stringify(JSON.parse(result)), (err) => {
        if (err) {
            return console.log(err);
        } else {
            console.log("Le fichier est sauvegardé ! #OKLM");
        }
    });
}
