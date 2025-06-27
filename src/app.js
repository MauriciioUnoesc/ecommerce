require('dotenv').config();
const express = require('express');
const cors = require('cors');
const setupDatabase = require('./setupDatabase');

const authRoutes = require('./routes/authRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const avaliacaoRoutes = require('./routes/avaliacaoRoutes');
const integracaoFornecedorRoutes = require('./routes/integracaoFornecedorRoutes');

const app = express();
const PORT = process.env.PORT 

app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/produtos', produtoRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use('/api/avaliacoes', avaliacaoRoutes);
app.use('/api/integracao/fornecedor', integracaoFornecedorRoutes);

app.get('/', (req, res) => {
  res.send('API de Cadastro de Produtos está rodando!');
});

setupDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Erro na inicialização do banco de dados:', err);
    process.exit(1);
  });

module.exports = app;
