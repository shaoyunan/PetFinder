const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Mongoose schema for Message.
 */
let MessageSchema = new Schema({

  content: String,
  fromid: String,
  toid: String,
  create_date: {
    type: Date,
    default: Date.now
  },
  modified_date:{
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('messages', MessageSchema);
