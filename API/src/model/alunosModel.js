const database = require('../config/database');

exports.getAlunos = function(){
    return database.query("select id, nome, cpf, dataNascimento from desafiotech.aluno");
}

exports.getAlunoById = function(id){
    return database.query("select * from desafiotech.aluno where id = $1", [id]);
}

exports.getAlunoByNome = function(nome){
        return database.query("select * from desafiotech.aluno where nome = $1", [nome]);
}

exports.getAlunoByCPF = function(cpf){
    return database.query("select * from desafiotech.aluno where cpf = $1", [cpf]);
}

exports.saveAluno = function(aluno){
    //tenta salvar o aluno, caso ocorra um erro, devolve o erro na solicitação, para ser tratado.
        const query =  database.query('insert into desafiotech.aluno (nome, cpf, dataNascimento, updatedAt, createdAt) values ($1, $2, $3, current_timestamp, current_timestamp) returning *', [aluno.nome, aluno.cpf, aluno.dataNascimento]).catch(e => {
            return(e);
        });
        return query;
        
}

exports.updateAluno = function(id, aluno){
        //tenta atualizar o aluno, caso ocorra um erro, devolve o erro na solicitação, para ser tratado.
        const query =  database.query('update desafiotech.aluno set nome = $1, cpf = $2, dataNascimento = $3, updatedAt = current_timestamp where id = $4 returning *', [aluno.nome, aluno.cpf, aluno.dataNascimento, id]).catch(e => {
            return(e);
        });
        return query;
}

exports.deleteAluno = function(id){
    return database.query('delete from desafiotech.aluno where id = $1', [id]);
}