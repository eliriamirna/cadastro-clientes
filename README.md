# Cadastro de Clientes - Backend

Este projeto implementa a API para um cadastro básico de clientes utilizando **Express.js** como framework backend. A API permite realizar operações CRUD (Criar, Ler, Atualizar e Excluir) e inclui a possibilidade de anexar arquivos PDF aos cadastros de clientes.

## Funcionalidades

- **Requisitos do Cadastro de Clientes**: 
  - Código (autoincremento)
  - Nome
  - Endereço
  - Cidade 
  - CEP 
- **Upload de Arquivos**: 
  - Permite anexar um arquivo PDF ao cadastro de clientes.
- **Edição e Exclusão de Clientes**: 
  - Clientes podem ser editados e excluídos através dos endpoints da API.

## Tecnologias Utilizadas

- **Node.js**
- **Express.js**
- **PostgreSQL** (como banco de dados)
- **Multer** (para upload de arquivos PDF)
- **Docker e Docker Compose** (para containerização)
- **TypeScript** (para tipagem estática)

## Instalação

### Pré-requisitos

- Node.js v16+
- Docker e Docker Compose
- PostgreSQL

### Passos para Configuração

1. Clone o repositório:

   ```bash
   git clone https://github.com/eliriamirna/cadastro-clientes-api
   cd cadastro-clientes-api
   ```

2. Instale as dependências do projeto:

    ```bash
    npm install
    ```

3. Crie um arquivo .env na raiz do projeto e configure as variáveis de ambiente:

    ```bash
    PORTA=5000
    PG_USER=postgres
    PG_PASSWORD=postgres
    PG_HOST=localhost
    PG_PORT=5432
    PG_DATABASE=clientes
    ```

4. Execute o Docker Compose para iniciar o banco de dados:

    ```bash
        docker-compose up -d
    ```

5. Rode o servidor em modo de desenvolvimento:

    ```bash
    npm run dev
    ```

6. Para compilar o projeto e rodar em produção:

    ```bash
    npm run build
    npm start
    ```

## Banco de dados
 
Se você estiver utilizando o PostgreSQL diretamente, crie a tabela de clientes com o comando CREATE TABLE que se encontra no arquivo comandos.sql


## Uso
 
A API possui os seguintes endpoints:

- POST ```/clientes``` - Cria um novo cliente.
- GET ```/clientes``` - Retorna todos os clientes cadastrados.
- GET ```/clientes/:codigo``` - Retorna todos os dados de um cliente pelo codigo.
- PUT ```/clientes/:codigo``` - Atualiza um cliente existente.
- DELETE ```/clientes/:codigo``` - Exclui um cliente. 
- POST ```/upload``` - Adiciona um arquivo a um cliente pelo código. 

Exemplo de Requisição para Criação de Cliente

    ```bash
    POST /clientes
    Content-Type: application/json
    {
    "nome": "Cliente Exemplo",
    "endereco": "Rua Exemplo, 123",
    "cidade": "São Paulo",
    "cep": "01001000"
    }
    ```

Exemplo de Requisição para Upload de Arquivos

    ```bash
    POST /clientes
    Content-Type: multipart/form-data
    {
    "file": "<PDF file>"
    "codigo": 1,
    }
    ```

## Estrutura do projeto

    ```bash
    .
    ├── src
    │   ├── controllers
    │   ├── midlewares
    │   ├── models
    │   ├── repositories
    │   ├── tipos
    │   ├── app.ts
    │   ├── conexaoBd.ts
    │   ├── index.ts
    │   └── routes.ts
    ├── .env
    ├── comandos.sql
    ├── docker-compose.yml
    ├── package.json
    └── tsconfig.json
    ```
## Licença

    ```yaml
    
    ---

    Esse arquivo é focado apenas no backend do seu projeto. Ele inclui detalhes sobre as funcionalidades da API, como configurar o ambiente, executar o projeto e usar os endpoints.

    ```