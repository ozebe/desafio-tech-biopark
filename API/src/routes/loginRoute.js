const express = require('express');
const router = express.Router();
const passport = require('passport');

//rota GET para verificar se há um usuário logado.
router.get('/', (req, res, next) =>{
    if(req.user){
        res.json({message: "Login realizado"});
    }else{
        res.json({message: "Login não realizado"});
    }
});

//rota POST para realizar o login do usuário.
router.post('/', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if(err) throw err;
        if(!user) res.json({ message: "Falha ao realizar login"});
        else{
            req.logIn(user, err => {
                if(err) throw err;
                res.json({ message: "Login realizado"});
            })
        }
    })(req, res, next);
});

//rota GET para realizar o logout do usuário.
router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
})

module.exports = router;