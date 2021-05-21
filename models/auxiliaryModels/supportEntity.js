const mongoose = require("mongoose");
const validator = require("validator");


const supportEntity = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
    trim: true,
    unique: [true, 'Entity already exists']
  },
  designation: {
    type: String,
    trim: true,
    required:  [true, 'Please insert a designation'],
    enum: ['Technology', 'Client', 'Sector', 'Business', 'Office', 'Profile']
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

const SupportEntity = mongoose.model("SupportEntity", supportEntity);

module.exports = SupportEntity;