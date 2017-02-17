//Mapeamento restful do node
const restful = require('node-restful')
const mongoose = restful.mongoose


//Criação dos schemas
const creditoSchema = new mongoose.Schema({
  tipo: {type: String, required: true, uppercase: true, enum: ['MENSALIDADE', 'INSTALAÇÃO', 'VENDA', 'EMPRESTIMO', 'OUTROS']},
  descricao: {type: String, required: false},
  devedor: {type: String, required: true},
  valor: {type: Number, required: true, min: 0},
  status: {type: String, required: true, uppercase: true, num: ['RECEBIDO', 'AGENDADO', 'PENDENTE', 'CANCELADO']},
  statusCaixa: {type: String, required: true, uppercase: true, num: ['REPASSADO', 'NAO REPASSADO']},
  coletor: {type: String, required: true},
  data: {type: Date, required: true}
})

const debitoSchema = new mongoose.Schema({
  tipo: {type: String, required: true, uppercase: true, enum: ['COMPRA', 'SALARIO', 'CONTA', 'OUTROS']},
  descricao: {type: String, required: false},
  credor: {type: String, required: true},
  valor: {type: Number, required: true, min: 0},
  status: {type: String, required: true, uppercase: true, num: ['PAGO', 'AGENDADO', 'PENDENTE', 'CANCELADO']},
  statusCaixa: {type: String, required: true, enum: ['PROPRIO', 'LOJA']},
  pagador: {type: String, required: true},
  data: {type: Date, required: true}
})

const cicloPagamentoSchema = new mongoose.Schema({
  nome: {type: String, required: true, unique: true},
  mes: {type: Number, required: true, min: 0, max: 12},
  ano: {type: Number, required: true, min: 2000, max: 2100},
  creditos: [creditoSchema],
  debitos: [debitoSchema]
})


module.exports = restful.model('CicloPagamento', cicloPagamentoSchema)
