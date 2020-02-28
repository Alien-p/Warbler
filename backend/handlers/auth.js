const db = require('../models');
const jwt = require('jsonwebtoken');

exports.signin = async function(req, res, next) {
  try{
    let user = await db.User.findOne({email: req.body.email});
    let {id, username, profileImageUrl} = user;
    let isPassMatch = await user.comparePassword(req.body.password);
    
    if(isPassMatch) {
      let token = jwt.sign({ id, username, profileImageUrl }, process.env.SECRET_KEY);
      return res.status(200).json({ id, username, profileImageUrl, token });
    } else {
      return next({
        status:400,
        message: 'Invalid Email or Password'
      })
    }
  } catch (err) {
    return next({
      status:400,
      message: 'Invalid Email or Password'
    })
  }
}


exports.signup = async function(req, res, next) {
  try {
    //create user
    let user = await db.User.create(req.body);
    //create a token
    let {id, username, profileImageUrl} = user;
    let token = jwt.sign({ id, username, profileImageUrl }, process.env.SECRET_KEY);
    return res.status(200).json({id, username, profileImageUrl, token})
  } catch (err) {
    //what kind of error
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