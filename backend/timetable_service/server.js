var express = require('express');
var mysql = require('mysql');


var app = express();


var searchAllQuery = "SELECT predavanja.naziv_predmeta, ucionice.naziv_ucionice, dani.naziv_dana, grupe.naziv_grupe\n" +
    "FROM predavanja \n" +
    "JOIN ucionice ON predavanja.id_ucionica = ucionice.id_ucionica \n" +
    "JOIN dani ON predavanja.id_dan = dani.id_dan\n" +
    "JOIN grupe ON predavanja.id_grupa = grupe.id_grupa;";

var getGroupsQuery = "SELECT naziv_grupe FROM grupe";
var getClassroomsQuery = "SELECT naziv_ucionice FROM ucionice";


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "timetable_database"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("konekcija uspesna");
});


//sql test
app.get('/search/all', function (req, res) {
    con.query(searchAllQuery, function (err, result, fields) {
        if (err) throw err;
        res.send(result);
        console.log("poslao leaderboard");
    });
})


app.get('/search/group', function (req, res) {
    console.log("group request", req.query.group_name);
    con.query(searchAllQuery, function (err, result, fields) {
        if (err) throw err;
        res.send(req.query.group_name);
        console.log("group request", req.query.group_name);
        console.log("poslao leaderboard");
    });
})

app.get('/retrieve/groups', function (req, res) {
    con.query(getGroupsQuery, function (err, result, fields) {
        if (err) throw err;
        res.send(result);
        console.log("poslao leaderboard");
    });
})

app.get('/retrieve/classrooms', function (req, res) {
    con.query(getClassroomsQuery, function (err, result, fields) {
        if (err) throw err;
        res.send(result);
        console.log("poslao leaderboard");
    });
})




var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Listening at http://%s:%s", host, port)
})
