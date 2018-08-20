const crimes = require("../controllers/crimes")

module.exports = function (app) {
    app.get("/", function(req, res) {
        crimes.getCrimes(req, res);
    })
}