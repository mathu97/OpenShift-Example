var express = require('express');
var mysql = require('mysql');

var app = express();

var con = mysql.createConnection({
    host: "172.30.142.136",
    port: "3306",
    user: "user1",
    password: "mypa55",
    database: "testdb"
});

app.get('/', function(req, res){
    res.send('hello')
})
app.get('/connect', function(req, res){

    con = mysql.createConnection({
        host: req.query.databaseIP,
        port: "3003",
        user: "user1",
        password: "mypa55",
        database: "testdb"
    });
    console.log({hello: req.query.databaseIP});
    con.connect(function(err){
        if (err) throw err;
        console.log("Connected!");
        res.json({'Connected': true})
    });
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