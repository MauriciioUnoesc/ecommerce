const sequelize = require('./config/database');
const Usuario = require('./models/Usuario');
const Produto = require('./models/Produto');
const Categoria = require('./models/Categoria');
const Avaliacao = require('./models/Avaliacao');
const LogAuditoria = require('./models/LogAuditoria');
const IntegracaoFornecedor = require('./models/IntegracaoFornecedor');

async function setupDatabase() {
  await sequelize.authenticate();
  console.log('Conexão com o banco de dados estabelecida com sucesso.');

  // Remove a view, se existir
  try {
    await sequelize.query('DROP VIEW IF EXISTS public.vw_produtos_ativos_detalhes CASCADE;');
    console.log('View vw_produtos_ativos_detalhes descartada (se existia).');
  } catch (err) {
    console.error('Erro ao descartar view:', err);
  }

  // Sincroniza os modelos (exceto a view)
  await Usuario.sync({ alter: true });
  await Categoria.sync({ alter: true });
  await Produto.sync({ alter: true });
  await Avaliacao.sync({ alter: true });
  await LogAuditoria.sync({ alter: true });
  await IntegracaoFornecedor.sync({ alter: true });
  console.log('Modelos sincronizados com o banco de dados.');

  // Recria a view
  const createViewSql = `
    CREATE OR REPLACE VIEW public.vw_produtos_ativos_detalhes AS
    SELECT
        p.id_produto,
        p.nome_produto,
        p.imagem_url,
        p.preco,
        p.descricao,
        c.nome_categoria,
        p.quantidade_estoque,
        p.media_avaliacoes,
        p.total_avaliacoes,
        p.data_cadastro
    FROM public.produto AS p
    LEFT JOIN public.categoria AS c ON p.id_categoria = c.id_categoria
    WHERE p.ativo = TRUE;
  `;
  await sequelize.query(createViewSql);
  await sequelize.query('ALTER VIEW public.vw_produtos_ativos_detalhes OWNER TO postgres;');
  console.log('View vw_produtos_ativos_detalhes recriada com sucesso.');
}

module.exports = setupDatabase;
