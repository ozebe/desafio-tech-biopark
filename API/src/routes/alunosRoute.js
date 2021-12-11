const express = require('express');
const router = express.Router();

const alunosController = require('../controller/alunosController');

//get em /alunos, para requisitar todos os cadastros de alunos.
router.get('/alunos', async function(req, res, next) {
    const alunos = await alunosController.getAlunos();
    res.json(alunos.rows);
  });

//get em /alunos/id, para requisitar um aluno por seu ID
router.get('/alunos/:id', async function(req, res){
    const aluno = await alunosController.getAlunoById(req.params.id);
    res.json(aluno.rows);
});

//get em /alunos/nome, para requisitar um aluno por seu nome
router.get('/alunos/:nome', async function(req, res){
    const aluno = await alunosController.getAlunoByNome(req.params.nome);
    res.json(aluno.rows);
});

//get em /alunos/cpf, para requisitar um aluno por seu cpf
router.get('/alunos/:cpf', async function(req, res){
    const aluno = await alunosController.getAlunoByCPF(req.params.cpf);
    res.json(aluno.rows);
});

//post em /alunos, para salvar um aluno .
router.post('/alunos', async function(req, res, next){
  const aluno = req.body;
  const newAluno = await alunosController.saveAluno(aluno);

      //se ao tentar inserir o aluno, retornar um erro.
      if(newAluno.code){
        res.json(newAluno);
    //se não ocorrer nenhum erro ao inserir o novo aluno.
    }else{
        //devolve as informações do cadastro realizado.
        res.json(newAluno.rows);
    }
});


router.put('/alunos/:id', async function(req, res){
    const aluno = req.body;
    const alunoPut = await alunosController.updateAluno(req.params.id, aluno);

    //se ao tentar atualizar o aluno, retornar um erro.
    if(alunoPut.code){
        res.json(alunoPut);
    //se não ocorrer nenhum erro ao atualizar o aluno.
    }else{
        //devolve as informações do update realizado.
        res.json(alunoPut.rows);
    }  
});

router.delete('/alunos/:id', async function(req, res){
    const alunoDelete = await alunosController.deleteAluno(req.params.id);
    res.json(alunoDelete);
})



module.exports = router;