CREATE DATABASE biopark;

--conecte-se ao banco de dados biopark criado e rode os scripts abaixo.

CREATE SCHEMA desafiotech;

CREATE TABLE desafiotech.users(
	id serial not null,
	username varchar(255) not null unique,
	email varchar(255) not null unique,
	password varchar(255) not null,
	primary key(id)
); 

--insere o usuário ADM 
--usuario: admin
--senha: 123
INSERT INTO desafiotech.users (username,email,"password") VALUES
	 ('admin','admin@hotmail.com','$2a$10$9pdfEIPtTE/RPfotxYoN6O6brWgjS8AhHazdqdW6S04tod5cnzXNi');
	
CREATE TABLE desafiotech.aluno(
	id SERIAL NOT NULL,
	nome varchar(255) NOT NULL,
	cpf varchar(11) NOT NULL UNIQUE,
	dataNascimento DATE NOT NULL,
	updatedAt TIMESTAMP NOT NULL,
	createdAt TIMESTAMP NOT NULL,
	PRIMARY KEY(id)
); 