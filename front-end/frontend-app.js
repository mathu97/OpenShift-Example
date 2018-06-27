var express = require('express');
var path = require('path')

var app = express();

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname + '/main.html'))
})

app.listen(4000, () => {
    console.log("Front-end hosted On Port 4000")
});