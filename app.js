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
  db = client.db();
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8000, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

app.use(express.json())

function createToDo(client, newToDo) {
  client.collection('todos').insertOne(newToDo)
    .then(result => {
      console.log(result)
    })
    .catch(error => console.error(error));
  // console.log(`${result.insertedCount} new todo(s) created with the following id(s):`);
  // console.log(result.insertedIds);
}

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
    console.log(db);
    console.log("Welcome to the app!");
})

app.post('/todo', function(req, res) {
  db.collection('todos').insertOne(req.body)
    .then(result => {
      console.log(result)
      res.send(`Object created successfully: ${result.insertedId}`)
    })
    .catch(error => {
      console.error(error)
      res.send(`Could not create object: ${error}`)
    });
})

