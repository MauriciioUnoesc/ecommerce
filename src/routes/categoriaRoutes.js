// // backend/src/routes/categoriaRoutes.js
// const express = require('express');
// const router = express.Router();
// const categoriaController = require('../controllers/categoriaController');
// const { autenticarToken, autorizarAdmin } = require('../middleware/authMiddleware');

// router.get('/', categoriaController.listarCategorias); // Público
// router.post('/', autenticarToken, autorizarAdmin, categoriaController.cadastrarCategoria); // Apenas Admin

// module.exports = router;
const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');
const { autenticarToken, autorizarAdmin } = require('../middleware/authMiddleware');

router.get('/', categoriaController.listarCategorias); // Público
router.get('/:id', categoriaController.buscarCategoria); // Público
router.post('/', autenticarToken, autorizarAdmin, categoriaController.cadastrarCategoria);
router.put('/:id', autenticarToken, autorizarAdmin, categoriaController.atualizarCategoria);
router.delete('/:id', autenticarToken, autorizarAdmin, categoriaController.excluirCategoria);

module.exports = router;
