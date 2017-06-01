const mysql = require('mysql');

// const connection = mysql.createConnection({
// host: '191.253.16.150',
// user: 'linknet',
// password: '1001.',
// database: 'mkradius'
// });

function banco() {
  var connection = mysql.createConnection({
  host: '191.253.16.150',
  user: 'linknet',
  password: '1001.',
  database: 'mkradius'
  });

  return connection
}

module.exports = {banco}
