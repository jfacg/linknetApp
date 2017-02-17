//Import do lodash
const _ = require('lodash')
//Import do schema
const CicloPagamento = require('./cicloPagamento')
//Criação da api rest
CicloPagamento.methods(['get', 'post', 'put', 'delete'])
//No return do post retorna o novo objeto atualizado
//runValidators:true é usado para que faça valer as validações tambem no update
CicloPagamento.updateOptions({new: true, runValidators: true})

//Tratamentos e padronização de todos os erros da api post e put
CicloPagamento.after('post', sendErrorsOrNext).after('put', sendErrorsOrNext)
//bundle retorna todos erros do node-restful
function sendErrorsOrNext(req, res, next) {
    const bundle = res.locals.bundle

    if(bundle.errors){
      var errors = parseErrors(bundle.errors)
      res.status(500).json({errors})
    }else{
      next()
    }
}

function parseErrors(nodeRestfulErrors) {
    const errors = []
    _.forIn(nodeRestfulErrors, error => errors.push(error.message))
    return errors
}


//Serviço de contador de registros de ciclos
CicloPagamento.route('contador', function (req, res, next) {
  CicloPagamento.count(function (error, value) {
    if(error){
      rest.status(500).json({errors: [error]})
    } else {
      res.json({value})
    }
  })
})


// CicloPagamento.route('/cicloPagamentos').post(function (req, res, next) {
//   var ciclo = new CicloPagamento
//
//   ciclo.nome = req.body.nome
//   ciclo.mes = req.body.mes
//   ciclo.ano = req.body.ano
//   ciclo.creditos = req.body.creditos
//   ciclo.debitos = req.body.debitos
//
//   ciclo.save(function (error) {
//     if (error) {
//       res.send(error)
//     }
//
//     res.json({message: 'Salvo'})
//
//   })
//
// })

module.exports = CicloPagamento
