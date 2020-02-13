const mongoose = require("mongoose");
const bcryptjs = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    require: true
  },
  profileImageUrl: {
    type: String
  }
})

const User = mongoose.model("User", userSchema);

module.exports = User;