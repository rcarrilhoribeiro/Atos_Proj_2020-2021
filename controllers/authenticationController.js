
exports.getLogin = (req, res) => {
    res.render('auth/login', {
        pageTitle: 'Login'
    })
}

exports.postLogin = (req,res) => {
    res.redirect('/home')
}