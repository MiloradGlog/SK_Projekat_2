var express = require('express');
var mysql = require('mysql');


var app = express();



app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "football_db"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("konekcija uspesna");
});


//sql test
app.get('/sqltest', function (req, res) {
    con.query(leaderboardQuery, function (err, result, fields) {
        if (err) throw err;
        res.send(result);
        console.log("poslao leaderboard");
    });
})


app.get('/group', function (req, res) {
    var result = "grupa je vracena";
    res.send(result)
})

app.get('/all', function (req, res) {
    var result = "sve je vraceno";
    res.send(result)
})


var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Listening at http://%s:%s", host, port)
})
