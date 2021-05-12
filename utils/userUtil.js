const User = require("../models/userModel");
const Project = require("../models/projectModel");
const jwt = require("jsonwebtoken");

exports.deleteUser = async (id) => {
  try {
    await User.findByIdAndDelete(id);
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

// TODO -> Pesquisa por email
exports.findUser = async (email, name) => {
  try {
    let users = null;
    if (name) {
      users = await User.find({
        $or: [
          { email: email },
          { name: { $regex: new RegExp(name.replace(/\s+/g, "\\s+"), "gi") } },
        ],
      });
    } else if (email) {
      users = await User.find({ email });
    } else {
      users = await User.find();
    }

    return {
      status: "success",
      message: "",
      users,
    };
  } catch (err) {
    console.log(err);
    return {
      status: "fail",
      message: "No users found with that email",
    };
  }
};

exports.replaceDeleted = async (id, req) => {
  try {
    const user = await User.findOne({ _id: id });
    const deleting_user = req.user;

    await Project.updateMany(
      { authorEmail: user.email },
      {
        author: deleting_user.name,
        authorEmail: deleting_user.email,
      }
    );

    return {
      status: "success",
      message: "",
    };
  } catch (err) {
    console.log(err);
  }
};

exports.passwordReset = async (id, password, selfChange) => {
  try {
    await User.findByIdAndUpdate(id, {
      password: password,
      changedPassword: selfChange,
    });
    return {
      status: "success",
      message: "Password Edited",
    };
  } catch (err) {
    console.log(err);
    return {
      status: "fail",
      message: "Could not change user password",
    };
  }
};

exports.passwordCheck = async (req) => {
  try {
    console.log("passwordCheck", req.user);
    const verify = req.user.changedPassword;
    if (!verify) {
      return {
        status: "fail",
        message: "You must change your password",
        user: req.user,
      };
    } else {
      return {
        status: "approved",
        message: "",
        user: req.user,
      };
    }
  } catch (err) {
    return {
      status: "error",
      message: "Error verifying password",
    };
  }
};
