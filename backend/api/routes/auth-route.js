'use strict';
module.exports = function (app) {
  //const express = require('express');
  //const router = express.Router();
  const passport = require('passport');
  const jwt = require('jsonwebtoken');
  const config = require('../config/database');
  const Account = require('../models/user');

  // Register
  app.post('/user/register', (req, res, next) => {

    let newAccount = new Account({
      email: req.body.email,
      password: req.body.password,
      isowner: false,
      isadopter: false
    });
    if (req.body.isowner==='true' || req.body.isowner===true) {
      newAccount.isowner = true;
    }
    if (req.body.isowner==='false' || req.body.isowner===false) {
      newAccount.isadopter = true;
    }
    Account.addUserEnc(newAccount, (err, user) => {
      if (err) {
        res.json({
          status: false,
          msg: 'Email already exists'
        });
      } else {
        res.json({
          status: true,
          msg: 'Account registered'
        });
      }
    });
  });

  // Authenticate
  app.post('/user/login', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    Account.getUserByUsername(email, (err, user) => {
      if (err) throw err;
      if (!user) {
        return res.json({
          status: false,
          msg: 'Account not found'
        });
      }
      //use .comparePassword if storing encrypted password. disabled for testing convinience
      Account.comparePassword(password, user.password, (err, isMatch) => {
        if (err) {
          return res.json({
            status: false,
            msg: 'Invalid Password'
          });
        }
        if (isMatch) {
          const token = jwt.sign({
            data: user
          }, config.secret, {
            expiresIn: 604800 // 1 week
          });

          res.json({
            status: true,
            isowner: user.isowner,
            _id: user._id,
            email: user.email,
            token: `${token}`

          });
        } else {
          return res.json({
            status: false,
            msg: 'Wrong password'
          });
        }
      });
    });
  });

  // Profile
  app.get('/profile', passport.authenticate('jwt', {
    session: false
  }), (req, res, next) => {
    res.json({
      user: req.user
    });
  });

  //module.exports = router;
};
