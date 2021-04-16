const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
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
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      //only works for save or create!
      validator: function (password) {
        return password === this.password;
      },
      message: "Passwords are not the same! ",
    },
  },
  role: {
    type: String,
    enum: ["admin", "internal", "basic"],
    required: [true, "Please enter the user role."],
  },
});
