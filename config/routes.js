const express = require('express')

module.exports = function (server) {
  //Router api
  const router = express.Router()
  //Api das rotas
  server.use('/api', router)

  //Import dos methods da api CicloPagamento
  const cicloPagamento = require('../api/cicloPagamento/cicloPagamentoService2')
  //Registrando o serviço no roteador
  cicloPagamento.register(router, '/cicloPagamentos')

  const cicloPagamentoSumarioService = require('../api/cicloPagamentoSumario/cicloPagamentoSumarioService')

  router.route('/getSumario').get(cicloPagamentoSumarioService.getSumario)
}
