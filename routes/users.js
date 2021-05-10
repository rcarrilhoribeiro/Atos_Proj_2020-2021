const express = require('express');

const userController = require('../controllers/userController');
const permissions = require('../middleware/permissions');

const router = express.Router();

//Users

router.post('/users/user/password', userController.changePassword)
router.post('/users/user', permissions.restrict(['admin']), userController.editUser)

router.get('/users/new-user', permissions.restrict(['admin']), userController.getCreateUserPage)
router.post('/users/new-user', permissions.restrict(['admin']), userController.createUser)

router.get('/users', permissions.restrict(['admin']), userController.getUsersPage)
router.post('/users', permissions.restrict(['admin']), userController.postUsers)

router.get('/home', userController.getHomePage)

module.exports = router;