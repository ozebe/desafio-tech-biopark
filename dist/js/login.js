import alert from "./alert.js";

var SERVER = 'localhost';
var PORT = '4000';

async function login(evt){
    evt.preventDefault();

    var user = document.querySelector("#username").value;
    var pwd = document.querySelector('#password').value;

    //caso o usuário ou senham estejam vazios, cria um alert de erro.  
    if(user=='' || pwd==''){
        alert('Verifique o login e senha!', 'danger');
    }else{
    try{
        var dados = JSON.stringify({username: user, password: pwd});

        const loginPOST = await fetch(`http://${SERVER}:${PORT}/login`, {method: 'POST', credentials: 'include', body: dados, mode: 'cors', 
        headers: {"Content-Type": "application/json"}});
         
        const mensagem = await loginPOST.json();
        if(mensagem.message == 'Falha ao realizar login'){
            alert('Usuário e/ou senha incorretos!', 'danger');
        }else if(mensagem.message == 'Login realizado'){
            window.location.href = 'index.html';
        }
    }catch(error){
    alert(error, 'danger');
    }

    }
}

async function verificaLogin(){
    try{
        const login = await fetch(`http://${SERVER}:${PORT}/login`, {method: 'GET', mode: 'cors', 
        headers: {"Content-Type": "application/json"}, credentials: 'include'});
    
        const mensagem = await login.json();
        if(mensagem.message == 'Login realizado'){
            window.location.href = 'index.html';
        }
    }catch(error){
    alert(error, 'danger');   
    }

}

//assim que carregar...
window.onload = function() {
    //adiciona listener de submit no form de updatepost
    document.querySelector('#form-login').addEventListener('submit', login, false);

    verificaLogin();
  };