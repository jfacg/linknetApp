const Caixa = require('./caixa')
const _ = require('lodash')

function Errors(error) {
  var errors = []
  if (error.errors.mes) {
    errors.push(error.errors.mes.message)
  }
  if (error.errors.nome) {
    errors.push(error.errors.nome.message)
  }
  if (error.errors.ano) {
    errors.push(error.errors.ano.message)
  }
  return errors
}

function inserir (req, res, next) {

  const caixa =  new Caixa
  caixa.mes = req.body.mes
  caixa.ano = req.body.ano
  caixa.nome = req.body.nome
  caixa.save(function (error) {
    if (error) {
      var errors = Errors(error)
      res.status(500).json({errors})
    } else {
      res.json(caixa)
    }
  })
}

function atualizar(req, res) {
  Caixa.findOneAndUpdate({
    _id: req.params.id
  }, {
    $set: req.body
  }, {
    // upsert: true,
    new: true,
    runValidators: true,
  }, function(error, caixa) {
    if(error) {
      var errors = Errors(error)
      res.status(500).json({errors})
    } else {
      res.json(caixa)
    }
  })
}

function listarCaixas(req, res) {
  Caixa.aggregate({

    $project: {nome: 1, mes: 1, ano: 1}

    },
    function(error, resultado) {
      if(error) {
        res.status(500).json({error: error})
      } else {
        res.json(resultado)
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
  Caixa.remove({_id: req.params.id}, function(error) {
    if(error) {
      sendErrorsOrNext
    } else {
      res.status(200).send()
    }
  })
}

//Serviço de sumarizar
function getSumario(req, res) {
  //Função de agregação do MongoDB
  Caixa.aggregate(
    //projeção da soma de todos dos creditos e de todos os debitos nas variaveis credito e debito
      {$project: {credito: {$sum: "$creditos.valor"}, debito: {$sum: "$debitos.valor"}}},
    //agrupando a soma de todas as projeções de creditos e debitos de todos os ciclos
      {$group: {_id: null, credito: {$sum: "$credito"}, debito: {$sum: "$debito"}}},
    //Projetando somente o resultado de credito e debito (0=false, 1=true)
      {$project: {_id:0, credito: 1, debito:1}
    }, function (error, resultado) {
      if (error) {
        res.status(500).json({errors: [error]})
      } else {
        res.json(_.defaults(resultado[0], {credito: 0, debito:0}))
      }
    }
  )
}


module.exports = {contador, excluir, listarCaixas, inserir, atualizar, buscarPorId, getSumario}
