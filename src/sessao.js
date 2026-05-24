// js/sessao.js

 
function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;

     
    if (email == undefined || nome == undefined) {
         
        document.body.style.display = "none"; 
        
        alert("Acesso negado! Por favor, faça login.");
        
         
        window.location = "login.html"; 
    } else {
        
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