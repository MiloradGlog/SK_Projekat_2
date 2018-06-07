var express = require('express');
var mysql = require('mysql');


var app = express();



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
app.get('/search', function (req, res) {
    var searchQuery = "SELECT predavanja.naziv_predmeta, ucionice.naziv_ucionice, dani.naziv_dana, grupe.naziv_grupe\n" +
        "FROM predavanja \n" +
        "JOIN ucionice ON predavanja.id_ucionica = ucionice.id_ucionica \n" +
        "JOIN dani ON predavanja.id_dan = dani.id_dan\n" +
        "JOIN grupe ON predavanja.id_grupa = grupe.id_grupa ";

    var groupID = req.query.groupID;
    var classroomID = req.query.classroomID;
    var dayID = req.query.dayID;

    var first = true;

    if (isNumber(groupID)){
        console.log('group nije null');
        if (first){
            searchQuery += "WHERE predavanja.id_grupa = "+ groupID;
            first = false;
        }
        else {
            searchQuery += " AND predavanja.id_grupa = "+ groupID;
        }
    }
    if (isNumber(classroomID)){
        if (first){
            searchQuery += "WHERE predavanja.id_ucionica = "+ classroomID;
            first = false;
        }
        else {
            searchQuery += " AND predavanja.id_ucionica = "+ classroomID;
        }
    }
    if (isNumber(dayID)){
        if (first){
            searchQuery += "WHERE predavanja.id_dan = "+ dayID;
            first = false;
        }
        else {
            searchQuery += " AND predavanja.id_dan = "+ dayID;
        }
    }

    console.log(searchQuery);

    con.query(searchQuery, function (err, result, fields) {
        if (err) throw err;
        res.send(result);
        console.log("poslao leaderboard");
    });
})


app.get('/add', function (req, res) {

    var subject = req.query.subject;
    var groupID = req.query.groupID;
    var classroomID = req.query.classroomID;
    var dayID = req.query.dayID;

    var query = "INSERT INTO predavanja (naziv_predmeta, id_grupa, id_dan, id_ucionica) \n" +
        "VALUES (\"" + subject + "\", "+ groupID +", "+ dayID +", "+ classroomID +");"
    console.log(query);

    con.query(query, function (err, result, fields) {
        if (err) {
            res.send("Error!");
            throw err;
        }
        res.send("Uspeh!");
        console.log("dodao predmet");
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

function isNumber(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) }


var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Listening at http://%s:%s", host, port)
})
