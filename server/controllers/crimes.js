const unirest = require('unirest');
// const io = require('socket.io');
// const server = require("../../server");
// console.log(server);
const mongoose = require('mongoose');
Crime = mongoose.model('Crime')

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
        
    },

    filterCrimes: function(req, res) {
        let searchParams = {
            categoryid : "",
            end_date : "",
            lat : 41.881,
            lon : -87.623,
            keyword : "",
            start_date : ""
        }

        for (var key in req.body) {
            if (req.body[key]) {
                searchParams[key] = req.body[key];
            }
        }

        console.log(searchParams);

        unirest.get(`https://yourmapper2.p.mashape.com/markers?c=${searchParams.categoryid}&center=0&end=${searchParams.end_date}&f=json&id=182&lat=${searchParams.lat}&lon=${searchParams.lon}&num=500&search=${searchParams.keyword}&start=${searchParams.start_date}`)
        // Put api key here
        .header("X-Mashape-Key", "b9cHBlr2PUmsh98hyrF30fUgJhNFp1d4QMFjsng2zNpmyY0H0C")
        .header("Accept", "application/json")
        .end(function (result) {
            console.log(result.status, result.headers);
            return res.json({ message: "Success!", data: result.body });
        });
    },

    //SANITY CHECK TO MAKE SURE ANY GIVEN DATE HAS CRIMES
    findCrimeForMe(req, res) {
       console.log("In getCrimeForMe");
       var crime = Crime.findOne({date: "2015-11-05"}, function(err, crime){
           if (err){
               console.log("???")
           }
           else{
               console.log(crime);
           }
       });
    },

    makeCrimes(req, res) {
        console.log(req.body);
        console.log("Made it to server!");
        for (var i = 0; i < req.body.length; i++){
            console.log(req.body[i]);
            var crime = new Crime({address: req.body[i].address, catcolor: req.body[i].catcolor, categoryid: req.body[i].categoryid, catimage: req.body[i].catimage, catname: req.body[i].catname, city: req.body[i].city, date: req.body[i].date, description: req.body[i].description, distance: req.body[i].distance, geoid: req.body[i].geoid, id: req.body[i].id,latitude: req.body[i].latitude, longitude: req.body[i].longitude, name: req.body[i].name, permalink: req.body[i].permalink, state: req.body[i].state})
            crime.save(function(err, crime){
                //console.log("********************************************************* Trying to save! ********************************************************")
                if (err){
                    console.log("Eek!")
                }
                else{
                    console.log("Cool!")
                    console.log(crime);
                }
            })
        }
        res.json({ok: true});
    }
}

//Jeremy KEY for yourmapper: fNutKhjM8Smshcjz2VSdocmRagjMp1ro8g6jsnnRhXEuIpICA4
//Mandy KEY for yourmapper: rSCiGbEc2amshYK4i3bGFu9ltLZWp1D9W11jsnoxBKLY0ixRyW
//Elliott's key
// 'QNVCYMTHZ0mshzFl0IBVoTRvjdLCp1kMFGVjsn51wd4liyvJWe'
//  Ki-Zenn's: b9cHBlr2PUmsh98hyrF30fUgJhNFp1d4QMFjsng2zNpmyY0H0C
