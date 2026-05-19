// js/sessao.js

// 1. Função de Validação (O Segurança)
function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;

    // Se as variáveis NÃO existirem (usuário não logou ou limpou o cache)
    if (email == undefined || nome == undefined) {
        // Esconde o body para o usuário não ver o conteúdo por trás do alerta
        document.body.style.display = "none"; 
        
        alert("Acesso negado! Por favor, faça login.");
        
        // Redireciona para o login (Ajuste o caminho se o arquivo estiver em outra pasta)
        window.location = "login.html"; 
    } else {
        // Se estiver logado, tenta exibir o nome no elemento com id "b_usuario"
        var b_usuario = document.getElementById("b_usuario");
        if (b_usuario != null) {
            b_usuario.innerHTML = nome;
        }
    }
}

// 2. Função de Logout
function limparSessao() {
    sessionStorage.clear();
    // Use "login.html" se estiver na mesma pasta da dashboard, 
    // ou "../login.html" se a dashboard estiver dentro de uma subpasta.
    window.location = "login.html"; 
}

// 3. Funções de Carregamento (Loading)
function aguardar() {
    var divAguardar = document.getElementById("div_aguardar");
    if (divAguardar) {
        divAguardar.style.display = "flex";
    }
}

function finalizarAguardar(texto) {
    var divAguardar = document.getElementById("div_aguardar");
    if (divAguardar) {
        divAguardar.style.display = "none";
    }

    var divErrosLogin = document.getElementById("div_erros_login");
    if (texto && divErrosLogin) {
        divErrosLogin.style.display = "flex";
        divErrosLogin.innerHTML = texto;
    }
}