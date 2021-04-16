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
        users: []
    })
}

// TODO -> get Users with params
exports.postUsers = (req, res) => {
    res.redirect('/home')
}

exports.getProjectsPage = (req, res) => {
    res.render('backoffice/projects', {
        pageTitle: 'Projects',
        path: '/projects'
    })
}

// TODO -> get Projects with params
exports.postProjects = (req, res) => {
    res.redirect('/home')
}