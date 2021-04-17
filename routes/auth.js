const express = require('express');

const authController = require('../controllers/authenticationController');

const router = express.Router();

router.get('/', authController.getLogin);

router.post('/home', authController.renderHomePage);

module.exports = router;