const mongoose = require('mongoose');

const clienteSchema = mongoose.Schema({
    nome: {type: String, required: true, uppercase: true},
    cpf_cnpj: {type: String, required: true, uppercase: true},
    nascimento: {type: String, uppercase: true},
    email: {type: String, lowercase: true},
    fone: {type: String},
    celular: {type: String},
    celular2: {type: String},
    endereco: {type: String, uppercase: true},
    numero: {type: String},
    complemento: {type: String, uppercase: true},
    bairro: {type: String, uppercase: true},
    cidade: {type: String, uppercase: true},
    cep: {type: String},
    estado: {type: String, uppercase: true},
    coordenadas: {type: String},
    obs: {type: String, uppercase: true},
    cadastro: {type: String},
    login: {type: String, uppercase: true},
    venc: {type: String},
    rg: {type: String},
    plano: {type: String, uppercase: true},
    cli_ativado: {type: String, uppercase: true},
    comodato: {type: String, uppercase: true},
    equipamento: {type: String, uppercase: true},
    vendedor: {type: String, uppercase: true},
    dias_corte: {type: Number}
});

module.exports = mongoose.model('Cliente', clienteSchema);