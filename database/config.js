var mysql = require("mysql2");

// CONFIGURAÇÃO DO AMBIENTE LOCAL (DESENVOLVIMENTO)
var CONFIG_AMBIENTE = {
    host:     process.env.AMBIENTE_PROCESSO == "producao" ? "" : process.env.DB_HOST,
    database: process.env.AMBIENTE_PROCESSO == "producao" ? "" : process.env.DB_DATABASE,
    user:     process.env.AMBIENTE_PROCESSO == "producao" ? "" : process.env.DB_USER,
    password: process.env.AMBIENTE_PROCESSO == "producao" ? "" : process.env.DB_PASSWORD,
    port:     process.env.AMBIENTE_PROCESSO == "producao" ? 3306 : process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,   
    queueLimit: 0
};

 
var pool = mysql.createPool(CONFIG_AMBIENTE);

function executar(instrucao) {
    return new Promise((resolve, reject) => {
        pool.query(instrucao, (erro, resultados) => {
            if (erro) {
                console.error("Erro ao executar query:", erro.message);
                reject(erro);
            } else {
                resolve(resultados);
            }
        });
    });
}

module.exports = {
    executar
};