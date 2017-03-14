// const restful = require('node-restful')
const uniqueValidator = require('mongoose-unique-validator')
const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')


//Criação dos schemas
const creditoSchema = new mongoose.Schema({
  tipo: {type: String, required: true, uppercase: true, enum: ['MENSALIDADE', 'INSTALACAO', 'VENDA', 'EMPRESTIMO', 'OUTROS']},
  descricao: {type: String, required: false, uppercase: true},
  devedor: {type: String, required: true, uppercase: true},
  valor: {type: Number, required: true, min: 0},
  status: {type: String, required: true, uppercase: true, num: ['RECEBIDO', 'AGENDADO', 'PENDENTE', 'CANCELADO']},
  statusCaixa: {type: String, required: true, uppercase: true, num: ['REPASSADO', 'NAO REPASSADO']},
  coletor: {type: String, required: true},
  data: {type: Date, required: true}
})

const debitoSchema = new mongoose.Schema({
  tipo: {type: String, required: true, uppercase: true, enum: ['COMPRA', 'SALARIO', 'CONTA', 'OUTRO']},
  descricao: {type: String, required: false},
  credor: {type: String, required: true},
  valor: {type: Number, required: true, min: 0},
  status: {type: String, required: true, uppercase: true, num: ['PAGO', 'AGENDADO', 'PENDENTE', 'CANCELADO']},
  statusCaixa: {type: String, required: true, enum: ['PROPRIO', 'LOJA']},
  pagador: {type: String, required: true},
  data: {type: Date, required: true}
})

const caixaSchema = new mongoose.Schema({
  nome: {type: String, unique: true},
  mes: {type: Number, required: true, min: 0, max: 12},
  ano: {type: Number, required: true, min: 2000, max: 2100},
  creditos: [creditoSchema],
  debitos: [debitoSchema]
})

caixaSchema.plugin(uniqueValidator, { message: 'Caixa já cadastrado' })
caixaSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Caixa', caixaSchema)
