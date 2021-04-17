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