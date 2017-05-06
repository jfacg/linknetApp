
const mysql = require('mysql');
const clienteService = require('../cliente/clienteService');

const connection = mysql.createConnection({
  host: '191.253.16.150',
  user: 'linknet',
  password: '1001.',
  database: 'mkradius'
});

function listarTitulos(req, res, next) {
  var query = 'SELECT * FROM vtab_titulos';
  var params = [];
  // clienteService.inserir(cliente);
  if (req.body.inicio && req.body.final) {
    params = [req.body.inicio, req.body.final]
    query = 'SELECT * FROM vtab_titulos WHERE datavenc >= ? and datavenc <= ?';
  }

  connection.query(query, params, function (error, results, fields) {
    if (error) throw error;

    results.forEach(function (element) {
      clienteService.findByCpf(element.cpf_cnpj).exec(function (error, result) {
        if (result == null) clienteService.inserir(element); 
      });
    });
    res.status(200).json(results);
  });
}

function listarClientes(req, res, next) {
  connection.query('SELECT * from sis_cliente', function (error, results, fields) {
    console.log(fields);
    if (error) throw error;

    results.forEach(function (element) {
      clienteService.findByCpf(element.cpf_cnpj).exec(function (error, result) {
        if (error) throw error;
        
        if (result == null) clienteService.inserir(element); 
      });
    });

    res.status(500).json("Sucesso");
  });
}

function listarConectados(req, res, next) {
  connection.query('SELECT * from sis_conectados', function (error, results, fields) {
    console.log(results);
    if (error) throw error;
    res.status(500).json(results);
  });
}

function listarLogs(req, res, next) {
  connection.query('SELECT * from sis_logs', function (error, results, fields) {
    if (error) throw error;
    res.status(500).json(results);
  });
}


module.exports = { listarTitulos, listarClientes, listarConectados, listarLogs }
