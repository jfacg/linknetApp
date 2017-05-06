const mongoose = require('mongoose')

const agendaSchema = new mongoose.Schema({
  tipoServico: {type: String, required: true, uppercase: true},
  atividade: {type: String, required: true, uppercase: true},
  solicitante: {type: String, required: true, uppercase: true},
  tecnico: {type: String, uppercase: true},
  contato: {type: String, required: true, uppercase: true},
  endereco: {type: String, required: true, uppercase: true},
  bairro: {type: String, required: true, uppercase: true},
  dataAgenda: {type: Date, required: true},
  horaAgenda: {type: String, required: true},
  baixa: {type: String, uppercase: true},
  status: {type: String, required: true, uppercase: true},
  informacoes: {type: String, required: true, uppercase: true}
})

module.exports = mongoose.model('Agenda', agendaSchema)
