// // backend/src/app.js
// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const sequelize = require('./config/database');

// // Import your actual table models here
// // ProdutoAtivoDetalhesView is intentionally NOT imported here for synchronization,
// // as it will be managed as a database VIEW directly.
// const Usuario = require('./models/Usuario');
// const Produto = require('./models/Produto');
// const Categoria = require('./models/Categoria');
// const Avaliacao = require('./models/Avaliacao');
// const LogAuditoria = require('./models/LogAuditoria');
// const IntegracaoFornecedor = require('./models/IntegracaoFornecedor');


// const authRoutes = require('./routes/authRoutes');
// const produtoRoutes = require('./routes/produtoRoutes');
// const categoriaRoutes = require('./routes/categoriaRoutes');
// const avaliacaoRoutes = require('./routes/avaliacaoRoutes');
// const integracaoFornecedorRoutes = require('./routes/integracaoFornecedorRoutes');

// const app = express();
// const PORT = process.env.PORT || 3001;

// app.use(cors());
// app.use(express.json());

// app.use('/api/auth', authRoutes);
// app.use('/api/produtos', produtoRoutes);
// app.use('/api/categorias', categoriaRoutes);
// app.use('/api/avaliacoes', avaliacaoRoutes);
// app.use('/api/integracao/fornecedor', integracaoFornecedorRoutes);

// app.get('/', (req, res) => {
//   res.send('API de Cadastro de Produtos está rodando!');
// });

// async function startServer() {
//   try {
//     await sequelize.authenticate();
//     console.log('Conexão com o banco de dados estabelecida com sucesso.');

//     // --- Start: Logic to handle view dependency during schema sync ---
//     // First, ensure the 'vw_produtos_ativos_detalhes' object (table or view) is dropped.
//     // We try DROP TABLE first, then DROP VIEW, to cover both scenarios of previous errors.
//     console.log('Verificando e descartando vw_produtos_ativos_detalhes (tabela ou view) se existir...');
//     try {
//       await sequelize.query('DROP TABLE IF EXISTS public.vw_produtos_ativos_detalhes CASCADE;');
//       console.log('Tabela vw_produtos_ativos_detalhes descartada (se existia).');
//     } catch (tableDropError) {
//       // If it was not a table, it might be a view. Try dropping as view.
//       await sequelize.query('DROP VIEW IF EXISTS public.vw_produtos_ativos_detalhes CASCADE;');
//       console.log('View vw_produtos_ativos_detalhes descartada (se existia e não era tabela).');
//     }
//     // --- End: Logic to handle view dependency during schema sync ---

//     // Synchronize only the actual table models.
//     // This explicitly excludes models that should be views (like ProdutoAtivoDetalhesView).
//     console.log('Sincronizando modelos de tabelas...');
//     await Usuario.sync({ alter: true });
//     await Categoria.sync({ alter: true });
//     await Produto.sync({ alter: true });
//     await Avaliacao.sync({ alter: true });
//     await LogAuditoria.sync({ alter: true });
//     await IntegracaoFornecedor.sync({ alter: true });
//     console.log('Modelos de tabelas sincronizados com o banco de dados.');

//     // --- Start: Logic to re-create the view after schema sync ---
//     // Re-create the view after all table models have been synchronized
//     // to ensure it reflects the latest schema changes and uses correct table structure.
//     console.log('Recriando a view vw_produtos_ativos_detalhes...');
//     const createViewSql = `
//       CREATE OR REPLACE VIEW public.vw_produtos_ativos_detalhes AS
//       SELECT
//           p.id_produto,
//           p.nome_produto,
//           p.imagem_url,
//           p.preco,
//           p.descricao,
//           c.nome_categoria,
//           p.quantidade_estoque,
//           p.media_avaliacoes,
//           p.total_avaliacoes,
//           p.data_cadastro
//       FROM
//           public.produto AS p
//       LEFT JOIN
//           public.categoria AS c ON p.id_categoria = c.id_categoria
//       WHERE
//           p.ativo = TRUE;
//     `;
//     await sequelize.query(createViewSql);
//     await sequelize.query('ALTER VIEW public.vw_produtos_ativos_detalhes OWNER TO postgres;');
//     console.log('View vw_produtos_ativos_detalhes recriada com sucesso.');
//     // --- End: Logic to re-create the view after schema sync ---

//     app.listen(PORT, () => {
//       console.log(`Servidor rodando na porta ${PORT}`);
//     });
//   } catch (error) {
//     console.error('Erro na inicialização do servidor:', error);
//     process.exit(1);
//   }
// }

// startServer();

// module.exports = app;
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
const PORT = process.env.PORT || 3001;

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
