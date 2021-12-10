const usersModel = require("../model/usersModel");
const bcrypt = require('bcryptjs');

//retorna todos os usuários.
exports.getUsers = function(){
    return usersModel.getUsers();
}

//retorna um usuário específico pelo username.
exports.getUserByUsername = function(username){
    return usersModel.getUserByUsername(username);
}

//retorna um usuário específico pelo id.
exports.getUserById = function(id){
    return usersModel.getUserById(id);
}

//salva um usuário no banco.
exports.saveUser = function(user){
    user.password = bcrypt.hashSync(user.password);
    return usersModel.saveUser(user);
}

//atualiza as informações do usuário.
exports.updateUser = function(id, user){
    const userId = parseInt(id);
    //console.log("Conteudo novo: " + JSON.stringify(user));
    user.password = bcrypt.hashSync(user.password);
    return usersModel.updateUser(userId, user);
}

//excluí o usuário pelo id.
exports.deleteUser = function(id){
    return usersModel.deleteUser(id);
}