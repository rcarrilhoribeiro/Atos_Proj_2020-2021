const express = require("express");

const projectController = require("../controllers/projectController");
const permissions = require("../middleware/permissions");

const router = express.Router();

//Projects
router.post("/projects/project/:projectId/author",permissions.restrict(["admin"]),projectController.changeAuthorOfProject);

router.get("/projects/project/:projectId",projectController.getSpecificProjectPage);

router.get('/project/new-project', projectController.getCreateProjectPage);

router.get("/projects", projectController.getProjectsList);


module.exports = router;
