const express = require('express');
const router = express.Router();

const path = require('path');
const permitidos = require(path.join(__dirname, '../Security/autorizacao'));
const userControl = require('../Back_end/Controller/user_controller');

router.post('/', permitidos('admin', 'usuario'), userControl.perfilUsuario);
router.get('/login', userControl.loginUsuario);
router.post('/logout', userControl.logoutUsuario);

router.post('/criar', permitidos('usuario'), userControl.postUser);
router.delete('/deletar', permitidos('usuario'), userControl.deleteUser);
router.put('/atualizar', permitidos('usuario'), userControl.putUser);
router.get('/usuarioPorId', permitidos('admin'), userControl.getUserById);

module.exports = router;