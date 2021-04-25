const express = require("express");

const authController = require("../controllers/authenticationController");
const projectController = require("../controllers/projectController");

const router = express.Router();

router.get("/", authController.getLoginPage);

router.post("/", authController.checkLogin, authController.checkPassChange);

router.post("/logout", authController.logout);
//debug apenas
router.post("/teste", projectController.editProjectCreator);

module.exports = router;
