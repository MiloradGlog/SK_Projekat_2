const express = require('express');
const mysql = require('mysql');
const request = require('request');
const rp = require('request-promise');
const circularJSON = require('circular-json');

const TIMETABLE_SERVICE_PORT = 8081;

var app = express();


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


/**
 * API:
 * /search
 *      /all - vraca sva predavanja
 * /retrieve
 *      /groups = vraca sve grupe
 *      /classrooms = vraca sve ucionice
 */

/**
 * SEARCH API
 */
app.get('/search/all', function (req, res) {
    var options = {
        method: 'GET',
        uri: 'http://127.0.0.1:' + TIMETABLE_SERVICE_PORT + '/search/all',
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

app.get('/search/group', function (req, res) {
    var options = {
        method: 'GET',
        uri: 'http://127.0.0.1:' + TIMETABLE_SERVICE_PORT + '/search/group',
        headers: {
            'group_name': '301'
        },
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




var server = app.listen(8080, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Listening at http://%s:%s", host, port)
})
