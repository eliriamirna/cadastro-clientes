create database clientes;

CREATE TABLE "clientes" (
  "codigo" serial NOT NULL,
  "nome" varchar(255),
  "cep" varchar(255),
  "endereco" varchar(255),
  "cidade" varchar(255),
  "file_name" varchar(255),
  "file_path" varchar(255),
  PRIMARY KEY ("codigo"),
);

DROP TABLE clientes;