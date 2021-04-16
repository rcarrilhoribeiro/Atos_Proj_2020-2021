const express = require('express');

const router = express.Router();

router.get('/home', (req, res) => {
    res.render('backoffice/index', {
        pageTitle: 'Home',
        path: '/home'
    })
})

router.get('/users', (req, res) => {
    res.render('backoffice/users', {
        pageTitle: 'Users',
        path: '/users',
        users: []
    })
})

router.post('/users', (req, res) => {
    res.redirect('/home')
})

router.get('/projects', (req, res) => {
    res.render('backoffice/projects', {
        pageTitle: 'Projects',
        path: '/projects'
    })
})

router.post('/projects', (req, res) => {
    res.redirect('/home')
})

module.exports = router;