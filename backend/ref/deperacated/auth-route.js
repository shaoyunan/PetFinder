'use strict';
module.exports = function (app) {
    const express = require('express');
    //const router = express.Router();
    const passport = require('passport');
    const jwt = require('jsonwebtoken');
    const config = require('../config/database');
    const Account = require('../models/account');

    // Register
    app.post('/register', (req, res, next) => {
        let newAccount = new Account({
            //name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            //userid: req.body.userid
        });

        Account.addUser(newAccount, (err, user) => {
            if (err) {
                res.json({ success: false, msg: 'Failed to register user' });
            } else {
                res.json({ success: true, msg: 'Account registered' });
            }
        });
    });

    // Authenticate
    app.post('/authenticate', (req, res, next) => {
        const username = req.body.username;
        const password = req.body.password;

        Account.getUserByUsername(username, (err, user) => {
            if (err) throw err;
            if (!user) {
                return res.json({ success: false, msg: 'Account not found' });
            }

            Account.comparePassword(password, user.password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    const token = jwt.sign({ data: user }, config.secret, {
                        expiresIn: 604800 // 1 week
                    });

                    res.json({
                        success: true,
                        token: `${token}`,
                        user: {
                            id: user._id,
                            //name: user.name,
                            username: user.username,
                            email: user.email
                        }
                    });
                } else {
                    return res.json({ success: false, msg: 'Wrong password' });
                }
            });
        });
    });

    // Profile
    app.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
        res.json({ user: req.user });
    });

    //module.exports = router;
};