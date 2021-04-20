const authController = require('../controllers/authenticationController')

exports.checkLogin = (req, res, next) => {
    authController.postLogin(req, res)
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
