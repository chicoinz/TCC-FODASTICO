const express = require('express');
const router = express.Router();
const path = require('path');
const permitidos = require(path.join(__dirname, '../Security/autorizacao'));
const productControl = require('../Back_end/Controller/product_controller');
const upload = require('../Back_end/Data_Base/images');



router.get('/modelos', productControl.getModelsofProduct);
router.get('/modelo/:modelo', productControl.getProductsbyModel);
router.get('/estado/:estado', productControl.getProductsbyState);
router.get('/:id', productControl.getProductId);
router.post('/criar', permitidos('admin'), upload.single('imagem'), productControl.postProduct);



module.exports = router;
