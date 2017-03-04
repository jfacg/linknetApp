const CicloPagamento = require('./cicloPagamento')
const _ = require('lodash')

function Errors(error) {
  var errors = []
  if (error.errors.mes) {
    errors.push(error.errors.mes.message)
  }
  if (error.errors.ano) {
    errors.push(error.errors.ano.message)
  }
  return errors
}

function inserir (req, res, next) {
  var debito = req.body
  CicloPagamento.findOneAndUpdate({
    _id: req.params.id
  }, {
          $push: {debitos: debito}
  }, {
    // upsert: true,
    new: true,
    runValidators: true,
  }, function(error, cicloPagamento) {
    if(error) {
      // var errors = Errors(error)
      res.status(500).json({error})
    } else {
      res.json(cicloPagamento)
    }
  })
}

function atualizar(req, res) {

  CicloPagamento.findOneAndUpdate({
    _id: req.params.id,
    "debitos._id": req.body._id
  }, {
          $set: {"debitos.$": req.body}
  }, {
    // upsert: true,
    new: true,
    runValidators: true,
  }, function(error, cicloPagamento) {
    if(error) {
      // var errors = Errors(error)
      res.status(500).json({error})
    } else {
      res.json(cicloPagamento)
    }
  })
}

function listar(req, res) {
  CicloPagamento.find(function(error, result) {
      if(error) {
        res.status(500).json({error: error})
      } else {
        res.json(result)
      }
  })
}

function buscarPorId(req, res) {
  CicloPagamento.findById(req.params.id, function(error, cicloPagamento) {
    if(error) {
      sendErrorsOrNext
    } else {
      res.json(cicloPagamento)
    }
  })
}

function contador(req, res, next) {
  CicloPagamento.count(function (error, value) {
    if(error){
      sendErrorsOrNext
    } else {
      res.json({value})
    }
  })
}


function excluir(req, res) {

  CicloPagamento.findOneAndUpdate({
    _id: req.params.cicloId
  }, {
          $pull: {debitos: {_id: req.params.debitoId}}
  }, {
    // upsert: true,
    new: true,
    runValidators: true,
  }, function(error, cicloPagamento) {
    if(error) {
      // var errors = Errors(error)
      res.status(500).json({error})
    } else {
      res.json(cicloPagamento)
    }
  })
}


module.exports = {contador, excluir, listar, inserir, atualizar, buscarPorId}
