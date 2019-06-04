/**
 * Service for user operations.
 */

'use strict';
const mongoose = require('mongoose'),
    User = mongoose.model('users');

/**
 * Throws error if error object is present.
 *
 * @param {Object} error {Error object}
 */
let throwError = function (error) {
    if (error) {
        throw Error(error);
    }
};

/**
 * Returns an array of user object matching the search parameters.
 *
 * @param {Object} params {Search parameters}
 * @param {function} callback {Sucess callback function}
 */
exports.search = function (params, callback) {
    let resultCallback = function (err, users) {
        throwError(err);
        callback(users);
    };
    User.find(params, resultCallback);
};

/**
 * Saves and returns the new user object.
 *
 * @param {Object} user {user object}
 * @param {function} callback {Sucess callback function}
 */
exports.save = function (user, callback) {
    let newUser = new User(user),
        resultCallback = function (err, user) {
            throwError(err);
            callback(user);
    };
    newUser.save(resultCallback);
};

/**
 * Returns the user object matching the id.
 *
 * @param {string} userId {Id of the user object}
 * @param {function} callback {Sucess callback function}
 */
exports.getProfile = function (userId, callback) {
    let resultCallback = function (err, user) {
        throwError(err);
        callback(user);
    };
    User.findById(userId, '_id firstname lastname contact.phone contact.address1 contact.address2 contact.city contact.state contact.zip', resultCallback);
};

exports.get = function (userId, callback) {
    let resultCallback = function (err, user) {
        throwError(err);
        callback(user);
    };
    User.findById(userId, resultCallback);
};

/**
 * Updates and returns the user object.
 *
 * @param {Object} user {user object}
 * @param {function} callback {Sucess callback function}
 */
exports.update = function (user, callback) {
    let resultCallback = function (err, user) {
        throwError(err);
        callback(user);
    };
    User.findOneAndUpdate({
      _id: user._id
    }, user, {
        new: true,
        upsert:true
    }, resultCallback);
};

exports.updateProfile = function (user, callback) {
    let resultCallback = function (err, user) {
        throwError(err);
        callback(user);
    };

    User.findOneAndUpdate({
      _id: user._id
    }, user, {
        new: true,
    }, resultCallback);
};
/**
 * Deletes the user object matching the id.
 *
 * @param {string} userId {Id of the user object}
 * @param {function} callback {Sucess callback function}
 */
exports.delete = function (userId, callback) {
    let resultCallback = function (err, user) {
        throwError(err);
        callback();
    };
    User.remove({
        _id: userId
    }, resultCallback);
};

exports.find = function (condition,filter, callback) {
    let resultCallback = function (err, user) {
        throwError(err);
        callback(user);
    };
    User.find(condition,filter, resultCallback);
};