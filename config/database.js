//Mapeador de conexão com banco de dados MongoDB
const mongoose = require('mongoose')
//Conexão com o banco de dados
mongoose.Promise = global.Promise
// module.exports = mongoose.connect('mongodb://www.linknetcg.com.br:27019/db_linknet')
module.exports = mongoose.connect('mongodb://localhost/db_linknet')
//Mensagem de validação em um ambito geral
mongoose.Error.messages.general.required = "O atributo '{PATH}' é requerido."
//Mensagem de validação em tipos especificos
mongoose.Error.messages.Number.min = "O '{VALUE}' informado é menor do que o limite minimo de '{MIN}'."
mongoose.Error.messages.Number.max = "O '{VALUE}' informado é maior do que o limite maximo de '{MAX}'."
mongoose.Error.messages.String.enum = "O '{VALUE}' não é valido para o atributo '{PATH}'."
mongoose.Error.messages.String.unique = "O '{VALUE}' não é valido para o atributo '{PATH}'."
