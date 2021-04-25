const Technology = require("./../models/auxiliaryModels/technologyModel");
const Client = require("./../models/auxiliaryModels/clientModel");
const Office = require("./../models/auxiliaryModels/officeModel");
const Profile = require("./../models/auxiliaryModels/profileModel");
const Sector = require("./../models/auxiliaryModels/sectorModel");
const Business = require("./../models/auxiliaryModels/businessModel");

exports.getEntity = (req, res, supportEntityType, searchText) => {
  switch (supportEntityType) {
    case "Client":
      return getClients(searchText);
    case "Technology":
      return getTechnologies(searchText);
    case "Office":
      return getOffices(searchText);
    case "Sector":
      return getSector(searchText);
    case "Profile":
      return getProfiles(searchText);
    case "Business":
      return getBusiness(searchText);
  }
};

exports.deleteEntity = (req, res, supportEntityType, id) => {
  switch (supportEntityType) {
    case "Client":
      return deleteClient(id);
    case "Technology":
      return deleteTechnology(id);
    case "Office":
      return deleteOffice(id);
    case "Sector":
      return deleteSector(id);
    case "Profile":
      return deleteProfile(id);
    case "Business":
      return deleteBusiness(id);
  }
};

exports.updateEntity = (req, res, supportEntityType, id, changeText) => {
  switch (supportEntityType) {
    case "Client":
      return updateClient(id, changeText);
    case "Technology":
      return updateTechnology(id, changeText);
    case "Office":
      return updateOffice(id, changeText);
    case "Sector":
      return updateSector(id, changeText);
    case "Profile":
      return updateProfile(id, changeText);
    case "Business":
      return updateBusiness(id, changeText);
  }
};

exports.createEntity = (req, res, supportEntityType, name) => {
  switch (supportEntityType) {
    case "Client":
      return createClient(name);
    case "Technology":
      return createTechnology(name);
    case "Office":
      return createOffice(name);
    case "Sector":
      return createSector(name);
    case "Profile":
      return createProfile(name);
    case "Business":
      return createBusiness(name);
  }
};

//READ

getTechnologies = (name) => {
  try {
    return Technology.find({
      name: { $regex: new RegExp(name.replace(/\s+/g, "\\s+"), "gi") },
    });
  } catch (err) {}
};

getClients = (name) => {
  try {
    return Client.find({
      name: { $regex: new RegExp(name.replace(/\s+/g, "\\s+"), "gi") },
    });
  } catch (err) {}
};

getOffices = (name) => {
  try {
    return Office.find({
      name: { $regex: new RegExp(name.replace(/\s+/g, "\\s+"), "gi") },
    });
  } catch (err) {}
};

getBusiness = (name) => {
  try {
    return Business.find({
      name: { $regex: new RegExp(name.replace(/\s+/g, "\\s+"), "gi") },
    });
  } catch (err) {}
};

getProfiles = (name) => {
  try {
    return Profile.find({
      name: { $regex: new RegExp(name.replace(/\s+/g, "\\s+"), "gi") },
    });
  } catch (err) {}
};

getSector = (name) => {
  try {
    return Sector.find({
      name: { $regex: new RegExp(name.replace(/\s+/g, "\\s+"), "gi") },
    });
  } catch (err) {}
};

deleteTechnology = (id) => {
  try {
    return Technology.findByIdAndDelete(id);
  } catch (err) {}
};
//DELETE
deleteClient = (id) => {
  try {
    return Client.findByIdAndDelete(id);
  } catch (err) {}
};

deleteOffice = (id) => {
  try {
    return Office.findByIdAndDelete(id);
  } catch (err) {}
};

deleteBusiness = (id) => {
  try {
    return Business.findByIdAndDelete(id);
  } catch (err) {}
};

deleteProfile = (id) => {
  try {
    return Profile.findByIdAndDelete(id);
  } catch (err) {}
};

deleteSector = (id) => {
  try {
    return Sector.findByIdAndDelete(id);
  } catch (err) {}
};
//UPDATE
updateTechnology = (id, name) => {
  try {
    return Technology.findByIdAndUpdate(id, { name });
  } catch (err) {}
};

updateClient = (id, name) => {
  try {
    return Client.findByIdAndUpdate(id, { name });
  } catch (err) {}
};

updateOffice = (id, name) => {
  try {
    return Office.findByIdAndUpdate(id, { name });
  } catch (err) {}
};

updateBusiness = (id, name) => {
  try {
    return Business.findByIdAndUpdate(id, { name });
  } catch (err) {}
};

updateProfile = (id, name) => {
  try {
    return Profile.findByIdAndUpdate(id, { name });
  } catch (err) {}
};

updateSector = (id, name) => {
  try {
    return Sector.findByIdAndUpdate(id, { name });
  } catch (err) {}
};
//CREATE
createTechnology = (name) => {
  try {
    return Technology.create({ name });
  } catch (err) {}
};
createSector = (name) => {
  try {
    return Sector.create({ name });
  } catch (err) {}
};
createBusiness = (name) => {
  try {
    return Business.create({ name });
  } catch (err) {}
};
createProfile = (name) => {
  try {
    return Profile.create({ name });
  } catch (err) {}
};
createOffice = (name) => {
  try {
    return Office.create({ name });
  } catch (err) {}
};
createClient = (name) => {
  try {
    return Client.create({ name });
  } catch (err) {}
};