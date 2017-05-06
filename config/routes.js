const express = require('express')

module.exports = function (server) {
  const router = express.Router()
  server.use('/api', router)

//ROTAS CAIXA
  const caixaService = require('../api/caixa/caixaService')
  router.post('/caixa', caixaService.inserir)
  router.get('/caixa', caixaService.listar)
  router.get('/caixa/:id', caixaService.listarPorId)
  router.put('/caixa/:id', caixaService.atualizar)
  router.delete('/caixa/:id', caixaService.excluir)
  router.get('/caixaSumario', caixaService.getSumario)
  router.get('/caixaResumo', caixaService.getResumo)
  router.get('/caixaContador', caixaService.contador)

//ROTAS CREDITO
  const creditoService = require('../api/caixa/creditoService')
  router.post('/credito/:caixaId', creditoService.inserir)
  router.get('/credito/:caixaId', creditoService.listar)
  router.put('/credito/:caixaId', creditoService.atualizar)
  router.delete('/credito/:caixaId/:creditoId', creditoService.excluir)
  router.get('/creditoCount/:caixaId', creditoService.count)
  router.get('/credito/:caixaId/:skip/:limit', creditoService.paginate)

//ROTAS DEBITO
  const debitoService = require('../api/caixa/debitoService')
  router.post('/debito/:caixaId', debitoService.inserir)
  router.get('/debito/:caixaId', debitoService.listar)
  router.put('/debito/:caixaId', debitoService.atualizar)
  router.delete('/debito/:caixaId/:debitoId', debitoService.excluir)
  router.get('/debitoCount/:caixaId', debitoService.count)
  router.get('/debito/:caixaId/:skip/:limit', debitoService.paginate)

//ROTA USUARIO
  const usuarioService = require('../api/usuario/usuarioService')
  router.post('/usuario', usuarioService.inserir)
  router.get('/usuario', usuarioService.listar)
  router.get('/usuario/:usuarioId', usuarioService.listarPorId)
  router.delete('/usuario/:usuarioId', usuarioService.excluir)
  router.put('/usuario/:usuarioId', usuarioService.atualizar)
  router.post('/autenticar', usuarioService.autenticar)

//ROTA AGENDA
  const agendaService = require('../api/agenda/agendaService')
  router.post('/agenda', agendaService.inserir)
  router.get('/agenda', agendaService.listar)
  router.get('/agenda/:agendaId', agendaService.listarPorId)
  router.delete('/agenda/:agendaId', agendaService.excluir)
  router.put('/agenda/:agendaId', agendaService.atualizar)

//ROTA MK-AUTH
  const mkauthService = require('../api/mkauth/mkauth')
  router.post('/mk/listarTitulos', mkauthService.listarTitulos);
  router.get('/mk/listarClientes', mkauthService.listarClientes);

//ROTA MK-AUTH
  const mikrotikService = require('../api/mikrotik/mikrotik')
  router.get('/mikrotik/listar', mikrotikService.listar);

}
