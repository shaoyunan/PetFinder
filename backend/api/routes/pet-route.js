/**
 * Pet endpoint route definitions.
 */

'use strict';
module.exports = function (app) {
  const petController = require('../controllers/pet-controller');

    //Post Pet
    app.route('/user/:userId/pet')
    .post(petController.postPet);

    //update pet
    app.route('/user/:userId/pet/:petId')
    .put(petController.updatePet);

    //search pet and sort
    app.route('/pets/search')
    .get(petController.searchPet);

    //search pet by keyword.
    app.route('/pets/searchbykeyword')
    .get(petController.searchPetByKeyword);

    //get random pets
    app.route('/pets/random').get(petController.getrandom);

    //get pets by userid
    app.route('/user/:userId/pet')
    .get(petController.getUserPets);

    //get pet by id
    app.route('/pet/:petId')
    .get(petController.getPetbyId);

    //delete pet by id
    app.route('/user/:userId/pet/:petId')
    .delete(petController.deletePetbyId);

    //get owner id by pet id
    app.route('/pet/:petid/owner')
    .get(petController.getOwnerIdByPetid);

    //get owner id by pet id
    app.route('/pet/:petid/ownerlocation')
    .get(petController.getOwnerLocationByPetid);
};
