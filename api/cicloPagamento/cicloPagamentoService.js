const _ = require('lodash')
const CicloPagamento = require('../cicloPagamento/cicloPagamento')

//Serviço de sumarizar
function listar(req, res) {
  const page = req.query.page || 1
  cicloPagamento.paginate({}, { page, limit: 10 }, function(error, result) {
      if(error) {
        res.status(500).json({error: error})
      } else {
        res.json(result)
      }
  })
}



module.exports = {listar}
