const crimes = require("../controllers/crimes")
const path = require("path")

module.exports = function (app) {
    app.get("/crimes", function(req, res) {
        crimes.getCrimes(req, res);
    })

    app.all("*", (req, res, next) => {
        res.sendFile(path.resolve("./public/dist/public/index.html"))
    });
}