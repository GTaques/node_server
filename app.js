const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

//Middlewares
app.use(cors());
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

