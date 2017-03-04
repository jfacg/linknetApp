const express = require('express')

module.exports = function (server) {
  const router = express.Router()
  server.use('/api', router)




  const cicloPagamentoSumarioService = require('../api/cicloPagamentoSumario/cicloPagamentoSumarioService')
  router.get('/cicloPagamentoSumario', cicloPagamentoSumarioService.getSumario)
  const cicloPagamentoService = require('../api/cicloPagamento/cicloPagamentoService')
  router.post('/cicloPagamento', cicloPagamentoService.inserir)
  router.get('/cicloPagamento', cicloPagamentoService.listar)
  router.get('/cicloPagamento/:id', cicloPagamentoService.buscarPorId)
  router.get('/cicloPagamentoContador', cicloPagamentoService.contador)
  router.put('/cicloPagamento/:id', cicloPagamentoService.atualizar)
  router.delete('/cicloPagamento/:id', cicloPagamentoService.excluir)

  const creditoService = require('../api/cicloPagamento/creditoService')
  router.post('/credito/:id', creditoService.inserir)
  router.put('/credito/:id', creditoService.atualizar)
  router.delete('/credito/:cicloId/:creditoId', creditoService.excluir)

  const debitoService = require('../api/cicloPagamento/debitoService')
  router.post('/debito/:id', debitoService.inserir)
  router.put('/debito/:id', debitoService.atualizar)
  router.delete('/debito/:cicloId/:debitoId', debitoService.excluir)




}
