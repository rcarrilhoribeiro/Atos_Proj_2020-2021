const mongoose = require("mongoose");
const validator = require("validator");

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
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;