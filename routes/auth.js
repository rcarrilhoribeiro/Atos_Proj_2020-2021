const express = require('express');

const authController = require('../controllers/authenticationController');

const router = express.Router();

router.get('/', authController.getLoginPage);

router.post('/', authController.checkLogin, authController.checkPassChange);

router.post('/logout', authController.logout)

module.exports = router;