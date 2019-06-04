const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Mongoose schema for User.
 */
let UserSchema = new Schema({
  lastname: {
    type: String,
    default:""
  } ,
  firstname: {
    type: String,
    default:""
  } ,
  gender: {
    type: String,
    default:""
  } ,//delete?
  location: {
    type: String,
    default:""
  } ,//delete?
  phone:  {
    type: String,
    default:""
  } ,
  address: {
    address1: {
      type: String,
      default:""
    },
    address2: {
      type: String,
      default:""
    },
    city: {
      type: String,
      default:""
    },
    state: {
      type: String,
      default:""
    },
    country: {
      type: String,
      default:""
    },
    zipcode: {
      type: String,
      default:""
    }
  }
});

module.exports = mongoose.model('users', UserSchema);
