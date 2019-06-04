/**
 * Message endpoint route definitions.
 */

'use strict';
module.exports = function (app) {
  const messageController = require('../controllers/message-controller');
  // Message Routes for search and create.

  //send message
  app.route('/user/:userId/message')
    .post(messageController.sendMessage);

  //get sent message
  app.route('/user/:userId/messages/sent')
    .get(messageController.getSentMessage);

  //get received message
  app.route('/user/:userId/messages/received')
    .get(messageController.getReceivedMessage);

  //get message by id
  app.route('/user/:userId/message/:messageId')
    .get(messageController.getMessagebyId);

};
