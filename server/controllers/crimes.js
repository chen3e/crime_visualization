const unirest = require('unirest');

module.exports = {
    getCrimes: function(req, res) {
        console.log("In getCrimes")
        // These code snippets use an open-source library. http://unirest.io/nodejs
        unirest.get("https://yourmapper2.p.mashape.com/markers?center=0&f=json&id=182&lat=41.881&lon=-87.623&num=500")
        // Put api key here
        .header("X-Mashape-Key", "rSCiGbEc2amshYK4i3bGFu9ltLZWp1D9W11jsnoxBKLY0ixRyW")
        .header("Accept", "application/json")
        .end(function (result) {
        //console.log(result.body);
        //return result;
        return res.render('index', { data: result.body });
        });
    }
}

//Jeremy KEY for yourmapper: fNutKhjM8Smshcjz2VSdocmRagjMp1ro8g6jsnnRhXEuIpICA4
//Mandy KEY for yourmapper: rSCiGbEc2amshYK4i3bGFu9ltLZWp1D9W11jsnoxBKLY0ixRyW