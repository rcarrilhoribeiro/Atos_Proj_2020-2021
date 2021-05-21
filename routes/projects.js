const express = require("express");

const projectController = require("../controllers/projectController");
const permissions = require("../middleware/permissions");
const multer = require('multer');
const path = require('path')

//Set Storage Engine
const storage = multer.diskStorage({
  destination: './public/uploads',
  filename: function(req, file, cb) {
    cb(null, file.originalname.split('.')[0] + '-' + Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({
  storage: storage,
})

const router = express.Router();

//Projects
router.get("/projects/project/:projectId/edit-project", permissions.restrict(["internal", "admin"]), permissions.checkEditingPermission, projectController.getEditProjectPage);
router.post("/projects/project/:projectId/edit-project", permissions.restrict(["internal", "admin"]), permissions.checkEditingPermission, projectController.updateProject);

router.post("/projects/project/:projectId/author", permissions.restrict(["admin"]), projectController.changeAuthorOfProject);

router.get("/projects/project/:projectId",projectController.getSpecificProjectPage);

router.get('/projects/new-project', permissions.restrict(["admin", "internal"]), projectController.getCreateProjectPage);
router.post('/projects/new-project', permissions.restrict(["admin", "internal"]), upload.single("logo"), projectController.createProject)

router.get("/projects", projectController.getProjectsList);

module.exports = router;
