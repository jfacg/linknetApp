const Cliente = require('./clienteSchema');

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
  Cliente.find({},
    function(error, result) {
      if(error) {
        res.status(500).json({error})
      } else {
        res.status(200).json(result)
      }
  })
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
