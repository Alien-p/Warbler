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

exports.getMessage = async function(req, res, next) {
  try {
    let message = await db.Message.findById(req.params.message_id);
    return res.status(200).json(message);
  } catch (error) {
    return next(error);
  }
}

exports.deleteMessage = async function(req, res, next) {
  try {
    let deletedMessage = await db.Message.findById(req.params.message_id);
    await deletedMessage.remove();
    return res.status(200).json(deletedMessage);
  } catch (error) {
    return next(error);
  }
}