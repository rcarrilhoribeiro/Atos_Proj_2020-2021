const mongoose = require("mongoose");
const validator = require("validator");
const supportEntity = require("./auxiliaryModels/supportEntity");
const schema = mongoose.Schema;

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter the project name"],
  },
  author: {
    type: String,
    required: [true, "Please enter the author name"],
  },
  authorEmail: {
    type: String,
    required: [true, "Please enter the author email."],
    lowercase: true,
    validator: [validator.isEmail, "Please enter a valid email."],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  scope: {
    type: String,
    minlenght: 10,
    trim: true,
    required: [true, "Please insert the scope of the project"],
  },
  internalDescription: {
    type: String,
    trim: true,
    default: ''
  },
  externalDescription: {
    type: String,
    trim: true,
    default: ''
  },
  sector: { type: schema.Types.ObjectId, ref: "SupportEntity" },
  client: { type: schema.Types.ObjectId, ref: "SupportEntity" },
  logo: {
    type: String,
    trim: true,
    default: ''
  },
  technology: [
    { type: schema.Types.ObjectId, ref: "SupportEntity"},
  ],
  teamProfile: [
    { type: schema.Types.ObjectId, ref: "SupportEntity"},
  ],
  office: { type: schema.Types.ObjectId, ref: "SupportEntity"},
  businessAreas: { type: schema.Types.ObjectId, ref: "SupportEntity"},
  projectType: {
    type: String,
    trim: true,
    default: ''
  },
  projectModel: {
    type: String,
    trim: true,
    default: ''
  },
  budget: {
    type: Number,
    trim: true,
    default: 0
  },
  duration: {
    type: Number,
    trim: true,
    default: 0
  },
  contactInfo: {
    type: String,
    trim: true,
    default: ''
  },
  attachment: {
    type: String,
    trim: true,
    default: ''
  },
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;