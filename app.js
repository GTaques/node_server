var express = require('express');
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var CONTACTS_COLLECTION = "contacts";

var app = express();
app.use(bodyParser.json());

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/test", function (err, client) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = client.db('done_it');
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8000, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

app.use(express.json())

app.get('/', function(req, res) {
    res.send("Seja bem vindo ")
    console.log(db);
    console.log("Welcome to the app!");
})

app.post('/todo', function(req, res) {
  createToDo(db, req.body)
})

async function createToDo(client, newToDo) {
  const result = await db.collection('todos').insertOne(newToDo);
  console.log(`${result.insertedCount} new todo(s) created with the following id(s):`);
  console.log(result.insertedIds);
}