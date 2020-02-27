const db = require('../models');
const jwt = require('jsonwebtoken');

exports.signin = function() {}

exports.getUser = async function(req, res, next) {
  try {
    let users = await db.User.find();
    return res.status(200).json({users});
  } catch (err) {
    let error = {
      status: 400,
      message: err.message
    }
    return next(error);
  }
}

exports.signup = async function(req, res, next) {
  try {
    //create user
    let user = await db.User.create(req.body);
    //create a token
    let {id, username, profileImageUrl} = user;
    console.log(process.env.SECRET_KEY);
    let token = jwt.sign({ id, username, profileImageUrl }, process.env.SECRET_KEY);
    debugger;
    return res.status(200).json({id, username, profileImageUrl, token})
  } catch (err) {
    //what kind of error
    debugger;
    if(err.code === 11000) {
      err.message = "Sorry, that username/email is already taken"; 
    }
    let error = {
      status: 400,
      message: err.message
    }
    return next(error);
  }
}