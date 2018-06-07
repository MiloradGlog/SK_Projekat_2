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


app.get('/search/all', function (req, res) {
    var options = {
        method: 'GET',
        uri: 'http://127.0.0.1:' + TIMETABLE_SERVICE_PORT + '/all',
        resolveWithFullResponse: false
    };

    rp(options)
        .then(function (response) {
            console.log("search all response", circularJSON.stringify(response));
            res.send(circularJSON.stringify(response));
        })
        .catch(function (err) {
            console.log("error");
        });
})

app.get('/search/group', function (req, res) {
    var options = {
        method: 'GET',
        uri: 'http://127.0.0.1:' + TIMETABLE_SERVICE_PORT + '/group',
        resolveWithFullResponse: false
    };

    rp(options)
        .then(function (response) {
            console.log("search by group response", circularJSON.stringify(response));
            res.send(circularJSON.stringify(response));
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
