const mongoose = require('mongoose');
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
    required: true,
  },
  profileImageUrl: {
    type: String
  },
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message"
    }
  ]
});

userSchema.pre('save', async function(next) {
  try {
    if(!this.isModified('password')) {
      return next();
    }
    let hashedPassword = await bcryptjs.hash(this.password, 10);
    this.password = hashedPassword;
    return next();
  } catch (error) {
    return next(err);
  }
});

userSchema.methods.comparePassword = async function(candidatePassword, next) {
  try {
    let isMatch = await bcryptjs.compare(candidatePassword, this.password);
    return isMatch;
  } catch (error) {
    return next(error);
  }
}

const User = mongoose.model("User", userSchema);

module.exports = User;