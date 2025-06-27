# Ecommerce API

API RESTful para um sistema de ecommerce simples, permitindo gerenciamento de produtos, usuários, pedidos e autenticação.

---

## Tecnologias

- Node.js  
- Express  
- MongoDB (ou outro banco, ajuste conforme seu projeto)  
- JWT para autenticação  
- etc...

---

## Instalação

1. Clone o repositório:

```bash
git clone [https://github.com/MauriciioUnoesc/ecommerce.git](https://github.com/MauriciioUnoesc/ecommerce.git)
cd ecommerce
Instale as dependências:

bash
Copiar
Editar
npm install
Configure variáveis de ambiente

Crie um arquivo .env baseado no .env.example com suas credenciais (porta, banco, secret JWT etc).

Execute a aplicação:

bash
Copiar
Editar
npm start
Rotas da API
A API está estruturada seguindo o padrão REST, com as seguintes rotas principais:

Autenticação
POST /auth/login
Faz login e retorna token JWT.

POST /auth/register
Registra novo usuário.

Produtos
GET /products
Lista produtos.

GET /products/:id
Detalhes do produto.

POST /products
Cria novo produto (requer autenticação).

PUT /products/:id
Atualiza produto (requer autenticação).

DELETE /products/:id
Deleta produto (requer autenticação).

Usuários
GET /users
Lista usuários.

GET /users/:id
Detalhes do usuário.

PUT /users/:id
Atualiza usuário.

DELETE /users/:id
Remove usuário.

Pedidos
GET /orders
Lista pedidos.

GET /orders/:id
Detalhes do pedido.

POST /orders
Cria pedido.

PUT /orders/:id
Atualiza pedido.

DELETE /orders/:id
Remove pedido.

Autenticação
As rotas que modificam dados requerem token JWT enviado no header:

makefile
Copiar
Editar
Authorization: Bearer <seu-token-aqui>
Exemplos de uso
Listar produtos
bash
Copiar
Editar
curl -X GET https://loja-virtual-produtos.onrender.com/products
