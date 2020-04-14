var express = require('express')
var app = express()
app.use(express.json())

app.get('/', function(req, res) {
    res.send("hello, world")
})

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port, function() {
    console.log('App listening on PORT:', port)
});