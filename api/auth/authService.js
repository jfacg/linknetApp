const Usuario = require('../usuario/usuario')
const jwt = require('jsonwebtoken')
const secret = 'linknet'

function login(req, res, next) {
  let credencial = {
    login: req.body.login,
    senha: req.body.senha
  }

  Usuario.findOne(credencial, function (error, usuario) {
    if (usuario == null) {
      return res.status(500).json({ msg: 'Usuario ou senha não confere' })
    } else {
      let token = jwt.sign({ 
        usuario: usuario.nome,
        tipo: usuario.tipo,
        iss: Date.now(),
        // exp: Math.floor(Date.now() / 1000) + (1 * 60)
      }, secret)
      return res.status(200).json(token)
    }
  })
}


function decode(req, res, next) {
    console.log(req.rawHeaders.authorization);

  var auth = req.headers.authorization
  // console.log(auth);
  if (auth) {
    var token = auth.split(' ');
  }

  console.log(token);
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token[1], "linknet", function (err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next()
      }
    });
  } else {
    // if there is no token
    // return an error
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });

  }


}


module.exports = {login, decode}