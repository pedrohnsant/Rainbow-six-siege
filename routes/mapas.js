var express = require("express");
var router = express.Router();

var mapaController = require("../controllers/mapaController");

// Rota para buscar as porcentagens (Usada na função atualizarVotosBanco)
router.get("/votos", function (req, res) {
    mapaController.listarVotosPorcentagem(req, res);
});

// Rota para computar o clique (Usada na função votarMapa)
router.post("/votar", function (req, res) {
    mapaController.votar(req, res);
});

module.exports = router;