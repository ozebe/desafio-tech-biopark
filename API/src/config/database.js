/*
Arquivo responsável pelas connectionStrings da aplicação PostgreSQL
*/

const {Pool} = require('pg');
const dotenv = require('dotenv');

dotenv.config();

//conexão com o banco
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
    console.log('Conexão com o banco realizada!');
});

//exporta o módulo
module.exports = {
    query: (text, params) => pool.query(text, params),
};