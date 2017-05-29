const Titulo = require('./tituloSchema')
const moment = require('moment')

function save(obj) {
    const titulo = new Titulo
    titulo = obj
    titulo.save(function (error) {
        if (error) {
            return error
        }
    })
}

function findByCpf(cpf) {
    return Titulo.findOne({ cpf_cnpj: cpf }, function (error, result) {
        if (error) return error
        return result
    })
}

function findOneAndUpdate(obj) {

    return Titulo.findOneAndUpdate({
        titulo: obj.titulo
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

function listar(req, res) {
  Titulo.find({},
    function(error, result) {
      if(error) {
        res.status(500).json({error})
      } else {
        res.status(200).json(result)
      }
  })
}

function titulosVencidos(req, res) {
  let data = moment().format()
  Titulo.find({$and: [
    {datavenc: {$lt: data}},
    {deltitulo: 0},
    {status: {$ne: 'pago'}}
    // {cli_ativado: 's'}
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




module.exports = { save, findByCpf, findOneAndUpdate, listar, titulosVencidos}
