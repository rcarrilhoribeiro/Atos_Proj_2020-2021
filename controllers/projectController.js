const Project = require("../models/projectModel");
const projectUtil = require("../utils/projectUtil");

exports.getProjectsList = (req, res) => {
  Project.find().then((projects) => {
    res.render("backoffice/projects", {
      pageTitle: "Projects",
      path: "/projects",
      projects: projects,
      role: req.user.role,
      success: undefined
    });
  });
};

exports.getSpecificProjectPage = (req, res) => {
  const { projectId } = req.params;
  projectUtil.getProject(projectId).then((project) => {
    console.log(project);
    res.render("backoffice/project-details", {
      pageTitle: "Project",
      path: "/projects",
      project,
      user: req.user,
      success: undefined,
    });
  });
};

exports.changeAuthorOfProject = (req, res) => {
  const { projectId } = req.params;
  projectUtil.editProjectCreator(req).then((result) => {
    if (result.status === "Success") {
      res.redirect("/projects/project/" + projectId);
    } else {
      Project.findById(projectId).then((project) => {
        res.render("backoffice/project-details", {
          pageTitle: "Project",
          path: "/projects",
          project,
          user: req.user,
          success: {
            status: false,
            message: result.message,
            error: result.err
          }
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

exports.createProject = async (req, res) => {
  projectUtil.createProject(req)
  .then(result => {
    Project.find().then((projects) => {
      res.render("backoffice/projects", {
        pageTitle: "Projects",
        path: "/projects",
        projects: projects,
        role: req.user.role,
        success: {
          status: result.status,
          message: result.message,
          error: result.err
        }
      });
    });
  })
}

exports.getEditProjectPage = (req, res) =>{
  projectUtil.getProject(req.params.projectId)
  .then(project => {
    res.render("backoffice/edit-project", {
      pageTitle: "Project",
      path: "/projects",
      project,
      role: req.user.role,
    });
  })
}

exports.updateProject = (req, res) => {
  projectUtil.editProject(req)
  .then(result => {
    projectUtil.getProject(req.params.projectId).then(project => {
      // console.log(project);
      res.render("backoffice/project-details", {
        pageTitle: "Project",
        path: "/projects",
        project,
        user: req.user,
        success: {
          status: result.status,
          message: result.message,
          error: result.err
        }
      });
    });
  })
}
