'use strict';
// https://git.heroku.com/hidden-island-35169.git repos in heroku
////"heroku-postbuild": "cd client && npm install && npm run build"
console.log(__dirname);
const assert = require('assert');
var express = require('express');
var path = require('path');
var app = express();
var mongo = require('mongodb').MongoClient;
var mongoClient = new mongo('mongodb://liam:90%400fB32@72.49.192.97:27017');


var client

var port = process.env.PORT || 1337;



mongoClient.connect(function (err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
});

app.get('/api/dailyDau', function (req, res) {
    console.log('dau query!');
    const db = mongoClient.db('AxieData');
    var collec = db.collection('DailyBattleDAU');
    collec.find({}).toArray(function (err, result) {
        if (err) throw err;
        res.json(result);

    });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});




//function fetchAxie(index) {
//    request('https://api.axieinfinity.com/v1/axies/' + index, (error, response, body) => {
//        if (!error && response.statusCode === 200) {
//            return JSON.parse(body);
//        }
//    }); 
//}

app.listen(port, function(){
    console.log("Server started. Listening on port " + port);
});