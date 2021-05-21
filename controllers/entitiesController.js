const Entity = require("../models/auxiliaryModels/supportEntity");
const Project = require("../models/projectModel");
const entiUtil = require("../utils/supportEntitiesUtil");
const typeOfEntities = entiUtil.getEntities();

const ITEMS_PER_PAGE = 3;

exports.getEntities = async (req, res) => {
  const page = +req.query.page || 1; //+ to int
  const entity = req.query.entity || '';
  const name = req.query.name || ''

  entiUtil.getEntityPagination(entity, name, page, ITEMS_PER_PAGE).then(async (entities) => {
    const totalSearch = await entiUtil.getEntity(entity, name);
    // console.log(totalSearch.length);
    res.render("backoffice/entities", {
      pageTitle: "Entities",
      path: "/entities",
      user: req.user,
      typeOfEntities,
      entities, //search result 
      success: undefined,
      entity, //query type
      name, //query name
      currentPage: page,
      hasNextPage: ITEMS_PER_PAGE * page < totalSearch.length,
      hasPreviousPage: page > 1,
      nextPage: page + 1,
      previousPage: page - 1,
      lastPage: Math.ceil(totalSearch.length/ITEMS_PER_PAGE)
    }); 
  });
};

exports.createEntity = async (req, res) => {
  const page = +req.query.page || 1; //+ to int
  const entity = req.query.entity || '';
  const name = req.query.name || ''
  const { entityPopup, namePopup } = req.body;
  const ent = new Entity({
    name: namePopup,
    designation: entityPopup,
  });
  ent.save().then(async(result) => {
    const entities = await entiUtil.getEntityPagination(entity, name, page, ITEMS_PER_PAGE);
    const totalSearch = await entiUtil.getEntity(entity, name);
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
      entity, //query type
      name, //query name
      currentPage: page,
      hasNextPage: ITEMS_PER_PAGE * page < totalSearch.length,
      hasPreviousPage: page > 1,
      nextPage: page + 1,
      previousPage: page - 1,
      lastPage: Math.ceil(totalSearch.length/ITEMS_PER_PAGE)
    });
  })
  .catch(async err => {
    const entities = await entiUtil.getEntityPagination(entity, name, page, ITEMS_PER_PAGE);
    const totalSearch = await entiUtil.getEntity(entity, name);
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
      entity, //query type
      name, //query name
      currentPage: page,
      hasNextPage: ITEMS_PER_PAGE * page < totalSearch.length,
      hasPreviousPage: page > 1,
      nextPage: page + 1,
      previousPage: page - 1,
      lastPage: Math.ceil(totalSearch.length/ITEMS_PER_PAGE)
    });
  })
};

exports.editEntity = async(req, res) => {
  const { _method, entityId, newName } = req.body;
  const page = +req.query.page || 1; //+ to int
  const entity = req.query.entity || '';
  const name = req.query.name || ''
  console.log(req.body);
  if (_method === "PATCH") {
    entiUtil.updateEntity(entityId, newName).then(async (result) => {
      const entities = await entiUtil.getEntityPagination(entity, name, page, ITEMS_PER_PAGE);
      const totalSearch = await entiUtil.getEntity(entity, name);
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
        entity, //query type
        name, //query name
        currentPage: page,
        hasNextPage: ITEMS_PER_PAGE * page < totalSearch.length,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalSearch.length/ITEMS_PER_PAGE)
      });
    });
  } else {
    entiUtil.deleteEntity(entityId).then(async(result) => {
      const entities = await entiUtil.getEntityPagination(entity, name, page, ITEMS_PER_PAGE);
      const totalSearch = await entiUtil.getEntity(entity, name);
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
        entity, //query type
        name, //query name
        currentPage: page,
        hasNextPage: ITEMS_PER_PAGE * page < totalSearch.length,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalSearch.length/ITEMS_PER_PAGE)
      });
    });
  }
};
