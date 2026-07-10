const express = require('express');
const router = express.Router();
const path = require('path');
const permitidos = require(path.join(__dirname, '../Security/autorizacao'));
const productControl = require('../Back_end/Controller/product_controller');



router.get('/modelos', productControl.getModelsofProduct);
router.get('/modelo/:modelo', productControl.getProductsbyModel);
router.get('/estado/:estado', productControl.getProductsbyState);
router.get('/:id', productControl.getProductId);
router.post('/criarProduto', permitidos('admin'), productControl.postProduct);



module.exports = router;
