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
ADD COLUMN mes_ano_controle VARCHAR(7);

ALTER TABLE resultado_dashboard 
ADD CONSTRAINT UNIQUE_usuario_mes UNIQUE (fkUsuario, mes_ano_controle);

 ALTER TABLE resultado_dashboard 
ADD COLUMN data_registro DATETIME DEFAULT CURRENT_TIMESTAMP;

CREATE TABLE mapa (
    idMapa INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
    tipo VARCHAR(45),  
    imagemUrl VARCHAR(255),
    descricao TEXT
);

 
CREATE TABLE voto (
    idVotacao INT AUTO_INCREMENT,
    fkUsuario INT,
    fkMapa INT,
    tipoVoto VARCHAR(20) NOT NULL,  
    dataVoto DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (idVotacao, fkUsuario, fkMapa),
    CONSTRAINT fk_votacao_usuario FOREIGN KEY (fkUsuario) REFERENCES usuario(id), 
    CONSTRAINT fk_votacao_mapa FOREIGN KEY (fkMapa) REFERENCES mapa(idMapa)
);

INSERT INTO mapa (idMapa, nome, tipo, imagemUrl, descricao) VALUES
(1, 'Clube', 'Competitivo', 'clubhouse.jpg', 'Briefing tático do mapa Clube.'),
(2, 'Oregon', 'Competitivo', 'oregon.jpg', 'Briefing tático do mapa Oregon.'),
(3, 'Chalé', 'Competitivo', 'chalet.jpg', 'Briefing tático do mapa Chalé.'),
(4, 'Consulado', 'Competitivo', 'consulado.jpg', 'Briefing tático do mapa Consulado.'),
(5, 'Banco', 'Competitivo', 'banco.jpg', 'Briefing tático do mapa Banco.'),
(6, 'Canal', 'Competitivo', 'canal.jpg', 'Briefing tático do mapa Canal.'),
(7, 'Litoral', 'Competitivo', 'litoral.jpg', 'Briefing tático do mapa Litoral.'),
(8, 'Café Dostoyevsky', 'Competitivo', 'cafe.jpg', 'Briefing tático do mapa Café.'),
(9, 'Parque Temático', 'Competitivo', 'parque.jpg', 'Briefing tático do mapa Parque.'),
(10, 'Fronteira', 'Competitivo', 'fronteira.jpg', 'Briefing tático do mapa Fronteira.'),
(11, 'Outback', 'Competitivo', 'outback.jpg', 'Briefing tático do mapa Outback.'),
(12, 'Arranha-céu', 'Competitivo', 'arranha.jpg', 'Briefing tático do mapa Arranha-céu.'),
(13, 'Fortaleza', 'Competitivo', 'fortaleza.jpg', 'Briefing tático do mapa Fortaleza.'),
(14, 'Villa', 'Competitivo', 'vila.jpg', 'Briefing tático do mapa Villa.'),
(15, 'Laboratório Nighthaven', 'Competitivo', 'laboratorio.jpg', 'Briefing tático do mapa Nighthaven.'),
(16, 'Covil', 'Competitivo', 'covil.jpg', 'Briefing tático do mapa Covil.');

SELECT * FROM usuario;
SELECT * FROM voto;
SELECT * FROM resultado_dashboard;
describe resultado_dashboard;

 