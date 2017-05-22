const Reparo = require('./reparoSchema')

function inserir (req, res, next) {
  const reparo =  new Reparo(req.body);
  reparo.save(function (error) {
    if (error) {
      res.status(500).json({error})
    } else {
      res.status(201).send()
    }
  });
};

function excluir(req, res) {
  Reparo.findOneAndUpdate({
    _id: req.params.reparoId
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
  Reparo.find({},
    function(error, result) {
      if(error) {
        res.status(500).json({error})
      } else {
        res.status(200).json(result)
      }
  })
}

function listarPorId(req, res) {
  Reparo.findById(req.params.reparoId, function(error, result) {
    if(error) {
      res.status(500).json({error})
    } else {
      res.status(200).json(result)
    }
  })
}

function excluir(req, res) {
  Reparo.remove({_id: req.params.reparoId}, function(error) {
    if(error) {
      res.status(500).json({error})
    } else {
      res.status(200).send()
    }
  })
}

function atualizar(req, res) {
  Reparo.findOneAndUpdate({
    _id: req.params.reparoId
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
