const express = require('express');

const userController = require('../controllers/userController');

const router = express.Router();

//Users
router.get('/home', userController.getHomePage)

router.post('/users/user/:userId/password', userController.changePassword)
router.post('/users/user/:userId', userController.editUser)

router.get('/users/user', userController.getCreateUserPage)
router.post('/users/user', userController.createUser)

router.get('/users', userController.getUsersPage)
router.post('/users', userController.postUsers)

module.exports = router;