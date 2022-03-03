
# Desafio Tech Biopark

### By Wesley Ozebe

#### Deploy realizado em: https://desafio-tech-biopark.herokuapp.com/

 
 #### Configuração do ambiente

##### Instale o Node JS
##### Instale o PostgreSQL
##### Execute o script SQL que se encontra em:  `API/src/config/database.sql`
##### Configure o arquivo .env, que se encontra em: `API/.env`, para tal, configure a URL de acesso ao banco de dados como se segue: `DATABASE_URL=postgres://usuario:senha@localhost:porta/banco`, exemplo: `DATABASE_URL=postgres://postgres:postgres@localhost:5432/biopark`
##### Dentro da Pasta API execute o seguinte comando: `npm install`, o qual irá instalar as dependências necessárias. 
##### Após isso dentro da pasta API execute o seguinte comando: `npm start`, o qual irá subir a API
##### Dentro da pasta frontend execute o seguinte comando: `npx serve`, o qual irá subir o frontend
##### Caso queira testar apenas a API instale o Postman e importe o arquivo Biopark.postman_collection.json, que está na raiz do repositório,  lembrando que as URLs de acesso a API estão configuradas para acessar a porta 4000, caso mude a porta no arquivo .env, atualize a porta no Postman.

##### Por padrão, para acessar a pagina inicial acesse: `http://localhost:3000/`, o frontend irá redireciona-lo para a tela de login, conforme inserido no banco anteriormente, o usuário de testes é: admin, com senha 123
