# 📦 Loja Virtual - API de Cadastro de Produtos

API REST para gerenciamento de produtos, categorias e avaliações em uma loja virtual.  
Inclui autenticação de usuários e integração com fornecedor externo.

---

## 🚀 Deploy

A API está publicada em:  
🔗 [`https://loja-virtual-produtos.onrender.com`](https://loja-virtual-produtos.onrender.com)

---

## 🛠️ Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Sequelize](https://sequelize.org/) + [PostgreSQL](https://www.postgresql.org/)
- [JWT](https://jwt.io/) para autenticação
- [Dotenv](https://www.npmjs.com/package/dotenv)
- [CORS](https://www.npmjs.com/package/cors)

---

## ⚙️ Instalação e Execução

1. **Clone o repositório:**

```bash
git clone https://github.com/MauriciioUnoesc/ecommerce.git
cd ecommerce/backend
Instale as dependências:

bash
Copiar
Editar
npm install
Configure o banco de dados e variáveis de ambiente:


📌 Rotas da API
As rotas estão organizadas sob o prefixo /api e seguem o padrão REST.

🔐 Autenticação (/api/auth)
POST /api/auth/login
Autentica e retorna token JWT.

POST /api/auth/register
Registra novo usuário.

🛍️ Produtos (/api/produtos)
GET /api/produtos
Lista todos os produtos.

GET /api/produtos/:id
Retorna os dados de um produto.

POST /api/produtos
Cria novo produto (autenticado).

PUT /api/produtos/:id
Atualiza produto existente.

DELETE /api/produtos/:id
Remove produto.

🗂️ Categorias (/api/categorias)
GET /api/categorias
Lista todas as categorias.

POST /api/categorias
Cadastra nova categoria.

PUT /api/categorias/:id
Atualiza categoria.

DELETE /api/categorias/:id
Remove categoria.

⭐ Avaliações (/api/avaliacoes)
GET /api/avaliacoes
Lista todas as avaliações.

GET /api/avaliacoes/produto/:produtoId
Avaliações por produto.

POST /api/avaliacoes
Cadastra nova avaliação.

DELETE /api/avaliacoes/:id
Remove avaliação.

🔗 Integração com Fornecedor (/api/integracao/fornecedor)
GET /api/integracao/fornecedor/produtos
Lista produtos do sistema fornecedor externo.

🌐 Rota de Teste
GET /
Retorna: "API de Cadastro de Produtos está rodando!"

🔒 Autenticação via JWT
Algumas rotas exigem autenticação via token JWT. Envie no header:

http
Copiar
Editar
Authorization: Bearer <seu-token>
🧪 Exemplos de Requisição com cURL
Login
bash
Copiar
Editar
curl -X POST https://loja-virtual-produtos.onrender.com/api/auth/login \
-H "Content-Type: application/json" \
-d '{"email":"teste@email.com","senha":"123456"}'
Listar produtos
bash
Copiar
Editar
curl https://loja-virtual-produtos.onrender.com/api/produtos
Criar produto (autenticado)
bash
Copiar
Editar
curl -X POST https://loja-virtual-produtos.onrender.com/api/produtos \
-H "Authorization: Bearer SEU_TOKEN" \
-H "Content-Type: application/json" \
-d '{"nome":"Produto X", "descricao":"Detalhes", "preco":99.9, "categoriaId":1}'
