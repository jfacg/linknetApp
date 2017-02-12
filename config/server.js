//Porta do servidor backend
const port = 3000
//Import do BodyParser leitor das requisições
const bodyParser = require('body-parser')
//Import do Servidor backend
const express = require('express')
//Criando o servidor express
const server = express()
//Ativando interpretador das requisições do frontend
server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json())

//Servidor ouvido a porta
server.listen(port, function () {
  console.log(`BACKEND is running on port ${port}.`)
})

module.exports = server
