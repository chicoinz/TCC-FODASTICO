const express = require('express');
const path = require('path');
const router = express.Router();


const rotaInicial = (req, res) => {
    res.sendFile(path.join(__dirname, '../Front_end/Publico/inicial.html'));
};

const SobreNos = (req, res) => {
    res.render('Sobre/index.ejs');
};
const Contato = (req, res) => {
    res.render('Contato/contato.ejs');
};
const Servicos = (req, res) => {
    res.render('Servicos/servicos.ejs');
};
router.get('/', rotaInicial);
router.get('/SobreNos', SobreNos);
router.get('/Contato', Contato);
router.get('/Servicos', Servicos);
module.exports = router;
