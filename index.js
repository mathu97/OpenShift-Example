var express = require('express');
var mysql = require('mysql');
var cors = require('cors');

var app = express();
var viewDest = String(__dirname)

app.use(cors())

var con = mysql.createConnection({
    host: "172.30.142.136",
    port: "3306",
    user: "user1",
    password: "mypa55",
    database: "testdb"
});

app.get('/connect', function(req, res){

    con = mysql.createConnection({
        host: req.query.databaseIP,
        port: req.query.databasePort,
        user: "user1",
        password: "mypa55",
        database: "testdb"
    });
    console.log({hello: req.query.databaseIP});
    con.connect(function(err){
        if (err){
            res.send({'Connected': false})
            throw err;
        }
        res.json({'Connected': true})
    });
});

app.post('/createtable', function(req, res) {
    var sql = "CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))";
    con.query(sql, function (err, result) {
        if (err) { 
            res.send({'tableCreated': false})
            throw err;
        }
        console.log("Table created");
        res.json({'tableCreated': true})
      });

});

app.post('/addRow', function(req, res) {
    var sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
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