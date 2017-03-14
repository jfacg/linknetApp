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
    _id: req.params.caixaId
  }, {
          $push: {creditos: credito}
  }, {
    new: true,
    runValidators: true,
  }, function(error, caixa) {
    if(error) {
      res.status(500).json(error)
    } else {
      res.json(caixa)
    }
  })
}

function atualizar(req, res) {

  Caixa.findOneAndUpdate({
    _id: req.params.caixaId,
    "creditos._id": req.body._id
  }, {
          $set: {"creditos.$": req.body}
  }, {
    new: true,
    runValidators: true,
  }, function(error, caixa) {
    if(error) {
      res.status(500).json({error})
    } else {
      res.json(caixa)
    }
  })
}

function listar(req, res) {
  Caixa.findOne({ _id: req.params.caixaId},'creditos', function (err, resultado) {
    if (err) {
      res.status(500).json({err})
    } else {
      res.json(resultado.creditos)
    }
  })
}

function paginate(req, res) {
  let id = req.params.caixaId
  let skip = parseInt(req.params.skip)
  let limit = parseInt(req.params.limit)
  Caixa.find({_id: id}, {creditos: {'$slice': [skip, limit]}}, function (err, resultado) {
    if (err) {
        res.status(500).json({err})
    } else {
      res.json(resultado[0].creditos)
    }
  })
}

function buscarPorId(req, res, next) {
  Caixa.findById(req.params.id, function(error, caixa) {
    if(error) {
      sendErrorsOrNext
    } else {
      res.json(caixa)
    }
  })
}

function count(req, res, next) {
  Caixa.findOne({ _id: req.params.caixaId}, function (err, result) {
    if (err) {
      res.status(500).json({err})
    } else {
      let count = {value : result.creditos.length}
      res.json(count)
    }
  });
}


function excluir(req, res, next) {
  Caixa.findOneAndUpdate({
    _id: req.params.caixaId
  }, {
          $pull: {creditos: {_id: req.params.creditoId}}
  }, {
    new: true,
    runValidators: true,
  }, function(error, caixa) {
    if(error) {
      res.status(500).json({error})
    } else {
      res.json(caixa)
    }
  })
}


module.exports = {count, excluir, listar, inserir, atualizar, buscarPorId, paginate}
