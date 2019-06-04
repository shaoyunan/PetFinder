'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const uniqueValidator = require('mongoose-unique-validator');
//const passportLocalMongoose = require('passport-local-mongoose');

let AccountSchema = new Schema({
  username: {
    type: String,
    required: true, 
    unique: true
    //required: [true, 'username required']
  },
  password: String,
  account_type: {
    isAdopter: {
      type: Boolean,
      default: true
    },
    isOwner: {
      type: Boolean,
      default: true
    }
  },
  userid: Number,
  email: String
});

//AccountSchema.plugin(passportLocalMongoose);
AccountSchema.plugin(uniqueValidator);
const Account = module.exports = mongoose.model('accounts', AccountSchema);

module.exports.getUserById = function(id, callback){
  Account.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback){
  const query = {username: username}
  Account.findOne(query, callback);
}

module.exports.addUser = function(newAccount, callback){
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newAccount.password, salt, (err, hash) => {
      if(err) throw err;
      newAccount.password = hash;
      newAccount.save(callback);
    });
  });
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  });
}