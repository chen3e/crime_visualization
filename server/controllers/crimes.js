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
        Crime.find({}, function(err, data) {
            if (err) {
                console.log(err);
            }
            return res.json({ message: "Success!", data: data });
        })
    },

    filterCrimes: function(req, res) {
        let searchParams = {}

        for (var key in req.body) {
            if (req.body[key]) {
                searchParams[key] = req.body[key];
            }
        }

        if (searchParams['categoryid']) {
            searchParams['categoryid'] = {$in: searchParams['categoryid']}
        }
        
        console.log(searchParams);

        Crime.find(searchParams, function(err, data) {
            if (err) {
                console.log(err);
            }
            return res.json({ message: "Success!", data: data });
        })
    }
}

//Jeremy KEY for yourmapper: fNutKhjM8Smshcjz2VSdocmRagjMp1ro8g6jsnnRhXEuIpICA4
//Mandy KEY for yourmapper: rSCiGbEc2amshYK4i3bGFu9ltLZWp1D9W11jsnoxBKLY0ixRyW
//Elliott's key
// 'QNVCYMTHZ0mshzFl0IBVoTRvjdLCp1kMFGVjsn51wd4liyvJWe'
//  Ki-Zenn's: b9cHBlr2PUmsh98hyrF30fUgJhNFp1d4QMFjsng2zNpmyY0H0C
