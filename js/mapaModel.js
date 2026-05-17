var database = require("../database/config");

// 1. Calcula a porcentagem de Fav e Ban baseada no total de votos de cada mapa
function listarVotosPorcentagem() {
    console.log("ACESSEI O MAPA MODEL \n \t\t >> Função: listarVotosPorcentagem");
    
    var instrucaoSql = `
        SELECT 
            fkMapa,
            ROUND((COUNT(CASE WHEN tipoVoto = 'Favorito' THEN 1 END) / COUNT(*)) * 100) AS porcentagemFavorito,
            ROUND((COUNT(CASE WHEN tipoVoto = 'Banir' THEN 1 END) / COUNT(*)) * 100) AS porcentagemBan
        FROM votacao
        GROUP BY fkMapa;
    `;
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// 2. Salva o voto (idUsuario, idMapa e se foi 'Favorito' ou 'Banir')
function votar(idUsuario, idMapa, tipoVoto) {
    console.log("ACESSEI O MAPA MODEL \n \t\t >> Função: votar");
    
    var instrucaoSql = `
        INSERT INTO votacao (fkUsuario, fkMapa, tipoVoto) VALUES (${idUsuario}, ${idMapa}, '${tipoVoto}');
    `;
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    listarVotosPorcentagem,
    votar
};