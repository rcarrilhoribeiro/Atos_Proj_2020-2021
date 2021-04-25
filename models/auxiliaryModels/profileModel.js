const mongoose = require("mongoose");
const validator = require("validator");

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const profileSchema = mongoose.model("Profile", profileSchema);

module.exports = Profile;
