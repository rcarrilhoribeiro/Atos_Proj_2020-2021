const User = require('../models/userModel')
const jwt = require("jsonwebtoken");

exports.getLogin = (req, res) => {
    res.render('auth/login', {
        pageTitle: 'Login'
    })
}

postLogin = async (req,res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body);
        const user = await User.findOne({
          email: email,
        }).select("+password");

        console.log(user);
    
        if (!user || !(await user.correctPassword(password, user.password))) {
          return {
            status: "fail",
            message: 'No user found'
          }
        }
    
        createCookie(user, res);
        
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

exports.renderHomePage = (req, res) => {
    const result = postLogin(req, res)
    .then(result => {
      if(result.status === 'success'){
        res.render('backoffice/index', {
            pageTitle: 'Home',
            path: '/home',
            user: result.user
        })
      }else{
        res.redirect('/')
      }
    })
    .catch(err => {
        console.log(err);
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
