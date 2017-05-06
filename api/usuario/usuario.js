const mongoose = require('mongoose')

const usuarioSchema = new mongoose.Schema({
  nome: {type: String, required: true, uppercase: true},
  login: {type: String, required: true, uppercase: true},
  senha: {type: String, required: true, uppercase: true},
  tipo: {type: String, required: true, uppercase: true, enum: ['ADMIN', 'TECNICO', 'FINANCEIRO']},
  email: {type: String, required: true, uppercase: true},
  dataNascimento: {type: Date}
})

module.exports = mongoose.model('Usuario', usuarioSchema)
