const Credito = require('./creditoSchema')
const moment = require('moment')

function save(req, res, next) {
    const credito = new Credito(req.body)
    credito.save(function (error) {
      if (error) {
        res.status(500).json({error})
      } else {
        res.status(201).send()
      }
    });
}

function findByCpf(cpf) {
    return Credito.findOne({ cpf_cnpj: cpf }, function (error, result) {
        if (error) return error
        return result
    })
}

function findOneAndUpdate(obj) {

    return Credito.findOneAndUpdate({
        credito: obj.credito
    },
      obj,
    {
      upsert: true,
      new: true,
      runValidators: true,
    }, function (error, result) {
      if (error) return error
      return result
    })
}

function excluir(req, res) {
  Credito.findOneAndUpdate({
    _id: req.params.creditoId
  }, {
      $set: {excluido: 'S'}
    }, {
      new: true,
      runValidators: true,
    }, function (error, result) {
      if (error) {
        res.status(500).json({ error })
      } else {
        res.status(200).send()
      }
    })
}

function atualizar(req, res) {
  Credito.findOneAndUpdate({
    _id: req.params.creditoId
  }, {
    $set: req.body
  }, {
    new: true,
    runValidators: true,
  }, function(error, result) {
    if(error) {
      res.status(500).json({error})
    } else {
      res.status(200).json(result)
    }
  })
}

function listar(req, res) {
  Credito.find({},
    function(error, result) {
      if(error) {
        res.status(500).json({error})
      } else {
        res.status(200).json(result)
      }
  })
}

function creditosVencidos(req, res) {
  let data = moment().format()
  Credito.find({$and: [
    {datavenc: {$lt: data}},
    {delcredito: 0},
    {status: {$ne: 'pago'}},
    {cli_ativado: 's'}
    ]
  },
    function(error, result) {
      if(error) {
        res.status(500).json({error})
      } else {
        res.status(200).json(result)
      }
  })
}




module.exports = { save, atualizar, excluir, listar, findByCpf, findOneAndUpdate, creditosVencidos}
