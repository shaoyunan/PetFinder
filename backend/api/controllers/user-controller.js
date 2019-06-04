/**
 * Controller for user endpoints.
 */

'use strict';
//import user service.
const userService = require('../services/user-service');
/**
 * Returns a list of users in JSON based on the
 * search parameters.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.list = function (request, response) {
  let callback = function (users) {
    response.status(200);
    response.json(users);
  };
  userService.search({}, callback);
};

/**
 * Creates a new user with the request JSON and
 * returns user JSON object.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.post = function (request, response) {
  let newUser = Object.assign({}, request.body),
    callback = function (user) {
      response.status(200);
      response.json(user);
    };
  userService.save(newUser, callback);
};

/**
 * Returns a user object in JSON.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.getProfile = function (request, response) {
  let callback = function (user) {
    let result = {
      firstname: user.firstname,
      lastname: user.lastname,
      phone: user.contact.phone,
      address1: user.contact.address1,
      address2: user.contact.address2,
      state: user.contact.state,
      city: user.contact.city,
      zip: user.contact.zip
    };
    response.status(200);
    response.json(result);
  };
  userService.getProfile(request.params.userId, callback);
};
exports.get = function (request, response) {
  let callback = function (user) {

    response.status(200);
    response.json(user);
  };
  userService.get(request.params.userId, callback);
};
/**
 * Updates and returns a user object in JSON.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.put = function (request, response) {
  let user = Object.assign({}, request.body),
    callback = function (user) {
      response.status(200);
      response.json(user);
    };
  user._id = request.params.userId;
  userService.update(user, callback);
};

exports.putProfile = function (request, response) {

  var oldUser;

  let callback = function (user) {
    let result = {
      firstname: user.firstname,
      lastname: user.lastname,
      phone: user.contact.phone,
      address1: user.contact.address1,
      address2: user.contact.address2,
      state: user.contact.state,
      city: user.contact.city,
      zip: user.contact.zip
    };
    response.status(200);
    response.json(result);
  };

  let callbackObj = function (user) {
    oldUser = user;
    oldUser.firstname = request.body.firstname;
    oldUser.lastname = request.body.lastname;
    oldUser.contact.phone = request.body.phone;
    oldUser.contact.address1 = request.body.address1;
    oldUser.contact.address2 = request.body.address2;
    oldUser.contact.state = request.body.state;
    oldUser.contact.city = request.body.city;
    oldUser.contact.zip = request.body.zip;
    userService.updateProfile(oldUser, callback);
  };
  userService.get(request.params.userId, callbackObj);
  
};
/**
 * Deletes a user object.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.delete = function (request, response) {
  let callback = function (user) {
    response.status(200);
    response.json({
      message: 'user Successfully deleted'
    });
  };
  userService.delete(request.params.userId, callback);
};

exports.getEmailById = function(request,response) {
  let callback = function (email) {
try {
  response.status(200);
    response.json({'email':email[0].email});
} catch (error) {
  response.status(404);
    response.json({'email':'not_existed_user'});
}
    
  };
  userService.find({'_id':request.params.userId},'email',callback);
};
