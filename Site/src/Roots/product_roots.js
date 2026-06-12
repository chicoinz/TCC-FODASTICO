const express = require('express');
const router = express.Router();
const path = require('path');
const permitidos = require(path.join(__dirname, '../Security/autorizacao'));
const productControl = require('../Controller/product_controller');


router.post('/listarPorResponsavel', permitidos('admin', 'veterinario'), adocaoControle.listarAdocoesPorResponsavel);


router.post('/criarProduto', permitidos('admin'), productControl.postProduct);



module.exports = router;
