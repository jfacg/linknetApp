const Caixa = require('./caixa')
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
  var credito = req.body
  Caixa.findOneAndUpdate({
    _id: req.params.id
  }, {
          $push: {creditos: credito}
  }, {
    // upsert: true,
    new: true,
    runValidators: true,
  }, function(error, caixa) {
    if(error) {
      // var errors = Errors(error)
      res.status(500).json(error)
    } else {
      res.json(caixa)
    }
  })
}

function atualizar(req, res) {

  Caixa.findOneAndUpdate({
    _id: req.params.id,
    "creditos._id": req.body._id
  }, {
          $set: {"creditos.$": req.body}
  }, {
    // upsert: true,
    new: true,
    runValidators: true,
  }, function(error, caixa) {
    if(error) {
      // var errors = Errors(error)
      res.status(500).json({error})
    } else {
      res.json(caixa)
    }
  })
}

function listar(req, res) {
  Caixa.find(function(error, result) {
      if(error) {
        res.status(500).json({error: error})
      } else {
        res.json(result)
      }
  })
}

function buscarPorId(req, res) {
  Caixa.findById(req.params.id, function(error, caixa) {
    if(error) {
      sendErrorsOrNext
    } else {
      res.json(caixa)
    }
  })
}

function contador(req, res, next) {
  Caixa.count(function (error, value) {
    if(error){
      sendErrorsOrNext
    } else {
      res.json({value})
    }
  })
}


function excluir(req, res) {

  Caixa.findOneAndUpdate({
    _id: req.params.cicloId
  }, {
          $pull: {creditos: {_id: req.params.creditoId}}
  }, {
    // upsert: true,
    new: true,
    runValidators: true,
  }, function(error, caixa) {
    if(error) {
      // var errors = Errors(error)
      res.status(500).json({error})
    } else {
      res.json(caixa)
    }
  })
}


module.exports = {contador, excluir, listar, inserir, atualizar, buscarPorId}
