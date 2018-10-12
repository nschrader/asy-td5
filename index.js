const TikaServer = require("tika-server");
const rp = require('request-promise');
const cheerio = require('cheerio');

// Télécharger une page HTML
const html = rp('https://www.insa-lyon.fr/fr/formation/parcours/729/4/1')
.then(function (htmlString) {
  // console.log(htmlString);
  return htmlString;
})
.catch(function (err) {
  console.error("RP ERROR:", err)
});

// Télécharger un pdf
const pdf = rp({
  url: 'http://planete.insa-lyon.fr/scolpeda/f/ects?id=36736&_lang=fr',
  encoding: null
}).then(function (pdf) {
  // console.log("PDF download");
  return pdf;
}).catch(function (err) {
  console.error("RP ERROR:", err)
});

// Lance le serveur Tika
// Doc : https://www.npmjs.com/package/tika-server
const ts = new TikaServer();

ts.on("debug", (msg) => {
  // console.log(`DEBUG: ${msg}`)
})

// Lance le serveur tika
ts.start().then(() => {
  // Extraction du texte.
  return pdf.then((pdf) => {
    // console.log("pdf", pdf);
    return ts.queryText(pdf).then((data) => {
      // console.log(data)
      let code = /CODE : ([^\n]*)/.exec(data)[1];
      // console.log("Code :", code);
    });
  })
}).then(() => {
  return ts.stop()
}).catch((err) => {
  console.log(`TIKA ERROR: ${err}`)
})

// Analyser du html
// DOc : https://github.com/cheeriojs/cheerio
// ou encore : https://github.com/sfrenot/competence/blob/master/formation/crawl.coffee
html.then((html) => {
  const $ = cheerio.load(html);
  const urls = $('#block-system-main .content-offre-formations table a').map(function() {
    return $(this).attr('href');
  }).get()
  // console.log("urls:", urls);
})
