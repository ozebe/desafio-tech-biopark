//buscando dependências e inicialicando dotenv
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");

//importação das rotas.
const usersRouter = require("./routes/usersRoute");
const loginRouter = require("./routes/loginRoute");


//função middleware que verifica se o usuário esta logado
function authenticationMiddleware(req, res, next) {
    //console.log("Passport: " + JSON.stringify(req.session.passport));
    //console.log("REQ: " + JSON.stringify(req.signedCookies));

    //se o usuário estiver autenticado, continua para a próxima requisição...
    if (req.isAuthenticated()) {
      return next();
    } else {
    //caso não esteja logado, retorna um JSON indicando falha.
      res.json({ message: "Falha ao realizar login"});
    }
  }

//instância o objeto do express, importado anteriormente.  
const app = express();

//utiliza do json do express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ type: "application/vnd.api+json" }));

//realiza a configuração do CORS e das políticas de segurança
app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    `http://${process.env.FSERVER}:${process.env.FPORT}` //só deixa um ip especifico para origem
  ); 
  res.header("Access-Control-Allow-Headers", [
    "Content-Type",
    "X-Requested-With",
    "Origin",
    "Accept",
  ]);
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", ["GET", "PUT", "POST", "DELETE"]);
  app.use(
    cors({
      credentials: true,
      origin: `http://${process.env.FSERVER}:${process.env.FPORT}`,
      exposedHeaders: ['set-cookie']
    })
  );
  next();
});

//utiliza o AUTH_SECRET para configurar o cookieParser
app.use(cookieParser(process.env.AUTH_SECRET));

//configura o auth antes de utilizar as rotas
app.use(
  session({
    secret: process.env.AUTH_SECRET, //utilizar o AUTH_SECRET de ENV para configurar o secret do session
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 60 * 1000 }, //define a duração do cookie de autenticação para 30 minutos.
  })
);


app.use(passport.initialize());
app.use(passport.session());
require("./auth")(passport);

//rotas usadas como middleware
app.use("/login", loginRouter); //deixa o login como rota sem auth por motivos óbvios
app.use("/", authenticationMiddleware, usersRouter);

//exporta o módulo
module.exports = app;