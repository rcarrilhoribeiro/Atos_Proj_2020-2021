const Project = require('../models/projectModel');
const projectUtil = require('../utils/projectUtil')

exports.getProjectsPage = (req, res) => {
    res.render('backoffice/projects', {
        pageTitle: 'Projects',
        path: '/projects',
        projects: [],
        role: req.user.role
    })
}

exports.getProjectsList = (req, res) => {
    console.log(req.body);
    Project.find()
    .then(projects => {
        res.render('backoffice/projects', {
            pageTitle: 'Projects',
            path: '/projects',
            projects: projects,
            role: req.user.role
        })
    })
}

exports.getSpecificProjectPage = (req, res) => {
    const {projectId} = req.params;
    Project.findById(projectId)
    .then(project => {
        res.render('backoffice/project-details', {
            pageTitle: 'Project',
            path: '/projects',
            project,
            role: req.user.role,
            success: undefined
        })
    })
}

exports.changeAuthorOfProject = (req, res) => {
  const {projectId} = req.params;
  projectUtil.editProjectCreator(req)
  .then(result => {
    if(result.status === 'success'){
      res.redirect('/projects/project/' + projectId)
    }else{
      Project.findById(projectId)
      .then(project => {
        res.render('backoffice/project-details', {
            pageTitle: 'Project',
            path: '/projects',
            project,
            role: req.user.role,
            success: result
        })
      })
    }
  })
}
