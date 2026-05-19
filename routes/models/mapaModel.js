var database = require("../database/config");

 
function listarVotosPorcentagem() {
    console.log("ACESSEI O MAPA MODEL \n \t\t >> Função: listarVotosPorcentagem");
    
    var instrucaoSql = `
        SELECT 
            fkMapa,
            ROUND((COUNT(CASE WHEN tipoVoto = 'Favorito' THEN 1 END) / COUNT(*)) * 100) AS porcentagemFavorito,
            ROUND((COUNT(CASE WHEN tipoVoto = 'Banir' THEN 1 END) / COUNT(*)) * 100) AS porcentagemBan
        FROM voto
        GROUP BY fkMapa;
    `;
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function votar(idUsuario, idMapa, tipoVoto) {
    console.log("ACESSEI O MAPA MODEL \n \t\t >> Função: votar");
    
    var instrucaoSql = `
        INSERT INTO voto (fkUsuario, fkMapa, tipoVoto) VALUES (${idUsuario}, ${idMapa}, '${tipoVoto}');
    `;
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    listarVotosPorcentagem,
    votar
};