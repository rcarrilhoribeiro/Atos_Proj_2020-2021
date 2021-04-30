
const SupportEntity = require("../models/auxiliaryModels/supportEntity");

const entities = ['Technology', 'Client', 'Sector', 'Business', 'Office', 'Profile'];

exports.getEntities = () => {
  return entities;
};

exports.getEntity = (supportEntityType, searchText) => {
  try{
    return SupportEntity.find({designation : supportEntityType , name: {$regex: new RegExp(searchText.replace(/\s+/g, "\s+"), "gi") }},)
  }
  catch(err){
    return {
      status: 'error',
      message: 'Failed finding specified entities'
    }
  }
};

exports.deleteEntity = (id) => {
  try{
    SupportEntity.findByIdAndDelete(id);
  }
  catch(err){
    return {
      status: 'error',
      message: 'Failed deleting entity'
    }
  }
};

exports.updateEntity = (id, changeText) => {
  try{
    SupportEntity.findByIdAndUpdate(id, {name: changeText});
  }
  catch(err){
    return {
      status: 'error',
      message: 'Failed updating entity'
    }
  }
};

exports.createEntity = (supportEntityType, name) => {
  try{
    SupportEntity.create({name, desgination: supportEntityType});
  }
  catch(err){
    return {
      status: 'error',
      message: 'Failed creating entity'
    }
  }
};