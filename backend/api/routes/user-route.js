/**
 * User endpoint route definitions.
 */

'use strict';
module.exports = function (app) {
    const userController = require('../controllers/user-controller');
    
    // User Routes for get, update and delete.
    app.route('/user/profile/:userId')
        .get(userController.getProfile)//get user profile by id
        .put(userController.putProfile);//update user profile by id
    app.route('/user/email/:userId')
    .get(userController.getEmailById);
};
