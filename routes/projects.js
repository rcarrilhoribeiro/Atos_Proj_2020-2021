const express = require('express');

const projectController = require('../controllers/projectController');

const router = express.Router();

//Projects
router.get('/projects', projectController.getProjectsPage)

router.post('/projects', projectController.postProjects)

module.exports = router;