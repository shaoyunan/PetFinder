/**
 * Controller for pet endpoints.
 */

'use strict';
//import pet service.
const mongoose = require('mongoose');
const userService = require('../services/user-service');
const messageService = require('../services/message-service');

//Old codes above--------------------------------------------------------

//post message
exports.sendMessage = function (request, response) {
  let callback = function (user) {
    response.status(200);
    response.json({
      status: true
    });
  };

  let callbackObj = function (user) {
    let newMsg = {
      messagecontent: request.body.messagecontent,
      userto: request.body.receiverid,
      posttime: new Date
    };

    messageService.sendMessage(user, newMsg, callback);
  };
  userService.get(request.params.userId, callbackObj);
};

//get sent message
exports.getSentMessage = function (request, response) {
  let callback = function (user) {
    response.status(200);
    response.json(user.sentmessage);
  };
  userService.get(request.params.userId, callback);
};

//get received message
exports.getReceivedMessage = function (request, response) {
  let callback = function (user) {
    response.status(200);
    response.json(user.receivemessage);
  };
  userService.get(request.params.userId, callback);
};

//get message by id
exports.getMessagebyId = function (request, response) {

  let callback = function (resultCollection) {
    if (resultCollection[0]) {
      response.status(200);
      response.json(resultCollection[0].sentmessage[0]);
    }else{
      response.status(200);
      response.json({status: 'nothing found'});
    }
  };

  let sentCallback = function (resultCollection) {
    if (resultCollection[0]) {
      response.status(200);
      response.json(resultCollection[0].receivemessage[0]);
    } else {
      messageService.getSentById(request.params.messageId, callback);
    }
  };

  messageService.getRecById(request.params.messageId, sentCallback);
};
