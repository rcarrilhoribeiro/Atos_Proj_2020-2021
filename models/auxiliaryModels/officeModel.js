const mongoose = require("mongoose");
const validator = require("validator");

const officeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const officeSchema = mongoose.model("Sector", officeSchema);

module.exports = Office;
