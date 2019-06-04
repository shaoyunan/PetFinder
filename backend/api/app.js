'use strict';
module.exports = function (app) {

    //Initialize routes
    let userRoutes = require('./routes/user-route');
    let petRoutes = require('./routes/pet-route');
    let messageRoutes = require('./routes/message-route');
    let authRoutes = require('./routes/auth-route');
    let bookmarkRoutes =require('./routes/bookmark-route');
    //bind routes to app
    userRoutes(app);
    authRoutes(app);
    petRoutes(app);
    messageRoutes(app);
    bookmarkRoutes(app);
   
};