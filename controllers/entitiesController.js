const Entity = require('../models/auxiliaryModels/supportEntity')
const entiUtil = require('../utils/supportEntitiesUtil')

exports.getEntitiesPages = (req, res) => {
    const typeOfEntities = entiUtil.getEntities()
    res.render('backoffice/entities', {
        pageTitle: 'Entities',
        path: '/entities',
        user: req.user,
        role: req.user.role,
        typeOfEntities,
        entities: [],
        success: undefined,
    })
}

exports.getEntities = (req, res) => {
    const typeOfEntities = entiUtil.getEntities()
    console.log(req.body);
    entiUtil.getEntity(req.body.entity, req.body.name)
    .then(entities => {
        res.render('backoffice/entities', {
            pageTitle: 'Entities',
            path: '/entities',
            user: req.user,
            role: req.user.role,
            typeOfEntities,
            entities: entities,
            success: undefined,
        })
    })
}

exports.createEntity = (req, res) => {
    const typeOfEntities = entiUtil.getEntities()
    const {entityPopup, namePopup} = req.body
    const ent = new Entity({
        name: namePopup,
        designation: entityPopup
    })
    ent.save()
    .then(result => {
        res.render('backoffice/entities', {
            pageTitle: 'Entities',
            path: '/entities',
            user: req.user,
            role: req.user.role,
            typeOfEntities,
            entities: [],
            success: {
                status: true,
                message: "Successfully created entity"
            },
        })
    })
    .catch(err => {
        res.render('backoffice/entities', {
            pageTitle: 'Entities',
            path: '/entities',
            user: req.user,
            role: req.user.role,
            typeOfEntities,
            entities: [],
            success: {
                status: false,
                message: "Failure creating entity",
                error: err
            },
        })
        console.log(err);
    })
}