module.exports= function(app){
    var bookMarkController = require('./../controllers/bookmark-controller');
    app.route('/user/:_id/bookmark/:bmId')
       .delete(bookMarkController.delete);
   app.route('/user/:_id/bookmark')
       .post(bookMarkController.post); 
    app.route('/user/:_id/bookmarks')
       .get(bookMarkController.get);

    
};