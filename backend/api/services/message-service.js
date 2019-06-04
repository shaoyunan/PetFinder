/**
 * Service for message operations.
 */

'use strict';
const mongoose = require('mongoose'),
  User = mongoose.model('users');
var ObjectID = require('mongodb').ObjectID;

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
 * Returns an array of message object matching the search parameters.
 *
 * @param {Object} params {Search parameters}
 * @param {function} callback {Sucess callback function}
 */
exports.search = function (params, callback) {
  let resultCallback = function (err, messages) {
    throwError(err);
    callback(messages);
  };
  Message.find(params, resultCallback);
};

/**
 * Saves and returns the new message object.
 *
 * @param {Object} message {Message object}
 * @param {function} callback {Sucess callback function}
 */
exports.save = function (message, callback) {
  let newMessage = new Message(message),
    resultCallback = function (err, message) {
      throwError(err);
      callback(message);
    };
  newMessage.save(resultCallback);
};

/**
 * Returns the message object matching the id.
 *
 * @param {string} messageId {Id of the message object}
 * @param {function} callback {Sucess callback function}
 */
exports.get = function (messageId, callback) {
  let resultCallback = function (err, message) {
    throwError(err);
    callback(message);
  };
  Message.findById(messageId, resultCallback);
};

/**
 * Updates and returns the message object.
 *
 * @param {Object} message {Message object}
 * @param {function} callback {Sucess callback function}
 */
exports.update = function (message, callback) {
  let resultCallback = function (err, message) {
    throwError(err);
    callback(message);
  };
  message.modified_date = new Date();
  Message.findOneAndUpdate({
    _id: message._id
  }, message, {
    new: true
  }, resultCallback);
};

/**
 * Deletes the message object matching the id.
 *
 * @param {string} messageId {Id of the message object}
 * @param {function} callback {Sucess callback function}
 */
exports.delete = function (messageId, callback) {
  let resultCallback = function (err, message) {
    throwError(err);
    callback();
  };
  Message.remove({
    _id: messageId
  }, resultCallback);
};

//old codes above
//add new pet to user by userid
exports.sendMessage = function (user, message, callback) {
  var idstring = user._id.toString();
  let resultCallback = function (err, user) {
    throwError(err);
    callback(user);
  };

  let sendCallback = function () {
    User.findOneAndUpdate({
      _id: mongoose.Types.ObjectId(message.userto)
    }, {
      new: true,
      "$push": {
        "receivemessage": {
          _id: new ObjectID(),
          messagecontent: message.messagecontent,
          posttime: message.posttime,
          userfrom: idstring
        }
      }
    }, resultCallback);
  };

  User.findOneAndUpdate({
    _id: user.id
  }, {
    "$push": {
      "sentmessage": {
        _id: new ObjectID(),
        messagecontent: message.messagecontent,
        userto: message.userto,
        posttime: message.posttime
      }
    }
  }, sendCallback);
};

exports.getSentById = function (messageId, callback) {
  let resultCallback = function (err, resultCollection) {
    throwError(err);
    callback(resultCollection);
  };
  User.find({
    'sentmessage._id': mongoose.Types.ObjectId(messageId)
  }, {
    'sentmessage.$': 1
  }, resultCallback);
};

exports.getRecById = function (messageId, callback) {
  let resultCallback = function (err, resultCollection) {
    throwError(err);
    callback(resultCollection);
  };
  User.find({
    'receivemessage._id': mongoose.Types.ObjectId(messageId)
  }, {
    'receivemessage.$': 1
  }, resultCallback);
};
