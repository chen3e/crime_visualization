const crimes = require("../controllers/crimes")
const path = require("path")

module.exports = function (app) {
    app.get("/crimes", function(req, res) {
        crimes.getCrimes(req, res);
    })

    app.post("/crimes", function(req, res) {
        crimes.filterCrimes(req, res);
    })

    app.post("/reportCrime", function(req, res) {
        crimes.reportCrime(req, res);
    })

    app.post('/postingdata', (req, res) => {
        crimes.makeCrimes(req, res);
    })

    // SANITY CHECK TO SEE IF CRIMES EXIST ON ANY GIVEN DAY- EDIT CRIMES.JS TO CHANGE THE DAY
    app.get("/findCrimeForMe", (req, res) => {
       console.log("in findcrimeforme");
       crimes.findCrimeForMe(req, res);
    })

    app.all("*", (req, res, next) => {
        res.sendFile(path.resolve("./public/dist/public/index.html"))
    });
}