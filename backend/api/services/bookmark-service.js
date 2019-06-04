
'use strict';
const mongoose = require('mongoose'),
    Message = mongoose.model('users');
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

exports.delete = function (userId, bmId, callback) {
    let resultCallback = function (err, resultCollection) {
        throwError(err);
        callback('Removed');
    };
    //console.log('inside getById');
    Message.update({
        _id: mongoose.Types.ObjectId(userId)
    }, {

            $pull: {
                'bookmarklist': {
                    _id: mongoose.Types.ObjectId(bmId)
                }
            }
        }, resultCallback);
};

// exports.get
exports.get = function (userId, callback) {
    let resultCallback = function (err, message) {
        throwError(err);
        callback(message.bookmarklist);
    };
    Message.findById(userId, resultCallback);
};

// exports.post
exports.post = function (userId, bookmarkbody, callback) {
    let resultCallback = function (err, message) {
        throwError(err);
        if (message) {
            var filterd = message.bookmarklist.filter(
                function (bookmark) {
                    return bookmark.url == bookmarkbody.url;
                }
            );
            console.log(filterd);
            if (filterd.length != 0) {
                return callback(false);
            } else {
                Message.findOneAndUpdate({
                    _id: userId
                }, {
                        new: true,
                        "$push": {
                            "bookmarklist": {
                                _id: new ObjectID(),
                                tag: bookmarkbody.tag,
                                url: bookmarkbody.url
                            }
                        }
                    }, function (err) {
                        console.log(err);
                    });
                return callback(true);
            }
        }


    };
    Message.findById(userId, resultCallback);


};
