var mapaModel = require("../models/mapaModel");

// 1. Envia as porcentagens calculadas de volta para o front-end
function listarVotosPorcentagem(req, res) {
    mapaModel.listarVotosPorcentagem()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum voto computado ainda.");
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Erro ao listar porcentagens: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

// 2. Pega os dados do botão clicado e manda salvar
function votar(req, res) {
    var idUsuario = req.body.idUsuarioServer;
    var idMapa = req.body.idMapaServer;
    var tipoVoto = req.body.tipoVotoServer;

    if (idUsuario == undefined) {
        res.status(400).send("O ID do usuário está undefined!");
    } else if (idMapa == undefined) {
        res.status(400).send("O ID do mapa está undefined!");
    } else if (tipoVoto == undefined) {
        res.status(400).send("O tipo do voto está undefined!");
    } else {
        mapaModel.votar(idUsuario, idMapa, tipoVoto)
            .then(function (resultado) {
                res.status(200).json(resultado);
            }).catch(function (erro) {
                console.log(erro);
                console.log("Erro ao inserir voto: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

module.exports = {
    listarVotosPorcentagem,
    votar
};