const Titulo = require('./tituloSchema')
const moment = require('moment')
const mysql = require('mysql');

const connection = mysql.createConnection({
host: '191.253.16.150',
user: 'linknet',
password: '1001.',
database: 'mkradius'
});

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

  let data = moment().subtract(1, 'days').format()
  let params = ['s', 0, data, 'pago']
  let query = `SELECT * FROM vtab_titulos WHERE
              cli_ativado = ? and
              deltitulo = ? and
              datavenc < ? and
              status != ?`
  let count = 0
  connection.query(query, params, function (error, results, fields) {
    if(error) {
      res.status(500).json(error)
    } else{
      res.status(200).json(results)
    }
  })

  // let data = moment().format()
  // Titulo.find({$and: [
  //   {datavenc: {$lt: data}},
  //   {deltitulo: 0},
  //   {status: {$ne: 'pago'}},
  //   {cli_ativado: 's'}
  //   ]
  // },
  //   function(error, result) {
  //     if(error) {
  //       res.status(500).json({error})
  //     } else {
  //       res.status(200).json(result)
  //     }
  // })
}




module.exports = { save, findByCpf, findOneAndUpdate, listar, titulosVencidos}
