const Project = require("../models/projectModel");
const User = require("../models/userModel");

exports.restrict = (roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        res.redirect('/home')
      }else{
        next();
      }
    };
  };

  exports.checkEditingPermission = async (req, res, next) => {
    try {
      const { projectId } = req.params;
  
      const projectToEdit = await Project.findById(projectId);
      
      const projectToEditAuthor = await User.find({
        email: projectToEdit.authorEmail,
      });
  
      if (
        req.user.role == "internal" &&
        req.user.email !== projectToEditAuthor.email
      ) {
        res.redirect("/projects/project/"+projectId);
      } else {
        next();
      }
    } catch (err) {
      console.log(err);
      return {
        status: "Error",
        message: "Failed checking editing project permissions",
      };
    }
  };