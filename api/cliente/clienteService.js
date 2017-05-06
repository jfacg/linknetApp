const Cliente = require('./cliente');

function inserir(obj) {
    const cliente = new Cliente;
    cliente.nome = obj.nome;
    cliente.cpf_cnpj = obj.cpf_cnpj;
    cliente.nascimento = obj.nascimento;
    cliente. email = obj.email;
    cliente.fone = obj.fone;
    cliente.celular = obj.celular;
    cliente.celular2 = obj.celular2;
    cliente.endereco = obj.endereco;
    cliente.numero = obj.numero;
    cliente.complemento = obj.complemento;
    cliente.bairro = obj.bairro;
    cliente.cidade = obj.cidade;
    cliente.cep = obj.cep;
    cliente.estado = obj.estado;
    cliente.coordenadas = obj.coordenadas;
    cliente.obs = obj.obs;
    cliente.cadastro = obj.cadastro;
    cliente.login = obj.login;
    cliente.venc = obj.venc;
    cliente.rg = obj.rg;
    cliente.plano = obj.plano;
    cliente.cli_ativado = obj.cli_ativado;
    cliente.comodato = obj.comodato;
    cliente.equipamento = obj.equipamento;
    cliente.vendedor = obj.vendedor
    cliente.dias_corte = obj.dias_corte;

    cliente.save(function (error) {
        if (error) {
            return error;
        }
    });
};

function findByCpf(cpf) {
    return Cliente.findOne({cpf_cnpj: cpf}, function (error, result) {
        if (error) return error;
        return result;
    });
};




module.exports = {inserir, findByCpf};
