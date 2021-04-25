const mongoose = require("mongoose");
const validator = require("validator");

const businessSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const businessSchema = mongoose.model("Business", businessSchema);

module.exports = Business;
