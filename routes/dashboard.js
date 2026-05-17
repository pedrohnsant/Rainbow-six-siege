var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

 
router.post("/salvar", function (req, res) {
    dashboardController.salvar(req, res);
});

 
router.get("/mensal/:idUsuario", function (req, res) {
    dashboardController.buscarEvolucaoMensal(req, res);
});

module.exports = router;