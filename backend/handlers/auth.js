const db = require('../models');
const jwt = require('jsonwebtoken');

exports.signin = function() {}

exports.signup = async function(req, res, next) {
  try {
    //create user
    let user = db.User.create(req.body);
    //create a token
    let {id, username, profileImageUrl} = user;
    let token = jwt.sign({ id, username, profileImageUrl }, process.env.SECRET_KEY );
    return res.status(200).json({id, username, profileImageUrl, token})
  } catch (err) {
    //what kind of error
    if(err.code === 11000) {
      err.message = "Sorry, that username/email is already taken"; 
    }
    return next({
      status: 400,
      message: err.message
    })
  }

}