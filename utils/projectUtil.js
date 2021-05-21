const Project = require("../models/projectModel");
const User = require("../models/userModel");
const SupportEntity = require("../models/auxiliaryModels/supportEntity")


exports.editProjectCreator = async (req) => {
  const authorEmail = req.body.email2;
  const projectID = req.params.projectId;
  const user = await User.findOne({ email: authorEmail });
  if (!user) return { status: "error", message: "Failed finding user" };
  if (user.role !== "basic") {
    await Project.findByIdAndUpdate(
      projectID,
      {
        author: user.name,
        authorEmail: authorEmail,
      },
      function (err) {
        if (err) {
          return { status: "error", message: "Failed updating project", err:err};
        }
      }
    );
    return {
      status: "Success",
      message: "Successfully created a new project",
    };
  } else {
    return {
      status: "error",
      message: "User does not have permissions",
      err: 'No error'
    };
  }
};

exports.createProject = async (req) => {
  const author = req.user.name;
  const authorEmail = req.user.email;
  try {
    const {
      name,
      scope,
      internalDescription,
      externalDescription,
      sector,
      client,
      Technology,
      Profile,
      office,
      businessAreas,
      projectType,
      projectModel,
      budget,
      duration,
      logo,
      contactInfo,
      attachment,
    } = req.body;

    let sectorID = await SupportEntity.find({
      name: sector,
      designation: "Sector",
    }).select("_id");
    let clientID = await SupportEntity.find({
      name: client,
      designation: "Client",
    }).select("_id");
    let technologyID = await SupportEntity.find({
      name: { $in: Technology },
      designation: "Technology",
    }).select("_id");
    let teamProfileID = await SupportEntity.find({
      name: { $in: Profile },
      designation: "Profile",
    }).select("_id");
    let officeID = await SupportEntity.find({
      name: office,
      designation: "Office",
    }).select("_id");

    let businessAreasID = await SupportEntity.find({
      name: { $in: businessAreas },
      designation: "Business",
    }).select("_id");

    checkArrayAndGetID(officeID);
    checkArrayAndGetID(sectorID);
    checkArrayAndGetID(clientID);
    checkArrayAndGetID(businessAreasID);
    checkArrayAndGetID(technologyID).forEach(getID);
    checkArrayAndGetID(teamProfileID).forEach(getID);

    let filePath;
    if(req.file) filePath = '/uploads/'+req.file.filename;

    await new Project({
      name: name,
      author: author,
      authorEmail: authorEmail,
      scope: scope,
      internalDescription: internalDescription,
      externalDescription: externalDescription,
      sector: checkArray(sectorID),
      client: checkArray(clientID),
      technology: checkArray(technologyID),
      teamProfile: checkArray(teamProfileID),
      office: checkArray(officeID),
      businessAreas: checkArray(businessAreasID),
      projectType: projectType,
      projectModel: projectModel,
      budget: budget,
      logo: filePath,
      duration: duration,
      contactInfo: contactInfo,
      attachment: attachment,
    }).save();

    return {
      status: true,
      message: "Successfully created a new project",
    };
  } catch (err) {
    console.log(err);
    return {
      status: false,
      message: "Failed creating new project.",
      err,
    };
  }
};

exports.getProject = async (projectId) => {
  try {
    return await Project.findById(projectId)
      .populate({ path: "client", select: "name" })
      .populate({ path: "sector", select: "name" })
      .populate({ path: "technology", select: "name" })
      .populate({ path: "teamProfile", select: "name" })
      .populate({ path: "office", select: "name" })
      .populate({ path: "businessAreas", select: "name" });
  } catch (err) {
    console.log(err);
    return {
      status: "Fail",
      message: "",
    };
  }
}

exports.editProject = async (req) => {
  const { projectId } = req.params;

  try {
    const {
      author,
      authorEmail,
      name,
      scope,
      internalDescription,
      externalDescription,
      sector,
      client,
      Technology,
      Profile,
      office,
      businessAreas,
      projectType,
      projectModel,
      budget,
      duration,
      contactInfo,
      attachment,
    } = req.body;
    
    let sectorID = await SupportEntity.find({
      name: sector,
      designation: "Sector",
    }).select("_id");
    let clientID = await SupportEntity.find({
      name: client,
      designation: "Client",
    }).select("_id");
    let technologyID = await SupportEntity.find({
      name: { $in: Technology },
      designation: "Technology",
    }).select("_id");
    let teamProfileID = await SupportEntity.find({
      name: { $in: Profile },
      designation: "Profile",
    }).select("_id");
    let officeID = await SupportEntity.find({
      name: office,
      designation: "Office",
    }).select("_id");

    let businessAreasID = await SupportEntity.find({
      name: { $in: businessAreas },
      designation: "Business",
    }).select("_id");

    checkArrayAndGetID(officeID);
    checkArrayAndGetID(sectorID);
    checkArrayAndGetID(clientID);
    checkArrayAndGetID(businessAreasID);
    checkArrayAndGetID(technologyID).forEach(getID);
    checkArrayAndGetID(teamProfileID).forEach(getID);
   
    await Project.findByIdAndUpdate(projectId, {
      name: name,
      author: author,
      authorEmail: authorEmail,
      scope: scope,
      internalDescription: internalDescription,
      externalDescription: externalDescription,
      sector: checkArray(sectorID),
      client: checkArray(clientID),
      technology: checkArray(technologyID),
      teamProfile: checkArray(teamProfileID),
      office: checkArray(officeID),
      businessAreas: checkArray(businessAreasID),
      projectType: projectType,
      projectModel: projectModel,
      budget: budget,
      duration: duration,
      contactInfo: contactInfo,
      attachment: attachment,
    });

    return {
      status: true,
      message: "Successfully updated project",
    };
  } catch (err) {
    return {
      status: false,
      message: "Failed to update project",
      err,
    };
  }
};

function getID(element, index, array) {
  array[index] = element._id;
}

function checkArrayAndGetID(array) {
  if (array.length > 0) {
    array[0] = array[0]._id;
  }
  return array;
}

function checkArray(array) {
  return array.length > 0 ? array : null;
}