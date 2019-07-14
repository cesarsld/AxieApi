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

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/api/winrates', function (req, res) {
    var offset = 0;
    if (req.query.offset)
        offset = parseInt(req.query.offset);
    const db = mongoClient.db('AxieData');
    var collec = db.collection('AxieWinrate');
    var data = collec.find({}).limit(50).skip(offset).toArray(function (err, result) {
        if (err) throw err;
        if (result.length >= 0)
            res.json(result);
    });
});

app.get('/api/winrate', function (req, res) {
    var id = 0;
    if (req.query.id)
        id = parseInt(req.query.id);
    const db = mongoClient.db('AxieData');
    var collec = db.collection('AxieWinrate');
    collec.find({ _id: id }).toArray(function (err, result) {
        if (err) throw err;
        if (result.length === 1)
            res.json(result);
    });
});

app.get('/api/saleData', function (req, res) {
    var unix = Math.floor(new Date() / 1000);
    var queryLength = 0;
    if (req.query.dayNeeded) {
        var number = parseInt(req.query.dayNeeded);
        if (number > 0)
            queryLength = number + 2;
        else
            queryLength = Math.floor(unix / 86400);
    }
    else
        unix = 0;
    const db = mongoClient.db('AxieData');
    var dbName = '';
    if (req.query.type) {
        switch (req.query.type) {
            case 'Tag':
                if (req.query.tag) {
                    switch (req.query.tag) {
                        case 'Agamo':
                            dbName = 'Agamogenesis';
                            break;
                        case 'MEO':
                            dbName = 'MEO';
                            break;
                        case 'MEO2':
                            dbName = 'MEO2';
                            break;
                        case 'Origin':
                            dbName = 'Origin';
                            break;
                        case 'NoTag':
                            dbName = 'Untagged';
                            break;
                    }
                }
                break;
            case 'Mystic':
                if (req.query.mysticCount) {
                    switch (req.query.mysticCount) {
                        case '1':
                            dbName = '1';
                            break;
                        case '2':
                            dbName = '2';
                            break;
                        case '3':
                            dbName = '3';
                            break;
                        case '4':
                            dbName = '4';
                            break;
                        case 'any':
                            dbName = 'AnyMystic';
                            break;
                    }
                }
                break;
        }
    }
    var collec = db.collection(dbName);
    collec.find({ _id: { $gt: unix - 86400 * queryLength } }).toArray(function (err, result) {
        if (err) throw err;
        if (queryLength !== 0)
            while (result.length > queryLength - 2)
                result.shift();
        res.json(result);

    });
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

app.get('/api/dailyStreamers', function (req, res) {
    console.log('dau query!');

    const db = mongoClient.db('AxieData');
    var collec = db.collection('Streamers');
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

app.listen(port, function () {
    console.log("Server started. Listening on port " + port);
});