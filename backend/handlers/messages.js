const db = require('../models');

exports.createMessage = async function(req, res, next) {
  try {
    let userId = req.params.id;

    let message = await db.Message.create({
      text: req.body.text,
      user: userId
    })

    let messageOwner = await db.User.findById(userId);
    messageOwner.messages.push(message.id);
    await messageOwner.save();

    let foundMessage = await db.Message.findById(message.id).populate('user', {
      username: true,
      profileImageUrl: true
    });

    return res.status(200).json(foundMessage);
  } catch (err) {
    return next(err);
  }
}

