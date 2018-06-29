var express = require('express');
var path = require('path')
var cors = require('cors');

var app = express();

var viewDest = String(__dirname)
app.use(express.static(viewDest + '/'));

app.use(cors());

app.get('/', function(req, res){
    res.sendFile(viewDest + '/main.html')
});

app.listen(4000, () => {
    console.log("Front-end hosted On Port 4000")
});