const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter the user name"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email."],
    unique: true,
    lowercase: true,
    validator: [validator.isEmail, "Please enter a valid email."],
  },
  password: {
    type: String,
    required: [true, "Please enter a password."],
    minlenght: 10,
    select: false,
  },
  role: {
    type: String,
    lowercase: true,
    enum: ["admin", "internal", "basic"],
    required: [true, "Please enter the user role."],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  changedPassword: {
    type: Boolean,
    default: false
  }
});

userSchema.pre("save", async function (next) {
  //only runs this if passwaord was modified
  if (!this.isModified("password")) return next();
  //haash password with 12 cost
  this.password = await bcrypt.hash(this.password, 12);
  //delete password confirm field
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;