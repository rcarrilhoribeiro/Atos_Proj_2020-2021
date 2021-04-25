const Project = require("./../models/projectModel");
const User = require("./../models/userModel");

exports.getProjectsPage = (req, res) => {
  res.render("backoffice/projects", {
    pageTitle: "Projects",
    path: "/projects",
  });
};

exports.postProjects = (req, res) => {
  res.redirect("/home");
};

exports.createProject = async (req, res) => {
  try {
    await Project.create(req.body);
  } catch (err) {
    return {
      status: "error",
      message: "Failed loading project",
    };
  }
};

exports.updateProject = async (req, res) => {
  try {
  } catch {}
};

exports.editProjectCreator = async (req, res) => {
  const authorEmail = req.body.email;
  const projectID = req.body.id;
  const username = await User.findOne({ email: authorEmail }, function (err) {
    return { status: "error", message: "Failed finding user" };
  });

  await Project.findByIdAndUpdate(
    projectID,
    {
      author: username.name,
      authorEmail: authorEmail,
    },
    function (err) {
      if (err) {
        return { status: "error", message: "Failed updating project" };
      }
    }
  );
  //tirar aquando da implementacao
  res.status(200).json({
    status: "success",
  });
};
