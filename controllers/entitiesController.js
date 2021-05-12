const Entity = require("../models/auxiliaryModels/supportEntity");
const entiUtil = require("../utils/supportEntitiesUtil");
const typeOfEntities = entiUtil.getEntities();

exports.getEntities = (req, res) => {
  entiUtil.getEntity(req.query.entity, req.query.name).then((entities) => {
    res.render("backoffice/entities", {
      pageTitle: "Entities",
      path: "/entities",
      user: req.user,
      typeOfEntities,
      entities: entities,
      success: undefined,
    });
  });
};

exports.createEntity = (req, res) => {
  const { entityPopup, namePopup } = req.body;
  const ent = new Entity({
    name: namePopup,
    designation: entityPopup,
  });
  ent.save().then(async (result) => {
    const entities = await Entity.find();
    console.log(result);
    res.render("backoffice/entities", {
      pageTitle: "Entities",
      path: "/entities",
      user: req.user,
      typeOfEntities,
      entities,
      success: {
        status: true,
        message: "Successfully created entity",
        err: result.err,
      },
    });
  })
  .catch(async err => {
    const entities = await Entity.find();
    res.render("backoffice/entities", {
      pageTitle: "Entities",
      path: "/entities",
      user: req.user,
      typeOfEntities,
      entities,
      success: {
        status: false,
        message: "Failed creating entity",
        error: err,
      },
    });
  })
};

exports.editEntity = (req, res) => {
  const { _method, entityId, newName } = req.body;
  console.log(req.body);
  if (_method === "PATCH") {
    entiUtil.updateEntity(entityId, newName).then(async (result) => {
      const entities = await Entity.find();
      res.render("backoffice/entities", {
        pageTitle: "Entities",
        path: "/entities",
        user: req.user,
        typeOfEntities,
        entities,
        success: {
          status: result.status,
          message: result.message,
          err: result.err,
        },
      });
    });
  } else {
    entiUtil.deleteEntity(entityId).then(async (result) => {
      const entities = await Entity.find();
      res.render("backoffice/entities", {
        pageTitle: "Entities",
        path: "/entities",
        user: req.user,
        typeOfEntities,
        entities,
        success: {
          status: result.status,
          message: result.message,
          err: result.err,
        },
      });
    });
  }
};
