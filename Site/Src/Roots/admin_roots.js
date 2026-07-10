const express = require('express');
const router = express.Router();
const path = require('path');


const adminController = require('../Back_end/Controller/admin_controller');

router.post('/', adminController.perfilAdmin);

router.get('/logout', adminController.logoutAdmin);

router.get('/login', adminController.loginAdmin);

module.exports = router;