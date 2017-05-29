const mongoose = require('mongoose');

// const tituloSchema = mongoose.Schema({
//     nome: {type: String, required: true, uppercase: true},
//     datavenc: {type: Date},
//     nossonum: {type: String},
//     datapag: {type: Date},
//     status: {type: String},
//     valorpag: {type: String},
//     valor: {type: String},
//     deltitulo: {type: Number},
//     // cpf_cnpj: {type: String, required: true, uppercase: true},
//     // endereco: {type: String, uppercase: true},
//     // bairro: {type: String, uppercase: true},
//     // numero: {type: String},
//     // email: {type: String, lowercase: true},
//     // celular: {type: String},
//     // calculado: {type: Number},
// });
const tituloSchema = mongoose.Schema({
    nome: {type: String, required: true, uppercase: true},
    cpf_cnpj: {type: String, required: true, uppercase: true},
    endereco: {type: String, uppercase: true},
    bairro: {type: String, uppercase: true},
    numero: {type: String},
    email: {type: String, lowercase: true},
    celular: {type: String},
    datavenc: {type: Date},
    datapag: {type: Date},
    nossonum: {type: String},
    status: {type: String},
    deltitulo: {type: Number},
    titulo: {type: Number},
    calculado: {type: Number},
    valorpag: {type: Number},
    valor: {type: Number},
});

module.exports = mongoose.model('Titulo', tituloSchema);
