const database = require('../config/database');

exports.getUsers = function(){
    return database.query("select username, email from desafiotech.users");
}

exports.getUserById = function(id){
    return database.query("select * from desafiotech.users where id = $1", [id]);
}

exports.getUserByUsername = function(username){
        return database.query("select * from desafiotech.users where username = $1", [username]);
}

exports.saveUser = function(user){
    //tenta salvar o usuário, caso ocorra um erro, devolve o erro na solicitação, para ser tratado.
        const query =  database.query('insert into desafiotech.users (username, email, password) values ($1, $2, $3) returning *', [user.username, user.email, user.password]).catch(e => {
            return(e);
        });
        return query;
        
}

exports.updateUser = function(id, user){
    return database.query('update desafiotech.users set username = $1, email = $2, password = $3 where id = $4 returning *', [user.username, user.email, user.password, id]);
}

exports.deleteUser = function(id){
    return database.query('delete from desafiotech.users where id = $1', [id]);
}