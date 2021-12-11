const alunosModel = require("../model/alunosModel");

//retorna todos os alunos.
exports.getAlunos = function(){
    return alunosModel.getAlunos();
}

//retorna um aluno específico pelo nome.
exports.getAlunoByNome = function(nome){
    return alunosModel.getAlunoByNome(nome);
}

//retorna um aluno específico pelo CPF.
exports.getAlunoByCPF = function(cpf){
    return alunosModel.getAlunoByCPF(cpf);
}

//retorna um aluno específico pelo id.
exports.getAlunoById = function(id){
    return alunosModel.getAlunoById(id);
}

//salva um aluno no banco.
exports.saveAluno = function(aluno){
    return alunosModel.saveAluno(aluno);
}

//atualiza as informações do aluno.
exports.updateAluno = function(id, aluno){
    const alunoId = parseInt(id);
    //console.log("Conteudo novo: " + JSON.stringify(user));
    return alunosModel.updateAluno(alunoId, aluno);
}

//excluí o aluno pelo id.
exports.deleteAluno = function(id){
    return alunosModel.deleteAluno(id);
}