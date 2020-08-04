const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const nocache = require("nocache");
const onHeaders = require("on-headers");

//Middlewares
app.use(cors());
app.use(bodyParser.json());

app.use(express.static(__dirname));

//Import Routes
const todosRoutes = require("./routes/todos");
app.use("/todos", todosRoutes);

const questionsRoutes = require("./routes/questions");
app.use("/questions", questionsRoutes);

const answersRoutes = require("./routes/answers");
app.use("/answers", answersRoutes);

// app.use((req, res, next) => {
//   res.set('Cache-Control', 'no-store')
//   next()
// })

app.use(nocache());

// install it as a middleware
// app.use((req, res, next) => {
//   // listen for the headers event
//   onHeaders(res, () => {
//       this.removeHeader('ETag');
//   });
// });

// app.set('etag', false);
// app.disable('view cache');

//ROUTES
app.get("/", (req, res) => {
  try {
    // res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.sendFile(__dirname + "/.well-known/apple-app-site-association");
  } catch (err) {
    console.log("Deu ruim ermao!");
    res.json({ message: err });
  }
  // res.sendFile(__dirname + '/index.html')
});

///.well-known/apple-app-site-association

app.get("/apple-info", async (req, res) => {
  const appleInfo = {
    applinks: {
      apps: [],
      details: [
        {
          appIDs: ["Z9M62WF3J6.com.taquesboringcompany.ABakersJourney"],
          components: ["*"],
        },
      ],
    },
  };
  const appInfo = {
    applinks: {
      details: [
        {
          appIDs: ["Z9M62WF3J6.com.taquesboringcompany.ABakersJourney"],
          components: ["*"],
        },
      ],
    },
    webcredentials: {
      apps: ["Z9M62WF3J6.com.taquesboringcompany.ABakersJourney"],
    },
  };
  try {
    // res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.sendFile(__dirname + "/.well-known/apple-app-site-association");
  } catch (err) {
    console.log("Deu ruim ermao!");
    res.json({ message: err });
  }
});

app.get("/testes", (req, res) => {
  res.json("{ 'teste' : 'dale' }");
});

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/test",
  { useUnifiedTopology: true },
  function (err, client) {
    if (client) {
      console.log("We're connected!");
    } else {
      console.error(err);
    }
  }
);

app.listen(process.env.PORT || 3002);
