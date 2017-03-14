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
  router.get('/credito/:caixaId', creditoService.listar)
  router.post('/credito/:caixaId', creditoService.inserir)
  router.put('/credito/:caixaId', creditoService.atualizar)
  router.delete('/credito/:caixaId/:creditoId', creditoService.excluir)
  router.get('/creditoCount/:caixaId', creditoService.count)
  router.get('/credito/:caixaId/:skip/:limit', creditoService.paginate)

  const debitoService = require('../api/caixa/debitoService')
  router.get('/debito/:caixaId', debitoService.listar)
  router.post('/debito/:caixaId', debitoService.inserir)
  router.put('/debito/:caixaId', debitoService.atualizar)
  router.delete('/debito/:caixaId/:debitoId', debitoService.excluir)
  router.get('/debitoCount/:caixaId', debitoService.count)
  router.get('/debito/:caixaId/:skip/:limit', debitoService.paginate)



}
