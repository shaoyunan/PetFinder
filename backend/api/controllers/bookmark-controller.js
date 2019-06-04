/**
 * Controller for message endpoints.
 */

'use strict';
//import message service.
const bookmarkService = require('../services/bookmark-service');

/**
 * delete bookmark By  URL 
 * API: http://localhost/user/{userId}/bookmark/?url={url}
 */
exports.delete = function (request, response) {
    let callback = function (messages) {
        response.status(200);
        response.json(messages);
    };
    bookmarkService.delete(request.params._id,request.params.bmId,callback);
};

/**
 * Get bookmark list
 * Get
 * URL http://localhost/user/{userId}/bookmarks
 * Response: {
 *			Tag:string,
 *			url:string
 *  }
 */
exports.get = function(request,response){
    let callback = function (messages) {
        response.status(200);
        response.json(messages);
    };
    bookmarkService.get(request.params._id,callback);
};


/**
 * Post bookmark (查URL 是否重复）
 *  -POST
 *   -URL http://localhost/user/{userId}/bookmark
 *   - Body:{
 *       Tag:string,
 *       url:string
 *       }
 *   Response: {
 *               status: boolean
 *   }
 *   
 */

exports.post = function(request,response){
    let callback = function (message) {
        response.status(200);
        response.json({"status":message});
    };
    bookmarkService.post(request.params._id,request.body,callback);
};