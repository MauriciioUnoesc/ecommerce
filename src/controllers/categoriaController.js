const Categoria = require('../models/Categoria');

// Listar todas as categorias
exports.listarCategorias = async (req, res) => {
    try {
        const categorias = await Categoria.findAll();
        res.json(categorias);
    } catch (error) {
        console.error('Erro ao listar categorias:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

// Cadastrar nova categoria
exports.cadastrarCategoria = async (req, res) => {
    const { nomeCategoria } = req.body;

    if (!nomeCategoria) {
        return res.status(400).json({ message: 'O nome da categoria é obrigatório.' });
    }

    try {
        const novaCategoria = await Categoria.create({ nomeCategoria });
        res.status(201).json(novaCategoria);
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ message: 'Já existe uma categoria com este nome.' });
        }
        console.error('Erro ao cadastrar categoria:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

// Buscar categoria por ID
exports.buscarCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const categoria = await Categoria.findByPk(id);

        if (!categoria) {
            return res.status(404).json({ message: 'Categoria não encontrada.' });
        }

        res.json(categoria);
    } catch (error) {
        console.error('Erro ao buscar categoria:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

// Atualizar categoria
exports.atualizarCategoria = async (req, res) => {
    const { id } = req.params;
    const { nomeCategoria } = req.body;

    if (!nomeCategoria) {
        return res.status(400).json({ message: 'O nome da categoria é obrigatório.' });
    }

    try {
        const categoria = await Categoria.findByPk(id);

        if (!categoria) {
            return res.status(404).json({ message: 'Categoria não encontrada.' });
        }

        categoria.nomeCategoria = nomeCategoria;
        await categoria.save();

        res.json({ message: 'Categoria atualizada com sucesso.' });
    } catch (error) {
        console.error('Erro ao atualizar categoria:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

// Excluir categoria
exports.excluirCategoria = async (req, res) => {
    const { id } = req.params;

    try {
        const categoria = await Categoria.findByPk(id);

        if (!categoria) {
            return res.status(404).json({ message: 'Categoria não encontrada.' });
        }

        await categoria.destroy();

        res.json({ message: 'Categoria excluída com sucesso.' });
    } catch (error) {
        console.error('Erro ao excluir categoria:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};
