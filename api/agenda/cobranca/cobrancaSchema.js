const mongoose = require('mongoose')

const cobrancaSchema = new mongoose.Schema({
  cliente: {type: String, required: true, uppercase: true},
  cpf_cnpj: {type: String},
  endereco: {type: String, uppercase: true},
  bairro: {type: String, uppercase: true},
  contato: {type: String, uppercase: true},
  tipo: {type: String, uppercase: true, required: true,},
  mes: {type: String, uppercase: true, required: true,},
  observacao: {type: String, uppercase: true},
  valor: {type: Number},
  titulo: {type: Number},
  coletor: {type: String, uppercase: true},
  dataVencimento: {type: Date},
  dataAgenda: {type: Date},
  dataRegistro: {type: Date},
  dataBaixa: {type: Date},
  baixado: {type: String, enum:['S', 'N'], default: 'N'},
  excluido: {type: String, enum:['S', 'N'], default: 'N'},
  usuario: {type:String, uppercase: true},
})




module.exports = mongoose.model('Cobranca', cobrancaSchema)
