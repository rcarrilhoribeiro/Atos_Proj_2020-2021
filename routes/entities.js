const express = require('express');

const entitiesController = require('../controllers/entitiesController');
const permissions = require('../middleware/permissions');

const router = express.Router();

//Entities
router.post('/entities/entity', entitiesController.editEntity)

router.post('/entities/new-entity', entitiesController.createEntity)

router.get('/entities', entitiesController.getEntitiesPages)

router.post('/entities', entitiesController.getEntities)



module.exports = router;