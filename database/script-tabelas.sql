-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql server
*/

CREATE DATABASE r6_forum;
USE r6_forum;
CREATE TABLE usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL
);

CREATE TABLE resultado_dashboard (
    idRes INT PRIMARY KEY AUTO_INCREMENT,
    vitorias INT,
    derrotas INT,
    percentual_vitoria DECIMAL(5,2),  
    percentual_derrota DECIMAL(5,2),
    fkUsuario INT,
    CONSTRAINT fk_usuario_resultado FOREIGN KEY (fkUsuario) 
        REFERENCES usuario(id)
);

ALTER TABLE resultado_dashboard 
ADD COLUMN data_registro DATETIME DEFAULT CURRENT_TIMESTAMP;

CREATE TABLE mapa (
    idMapa INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
    tipo VARCHAR(45), -- Ex: Competitivo, Retrabalho
    imagemUrl VARCHAR(255),
    descricao TEXT
);

-- 2. Tabela Intermediária: Votacao (Relacionamento Muitos para Muitos)
CREATE TABLE votacao (
    idVotacao INT AUTO_INCREMENT,
    fkUsuario INT,
    fkMapa INT,
    dataVoto DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (idVotacao, fkUsuario, fkMapa),
    CONSTRAINT fk_votacao_usuario FOREIGN KEY (fkUsuario) 
        REFERENCES usuario(id), 
    CONSTRAINT fk_votacao_mapa FOREIGN KEY (fkMapa) 
        REFERENCES mapa(idMapa)
);