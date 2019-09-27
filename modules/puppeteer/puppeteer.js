const fs = require('fs');
const puppeteer = require('puppeteer');
const route = 'https://www.pour-les-personnes-agees.gouv.fr/annuaire-ehpad-en-hebergement-permanent/';
let href;
var ehpad = [];
(async () => {

  const browser = await puppeteer.launch({
    headless: false
  });
  const page = await browser.newPage()
  await page.tracing.start({
    path: 'trace.json',
    categories: ['devtools.timeline']
  })
  for (let i = 1; i <= 2; i++) {
    let zipcode;

    if (i < 10) {
      zipcode = '0' + i;
    } else {
      zipcode = i;
    }

    for (let j = 1; j <= 10; j++) {
      
     
        
      
        await page.goto(`${route}${zipcode}/0?page=${j}`);
        console.log(` ------- ${route}${zipcode}/0?page=${j} ------- `)
  
        await page.waitForSelector('a.cnsa_results-infoscol', {
          timeout: 5000
        });
  
        href = await page.$eval('a.cnsa_results-infoscol', a => a.getAttribute('href'));


        try {          
          await page.goto(`https://www.pour-les-personnes-agees.gouv.fr${href}`, {
            waitUntil: 'networkidle2',
            timeout: 3000000
          });

          await page.waitForSelector('div.cnsa_search_item-statut');
          await page.waitForSelector('div.cnsa_search_item-statut2');
          await page.waitForSelector('div.cnsa_search_item-courriel');
          await page.waitForSelector('#cnsa_search_compare-prices-contents');
        } catch (error) {
          console.log(error)
        }


          const stories = await page.evaluate(() => {
            let administrator = document.querySelector('div.cnsa_search_item-statut').innerText;
            let status = document.querySelector('div.cnsa_search_item-statut2').innerText;
            let mail = document.querySelector('div.cnsa_search_item-courriel').innerText;
            let capacity = document.querySelectorAll('.fiche-box')[1].innerText;
            let accommodationType = document.querySelectorAll('.fiche-box')[2].innerText;
            let socialHelp = document.querySelectorAll('.fiche-box')[3].innerText;

            let singleRoom = document.querySelectorAll('#cnsa_search_compare-prices-contents .box-content .table-striped strong')[0].innerText;
            let doubleRoom = document.querySelectorAll('#cnsa_search_compare-prices-contents .box-content .table-striped strong')[1].innerText;

            let GIR = document.querySelectorAll('#cnsa_search_compare-prices-contents .box-content .table-striped')[2];
            let GIR1_2 = GIR.querySelectorAll('tr')[0].innerText;
            let GIR3_4 = GIR.querySelectorAll('tr')[1].innerText;
            let GIR5_6 = GIR.querySelectorAll('tr')[2].innerText;


            establishement = {
              administrator: administrator,
              status: status,
              mail: mail,
              capacity: capacity,
              accommodationType: accommodationType,
              socialHelp: socialHelp,
              pricing: [{
                singleRoom: singleRoom,
                doubleRoom: doubleRoom,
                GIR1_2: GIR1_2,
                GIR3_4: GIR3_4,
                GIR5_6: GIR5_6
              }]
            }
            return establishement;
          })
          ehpad.push(stories);
          console.log('*****************************************', ehpad, '*****************************************');
   
    }
  }

  fs.writeFile(`./ehpad.json`, JSON.stringify(stories), (err) => {
    if (err) {
      return console.log(err);
    } else {
      console.log("Le fichier est sauvegardé ! #OKLM");
    }
  });

  await page.tracing.stop();
})()