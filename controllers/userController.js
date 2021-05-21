const User = require("../models/userModel");
const Project = require("../models/projectModel");
const userUtil = require("../utils/userUtil");
const bcrypt = require("bcrypt");

const ITEMS_PER_PAGE = 3;

exports.getHomePage = async (req, res) => {
  const projects = await Project.find({authorEmail: req.user.email});
  res.render("backoffice/index", {
    pageTitle: "Home",
    path: "/home",
    mainUser: req.user,
    userProjects: projects
  });
};

exports.searchUsers = (req, res) => {
  const page = +req.query.page || 1; //+ to int
  const email = req.query.email || '';
  const name = req.query.name || ''
  userUtil
    .findUserPagination(email, name, page, ITEMS_PER_PAGE)
    .then(async (result) => {
      const totalSearch = await userUtil.findUser(email, name);
      res.render("backoffice/users", {
        pageTitle: "Users",
        path: "/users",
        users: result,
        success: undefined,
        mainUser: req.user,
        email, //query email
        name, //query name
        currentPage: page,
        hasNextPage: ITEMS_PER_PAGE * page < totalSearch.length,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalSearch.length/ITEMS_PER_PAGE)
      });
    })
    .catch((err) => console.log(err));
};

exports.getCreateUserPage = (req, res) => {
  res.render("admin/create-user", {
    pageTitle: "Create User",
    path: "/users",
    mainUser: req.user,
  });
};

exports.createUser = async (req, res) => {
  const { email, name, password1, password2, role } = req.body;
  const page = +req.query.page || 1; //+ to int
  const e = '';
  const n = ''
  const users = await userUtil.findUserPagination(e, n, page, ITEMS_PER_PAGE);
  const totalSearch = await userUtil.findUser(e, n);
  if(!(password1==password2)){
    res.render("backoffice/users", {
      pageTitle: "Users",
      path: "/users",
      users,
      success: {
        status: false,
        message: "Failed creating user. Passwords are not equal",
        error: ''
      },
      mainUser: req.user,
      email: e, //query email
      name: n, //query name
      currentPage: page,
      hasNextPage: ITEMS_PER_PAGE * page < totalSearch.length,
      hasPreviousPage: page > 1,
      nextPage: page + 1,
      previousPage: page - 1,
      lastPage: Math.ceil(totalSearch.length/ITEMS_PER_PAGE)
    });
  }else{
    const user = new User({
      name: name,
      email: email,
      password: password1,
      role: role,
    });
    userUtil.saveUser(user)
    .then( async result => {
      const usersFinal = await userUtil.findUserPagination(e, n, page, ITEMS_PER_PAGE);
      const totalSearchFinal = await userUtil.findUser(e, n);
      res.render("backoffice/users", {
        pageTitle: "Users",
        path: "/users",
        users: usersFinal,
        success: {
          status: result.status,
          message: result.message,
          error: result.error
        },
        mainUser: req.user,
        email: e, //query email
        name: n, //query name
        currentPage: page,
        hasNextPage: ITEMS_PER_PAGE * page < totalSearchFinal.length,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalSearchFinal.length/ITEMS_PER_PAGE)
      });
    })
  }
};

exports.editUser = (req, res) => {
  const page = +req.query.page || 1; //+ to int
  const e = '';
  const n = ''
  console.log(req.body);
  const { _method, userId } = req.body;
  if (userId) {
    if (_method === "PATCH") {
      User.findById(userId)
        .then((user) => {
          res.render("backoffice/change-password", {
            user: user,
            pageTitle: "Change Password",
            path: "/users",
            selfChange: false,
            mainUser: req.user,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (_method === "DELETE") {
      userUtil.replaceDeleted(userId, req).then(async (result) => {
        if (result.status === "success") {
          userUtil.deleteUser(userId).then(async (result) => {
            const users = await userUtil.findUserPagination(e, n, page, ITEMS_PER_PAGE);
            const totalSearch = await userUtil.findUser(e, n);
            res.render("backoffice/users", {
              pageTitle: "Users",
              path: "/users",
              users,
              success: {
                status: result.status,
                message: result.message,
                error: result.error
              },
              mainUser: req.user,
              email: e, //query type
              name: n, //query name
              currentPage: page,
              hasNextPage: ITEMS_PER_PAGE * page < totalSearch.length,
              hasPreviousPage: page > 1,
              nextPage: page + 1,
              previousPage: page - 1,
              lastPage: Math.ceil(totalSearch.length/ITEMS_PER_PAGE)
            });
          });
        } else {
          const users = await userUtil.findUserPagination(e, n, page, ITEMS_PER_PAGE);
          const totalSearch = await userUtil.findUser(e, n);
          res.render("backoffice/users", {
            pageTitle: "Users",
            path: "/users",
            users,
            success: {
              status: false,
              message: "Failure to delete user",
              error: err,
            },
            mainUser: req.user,
            email: e, //query type
            name: n, //query name
            currentPage: page,
            hasNextPage: ITEMS_PER_PAGE * page < totalSearch.length,
            hasPreviousPage: page > 1,
            nextPage: page + 1,
            previousPage: page - 1,
            lastPage: Math.ceil(totalSearch.length/ITEMS_PER_PAGE)
          });
        }
      });
    }
  } else {
    res.redirect("/users");
  }
};

exports.changePassword = async (req, res) => {
  const page = +req.query.page || 1; //+ to int
  const e = '';
  const n = ''
  const userId = req.body.userId;
  const users = await userUtil.findUserPagination(e, n, page, ITEMS_PER_PAGE);
  const totalSearch = await userUtil.findUser(e, n);
  const password = await bcrypt.hash(req.body.password1, 12);
  userUtil
    .passwordReset(userId, password, req.body.changingPassword)
    .then((result) => {
      if (result.status === "success") {
        if (req.body.changingPassword === "true") {
          res.redirect("/home");
        } else {
          res.render("backoffice/users", {
            pageTitle: "Users",
            path: "/users",
            users,
            success: {
              status: true,
              message: "Successfully altered the password",
            },
            mainUser: req.user,
            email: e, //query type
            name: n, //query name
            currentPage: page,
            hasNextPage: ITEMS_PER_PAGE * page < totalSearch.length,
            hasPreviousPage: page > 1,
            nextPage: page + 1,
            previousPage: page - 1,
            lastPage: Math.ceil(totalSearch.length/ITEMS_PER_PAGE)
          });
        }
      }else {
        res.render("backoffice/users", {
          pageTitle: "Users",
          path: "/users",
          users,
          success: {
            status: false,
            message: "Failure to alter password",
            error: "Unknown error",
          },
          mainUser: req.user,
          email: e, //query type
          name: n, //query name
          currentPage: page,
          hasNextPage: ITEMS_PER_PAGE * page < totalSearch.length,
          hasPreviousPage: page > 1,
          nextPage: page + 1,
          previousPage: page - 1,
          lastPage: Math.ceil(totalSearch.length/ITEMS_PER_PAGE)
        });
      }
    });
};
