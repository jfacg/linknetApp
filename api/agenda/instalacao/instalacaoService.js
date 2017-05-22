const Instalacao = require('./instalacaoSchema')

function inserir (req, res, next) {
  const instalacao =  new Instalacao(req.body);
  instalacao.save(function (error) {
    if (error) {
      res.status(500).json({error})
    } else {
      res.status(201).send()
    }
  });
};

function excluir(req, res) {
  Instalacao.findOneAndUpdate({
    _id: req.params.instalacaoId
  }, {
      $set: {excluido: 'S'}
    }, {
      new: true,
      runValidators: true,
    }, function (error, result) {
      if (error) {
        res.status(500).json({ error })
      } else {
        res.status(500).send()
      }
    })
}

function listar(req, res) {
  Instalacao.find({},
    function(error, result) {
      if(error) {
        res.status(500).json({error})
      } else {
        res.status(200).json(result)
      }
  })
}

function listarPorId(req, res) {
  Instalacao.findById(req.params.instalacaoId, function(error, result) {
    if(error) {
      res.status(500).json({error})
    } else {
      res.status(200).json(result)
    }
  })
}

function excluir(req, res) {
  Instalacao.remove({_id: req.params.instalacaoId}, function(error) {
    if(error) {
      res.status(500).json({error})
    } else {
      res.status(200).send()
    }
  })
}

function atualizar(req, res) {
  Instalacao.findOneAndUpdate({
    _id: req.params.instalacaoId
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

module.exports = {inserir, listar, listarPorId, excluir, atualizar}
