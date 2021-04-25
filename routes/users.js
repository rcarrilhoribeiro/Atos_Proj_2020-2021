const express = require('express');

const userController = require('../controllers/userController');
const permissions = require('../middleware/permissions');

const router = express.Router();

//Users
router.get('/home', userController.getHomePage)

router.post('/users/user/:userId/password', userController.changePassword)
router.post('/users/user/:userId', permissions.restrict(['admin']), userController.editUser)

router.get('/users/user', permissions.restrict(['admin']), userController.getCreateUserPage)
router.post('/users/user', permissions.restrict(['admin']), userController.createUser)

router.get('/users', permissions.restrict(['admin']), userController.getUsersPage)
router.post('/users', permissions.restrict(['admin']), userController.postUsers)

module.exports = router;