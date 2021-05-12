const SupportEntity = require("../models/auxiliaryModels/supportEntity");

const entities = [
  "Technology",
  "Client",
  "Sector",
  "Business",
  "Office",
  "Profile",
];

exports.getEntities = () => {
  return entities;
};

//TODO -> Pesquisa por email ou nome (melhorar esta parte)
exports.getEntity = async (supportEntityType, searchText) => {
  try {
    if (searchText) {
      return await SupportEntity.find({
        $or: [
          { designation: supportEntityType },
          {
            name: {
              $regex: new RegExp(searchText.replace(/\s+/g, "\\s+"), "gi"),
            },
          },
        ],
      });
    } else if (supportEntityType) {
      return await SupportEntity.find({ designation: supportEntityType });
    } else {
      return await SupportEntity.find();
    }
  } catch (err) {
    return {
      status: "error",
      message: "Failed finding specified entities",
      err,
    };
  }
};

exports.deleteEntity = async (id) => {
  try {
    await SupportEntity.findByIdAndDelete(id);
    return {
      status: true,
      message: "Successfully deleted entity",
    };
  } catch (err) {
    return {
      status: false,
      message: "Failed deleting entity",
      err,
    };
  }
};

exports.updateEntity = async (id, changeText) => {
  try {
    await SupportEntity.findByIdAndUpdate(id, { name: changeText });
    return {
      status: true,
      message: "Successfully updated entity",
    };
  } catch (err) {
    return {
      status: false,
      message: "Failed updating entity",
      err,
    };
  }
};

exports.createEntity = async (supportEntityType, name) => {
  try {
    await SupportEntity.create({ name, desgination: supportEntityType });
    return {
      status: true,
      message: "Successfully created entity",
    };
  } catch (err) {
    return {
      status: false,
      message: "Failed creating entity",
      err,
    };
  }
};
