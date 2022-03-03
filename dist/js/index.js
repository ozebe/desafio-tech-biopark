import alert from "./alert.js";

var SERVER = 'desafio-tech-biopark.herokuapp.com';
var PORT = '8080';

async function verificaLogin(){
    try{
        const login = await fetch(`https://${SERVER}/login`, {method: 'GET', mode: 'cors', 
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


function addRowToTableAlunos(id, nome, cpf, datanascimento){
    var alunoPlaceHolder = document.querySelector('.table-alunos-body');
    var wrapper = document.createElement('tr');

    wrapper.innerHTML = `
                  <th scope="row">${id}</th>
                  <td>${nome}</td>
                  <td>${cpf}</td>
                  <td>${new Date(datanascimento).toLocaleDateString()}</td>
                  <td><form class="form-edita" action="javascript:editaAluno(${id})"><input class="btn btn-warning" type="submit" value="Editar registro"></form></td>
                  <td><form class="form-exclui" action="javascript:excluiAluno(${id})"><input class="btn btn-danger" type="submit" value="Excluir registro"></form></td>

                  `;
                
    alunoPlaceHolder.append(wrapper);
 
}

async function carrregaDadosTabelaAlunos(){
    document.querySelector('.table-alunos-body').innerHTML = "";
    try {
        const response = await fetch(`https://${SERVER}/alunos`, {method: 'GET', mode: 'cors', 
        headers: {"Content-Type": "application/json"}, credentials: 'include'});
        
        const data = await response.json();
        for(let aluno of data){
            addRowToTableAlunos(aluno.id, aluno.nome, aluno.cpf, aluno.datanascimento);
        }
    } catch (error) {
        console.error(error);
        alert(error, 'danger');
    }
}

window.excluiAluno = async function(id){
    
    if (window.confirm("Deseja realmente excluir o registro selecionado ?")) {
        console.log(id);

        const response = await fetch(`https://${SERVER}/alunos/${id}`, {method: 'DELETE', mode: 'cors', 
        headers: {"Content-Type": "application/json"}, credentials: 'include'});
        
        const data = await response.json();
        document.location.reload(true);
      }
}

window.editaAluno = async function(id){
    var alertPlaceholder = document.getElementById('liveEdit')

    var wrapper = document.createElement('div')
    wrapper.innerHTML = 
    '<h4>Editar aluno</h4>'+
    `<form id="form-edita" action="javascript:salvaAlunoEditado(${id})">`+
    '<div class="form-group">'+
      '<input type="text" class="form-control" id="nomeEdit" aria-describedby="emailHelp" placeholder="Nome" required="true">'+
    '</div>'+
    '<br>'+
    '<div class="form-group">'+
      '<input type="number" class="form-control" id="cpfEdit" placeholder="CPF" required="true">'+
    '</div>'+
    '<br>'+
    '<div class="form-group">'+
      '<input type="date" class="form-control" id="dataNascimentoEdit" placeholder="Data de nascimento" required="true">'+
    '</div>'+
    '<br>'+
    '<button type="submit" class="btn btn-primary">Salvar</button>'+
  '</form>'
    alertPlaceholder.innerHTML = ""; //apaga o anterior antes de colocar outro
    alertPlaceholder.append(wrapper);

    const response = await fetch(`https://${SERVER}/alunos/${id}`, {method: 'GET', mode: 'cors', 
    headers: {"Content-Type": "application/json"}, credentials: 'include'});

    const aluno = await response.json();

    document.querySelector("#nomeEdit").setAttribute('value', aluno[0].nome);
    document.querySelector("#cpfEdit").setAttribute('value', aluno[0].cpf);
    document.querySelector("#dataNascimentoEdit").setAttribute('value', new Date(aluno[0].datanascimento).toISOString().split('T')[0]);
}

window.salvaAlunoEditado = async function(id){
    var nome = document.querySelector("#nomeEdit").value;
    var cpf = document.querySelector('#cpfEdit').value;
    var dataNascimento = document.querySelector('#dataNascimentoEdit').value;

    if(nome == '' || cpf == '' || dataNascimento == ''){
        alert('Verifique os dados', 'danger');
    }else{
        var novosDados = JSON.stringify({nome: nome, cpf: cpf, dataNascimento: dataNascimento});
    
        const alunoPUT = await fetch(`https://${SERVER}/alunos/${id}`, {method: 'PUT', credentials: 'include', body: novosDados, mode: 'cors', headers: {"Content-Type": "application/json"}});
            
        const response = await alunoPUT.json();
        
        switch(response.code){
            case "23505":
                alert("Não foi possível atualizar pois o CPF já está cadastrado!", 'danger');
                break;
            case "22007":
                alert("Não foi possível atualizar, verifique a data de nascimento", 'danger');
                break;
            case undefined:
                alert('Dados de ' + nome + ' atualizados!', 'success');
                var formEdita = document.getElementById('form-edita');
                formEdita .innerHTML = "";
                break;
            default: 
                alert("Ocorreu um erro! " + 'Cód: ' +response.code, 'danger');
        }
    }


}

//assim que carregar...
window.onload = function() {
    //verificaLogin();
    carrregaDadosTabelaAlunos();
  };
