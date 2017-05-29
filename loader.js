//Import do server
const server = require('./config/server')
//Import do database
require('./config/database')
//Import das rotas
require('./config/routes')(server)

require('./config/carregar')
