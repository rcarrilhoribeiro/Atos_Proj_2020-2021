const User = require("../models/userModel");
const userUtil = require("../utils/userUtil");
const bcrypt = require("bcrypt");

exports.getHomePage = (req, res) => {
  res.render("backoffice/index", {
    pageTitle: "Home",
    path: "/home",
    user: req.user,
  });
};

exports.getUsersPage = (req, res) => {
  res.render("backoffice/users", {
    pageTitle: "Users",
    path: "/users",
    users: [],
    success: undefined,
  });
};

exports.postUsers = (req, res) => {
  const { email, name } = req.body;

  userUtil
    .findUser(email, name)
    .then((result) => {
      console.log(result);
      if (result.status === "success") {
        // let date = new Date(result.user.createdAt)
        // result.user.createdAt = dateConv(date)
        res.render("backoffice/users", {
          pageTitle: "Users",
          path: "/users",
          users: result.users,
          success: undefined,
        });
      } else {
        res.render("backoffice/users", {
          pageTitle: "Users",
          path: "/users",
          users: [],
          success: {
            status: false,
            message: "No users found",
            error: "Wrong email",
          },
        });
      }
    })
    .catch((err) => console.log(err));
};

exports.getCreateUserPage = (req, res) => {
  res.render("admin/create-user", {
    pageTitle: "Create User",
    path: "/users",
  });
};

exports.createUser = (req, res) => {
  const { email, name, password1, password2, role } = req.body;
  const user = new User({
    name: name,
    email: email,
    password: password1,
    role: role,
  });
  user
    .save()
    .then((result) => {
      res.render("backoffice/users", {
        pageTitle: "Users",
        path: "/users",
        users: [],
        success: {
          status: true,
          message: "successfully created user",
        },
      });
    })
    .catch((err) => {
      res.render("backoffice/users", {
        pageTitle: "Users",
        path: "/users",
        users: [],
        success: {
          status: false,
          message: "Failure to create user",
          error: err,
        },
      });
      console.log(err);
    });
};

exports.editUser = (req, res) => {
  console.log(req.params);
  console.log(req.body);
  const { userId } = req.params;
  const { _method } = req.body;

  if (_method === "PATCH") {
    User.findById(userId)
      .then((user) => {
        res.render("backoffice/change-password", {
          user: user,
          pageTitle: "Change Password",
          path: "/users",
          selfChange: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  } else if (_method === "DELETE") {
    userUtil.replaceDeleted(userId, req).then((result) => {
      if (result.status === "success") {
        userUtil.deleteUser(userId).then((result) => {
          if (result.status === "success") {
            res.render("backoffice/users", {
              pageTitle: "Users",
              path: "/users",
              users: [],
              success: {
                status: true,
                message: "successfully deleted user",
              },
            });
          }
        });
      } else {
        res.render("backoffice/users", {
          pageTitle: "Users",
          path: "/users",
          users: [],
          success: {
            status: false,
            message: "Failure to delete user",
            error: err,
          },
        });
      }
    });
  }
};

exports.changePassword = async (req, res) => {
  const userId = req.params.userId;
  const password = await bcrypt.hash(req.body.password1, 12);
  console.log(req.body.changingPassword);
  userUtil
    .passwordReset(userId, password, req.body.changingPassword)
    .then((result) => {
      console.log(result);
      if (result.status === "success") {
        console.log(req.body.changingPassword === true);
        console.log(req.body.changingPassword == true);
        console.log(typeof req.body.changingPassword);
        if (req.body.changingPassword === "true") {
          res.redirect("/home");
        } else {
          res.render("backoffice/users", {
            pageTitle: "Users",
            path: "/users",
            users: [],
            success: {
              status: true,
              message: "successfully altered the password",
            },
          });
        }
      } else {
        res.render("backoffice/users", {
          pageTitle: "Users",
          path: "/users",
          users: [],
          success: {
            status: false,
            message: "Failure to alter password",
            error: "Who knows",
          },
        });
      }
    });
};
