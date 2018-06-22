var express = require('express');
var mysql = require('mysql');

var app = express();

var con = mysql.createConnection({
    host: "172.30.160.93",
    port: "3306",
    user: "user1",
    password: "mypa55",
    database: "testdb"
});

con.connect(function(err){
    if (err) throw err;
    console.log("Connected!");
});

app.post('/createtable', function(req, res) {
    var sql = "CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))";
    con.query(sql, function (err, result) {
        if (err) { 
            res.json({'Table Created': false})
            throw err;
        }
        console.log("Table created");
        res.json({'Table Created': true})
      });

});

app.post('/deleteTable', function(req, res){
    var sql = "DROP TABLE customers";
    con.query(sql, function (err, result) {
        if (err) {
            res.json({'Table Dropped' : false})
            throw err
        };
        console.log("Table deleted");
        res.json({'Table Dropped': true})
    });
});

app.listen(3000, () => {
    console.log("Server Listening On Port 3000")
});