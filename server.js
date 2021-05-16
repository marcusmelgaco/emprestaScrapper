const express = require('express');
const config = require('config');
const database = require('./database');
const app = express()
const PortalTransparenciaController = require('./src/controllers/portalTransparenciaController')

app.post('/postDadosPortalTransparencia', async (req, res) =>  {
  try{
    let portalTransparenciaController =  new PortalTransparenciaController();
    await portalTransparenciaController.postPortalTransparencia();
    res.status(200).send('Dados Adicionados Com Sucesso!')
  }catch(err){
    res.status(500).send('Falha ao Recuperar e Salvar Informações do Portal da Transparencia || Erro :' + err)
  }
})

database.checkConnection(start);
async function start(){
    const port = config.get('SERVER').PORT;
    const db = config.get('CONNECTIONS').MONGO.DATABASE;
    const enviroment = config.get('ENV');
    app.listen(port ,() =>{
        console.log(`Servidor Rodando na porta ${port} || Env : ${enviroment} || Database : ${db}`)
})

}