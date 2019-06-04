const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Mongoose schema for Pet.
 */
let PetSchema = new Schema({
  ownerid: {
    type:String,
    required:true
  },
  name: {
    type:String,
    default:""
  },
  type: {
    type:String,
    default:""
  },
  primarybreed: {
    type:String,
    default:""
  },
  sex: {
    type:String,
    default:""
  },
  age: {
    type:String,
    default:""
  },
  contact: {
    phone: {
      type:String,
      default:""
    },
    state: {
      type:String,
      default:""
    },
    address1: {
      type:String,
      default:""
    },
    address2: {
      type:String,
      default:""
    },
    email: {
      type:String,
      default:""
    },
    city: {
      type:String,
      default:""
    },
    zip: {
      type:String,
      default:""
    },
    fax: {
      type:String,
      default:""
    }
  },
  imagelink: {
    type: Array,
    default: []
  },
  description: {
    type: String,
    default: ""
  }
});

module.exports = mongoose.model('pets', PetSchema);
