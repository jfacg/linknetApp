const express = require('express')

module.exports = function (server) {
  const router = express.Router()
  server.use('/api', router)

  const caixaService = require('../api/caixa/caixaService')
  router.post('/caixa', caixaService.inserir)
  router.get('/caixa', caixaService.listarCaixas)
  router.get('/caixa/:id', caixaService.buscarPorId)
  router.put('/caixa/:id', caixaService.atualizar)
  router.delete('/caixa/:id', caixaService.excluir)
  router.get('/caixaSumario', caixaService.getSumario)
  router.get('/caixaContador', caixaService.contador)

  const creditoService = require('../api/caixa/creditoService')
  router.post('/credito/:id', creditoService.inserir)
  router.put('/credito/:id', creditoService.atualizar)
  router.delete('/credito/:cicloId/:creditoId', creditoService.excluir)

  const debitoService = require('../api/caixa/debitoService')
  router.post('/debito/:id', debitoService.inserir)
  router.put('/debito/:id', debitoService.atualizar)
  router.delete('/debito/:cicloId/:debitoId', debitoService.excluir)




}
