const User = require('../models/userModel')
const Project = require('../models/projectModel')
const jwt = require("jsonwebtoken");

exports.deleteUser = async (id) => {
    try {
      let res = await User.findByIdAndDelete(id);
      return {
        status: "success",
        message: "User successfully deleted",
      };
    } catch (err) {
      return {
        status: "fail",
        message: "Could not delete user",
      };
    }
};

exports.findUser = async (email) => {
    try {
    //   const name = req.body.name;
      const user = await User.findOne({ email: email });
      console.log(user);
      if(user){
          return {
            status: "success",
            message: "",
            user,
        };
      }else {
        return {
            status: "fail",
            message: "No users found with that email",
          };
      }
    } catch (err) {
      console.log(err);
    }
};

exports.replaceDeleted = async (id, req) => {
  try {
    const user = await User.findOne({_id: id});
    let token = req.headers["cookie"].substring(4);
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    const deleting_user = await User.findById(decoded.id);

    await Project.updateMany({authorEmail: user.email}, {
      author: deleting_user.name,
      authorEmail: deleting_user.email,
    });

    return {
      status: "success",
      message: "",
    };
  } catch (err) {
    console.log(err);
  }
};


exports.passwordReset = async (id, req) => {
  try {
    await User.findByIdAndUpdate(id, {
      password: req.body.password1,
      changedPassword: false,
    });
    return {
      status: "success",
      message: "Password Edited",
    };
  } catch (err) {
    return {
      status: "fail",
      message: "Could not change user password",
    };
  }
};

exports.passwordCheck = async (req, res, next) => {
  try {
    let token = req.headers["cookie"].substring(4);
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    const freshUser = await User.findById(decoded.id);
    next();
  } catch (err) {
    return JSON.parse({
      status: "fail",
      message: "You must change your password",
    });
  }
};