const Cobranca = require('./cobrancaSchema')

function inserir (req, res, next) {
  const cobranca =  new Cobranca(req.body);
  cobranca.save(function (error) {
    if (error) {
      res.status(500).json({error})
    } else {
      res.status(201).send()
    }
  });
};

function excluir(req, res) {
  Cobranca.findOneAndUpdate({
    _id: req.params.cobrancaId
  }, {
      $set: {excluido: 'S'}
    }, {
      new: true,
      runValidators: true,
    }, function (error, result) {
      if (error) {
        res.status(500).json({ error })
      } else {
        res.status(200).send()
      }
    })
}

function listar(req, res) {
  Cobranca.find({},
    function(error, result) {
      if(error) {
        res.status(500).json({error})
      } else {
        res.status(200).json(result)
      }
  })
}

function listarPorId(req, res) {
  Cobranca.findById(req.params.cobrancaId, function(error, result) {
    if(error) {
      res.status(500).json({error})
    } else {
      res.status(200).json(result)
    }
  })
}

function listarPorTitulo(req, res) {
  Cobranca.find(
    {titulo: req.params.titulo},
    function(error, result) {
      if(error) {
        res.status(500).json({error})
      } else {
        res.status(200).json(result)
    }
  })
}

function excluir(req, res) {
  Cobranca.remove({_id: req.params.cobrancaId}, function(error) {
    if(error) {
      res.status(500).json({error})
    } else {
      res.status(200).send()
    }
  })
}

function atualizar(req, res) {
  Cobranca.findOneAndUpdate({
    _id: req.params.cobrancaId
  }, {
    $set: req.body
  }, {
    new: true,
    runValidators: true,
  }, function(error, result) {
    if(error) {
      res.status(500).json({error})
    } else {
      res.status(200).json(result)
    }
  })
}

module.exports = {inserir, listar, listarPorId, excluir, atualizar, listarPorTitulo}
