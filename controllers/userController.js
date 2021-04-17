const User = require('../models/userModel')
const dateConv = require('../utils/dateUtil').dateConversion
const {findUser, deleteUser, replaceDeleted} = require('../utils/userUtil')

exports.getHomePage = (req, res) => {
    res.render('backoffice/index', {
        pageTitle: 'Home',
        path: '/home'
    })
}

exports.getUsersPage = (req, res) => {
    res.render('backoffice/users', {
        pageTitle: 'Users',
        path: '/users',
        users: [],
        success: undefined
    })
}

exports.postUsers = (req, res) => {
    const {email} = req.body

    findUser(email)
    .then(result => {
        console.log(result);
        if(result.status === "success"){
            // let date = new Date(result.user.createdAt)
            // result.user.createdAt = dateConv(date)
            res.render('backoffice/users', {
                pageTitle: 'Users',
                path: '/users',
                users: [result.user],
                success: undefined
            })
        }else{
            res.render('backoffice/users', {
                pageTitle: 'Users',
                path: '/users',
                users: [],
                success: {
                    status: false,
                    message: "No users found",
                    error: "Wrong email"
                }
            })
        }
    })
    .catch(err => console.log(err))
}

exports.getCreateUserPage = (req, res) => {
    res.render('admin/create-user', {
        pageTitle: 'Create User',
        path: '/users'
    })
}

exports.createUser = (req, res) => {
    const {email, name, password1, password2, role} = req.body
    const user = new User({
        name: name,
        email: email,
        password: password1,
        role: role
    })
    user.save()
    .then(result => {
        res.render("backoffice/users", {
            pageTitle: 'Users',
            path: '/users',
            users: [],
            success: {
                status: true,
                message: "Success to create user"
            }
        })
    })
    .catch(err => {
        res.render("backoffice/users", {
            pageTitle: 'Users',
            path: '/users',
            users: [],
            success: {
                status: false,
                message: "Failure to create user",
                error: err
            }
        })
        console.log(err);
    })
}

exports.editUser = (req, res) => {
    console.log(req.params);
    console.log(req.body);
    const {userId} = req.params
    const {_method} = req.body
    
    if(_method === 'PATCH'){
        User.findById(userId)
        .then(user => {
            res.render('backoffice/change-password', {
                user: user,
                pageTitle: "Change Password",
                path: '/users'
            })
        })
        .catch(err => {
            console.log(err);
        })
        
    }else if(_method === 'DELETE'){
        replaceDeleted(userId, req)
        .then(result => {
            if(result.status === 'success'){
                deleteUser(userId)
                .then(result => {
                    if(result.status === 'success'){
                        res.render("backoffice/users", {
                            pageTitle: 'Users',
                            path: '/users',
                            users: [],
                            success: {
                                status: true,
                                message: "successfully deleted user"
                            }
                        })
                    }
                })
                
            }else{
                res.render("backoffice/users", {
                    pageTitle: 'Users',
                    path: '/users',
                    users: [],
                    success: {
                        status: false,
                        message: "Failure to delete user",
                        error: err
                    }
                })
            }
        })
    }
}


