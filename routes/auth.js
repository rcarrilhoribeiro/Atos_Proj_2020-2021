const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('auth/login', {
        pageTitle: 'Login'
    })
})

router.post('/', (req,res) => {
    res.redirect('/home')
})

module.exports = router;