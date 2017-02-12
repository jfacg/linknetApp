const _ = require('lodash')
const CicloPagamento = require('../cicloPagamento/cicloPagamento')

//Serviço de sumarizar
function getSumario(req, res) {
  //Função de agregação do MongoDB
  CicloPagamento.aggregate(
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

module.exports = {getSumario}
