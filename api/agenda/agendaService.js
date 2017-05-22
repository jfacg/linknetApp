const Agenda = require('./agendaSchema')

function inserir (req, res, next) {
  const agenda =  new Agenda;
  agenda.servico = req.body.servico;
  agenda.dataAgenda = req.body.dataAgenda;
  agenda.horaAgenda = req.body.horaAgenda;
  agenda.dataRegistro = req.body.dataRegistro;
  agenda.solicitante = req.body.solicitante;
  agenda.endereco = req.body.endereco;
  agenda.bairro = req.body.bairro;
  agenda.contato = req.body.contato;
  agenda.informacoes = req.body.informacoes;
  agenda.tecnico = req.body.tecnico;
  agenda.material = req.body.material;
  agenda.baixa = req.body.baixa;

  agenda.save(function (error) {
    if (error) {
      res.status(500).json({error})
    } else {
      res.json(agenda)
    }
  });
};

function listar(req, res) {
  Agenda.find({},
    function(error, agenda) {
      if(error) {
        res.status(500).json({error})
      } else {
        res.json(agenda)
      }
  })
}

function listarPorId(req, res) {
  Agenda.findById(req.params.agendaId, function(error, agenda) {
    if(error) {
      res.status(500).json({error})
    } else {
      res.json(agenda)
    }
  })
}

function excluir(req, res) {
  Agenda.remove({_id: req.params.agendaId}, function(error) {
    if(error) {
      res.status(500).json({error})
    } else {
      res.status(200).send()
    }
  })
}

function atualizar(req, res) {
  Agenda.findOneAndUpdate({
    _id: req.params.agendaId
  }, {
    $set: req.body
  }, {
    new: true,
    runValidators: true,
  }, function(error, agenda) {
    if(error) {
      res.status(500).json({error})
    } else {
      res.json(agenda)
    }
  })
}

module.exports = {inserir, listar, listarPorId, excluir, atualizar}
