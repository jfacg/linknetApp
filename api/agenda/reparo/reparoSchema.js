const mongoose = require('mongoose')


const materialSchema = new mongoose.Schema({
  nome: {type: String, required: true, uppercase: true},
  descricao: {type: String, uppercase: true},
  quantidade: {type: Number},
  valor: {type: Number},
  total: {type: Number},
})


const reparoSchema = new mongoose.Schema({
  solicitante: {type: String, required: true, uppercase: true},
  endereco: {type: String, uppercase: true},
  bairro: {type: String, uppercase: true},
  contato: {type: String, uppercase: true},
  reclamacao: {type: String, uppercase: true},
  defeito: {type: String, uppercase: true},
  solucao: {type: String, uppercase: true},
  materiais: [materialSchema] ,
  tecnico: {type: String, uppercase: true},
  dataAgenda: {type: Date},
  dataRegistro: {type: Date},
  dataBaixa: {type: Date},
  baixado: {type: String, enum:['S', 'N'], default: 'N'},
  excluido: {type: String, enum:['S', 'N'], default: 'N'},
  usuario: {type:String, uppercase: true},
})




module.exports = mongoose.model('Reparo', reparoSchema)