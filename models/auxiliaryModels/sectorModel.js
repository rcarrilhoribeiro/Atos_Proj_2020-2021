const mongoose = require("mongoose");
const validator = require("validator");

const sectorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const sectorSchema = mongoose.model("Sector", sectorSchema);

module.exports = Sector;
