const express = require('express');
const router = express.Router();

const usersController = require('../controller/usersController');

//get em /users, para requisitar todos os cadastros de usuário.
router.get('/users', async function(req, res, next) {
    const users = await usersController.getUsers();
    res.json(users.rows);
  });

//post em /users, para salvar um usuário .
router.post('/users', async function(req, res, next){
  const user = req.body;
  const newUser = await usersController.saveUser(user);

      //se ao tentar inserir o user, retornar um erro.
      if(newUser.code){
        res.json(newUser);
    //se não ocorrer nenhum erro ao inserir o novo user.
    }else{
        //devolve as informações do cadastro realizado.
        res.json(newUser.rows);
    }
})


module.exports = router;