const mongoose = require('mongoose')

const agendaSchema = new mongoose.Schema({
  servico: {type: String, required: true, uppercase: true},
  dataAgenda: {type: Date, required: true},
  horaAgenda: {type: String},
  dataRegistro: {type: Date, default: Date.now},
  solicitante: {type: String, required: true, uppercase: true},
  endereco: {type: String, uppercase: true},
  bairro: {type: String, uppercase: true},
  contato: {type: String, uppercase: true},
  informacoes: [{type: String, required: true, uppercase: true}],
  materialObjetctId: [{type: mongoose.Schema.Types.ObjectId}] ,
  tecnico: {type: String, uppercase: true},
  baixa: {type: String, uppercase: true},
  baixado: {type: String, enum:['S', 'N'], default: 'N'},
  excluido: {type: String, enum:['S', 'N'], default: 'N'},
})

module.exports = mongoose.model('Agenda', agendaSchema)
