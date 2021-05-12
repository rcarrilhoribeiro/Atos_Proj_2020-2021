const express = require("express");

const entitiesController = require("../controllers/entitiesController");
const permissions = require("../middleware/permissions");

const router = express.Router();

//Entities
router.post("/entities/entity", permissions.restrict(["admin", "internal"]), entitiesController.editEntity);

router.post("/entities/new-entity", permissions.restrict(["admin", "internal"]), entitiesController.createEntity);

router.get("/entities", permissions.restrict(["admin", "internal"]), entitiesController.getEntities);

module.exports = router;
