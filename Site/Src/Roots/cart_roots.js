const express = require('express');
const router = express.Router();
const path = require('path');
const permitidos = require(path.join(__dirname, '../Security/autorizacao'));

const cartController = require('../Back_end/Controller/cart_controller');

router.post('/', permitidos('usuario'), cartController.addToCart);
router.get('/', permitidos('usuario'), cartController.getCart);
router.delete('/remover', permitidos('usuario'), cartController.removeFromCart);