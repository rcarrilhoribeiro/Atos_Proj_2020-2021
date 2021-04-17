const express = require('express');

const userController = require('../controllers/userController');

const router = express.Router();

//Users
router.get('/home', userController.getHomePage)

router.get('/users', userController.getUsersPage)
router.post('/users', userController.postUsers)

router.post('/users/user/:userId/change-password') //fazer update da var passwordchaged e password (obvio)

router.post('/users/user/:userId', userController.editUser)

router.get('/users/create-user', userController.getCreateUserPage)
router.post('/users/create-user', userController.createUser)


module.exports = router;