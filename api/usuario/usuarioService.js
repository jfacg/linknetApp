const Usuario = require('./usuario')
const jwt = require('jsonwebtoken')
const secret = 'linknet'

function inserir (req, res, next) {
  const usuario =  new Usuario
  usuario.nome = req.body.nome
  usuario.login = req.body.login
  usuario.senha = req.body.senha
  usuario.tipo = req.body.tipo
  usuario.email = req.body.email
  usuario.dataNascimento = req.body.dataNascimento

  usuario.save(function (error) {
    if (error) {
      res.status(500).json({error})
    } else {
      res.json(usuario)
    }
  })
}

function listar(req, res) {
  Usuario.find({},
    function(error, usuarios) {
      if(error) {
        res.status(500).json({error})
      } else {
        res.json(usuarios)
      }
  })
}

function listarPorId(req, res) {
  Usuario.findById(req.params.usuarioId, function(error, usuario) {
    if(error) {
      res.status(500).json({error})
    } else {
      res.json(usuario)
    }
  })
}

function excluir(req, res) {
  Usuario.remove({_id: req.params.usuarioId}, function(error) {
    if(error) {
      res.status(500).json({error})
    } else {
      res.status(200).send()
    }
  })
}

function atualizar(req, res) {
  Usuario.findOneAndUpdate({
    _id: req.params.usuarioId
  }, {
    $set: req.body
  }, {
    new: true,
    runValidators: true,
  }, function(error, usuario) {
    if(error) {
      res.status(500).json({error})
    } else {
      res.json(usuario)
    }
  })
}

function autenticar(req, res, next) {
  let credencial = {
    login: req.body.login,
    senha: req.body.senha
  }

  Usuario.findOne(credencial, function (error, usuario){
    if (usuario == null) {
      return res.status(500).json({msg: 'Usuario ou senha não confere'})
    } else {
      let token = jwt.sign(usuario.nome, secret)
      return res.status(200).json(token)
    }
  })
}



module.exports = {inserir, listar, listarPorId, excluir, atualizar, autenticar}
