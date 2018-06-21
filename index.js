var expresss = require('express');
var mysql = require('mysql');

var app = express();

var con = mysql.createConnection({
    host: "127.0.0.1",
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
        if (err) throw err;
        console.log("Table created");
      });
});

app.listen(3000, () => {
    console.log("Server Listening On Port 3000")
});