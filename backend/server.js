let express = require('express'),
    app = express(),
    port = process.env.PORT || 4000,
    mongoose = require('mongoose'), //created model loading here
    bodyParser = require('body-parser'),
    passport = require('passport');

// mongoose instance connection url connection
mongoose.connect('mongodb://localhost:27017/finalprojectDB', {
    //useMongoClient: true
});
mongoose.Promise = global.Promise;
app.use(bodyParser.json());
//Adding body parser for handling request and response objects.
app.use(bodyParser.urlencoded({
    extended: true
}));


//Enabling CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    next();
});

app.use(passport.initialize());
app.use(passport.session());
require('./api/config/passport')(passport);

//app.use('.api//users', accounts);
//Initialize app
let initApp = require('./api/app');
initApp(app);

app.listen(port,()=>{
    console.log(`RESTful API Server started on port ${port}`);
});