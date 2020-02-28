const mongoose = require('mongoose');
const User = require('./user');

const messageSchema = new mongoose.Schema({
  text: {
    type: String,
    require: true,
    maxlength: 160
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

messageSchema.pre('save', async function(next) {
  try {
    let user = await User.findById(this.user);
    user.messages.remove(this.id);
    await user.save();
    return next();
  } catch (err) {
    return next(err);
  }
})

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;