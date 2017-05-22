const mongoose = require('mongoose')

const materialSchema = new mongoose.Schema({
  nome: {type: String, required: true, uppercase: true},
  descricao: {type: String, uppercase: true},
  valor: {type: Number},
})

module.exports = mongoose.model('Material', materialSchema)
