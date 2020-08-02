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

const questionsRoutes = require('./routes/questions');
app.use('/questions', questionsRoutes)

const answersRoutes = require('./routes/answers');
app.use('/answers', answersRoutes);

//ROUTES
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.get('/.well-known/apple-app-site-associate', async (req, res) => {
  const appleInfo = {
      "applinks": {
          "apps": [],
          "details": [
              {
                  "appID": "Q7TRVLH49F.com.taquesboringcompany.ABakersJourney",
                  "paths": ["*"],
              }
          ]
      }
  }
  try {
      res.json(appleInfo);
  } catch(err) {
      console.log("Deu ruim ermao!");
      res.json({message: err});
  }
  
})

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/test", { useUnifiedTopology: true }, function (err, client) {
  if (client) {
    console.log("We're connected!")
  } else {
    console.error(err);
  }
})

app.listen(process.env.PORT || 3000);

