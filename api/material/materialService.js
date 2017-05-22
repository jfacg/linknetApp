const Material = require('./materialSchema')

function inserir (req, res, next) {
  const material =  new Material;
  material.nome = req.body.nome;
  material.descricao = req.body.descricao;
  material.valor = req.body.valor;

  material.save(function (error) {
    if (error) {
      res.status(500).json({error})
    } else {
      res.status(201).send()
    }
  });
};

function excluir(req, res) {
  Material.findOneAndUpdate({
    _id: req.params.materialId
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
  Material.find({},
    function(error, result) {
      if(error) {
        res.status(500).json({error})
      } else {
        res.status(200).json(result)
      }
  })
}

function listarPorId(req, res) {
  Material.findById(req.params.materialId, function(error, result) {
    if(error) {
      res.status(500).json({error})
    } else {
      res.status(200).json(result)
    }
  })
}

function excluir(req, res) {
  Material.remove({_id: req.params.materialId}, function(error) {
    if(error) {
      res.status(500).json({error})
    } else {
      res.status(200).send()
    }
  })
}

function atualizar(req, res) {
  Material.findOneAndUpdate({
    _id: req.params.materialId
  }, {
    $set: req.body
  }, {
    new: true,
    runValidators: true,
  }, function(error, result) {
    if(error) {
      res.status(500).json({error})
    } else {
      res.status(500).json(result)
    }
  })
}

module.exports = {inserir, listar, listarPorId, excluir, atualizar}
