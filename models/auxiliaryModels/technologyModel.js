
const mongoose = require("mongoose");
const validator = require("validator");

const technologySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Technology = mongoose.model("Technology", technologySchema);

module.exports = Technology;