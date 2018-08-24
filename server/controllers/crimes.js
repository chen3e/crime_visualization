const unirest = require('unirest');
const mongoose = require("mongoose");
Crime = mongoose.model("Crime");

module.exports = {
    getCrimes: function(req, res, io) {
        // // These code snippets use an open-source library. http://unirest.io/nodejs
        // unirest.get("https://yourmapper2.p.mashape.com/markers?center=0&f=json&id=182&lat=41.881&lon=-87.623&num=500&start=2015-11-22&end=2015-11-22")
        // // Put api key here
        // .header("X-Mashape-Key", "fNutKhjM8Smshcjz2VSdocmRagjMp1ro8g6jsnnRhXEuIpICA4")
        // .header("Accept", "application/json")
        // .end(function (result) {
        //     console.log(result.status, result.headers);
        //     // io.emit("crime_data", { message: "Success!", data: result.body })
        //     return res.json({ message: "Success!", data: result.body });
        // });
        Crime.find({date: "2015-11-22"}, function(err, data) {
            if (err) {
                console.log(err);
            }
            return res.json({ message: "Success!", data: data });
        })
    },

    filterCrimes: function(req, res) {
        let searchParams = {}
        console.log("Woo we are in the findcount");
        console.log(req.body);
        for (var key in req.body) {
            if (req.body[key]) {
                searchParams[key] = req.body[key];
            }
        }
        console.log(searchParams['categoryid']);
        if (searchParams['categoryid']) {
            searchParams['categoryid'] = {$in: searchParams['categoryid']};
        }

        if (searchParams['keyword']) {
            searchParams['description'] = { "$regex": searchParams['keyword'], "$options": "i" };
            delete searchParams['keyword'];
        }

        if (searchParams['start_date'] && searchParams['end_date']) {
            searchParams['date'] = {"$gte": searchParams['start_date'], "$lte": searchParams['end_date']};
            delete searchParams['start_date'];
            delete searchParams['end_date'];
        }
        else if (searchParams['start_date']) {
            searchParams['date'] = {"$gte": searchParams['start_date']};
            delete searchParams['start_date'];
        }
        else if (searchParams['end_date']) {
            searchParams['date'] = {"$lte": searchParams['end_date']};
            delete searchParams['end_date'];
        }
        

        // Crime.find( { latitude: { $gte: 41.454236 } } )

        if (searchParams['region'] == 'farNorthSide') {
            console.log("Looking on the far north side!");
            searchParams['latitude'] = { "$gte": 41.954236 }
            delete searchParams['region'];
        }
        else if (searchParams['region'] == 'northwestSide') {
            console.log("Looking on the northwest side!");
            searchParams['$and'] = [ { 'latitude': { $gte: 41.910516 } }, { 'latitude': { $lte: 41.954236} }, { 'longitude': { $gte: -87.727330 } } ];
            delete searchParams['region'];
        }
        else if (searchParams['region'] == 'northSide') {
            console.log("Looking on the north side!");
            searchParams['$and'] = [ { 'latitude': { $gte: 41.910516 } }, { 'latitude': { $lte: 41.954236} }, { 'longitude': { $lte: -87.727330 } } ];
            delete searchParams['region'];
        }
        else if (searchParams['region'] == 'westSide') {
            console.log("Looking on the west side!");
            searchParams['$and'] = [ { 'latitude': { $gte: 41.837104 } }, { 'latitude': { $lte: 41.910516} }, { 'longitude': { $gte: -87.636750 } } ];
            delete searchParams['region'];
        }
        else if (searchParams['region'] == 'central') {
            console.log("Looking in central!");
            searchParams['$and'] = [ { 'latitude': { $gte: 41.852363 } }, { 'latitude': { $lte: 41.910516} }, { 'longitude': { $lte: -87.636750 } } ];
            delete searchParams['region'];
        }
        else if (searchParams['region'] == 'southSide') {
            console.log("Looking on the south side!");
            searchParams['$and'] = [ { 'latitude': { $gte: 41.751754 } }, { 'latitude': { $lte: 41.852363} }, { 'longitude': { $lte: -87.636750 } } ];
            delete searchParams['region'];
        }
        else if (searchParams['region'] == 'southwestSide') {
            console.log("Looking on the southwest side!");
            searchParams['$and'] = [ { 'latitude': { $gte: 41.751754 } }, { 'latitude': { $lte: 41.837104} }, { 'longitude': { $gte: -87.636750 } } ];
            delete searchParams['region'];
        }
        else if (searchParams['region'] == 'farSouthwestSide') {
            console.log("Looking on the far southwest side!");
            searchParams['$and'] = [ { 'latitude': { $lte: 41.751754 } }, { 'longitude': { $gte: -87.634215 } } ];
            delete searchParams['region'];
        }
        else if (searchParams['region'] == 'farSoutheastSide') {
            console.log("Looking on the far southeast side!");
            searchParams['$and'] = [ { 'latitude': { $lte: 41.751754 } }, { 'longitude': { $lte: -87.634215 } } ];
            delete searchParams['region'];
        }
        console.log("This is searchParams in crimes.js", searchParams);

        Crime.find(searchParams, function(err, data) {
            if (err) {
                console.log(err);
            }
            //console.log(data);
            return res.json({ message: "Success!", data: data });
        })
    },

    reportCrime: function(req, res) {
        Crime.create(req.body, function(err, data) {
            if (err) {
                return res.json({message: "Error!", errors: err});
            }
            else {
                return res.json({message: "Success!", data: data});
            }
        })
    },

    findCrimesCount: function (req, res) {
        console.log("*************************************************************************************************");
        let searchParams = {}
        console.log(req.body);
        for (var key in req.body) {
            if (req.body[key]) {
                searchParams[key] = req.body[key];
            }
        }
        console.log(searchParams['categoryid']);
        if (searchParams['categoryid']) {
            searchParams['categoryid'] = { $in: searchParams['categoryid'] };
        }

        if (searchParams['keyword']) {
            searchParams['description'] = { "$regex": searchParams['keyword'], "$options": "i" };
            delete searchParams['keyword'];
        }

        if (searchParams['start_date'] && searchParams['end_date']) {
            searchParams['date'] = { "$gte": searchParams['start_date'], "$lte": searchParams['end_date'] };
            delete searchParams['start_date'];
            delete searchParams['end_date'];
        }
        else if (searchParams['start_date']) {
            searchParams['date'] = { "$gte": searchParams['start_date'] };
            delete searchParams['start_date'];
        }
        else if (searchParams['end_date']) {
            searchParams['date'] = { "$lte": searchParams['end_date'] };
            delete searchParams['end_date'];
        }
        if (searchParams['region'] == 'farNorthSide') {
            console.log("Looking on the far north side!");
            searchParams['latitude'] = { "$gte": 41.954236 }
            delete searchParams['region'];
        }
        else if (searchParams['region'] == 'northwestSide') {
            console.log("Looking on the northwest side!");
            searchParams['$and'] = [{ 'latitude': { $gte: 41.910516 } }, { 'latitude': { $lte: 41.954236 } }, { 'longitude': { $gte: -87.727330 } }];
            delete searchParams['region'];
        }
        else if (searchParams['region'] == 'northSide') {
            console.log("Looking on the north side!");
            searchParams['$and'] = [{ 'latitude': { $gte: 41.910516 } }, { 'latitude': { $lte: 41.954236 } }, { 'longitude': { $lte: -87.727330 } }];
            delete searchParams['region'];
        }
        else if (searchParams['region'] == 'westSide') {
            console.log("Looking on the west side!");
            searchParams['$and'] = [{ 'latitude': { $gte: 41.837104 } }, { 'latitude': { $lte: 41.910516 } }, { 'longitude': { $gte: -87.636750 } }];
            delete searchParams['region'];
        }
        else if (searchParams['region'] == 'central') {
            console.log("Looking in central!");
            searchParams['$and'] = [{ 'latitude': { $gte: 41.852363 } }, { 'latitude': { $lte: 41.910516 } }, { 'longitude': { $lte: -87.636750 } }];
            delete searchParams['region'];
        }
        else if (searchParams['region'] == 'southSide') {
            console.log("Looking on the south side!");
            searchParams['$and'] = [{ 'latitude': { $gte: 41.751754 } }, { 'latitude': { $lte: 41.852363 } }, { 'longitude': { $lte: -87.636750 } }];
            delete searchParams['region'];
        }
        else if (searchParams['region'] == 'southwestSide') {
            console.log("Looking on the southwest side!");
            searchParams['$and'] = [{ 'latitude': { $gte: 41.751754 } }, { 'latitude': { $lte: 41.837104 } }, { 'longitude': { $gte: -87.636750 } }];
            delete searchParams['region'];
        }
        else if (searchParams['region'] == 'farSouthwestSide') {
            console.log("Looking on the far southwest side!");
            searchParams['$and'] = [{ 'latitude': { $lte: 41.751754 } }, { 'longitude': { $gte: -87.634215 } }];
            delete searchParams['region'];
        }
        else if (searchParams['region'] == 'farSoutheastSide') {
            console.log("Looking on the far southeast side!");
            searchParams['$and'] = [{ 'latitude': { $lte: 41.751754 } }, { 'longitude': { $lte: -87.634215 } }];
            delete searchParams['region'];
        }
        console.log("This is searchParams in crimes.js", searchParams);
        var agg = Crime.aggregate([{ $match: searchParams }, { $sort: { date: 1 } }])
        agg.options = { allowDiskUse: true }
        agg.exec(function (err, data) {
            if (err) {
                console.log(err);
            }
            //console.log(data);
            return res.json({ message: "Success!", data: data });
        })
    }
}

//Jeremy KEY for yourmapper: fNutKhjM8Smshcjz2VSdocmRagjMp1ro8g6jsnnRhXEuIpICA4
//Mandy KEY for yourmapper: rSCiGbEc2amshYK4i3bGFu9ltLZWp1D9W11jsnoxBKLY0ixRyW
//Elliott's key
// 'QNVCYMTHZ0mshzFl0IBVoTRvjdLCp1kMFGVjsn51wd4liyvJWe'
//  Ki-Zenn's: b9cHBlr2PUmsh98hyrF30fUgJhNFp1d4QMFjsng2zNpmyY0H0C
