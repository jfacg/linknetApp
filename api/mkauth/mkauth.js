
const moment = require('moment');
const mysql = require('mysql');
const clienteService = require('../cliente/clienteService');
const tituloService = require('../titulo/tituloService');

const connection = mysql.createConnection({
host: '191.253.16.150',
user: 'linknet',
password: '1001.',
database: 'mkradius'
});


function carregarClientes(req, res, next) {
  let query = 'SELECT * FROM sis_cliente';

  connection.query(query, function (error, results, fields) {
    if (error) throw error;
    results.forEach(function (element) {
      clienteService.findOneAndUpdate(element);
    });
    res.status(200).json('Sucesso');
  });
}

function carregarTitulos(req, res, next) {
  let query = 'SELECT * FROM vtab_titulos'
  connection.query(query, function (error, results, fields) {
    if (error) throw error
    results.forEach(function (element) {
      tituloService.findOneAndUpdate(element);
    });
    // res.status(200).json('Sucesso')
  })
}

function carregarTitulosVencidos(req, res, next) {
  let data = moment().format()
  // data.setDate(data.getDate()-120)
  let params = ['s', 0, data, 'pago']
  // let params = ["s", 0, data]
  let query = `SELECT * FROM vtab_titulos WHERE
              cli_ativado = ? and
              deltitulo = ? and
              datavenc < ? and
              status != ?`
  // let query = 'SELECT * FROM vtab_titulos WHERE cli_ativado = ? and deltitulo = ? and datavenc < ?'
  let count = 0
  connection.query(query, params, function (error, results, fields) {
    if(error) {
      res.status(500).json(error)
    } else{
      results.forEach(function (element) {
        tituloService.findOneAndUpdate(element);
      });
      res.status(200).json('Sucesso')
      // res.status(200).json(results)
    }

  })
}















// function carregarBoletossss(req, res, next) {
//   var data = new Date();
//   // data.setDate(data.getDate()-30)
//
//   var params = [data];
//   var query = 'SELECT * FROM sis_cliente';
//   // var query = 'SELECT * FROM sis_cliente WHERE datavenc > ?';
//
//   connection.query(query, params, function (error, results, fields) {
//     if (error) throw error;
//     let count = 0
//     results.forEach(function (element) {
//       clienteService.findOneAndUpdate(element);
//     });
//     console.log(count);
//     res.status(200).json(results);
//   });
// }














// function listarTitulos(req, res, next) {
//   let data = new Date()
//   data.setDate(data.getDate()-120)
//   let params = ["s", 0, data]
//   let query = 'SELECT * FROM vtab_titulos WHERE cli_ativado = ? and deltitulo = ? and datavenc > ?'
//
//   connection.query(query, params, function (error, results, fields) {
//     if (error) throw error
//     res.status(200).json(results)
//   })
// }





// function carregarClientess(req, res, next) {
// connection.query('SELECT * from sis_cliente', function (error, results, fields) {
//   if (error) throw error;
//
//   results.forEach(function (element) {
//     clienteService.findOneAndUpdate(element);
//   });
//
//   res.status(500).json("Sucesso");
// });
// }
//
// function listarLogs(req, res, next) {
// connection.query('SELECT * from sis_logs', function (error, results, fields) {
//   if (error) throw error;
//   res.status(500).json(results);
// });
// }


module.exports = { carregarTitulos, carregarClientes, carregarTitulosVencidos }
