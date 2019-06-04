const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const uniqueValidator = require('mongoose-unique-validator');
/**
 * Mongoose schema for User.
 */
var UserSchema = new Schema({

  isowner: {
    type: Boolean,
    default: false
  },

  isadopter: {
    type: Boolean,
    default: false
  },

  email: {
    type: String,
    default: "",
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  lastname: {
    type: String,
    default: ""
  },

  firstname: {
    type: String,
    default: ""
  },

  gender: {
    type: String,
    default: ""
  },

  contact: {
    address1: {
      type: String,
      default: ""
    },
    address2: {
      type: String,
      default: ""
    },
    city: {
      type: String,
      default: ""
    },
    state: {
      type: String,
      default: ""
    },
    country: {
      type: String,
      default: ""
    },
    zip: {
      type: String,
      default: ""
    },
    phone: {
      type: String,
      default: ""
    }
  },

  bookmarklist: {
    type: [BookmarkSchema],
    default: []
  },

  sentmessage: {
    type: [MessageSchema],
    default: []
  },

  receivemessage: {
    type: [MessageSchema],
    default: []
  },

  petlist: {
    type: [PetSchema],
    default: []
  },
});

var PetSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  type: String,
  primarybreed: String,
  sex: String,
  age: String,
  imagelink: {
    type: Array,
    default: []
  },
  description: {
    type: String,
    default: 'empty'
  },
  posttime: {
    type: Date,
    default: Date.now
  }
});

var MessageSchema = mongoose.Schema({
  _id: Schema.Types.ObjectId,
  messagecontent: String,
  userto: String,
  userfrom: String,
  posttime: {
    type: Date,
    default: Date.now
  }
});

var BookmarkSchema = new Schema({
  _id: Schema.Types.ObjectId,
  tag: String,
  url: String

});
mongoose.model('messages', MessageSchema);
mongoose.model('bookmarks', BookmarkSchema);
mongoose.model('pets', PetSchema);
UserSchema.plugin(uniqueValidator);
const Account = module.exports = mongoose.model('users', UserSchema);
module.exports.getUserById = function (id, callback) {
  Account.findById(id, callback);
}

module.exports.getUserByUsername = function (email, callback) {
  const query = {
    email: email
  }
  Account.findOne(query, callback);
}

module.exports.addUserEnc = function (newAccount, callback) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newAccount.password, salt, (err, hash) => {
      if (err) throw err;
      newAccount.password = hash;
      newAccount.save(callback);
    });
  });
}

module.exports.comparePassword = function (candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if (err) throw err;
    callback(null, isMatch);
  });
}

module.exports.addUser = function (newAccount, callback) {
  newAccount.save(callback);
}
