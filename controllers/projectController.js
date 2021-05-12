const Project = require("../models/projectModel");
const projectUtil = require("../utils/projectUtil");

exports.getProjectsList = (req, res) => {
  Project.find().then((projects) => {
    res.render("backoffice/projects", {
      pageTitle: "Projects",
      path: "/projects",
      projects: projects,
      role: req.user.role,
    });
  });
};

exports.getSpecificProjectPage = (req, res) => {
  const { projectId } = req.params;
  Project.findById(projectId).then((project) => {
    res.render("backoffice/project-details", {
      pageTitle: "Project",
      path: "/projects",
      project,
      role: req.user.role,
      success: undefined,
    });
  });
};

exports.changeAuthorOfProject = (req, res) => {
  const { projectId } = req.params;
  projectUtil.editProjectCreator(req).then((result) => {
    if (result.status === "success") {
      res.redirect("/projects/project/" + projectId);
    } else {
      Project.findById(projectId).then((project) => {
        res.render("backoffice/project-details", {
          pageTitle: "Project",
          path: "/projects",
          project,
          role: req.user.role,
          success: result,
        });
      });
    }
  });
};

exports.getCreateProjectPage = (req, res) => {
  res.render("backoffice/create-project", {
    pageTitle: "Projects",
    path: "/projects",
    role: req.user.role,
  });
}
