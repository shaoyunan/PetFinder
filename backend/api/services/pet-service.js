
/**
 * Service for pet operations.
 */

'use strict';
const mongoose = require('mongoose');

const  User = mongoose.model('users');

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

/**
 * Returns the user object matching the id.
 *
 * @param {string} userId {Id of the user object}
 * @param {function} callback {Sucess callback function}
 */
exports.get = function (userId, callback) {
  let resultCallback = function (err, user) {
    throwError(err);
    callback(user);
  };
  User.findById(userId, resultCallback);
};

//add new pet to user by userid
exports.addPet = function (user, pet, callback) {
  let resultCallback = function (err, user) {
    throwError(err);
    callback(user);
  };
  User.findOneAndUpdate({
    _id: user.id
  }, {
    new: true,
    "$push": {
      "petlist": {
        _id: new ObjectID(),
        name: pet.name,
        type: pet.type,
        primarybreed: pet.primarybreed,
        age: pet.age,
        sex: pet.sex,
        description: pet.description,
        imagelink: pet.imagelink,
        posttime: pet.posttime
      }
    }
  }, resultCallback);
};

//update pet by userid
exports.putPet = function (userid, pet, callback) {
  let resultCallback = function (err, user) {
    throwError(err);
    callback(user);
  };
  User.findOneAndUpdate({
    _id: userid,
    'petlist._id': pet._id
  }, {
    new: true,
    "$set": {
      "petlist.$": pet
    }
  }, resultCallback);
};


exports.getrandom = function(callback){
  let callbackRandom = function(err,user){
    throwError(err);
    callback(user[Math.floor(Math.random()*user.length)]);
  };
 User.find({"petlist.4": { $exists: true }},'petlist',callbackRandom);
};
exports.getById = function (petId, callback) {

  let resultCallback = function (err, resultCollection) {
    throwError(err);
    callback(resultCollection);
  };
  //console.log('inside getById');
  User.find({
    'petlist._id': mongoose.Types.ObjectId(petId)
  }, {
    'petlist.$': 1
  }, resultCallback);

};

//pull pet from petlist with petid
exports.deletePetbyId = function (userId, petId, callback) {

  let resultCallback = function (err, resultCollection) {
    throwError(err);
    callback(resultCollection);
  };
  //console.log('inside getById');
  User.update({
    _id: mongoose.Types.ObjectId(userId)
  }, {

    $pull: {
      'petlist': {
        _id: mongoose.Types.ObjectId(petId)
      }
    }
  }, resultCallback);

};




//LATER -------------------------------------------------
exports.searchPets = function (filter, callback) {
  //console.log('filter:'+filter);
  
  let resultCallback = function (err, pets) {
    throwError(err);

    //console.log('got pets: '+pets);
    var result=[]
    for(let a of pets){
      //console.log("a:"+a)
      result = result.concat(a.petlist.filter(
        function(pet){
            for(var property in filter){
              if (filter.hasOwnProperty(property)){
                if(property =='location'){continue;}
              if(filter[property]!=pet[property]) {
                  return false;
              }else{
              }
            }
            }
           return true;
           }
          ));
    }
   //console.log('result:'+JSON.stringify(result));
    callback(result);
  };
 if(filter.location){
   //console.log(filter.location);
  User.find({$where: '(this.petlist.length > 0)',"contact.city":{$eq:filter.location}}, 
  "petlist", resultCallback);
 }else{
   User.find({$where: '(this.petlist.length > 0)'}, 
    "petlist", resultCallback);
 }
  
};

exports.searchPetByKeyword =function (filter, callback) {
  let resultCallback = function (err, pets) {
    throwError(err);

    var result=[]
   
    for(let a of pets){
      result = result.concat(a.petlist.filter(
        function(pet){
          //console.log(String(pet.name)+' '+String(filter.keyword));
        if(String(pet.name).includes(String(filter.keyword) ) || 
        String(pet.description).includes(String(filter.keyword))
        ){
             return true;
        }else{
          return false;
        }
        }
      ));
    };
    callback(result);
  };
  User.find({$where: '(this.petlist.length > 0)'}, 
    "petlist", resultCallback);
};


exports.getOwnerIdByPetid=function (petid, callback) {
  let resultCallback = function (err, resultCollection) {
    throwError(err);
    if(resultCollection[0]){
     callback(resultCollection[0]);}
    else{
      callback('Owner Not Found');
     }
  };

  User.find({'petlist._id':ObjectID(petid)}, '_id',
   resultCallback);
};


exports.getOwnerLocationByPetid=function (petid, callback) {
  let resultCallback = function (err, result) {
    throwError(err);
    if(result[0]){
   var location = {location:
    result[0].contact.address1+' '
    +result[0].contact.address2+' '
    +result[0].contact.city+' '
    +result[0].contact.state+' '
    +result[0].contact.zip
       };

var googleMapsClient = require('@google/maps').createClient({
        key: 'AIzaSyDZkg5PC6seKByVvyizkcFsHTZXr7XMHPY',
        Promise: Promise
      });
 googleMapsClient.geocode({address: location.location})
      .asPromise()
      .then((response) => {
        response.json.results.location = location.location;
        callback(response.json.results);
     })
      .catch((err) => {
        console.log(err);
      });
    }
    else{
      callback({location:
        'OwnerNotFound'});
     }
  };

  User.find({'petlist._id':ObjectID(petid)}, 'contact',
   resultCallback);
};