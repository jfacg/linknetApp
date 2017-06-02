const Cliente = require('./clienteSchema');
const mysql = require('mysql');

const connection = mysql.createConnection({
host: '191.253.16.150',
user: 'linknet',
password: '1001.',
database: 'mkradius'
});

function save(obj) {
    const cliente = new Cliente;
    cliente = obj
    cliente.save(function (error) {
        if (error) {
            return error;
        }
    });
};

function listar(req, res) {
  let query = 'SELECT * FROM sis_cliente';
  connection.query(query, function (error, results, fields) {
    if (error) throw error;
    res.status(200).json(results);
  });
}

function findByName(req, res, next) {
    return Cliente.findOne({ nome: req.params.nome }, function (error, result) {
        if (error) return error;
        return result;
    });
};

function findByCpf(cpf) {
    return Cliente.findOne({ cpf_cnpj: cpf }, function (error, result) {
        if (error) return error;
        return result;
    });
};

function findOneAndUpdate(obj) {

    return Cliente.findOneAndUpdate({
        cpf_cnpj: obj.cpf_cnpj
    }, obj,
        {
            upsert: true,
            new: true,
            runValidators: true,
        }, function (error, result) {
            if (error) return error;
            return result;
        });
};




module.exports = { save, findByCpf, findOneAndUpdate, listar, findByName};
