import alert from "./alert.js";

var SERVER = 'localhost';
var PORT = '4000';

async function verificaLogin(){
    try{
        const login = await fetch(`http://${SERVER}:${PORT}/login`, {method: 'GET', mode: 'cors', 
        headers: {"Content-Type": "application/json"}, credentials: 'include'});
    
        const mensagem = await login.json();
        if(mensagem.message == 'Login realizado'){
            //window.location.href = 'index.html';
        }else{
            window.location.href = 'login.html';
        }
    }catch(error){
    alert(error, 'danger');   
    }

}

async function salvaAluno(){
    var nome = document.querySelector("#nome").value;
    var cpf = document.querySelector("#cpf").value;
    var dataNascimento  = document.querySelector("#dataNascimento").value;

    if(nome == '' || cpf == '' || dataNascimento == ''){
        alert('Verifique os dados', 'danger');
    }else{
        var dados = JSON.stringify({nome: nome, cpf: cpf, dataNascimento: dataNascimento});

        const alunoPOST = await fetch(`http://${SERVER}:${PORT}/alunos`, {method: 'POST', credentials: 'include', body: dados, mode: 'cors', headers: {"Content-Type": "application/json"}});
        
        const response = await alunoPOST.json();
        
        switch(response.code){
            case "23505":
                alert("Não foi possível inserir pois o CPF já está cadastrado!", 'danger');
                break;
            case "22007":
                alert("Não foi possível inserir, verifique a data de nascimento", 'danger');
                break;
            case undefined:
                alert(nome + ' inserido!', 'success');
                document.querySelector("#nome").value = '';
                document.querySelector("#cpf").value = '';
                document.querySelector("#dataNascimento").value = '';
                break;
            default: 
                alert("Ocorreu um erro! " + 'Cód: ' +response.code, 'danger');
        }
    }
}

//assim que carregar...
window.onload = function() {
    verificaLogin();


    document.getElementById('form-salva').addEventListener('submit', function(event){
        event.preventDefault()
        salvaAluno();
      });

    

  };