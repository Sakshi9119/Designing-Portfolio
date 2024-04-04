const mongoose = require("mongoose");
// const validator = require("validator");
const validator = require("validator");
// const { default: isEmail } = require('validator/lib/isemail');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Email already present!"],
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email!");
      }
    },
  },
  phone: {
    type: Number,
    min: 10,
    // max:10,
    required: true,
    unique: true,
  },
  message: {
    type: String,
    required: true,
    minLength: 3,
  },
});

//we need colln:
const User = mongoose.model("User", userSchema);

module.exports = User;
