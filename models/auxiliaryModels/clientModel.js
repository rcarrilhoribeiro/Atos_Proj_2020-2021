const mongoose = require("mongoose");
const validator = require("validator");

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const clientSchema = mongoose.model("Sector", clientSchema);

module.exports = Client;
