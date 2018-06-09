const express = require('express');
const rp = require('request-promise');

const TIMETABLE_SERVICE_PORT = 8081;

var app = express();


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


/**
 * API:
 * /search - vraca sva predavanja
 * /add - dodaje predavanje
 * /retrieve
 *      /groups = vraca sve grupe
 *      /classrooms = vraca sve ucionice
 *      /days = vraca sve dane
 */


/**
 * SEARCH API
 */
app.get('/search', function (req, res) {

    var groupID = req.query.groupID;
    var classroomID = req.query.classroomID;
    var dayID = req.query.dayID;

    var options = {
        method: 'GET',
        uri: 'http://127.0.0.1:' + TIMETABLE_SERVICE_PORT + '/search?' +
        'classroomID=' + classroomID + '&' +
        'groupID=' + groupID + '&' +
        'dayID=' + dayID,
        resolveWithFullResponse: false
    };

    rp(options)
        .then(function (response) {
            console.log("search by group response", response);
            res.send(response);
        })
        .catch(function (err) {
            console.log("error");
        });
})


/**
 * ADD API
 */
app.get('/add', function (req, res) {
    var subject = req.query.subject;
    var groupID = req.query.groupID;
    var classroomID = req.query.classroomID;
    var dayID = req.query.dayID;

    var options = {
        method: 'GET',
        uri: 'http://127.0.0.1:' + TIMETABLE_SERVICE_PORT + '/add?' +
        'subject=' + subject + '&' +
        'classroomID=' + classroomID + '&' +
        'groupID=' + groupID + '&' +
        'dayID=' + dayID,
        json: true
    };

    rp(options)
        .then(function (response) {
            console.log("add response:", response);
            res.send(response);
        })
        .catch(function (err) {
            console.log("error");
        });
})

/**
 * RETRIEVE API
 */
app.get('/retrieve/groups', function (req, res) {
    var options = {
        method: 'GET',
        uri: 'http://127.0.0.1:' + TIMETABLE_SERVICE_PORT + '/retrieve/groups',
        resolveWithFullResponse: false
    };

    rp(options)
        .then(function (response) {
            console.log("search by group response", response);
            res.send(response);
        })
        .catch(function (err) {
            console.log("error");
        });
})

app.get('/retrieve/classrooms', function (req, res) {
    var options = {
        method: 'GET',
        uri: 'http://127.0.0.1:' + TIMETABLE_SERVICE_PORT + '/retrieve/classrooms',
        resolveWithFullResponse: false
    };

    rp(options)
        .then(function (response) {
            console.log("search by group response", response);
            res.send(response);
        })
        .catch(function (err) {
            console.log("error");
        });
})

app.get('/retrieve/days', function (req, res) {
    var options = {
        method: 'GET',
        uri: 'http://127.0.0.1:' + TIMETABLE_SERVICE_PORT + '/retrieve/days',
        resolveWithFullResponse: false
    };

    rp(options)
        .then(function (response) {
            console.log("search by group response", response);
            res.send(response);
        })
        .catch(function (err) {
            console.log("error");
        });
})




var server = app.listen(8080, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Listening at http://%s:%s", host, port)
})
