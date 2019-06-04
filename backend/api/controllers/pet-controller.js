/**
 * Controller for pet endpoints.
 */

'use strict';
//import pet service.
const mongoose = require('mongoose');
const petService = require('../services/pet-service');
const userService = require('../services/user-service');

/**
 * Returns a pet object in JSON.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.get = function (request, response) {
  let callback = function (pet) {
    response.status(200);
    response.json(pet);
  };
  petService.get(request.params.petId, callback);
};

exports.random = function (request, response) {
  var number = request.params.number;
  var count = 0;
  var pets = [];
  let callback = function (pet) {
    pets.push(pet);
    count += 1;
    if (count === parseInt(number)) {
      response.status(200);
      response.json(pets);
    }
    petService.random(callback);
  };
  petService.random(callback);
};

//Old codes above--------------------------------------------------------
//post pet
exports.postPet = function (request, response) {
  let callback = function (user) {
    response.status(200);
    response.json({
      status: true
    });
  };

  let callbackObj = function (user) {
    let newPet = {
      name: request.body.name,
      type: request.body.type,
      primarybreed: request.body.primarybreed,
      age: request.body.age,
      sex: request.body.sex,
      description: request.body.description,
      imagelink: [request.body.image],
      posttime: new Date()
    };

    petService.addPet(user, newPet, callback);
  };
  userService.get(request.params.userId, callbackObj);
};

//post pet
exports.updatePet = function (request, response) {
  let callback = function (user) {
    response.status(200);
    response.json({
      statuse: true
    });
  };

  let pet = {
    _id: mongoose.Types.ObjectId(request.params.petId),
    name: request.body.name,
    type: request.body.type,
    primarybreed: request.body.primarybreed,
    age: request.body.age,
    sex: request.body.sex,
    description: request.body.description,
    imagelink: [request.body.image]
  };

  petService.putPet(request.params.userId, pet, callback);
};

//get user own pets
exports.getUserPets = function (request, response) {
  let callback = function (user) {
    response.status(200);
    response.json(user.petlist);
  };
  petService.get(request.params.userId, callback);
};

//get pet by id
exports.getPetbyId = function (request, response) {
  let callback = function (resultCollection) {
    response.status(200);
    response.json(resultCollection[0].petlist[0]);
  };
  petService.getById(request.params.petId, callback);
};

//delete pet by id
exports.deletePetbyId = function (request, response) {
  let callback = function (resultCollection) {
    response.status(200);
    response.json({
      status: true
    });
  };
  petService.deletePetbyId(request.params.userId, request.params.petId, callback);
};


//LATER
exports.searchPet = function (request, response) {
  function compareA(a,b) {
    let timeA = Date.parse(a.posttime);
    let timeB = Date.parse(b.posttime);
    if (timeA > timeB)
      return -1;
    if (timeA < timeB )
      return 1;
    return 0;
  }
  function compareB(a,b) {
    let timeA = Date.parse(a.posttime);
    let timeB = Date.parse(b.posttime);
    if (timeA < timeB)
      return -1;
    if (timeA > timeB)
      return 1;
    return 0;
  }
  let callback = function (pets) {
    //console.log('pets:'+JSON.stringify(pets));
    if(request.query.sort){
      if(request.query.sort =='recently_added'){
        pets.sort(compareA);
      }
      else if(request.query.sort =='longest_available'){
        pets.sort(compareB)
      }
    }

    response.status(200);
    response.json(pets);
  };
  let filter = {};
  if (request.query.type) {
    filter.type =request.query.type;
  }
  if (request.query.primarybreed) {
    filter.primarybreed = request.query.primarybreed;
  }
  if (request.query.sex) {
    filter.sex =request.query.sex;
  }
  if (request.query.age) {
    filter.age = request.query.age;
  }
  if (request.query.location) {
    filter.location = request.query.location;
  }
   petService.searchPets(filter, callback);
};





exports.searchPetByKeyword = function (request, response) {

  let callback = function (pets) {

    response.status(200);
    response.json(pets);
  };
  let filter = {};
  if (request.query.keyword) {
    console.log(request.query.keyword);
    filter.keyword =request.query.keyword;
  }
   petService.searchPetByKeyword(filter, callback);
};










exports.getrandom = function (request, response) {
  let callback = function (user) {
      response.status(200);
      response.json(user.petlist);
  };
  petService.getrandom(callback);
};

exports.getOwnerIdByPetid = function(request,response){
  let callback = function (ownerId) {
    response.status(200);
    response.json(ownerId);
};
petService.getOwnerIdByPetid(request.params.petid,callback);

};

exports.getOwnerLocationByPetid= function(request,response){
  let callback = function (location) {
    var coordinate;
    try {
      //console.log('location'+ JSON.stringify(location));
      coordinate = {lat:location[0].geometry.location.lat,
    lng:location[0].geometry.location.lng,
    location:location.location
    };
    } catch (error) {
      console.log('GeoCode err:'+error);
      coordinate = {Lat:'',
      lng:''
      };
    }
    response.status(200);
    response.json(coordinate);
};
petService.getOwnerLocationByPetid(request.params.petid,callback);

};




