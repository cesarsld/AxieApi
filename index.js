'use strict';
// https://git.heroku.com/hidden-island-35169.git repos in heroku
////"heroku-postbuild": "cd client && npm install && npm run build"
console.log(__dirname);
const assert = require('assert');
var express = require('express');
var path = require('path');
var app = express();
var mongo = require('mongodb').MongoClient;
var mongoClient = new mongo(process.env.MONGO_URL);



var port = process.env.PORT || 1337;




mongoClient.connect(function (err) {
    assert.equal(null, err);
    console.log("connected successfully to server");
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

app.get('/api/dailyPods', function (req, res) {
    console.log('Pod query!');
    const db = mongoClient.db('AxieData');
    var collec = db.collection('EggSoldPerDay');
    collec.find({}).toArray(function (err, result) {
        if (err) throw err;
        res.json(result);

    });
});

app.get('/api/dailyBreeds', function (req, res) {
    console.log('Pod query!');
    const db = mongoClient.db('AxieData');
    var collec = db.collection('EggsPerDay');
    collec.find({}).toArray(function (err, result) {
        if (err) throw err;
        res.json(result);

    });
});

app.get('/api/cumulUniqueBuyers', function (req, res) {
    console.log('Pod query!');
    const db = mongoClient.db('AxieData');
    var collec = db.collection('UniqueBuyerGains');
    collec.find({}).toArray(function (err, result) {
        if (err) throw err;
        res.json(result);

    });
});

app.get('/api/cumulDailyBattles', function (req, res) {
    console.log('Pod query!');
    const db = mongoClient.db('AxieData');
    var collec = db.collection('CumulDailyBattles');
    collec.find({}).toArray(function (err, result) {
        if (err) throw err;
        res.json(result);

    });
});

app.get('/api/dailyBreedsCumul', function (req, res) {
    console.log('dau query!');

    const db = mongoClient.db('AxieData');
    var collec = db.collection('EggsPerDay');
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