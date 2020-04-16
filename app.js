const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

//Import Routes
const todosRoutes = require('./routes/todos');
app.use('/todos', todosRoutes);

//ROUTES
app.get('/', (req, res) => {
  res.send("Yay, we're home!")
})

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/test", { useUnifiedTopology: true }, function (err, client) {
  if (client) {
    console.log("We're connected!")
  } else {
    console.error(err);
  }
})

app.listen(process.env.PORT || 3000);


// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
// var db;

// Connect to the database before starting the application server.
// mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/test", function (err, client) {
//   if (err) {
//     console.log(err);
//     process.exit(1);
//   }

//   // Save database object from the callback for reuse.
//   db = client.db();
//   console.log("Database connection ready");

//   // Initialize the app.
//   var server = app.listen(process.env.PORT || 8000, function () {
//     var port = server.address().port;
//     console.log("App now running on port", port);
//   });
// });

// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/test", function(err, client) {
//   console.log("Connected!")
// })

// app.use(express.json())

// app.get('/', function(req, res) {
//   res.sendFile(__dirname + '/index.html');
//     console.log(db);
//     console.log("Welcome to the app!");
// })

// app.post('/todo', function(req, res) {
//   db.collection('todos').insertOne(req.body)
//     .then(result => {
//       console.log(result)
//       res.send(`Object created successfully: ${result.insertedId}`)
//     })
//     .catch(error => {
//       console.error(error)
//       res.send(`Could not create object: ${error}`)
//     });
// })

// app.post('/todos', function(req, res) {
//   db.collection('todos').insertMany(req.body)
//     .then(result => {
//       console.log(result);
//       res.send(`Object(s) created successfully: ${result.insertedIds}`)
//     })
//     .catch(error => {
//       console.error(error)
//       res.send(`Could not create object(s): ${error}`)
//     });
// })

// app.get('/todo', function(req, res) {
//   db.collection('todos').findOne({ title: req.body['title'] })
//     .then(result => {
//       console.log(result);
//       res.send(`Successfully found an object by the name: ${result.title}`);
//     })
//     .catch(error => {
//       console.error(error);
//       res.send(`Could not find any object by the title: ${req.body['title']}`);
//     })
// })

