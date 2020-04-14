var express = require('express')
var app = express()
app.use(express.json())
let port = 3000;

app.get('/', function(req, res) {
    res.send("hello, world")
})

app.listen(3000, function() {
    console.log('App listening on PORT: $0', port)
}) 