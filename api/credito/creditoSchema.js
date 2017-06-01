const mongoose = require('mongoose')

const creditoSchema = new mongoose.Schema({
  tipo: {type: String, required: true, uppercase: true},
  mes: {type: String, uppercase: true},
  descricao: {type: String, required: false, uppercase: true},
  cliente: {type: String, uppercase: true},
  valor: {type: Number, required: true, min: 0},
  coletor: {type: String, required: true},
  repassado: {type: String, enum:['S', 'N'], default: 'N'},
  dataBaixa: {type: Date, required: true},
  cpf_cnpj: {type: String},
  observacao: {type: String, uppercase: true},
  titulo: {type: Number},
  dataVencimento: {type: Date},
  excluido: {type: String, enum:['S', 'N'], default: 'N'},
  usuario: {type:String, uppercase: true},

})
module.exports = mongoose.model('Credito', creditoSchema)
