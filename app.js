const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

//Middlewares
app.use(cors());
app.use(bodyParser.json());

// app.use(express.static(__dirname));

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

app.get('/.well-known/apple-app-site-association', async (req, res) => {
  const appleInfo = {
      "applinks": {
          "apps": [],
          "details": [
              {
                  "appIDs": ["Z9M62WF3J6.com.taquesboringcompany.ABakersJourney"],
                  "components": ["*"],
              }
          ]
      }
  }
  const appInfo = {
    "applinks": {
        "details": [
             {
               "appIDs": [ "Z9M62WF3J6.com.taquesboringcompany.ABakersJourney"],
               "components": ["*"]
             }
         ]
     },
     "webcredentials": {
        "apps": [ "Z9M62WF3J6.com.taquesboringcompany.ABakersJourney" ]
     }
}
  try {
      console.log(__dirname + '/.well-knwon/apple-app-site-association');
      // res.json(appleInfo);
      res.send(path.join(__dirname, '/.well-knwon/apple-app-site-association'));
  } catch(err) {
      console.log("Deu ruim ermao!");
      res.json({message: err});
  }
  
})

app.get('/teste', (req, res) => {
  res.json("{ 'teste' : 'dale' }")
})

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/test", { useUnifiedTopology: true }, function (err, client) {
  if (client) {
    console.log("We're connected!")
  } else {
    console.error(err);
  }
})

app.listen(process.env.PORT || 3000);

