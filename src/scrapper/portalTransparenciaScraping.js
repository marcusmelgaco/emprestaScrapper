const { compileFile } = require('pug');
const puppeteer = require('puppeteer')
let scrappedData = [];

const scrapePortalTransparencia = async() => {
    scrappedData = [];
    const browser = await puppeteer.launch({headless: false})
    const page = await browser.newPage()
    await page.goto('http://www.portaltransparencia.gov.br/servidores/consulta?orgaosServidorExercicio=OR21000&tipo=2&ordenarPor=nome&direcao=asc', { waitUntil: 'load' });
    await page.evaluate(()=> {
        document.querySelector('div.botao__gera_paginacao_completa').click();
      })
    const paginacao = await page.evaluate(()=> {
        let paginacao = document.querySelector('div.box-paginacao__indicador');
        let paginacaoText = paginacao.innerText;
        let numberIdx = paginacaoText.indexOf('DE ');
        let number = paginacaoText.substring(numberIdx+3,paginacaoText.length)
        return Number(number)
    })
    const cpf = await page.evaluate(() => {
       return  Array.from(
            document.querySelectorAll(
              'div[id*="lista_wrapper"] tbody td.coluna-cpf'
            )
          )
            .map(link => ({
              title: link.innerText
            }))
    })

    const tipo = await page.evaluate(() => {
        return  Array.from(
             document.querySelectorAll(
               'div[id*="lista_wrapper"] tbody tr td:first-child +td'
             )
           )
             .map(link => ({
               title: link.innerText
             }))
     })

     const nomeServidor = await page.evaluate(() => {
        return  Array.from(
             document.querySelectorAll(
               'div[id*="lista_wrapper"] tbody tr td:first-child +td +td +td'
             )
           )
             .map(link => ({
               title: link.innerText
             }))
     })

     const matricula = await page.evaluate(() => {
        return  Array.from(
            document.querySelectorAll(
                'div[id*="lista_wrapper"] tbody tr td:first-child +td +td +td +td +td +td'
              )
           )
             .map(link => ({
               title: link.innerText
             }))
     })

     for(i= 0 ; i < cpf.length; i++){
        scrappedData.push({
            cpf : cpf[i].title,
            nomeServidor: nomeServidor[i].title,
            matricula : matricula[i].title,
            tipo : tipo[i].title
        })
     }
    
    await browser.close();
    return scrappedData
}


module.exports.scrapePortalTransparencia = scrapePortalTransparencia