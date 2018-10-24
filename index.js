const rp = require('request-promise')
const Promise = require('bluebird')
const TikaServer = require("tika-server")
const cheerio = require('cheerio')

// Télécharger une page HTML
const getHtml = (url) => {
  return rp(url)
  .then(function (htmlString) {
    // console.log(htmlString);
    return htmlString;
  })
  .catch(function (err) {
    console.error("RP ERROR:", err)
    return Promise.reject(err);
  });
}

// Télécharger un pdf
const getPdf = (url) => {
  return rp({
    url: url,
    encoding: null
  }).then(function (pdf) {
    // console.log("PDF download");
    return pdf;
  }).catch(function (err) {
    console.error("RP ERROR:", err)
    return Promise.reject(err);
  });
}

// Analyser du html
// DOc : https://github.com/cheeriojs/cheerio
// ou encore : https://github.com/sfrenot/competence/blob/master/formation/crawl.coffee
const tableSelector = '#block-system-main .content-offre-formations table a'
const crawlHtmlForUrls = (url) => {
  return new Promise((resolve) => {
    getHtml(url).then((html) => {
      const $ = cheerio.load(html)
      const urls = $(tableSelector).map((i, e) => $(e).attr('href'))
      resolve(urls.get())
    })
  })
}

const host = 'https://www.insa-lyon.fr'
var semesters = crawlHtmlForUrls(host + '/fr/formation/diplomes/ING')

var units = Promise.map(semesters, (s) => crawlHtmlForUrls(host + s))
var pdfs = new Promise((resolve) => {
  units.then((urls) => {
    var flat = [].concat(...urls)
    resolve([...new Set(flat)])
  })
})

// Lance le serveur Tika
// Doc : https://www.npmjs.com/package/tika-server
const ts = new TikaServer();

ts.on("debug", (msg) => {
  //console.log(`DEBUG: ${msg}`)
})

// Lance le serveur tika
ts.start().then(() => {
  pdfs.map((url) =>  {
    // Extraction du texte.
    return getPdf(url).then((pdf) => {
      // console.log("pdf", pdf);
      return ts.queryText(pdf).then((data) => {
        // console.log(data)
        let code = /CODE : ([^\n]*)/.exec(data)[1];
        console.log("Code :", code);
      });
    })
  }).then(() => {
    return ts.stop()
  }).catch((err) => {
    console.log(`TIKA ERROR: ${err}`)
  })
})
  // liste de mes urls de pdf
  /*const listeUrlPdfs = [
    'http://planete.insa-lyon.fr/scolpeda/f/ects?id=36736&_lang=fr'
  ]
  // Pour chaque url ...
  return Promise.all(listeUrlPdfs.map((url) => {
    // Extraction du texte.
    return getPdf(url).then((pdf) => {
      // console.log("pdf", pdf);
      return ts.queryText(pdf).then((data) => {
        // console.log(data)
        let code = /CODE : ([^\n]*)/.exec(data)[1];
        // console.log("Code :", code);
      });
    })
  }))
}).then(() => {
  return ts.stop()
}).catch((err) => {
  console.log(`TIKA ERROR: ${err}`)
})*/

//romise.all(ects).then((urls) => console.log("ects:", urls)).catch((urls) => console.log('Cannot get' + urls))
//ects.then((urls) => console.log("ects:", urls))



// Créer une base de données
const db = {}

// Écrire dans la base de données

db["code"] = {
  a: 1,
  b: 2
}

// Afficher le contenu d'une variable en json
console.log(JSON.stringify(db, null, 2));
