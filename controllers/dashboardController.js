var dashboardModel = require("../models/dashboardModel");

 
function salvar(req, res) {
    var vitorias = req.body.vitoriasServer;
    var derrotas = req.body.derrotasServer;
    var pctVitoria = req.body.pctVitoriaServer;
    var pctDerrota = req.body.pctDerrotaServer;
    var fkUsuario = req.body.idUsuarioServer;

    if (vitorias == undefined || derrotas == undefined || fkUsuario == undefined) {
        res.status(400).send("Seus dados estão indefinidos!");
    } else {
        dashboardModel.salvarResultado(vitorias, derrotas, pctVitoria, pctDerrota, fkUsuario)
            .then(function (resultado) {
                res.status(200).json(resultado);
            }).catch(function (erro) {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

 
function buscarEvolucaoMensal(req, res) {
     
    var idUsuario = req.params.idUsuario;

    if (idUsuario == undefined) {
        res.status(400).send("O ID do usuário não foi enviado!");
    } else {
        dashboardModel.buscarEvolucaoMensal(idUsuario)
            .then(function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum histórico encontrado para este operador.");
                }
            }).catch(function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao buscar evolução mensal! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

module.exports = {
    salvar,
    buscarEvolucaoMensal  
};