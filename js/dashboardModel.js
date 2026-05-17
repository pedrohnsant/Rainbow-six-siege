var database = require("../database/config");

// 1. Função de salvar ATUALIZADA: Ela soma os dados se o mês já existir para o usuário
function salvarResultado(vitorias, derrotas, pctVitoria, pctDerrota, fkUsuario) {
    // Essa query inteligente tenta inserir. Se o MySQL detectar que já existe um registro para o mesmo usuário no mesmo mês/ano, ele roda o UPDATE somando as partidas e recalculando as porcentagens.
    var instrucaoSql = `
        INSERT INTO resultado_dashboard (vitorias, derrotas, percentual_vitoria, percentual_derrota, fkUsuario, mes_ano_controle) 
        VALUES (${vitorias}, ${derrotas}, ${pctVitoria}, ${pctDerrota}, ${fkUsuario}, DATE_FORMAT(NOW(), '%m/%Y'))
        ON DUPLICATE KEY UPDATE 
            vitorias = vitorias + VALUES(vitorias),
            derrotas = derrotas + VALUES(derrotas),
            percentual_vitoria = ROUND(( (vitorias + VALUES(vitorias)) / (vitorias + VALUES(vitorias) + derrotas + VALUES(derrotas)) ) * 100, 2),
            percentual_derrota = ROUND(( (derrotas + VALUES(derrotas)) / (vitorias + VALUES(vitorias) + derrotas + VALUES(derrotas)) ) * 100, 2);
    `;
    console.log("Executando a instrução SQL Inteligente (Acumular): \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// 2. Função de buscar o histórico mensal (Mantida a que funcionou)
function buscarEvolucaoMensal(fkUsuario) {
    console.log("ACESSEI O DASHBOARD MODEL \n \t\t >> Função: buscarEvolucaoMensal");
    
    var instrucaoSql = `
        SELECT 
            MONTH(data_registro) as mes_numero,
            DATE_FORMAT(data_registro, '%m/%Y') as mes_ano,
            SUM(vitorias) as total_vitorias,
            SUM(derrotas) as total_derrotas,
            ROUND(AVG(percentual_vitoria), 2) as media_winrate
        FROM resultado_dashboard
        WHERE fkUsuario = ${fkUsuario}
        GROUP BY MONTH(data_registro), DATE_FORMAT(data_registro, '%m/%Y')
        ORDER BY DATE_FORMAT(data_registro, '%m/%Y') ASC;
    `;
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    salvarResultado,
    buscarEvolucaoMensal
};