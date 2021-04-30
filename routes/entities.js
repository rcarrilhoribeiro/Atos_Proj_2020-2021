const express = require('express');

const entitiesController = require('../controllers/entitiesController');
const permissions = require('../middleware/permissions');

const router = express.Router();

//Entities
router.post('/entities/entity/:entityId', (req, res) => {
    console.log(req.body);
    res.redirect('/')
})

router.post('/entities/entity', entitiesController.createEntity)

router.get('/entities', entitiesController.getEntitiesPages)

router.post('/entities', entitiesController.getEntities)



module.exports = router;