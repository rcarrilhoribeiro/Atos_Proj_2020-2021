const express = require('express');

const authController = require('../controllers/authenticationController');
const checkPassword = require('../middleware/checkPassword')

const router = express.Router();

router.get('/', authController.getLogin);

router.post('/', checkPassword.checkLogin, authController.checkPass);

router.post('/logout', authController.logout)

module.exports = router;