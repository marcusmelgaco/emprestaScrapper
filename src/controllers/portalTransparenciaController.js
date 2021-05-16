'use strict'

const scraper = require('../scrapper/portalTransparenciaScraping');
const PortalTransparenciaDocument = require('../models/portalTransparencia')


module.exports = class PortalTransparenciaController {
   async postPortalTransparencia(req, res) {
      try {
         const dataPortal = await new Promise((resolve, reject) => {
            scraper
               .scrapePortalTransparencia()
               .then(data => {
                  resolve(data)
               })
               .catch(err => reject('Medium scrape failed'))
         })
         for (let item of dataPortal) {
            const doc = new PortalTransparenciaDocument(item);
            await doc.save();
         }
      } catch (err) {
         res.status(500).send('Falha ao Recuperar e Salvar Informações do Portal da Transparencia || Erro :' + err)
      }
   }


}