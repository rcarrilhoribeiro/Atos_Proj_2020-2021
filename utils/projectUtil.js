const Project = require('../models/projectModel');
const User = require('../models/userModel')

exports.editProjectCreator = async (req) => {
    // console.log(req.body);
    const authorEmail = req.body.email2;
    const projectID = req.params.projectId;
    const user = await User.findOne({ email: authorEmail });
    if(!user) return { status: "error", message: "Failed finding user" };
    if(user.role !== 'basic'){
      await Project.findByIdAndUpdate(
        projectID,
        {
          author: user.name,
          authorEmail: authorEmail,
        },
        function (err) {
          if (err) {
            return { status: "error", message: "Failed updating project" };
          }
        }
      );
      return {
        status: "success",
        message: 'successfully edited project creator'
      };
    }else{
      return {
        status: "error",
        message: 'User does not have permissions'
      };
    }
  
    
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