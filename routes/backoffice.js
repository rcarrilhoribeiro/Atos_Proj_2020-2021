const express = require('express');

const userController = require('../controllers/userController');

const router = express.Router();

router.get('/home', userController.getHomePage)

router.get('/users', userController.getUsersPage)

router.post('/users', userController.postUsers)

router.get('/projects', userController.getProjectsPage)

router.post('/projects', userController.postProjects)

module.exports = router;