const User = require('../models/userModel')
const jwt = require("jsonwebtoken");
const userUtil = require('../utils/userUtil')

exports.getLoginPage = (req, res) => {
  if(!req.user){
    res.render('auth/login', {
      pageTitle: 'Login'
    })
  }else res.redirect('/home') 
}

exports.checkUserLogin = async (req,res) => {
    try {
        const { email, password } = req.body;
        console.log("bod", req.body);
        const user = await User.findOne({
          email: email,
        }).select("+password");

        console.log("user encontrado", user);
    
        if (!user || !(await user.correctPassword(password, user.password))) {
          return {
            status: "fail",
            message: 'No user found'
          }
        }
        createCookie(user, res)
        return {
          status: "success",
          user,
        }
      } catch (err) {
        console.log(err);
        return {
          status: "error",
        }
      }
}

exports.logout = (req, res) =>{
  try{
    res.clearCookie('jwt')
    res.redirect('/')
  }catch(err){
    console.log("erro logout", err);
  }
}

exports.checkLogin = (req, res, next) => {
  this.checkUserLogin(req, res)
  .then(result => {
    console.log("result checkLogin", result);
    if(result.status === 'success'){
      req.user = result.user
      next()
    }else{
      res.redirect('/')
    }
  })
  .catch(err => {
      console.log(err);
  })
}


exports.checkPassChange = (req, res, next) => {
  userUtil.passwordCheck(req)
  .then(result => {
    // console.log(result);
      if(result.status === 'fail'){
          res.render('backoffice/change-password', {
              user: result.user,
              pageTitle: "Change Password",
              path: '/users',
              selfChange: true
          })
      }else if(result.status === 'approved'){
          res.redirect('/home')
      }else{
        res.redirect('/')
      }
  })
}

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES,
    });
};
  
const createCookie = (user, res) => {
    const token = signToken(user._id);
    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };
    res.cookie("jwt", token, cookieOptions);
};
