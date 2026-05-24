// var ambiente_processo = 'producao';
var ambiente_processo = 'desenvolvimento';
var caminho_env = ambiente_processo === 'producao' ? '.env' : '.env.dev';
require("dotenv").config({ path: caminho_env });

var express = require("express");
var cors = require("cors");
var path = require("path");

var PORTA_APP = process.env.APP_PORT;
var HOST_APP = process.env.APP_HOST;

var app = express();

var indexRouter     = require("../routes/index");
var usuarioRouter   = require("../routes/usuarios");
var avisosRouter    = require("../routes/avisos");
var dashboardRouter = require("../routes/dashboard");
var mapasRouter     = require("../routes/mapas");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Arquivos estáticos — todos juntos ANTES das rotas
app.use(express.static(path.join(__dirname, "../codigo HTML atualizados")));
app.use(express.static(path.join(__dirname, "../CodigoCSSAtualizado")));
app.use(express.static(path.join(__dirname, "../assets")));
app.use(express.static(path.join(__dirname, "../src")));

// Rotas da API
app.use("/", indexRouter);
app.use("/usuarios", usuarioRouter);
app.use("/avisos", avisosRouter);
app.use("/dashboard", dashboardRouter);
app.use("/mapas", mapasRouter);

app.listen(PORTA_APP, function () {
    console.log(`
    ##   ##  ######   #####             ####       ##     ######     ##              ##  ##    ####    ######  
    ##   ##  ##       ##  ##            ## ##     ####      ##      ####             ##  ##     ##         ##  
    ##   ##  ##       ##  ##            ##  ##   ##  ##     ##     ##  ##            ##  ##     ##        ##   
    ## # ##  ####     #####    ######   ##  ##  ######     ##     ######    ######   ##  ##     ##       ##    
    #######  ##       ##  ##            ##  ##  ##  ##     ##     ##  ##            ##  ##     ##      ##    
    ### ###  ##       ##  ##            ## ##   ##  ##     ##     ##  ##             ####      ##     ##      
    ##   ##  ######   #####             ####    ##  ##     ##     ##  ##              ##      ####    ######  
    \n\n\n
    Servidor rodando! Acesse: http://${HOST_APP}:${PORTA_APP}
    Ambiente: ${process.env.AMBIENTE_PROCESSO}
    \n`);
});