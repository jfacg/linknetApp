const mongoose = require('mongoose')


const materialSchema = new mongoose.Schema({
  nome: {type: String, required: true, uppercase: true},
  descricao: {type: String, uppercase: true},
  quantidade: {type: Number},
  valor: {type: Number},
  total: {type: Number},
})


const instalacaoSchema = new mongoose.Schema({
  solicitante: {type: String, required: true, uppercase: true},
  endereco: {type: String, uppercase: true},
  bairro: {type: String, uppercase: true},
  contato: {type: String, uppercase: true},
  informacoes: {type: String, uppercase: true},
  materiais: [materialSchema] ,
  tecnico: {type: String, uppercase: true},
  vendedor: {type: String, uppercase: true},
  dataAgenda: {type: Date},
  dataRegistro: {type: Date},
  dataBaixa: {type: Date},
  baixado: {type: String, enum:['S', 'N'], default: 'N'},
  excluido: {type: String, enum:['S', 'N'], default: 'N'},
  usuario: {type:String, uppercase: true},
  instalado: {type: String, enum:['S', 'N'], default: 'N'},
  valorInstalacao: {type: Number},
  parcela: {type: Number },
  valorMensalidade: {type: Number}
})




module.exports = mongoose.model('Instalacao', instalacaoSchema)