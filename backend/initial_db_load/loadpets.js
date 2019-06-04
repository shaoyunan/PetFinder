var fs = require("fs");
var content =JSON.parse(fs.readFileSync("petsjson.json"));

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/finalprojectDB";


MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("finalprojectDB");
  try {
    dbo.collection("pets").drop(function(err, delOK) {
    if (delOK) console.log("Pets Collection deleted");
  });
  } catch (error) {
  }
  
  dbo.collection("pets").insertMany(content, function(err, res) {
    if (err) throw err;
    console.log("Number of documents inserted: " + res.insertedCount);
    db.close();
  });
});