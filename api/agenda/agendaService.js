const Agenda = require('./agenda')

function inserir (req, res, next) {
  const agenda =  new Agenda;
  agenda.tipoServico = req.body.tipoServico;
  agenda.atividade = req.body.atividade;
  agenda.solicitante = req.body.solicitante;
  agenda.tecnico = req.body.tecnico;
  agenda.contato = req.body.contato;
  agenda.endereco = req.body.endereco;
  agenda.bairro = req.body.bairro;
  agenda.dataAgenda = req.body.dataAgenda;
  agenda.horaAgenda = req.body.horaAgenda;
  agenda.informacoes = req.body.informacoes;
  agenda.baixa = req.body.baixa;
  agenda.status = req.body.status;

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
