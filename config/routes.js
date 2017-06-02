const express = require('express')

module.exports = function (server) {
  const router = express.Router()
  const auth = express.Router()

  server.use('/api', router)
  server.use('/login', auth)


  //LOGIN
  const authService = require('../api/auth/authService')
  auth.post('/', authService.login)

  //AUTH
  // router.use(authService.decode)

  //ROTA USUARIO
  const usuarioService = require('../api/usuario/usuarioService')
  router.post('/usuario', usuarioService.inserir)
  router.get('/usuario', usuarioService.listar)
  router.get('/usuario/:usuarioId', usuarioService.listarPorId)
  router.delete('/usuario/:usuarioId', usuarioService.excluir)
  router.put('/usuario/:usuarioId', usuarioService.atualizar)
  router.post('/autenticar', usuarioService.autenticar)

  //ROTA AGENDA MATERIAL
  const materialService = require('../api/material/materialService')
  router.post('/material', materialService.inserir)
  router.get('/material', materialService.listar)
  router.get('/material/:materialId', materialService.listarPorId)
  router.delete('/material/:materialId', materialService.excluir)
  router.put('/material/:materialId', materialService.atualizar)

  //ROTA AGENDA INSTALACAO
  const instalacaoService = require('../api/agenda/instalacao/instalacaoService')
  router.post('/instalacao', instalacaoService.inserir)
  router.get('/instalacao', instalacaoService.listar)
  router.get('/instalacao/:instalacaoId', instalacaoService.listarPorId)
  router.delete('/instalacao/:instalacaoId', instalacaoService.excluir)
  router.put('/instalacao/:instalacaoId', instalacaoService.atualizar)

  //ROTA AGENDA REPARO
  const reparoService = require('../api/agenda/reparo/reparoService')
  router.post('/reparo', reparoService.inserir)
  router.get('/reparo', reparoService.listar)
  router.get('/reparo/:reparoId', reparoService.listarPorId)
  router.delete('/reparo/:reparoId', reparoService.excluir)
  router.put('/reparo/:reparoId', reparoService.atualizar)

  //ROTA AGENDA COBRANCA
  const cobrancaService = require('../api/agenda/cobranca/cobrancaService')
  router.post('/cobranca', cobrancaService.inserir)
  router.get('/cobranca', cobrancaService.listar)
  router.get('/cobranca/:cobrancaId', cobrancaService.listarPorId)
  router.get('/cobranca/titulo/:titulo', cobrancaService.listarPorTitulo)
  router.delete('/cobranca/:cobrancaId', cobrancaService.excluir)
  router.put('/cobranca/:cobrancaId', cobrancaService.atualizar)

  //ROTA MK-AUTH
  const mkauthService = require('../api/mkauth/mkauth')
  router.get('/mk/carregarTitulos', mkauthService.carregarTitulos);
  router.get('/mk/carregarClientes', mkauthService.carregarClientes);
  router.get('/mk/carregarTitulosVencidos', mkauthService.carregarTitulosVencidos);

  //ROTA TITULO
  const tituloService = require('../api/titulo/tituloService')
  router.get('/titulo', tituloService.titulosVencidos)

  //ROTA CLIENTE
  const clienteService = require('../api/cliente/clienteService')
  router.get('/cliente', clienteService.listar)
  router.get('/cliente/:nome', clienteService.findByName)

  //ROTA CREDITO
  const creditoService = require('../api/credito/creditoService')
  router.get('/credito', creditoService.listar)
  router.post('/credito', creditoService.save)
  router.put('/credito/:creditoId', creditoService.atualizar)
  router.delete('/credito/:creditoId', creditoService.excluir)

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
  const creditoService1 = require('../api/caixa/creditoService')
  router.post('/creditoold/:caixaId', creditoService1.inserir)
  router.get('/creditoold/:caixaId', creditoService1.listar)
  router.put('/creditoold/:caixaId', creditoService1.atualizar)
  router.delete('/creditoold/:caixaId/:creditoId', creditoService1.excluir)
  router.get('/creditooldCount/:caixaId', creditoService1.count)
  router.get('/creditoold/:caixaId/:skip/:limit', creditoService1.paginate)

  //ROTAS DEBITO
  const debitoService = require('../api/caixa/debitoService')
  router.post('/debito/:caixaId', debitoService.inserir)
  router.get('/debito/:caixaId', debitoService.listar)
  router.put('/debito/:caixaId', debitoService.atualizar)
  router.delete('/debito/:caixaId/:debitoId', debitoService.excluir)
  router.get('/debitoCount/:caixaId', debitoService.count)
  router.get('/debito/:caixaId/:skip/:limit', debitoService.paginate)


  //ROTA MK
  const mikrotikService = require('../api/mikrotik/mikrotik')
  router.get('/mikrotik/listar', mikrotikService.listar);

}
