// edit dependencies in package.json before npm installing
var express = require("express");
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/crimes');
var CrimeSchema = new mongoose.Schema({
    address: {type: String, required: true},
    catcolor: {type: String, required: true},
    categoryid: {type: String, required: true},
    catimage: {type: String, required: true},
    catname: {type: String, required: true},
    city: {type: String, required: true},
    date: {type: String, required: true},
    description: {type: String, required: true},
    distance: {type: String, required: true},
    geoid: {type: String, required: true},
    id: {type: String, required: true, unique: true},
    latitude: {type: String, required: true},
    longitude: {type: String, required: true},
    name: {type: String, required: true},
    permalink: {type: String, required: true},
    state: {type: String, required: true}
})
var Crime = mongoose.model('Crime', CrimeSchema)

var path = require("path");
//app.use(express.static(path.join(__dirname, "./client/static")));
app.use(express.static(__dirname + '/public/dist/public'));
//app.set("views", path.join(__dirname, "./client/views"));
//app.set("view engine", "ejs");

// if using session
var session = require("express-session");

app.use(session({
    secret: "secretTunnel",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))

// if using form data
var bodyParser = require("body-parser");
app.use(bodyParser.json({ extended: true }));

// if using sockets
// const server = app.listen(8000);
// const io = require("socket.io")(server);

app.post('/postingdata', (req, res) => {
    console.log(req.body);
    console.log("Made it to server!");
    for (var i = 0; i < req.body.length; i++){
        console.log(req.body[i]);
        var crime = new Crime({address: req.body[i].address, catcolor: req.body[i].catcolor, categoryid: req.body[i].categoryid, catimage: req.body[i].catimage, catname: req.body[i].catname, city: req.body[i].city, date: req.body[i].date, description: req.body[i].description, distance: req.body[i].distance, geoid: req.body[i].geoid, id: req.body[i].id, latitude: req.body[i].latitude, longitude: req.body[i].longitude, name: req.body[i].name, permalink: req.body[i].permalink, state: req.body[i].state})
        crime.save(function(err, crime){
            console.log("********************************************************* Trying to save! ********************************************************")
            if (err){
                console.log(err)
            }
            else{
                console.log("Cool!")
            }
        })
    }
    res.json({ok: true})
})

require("./server/config/routes")(app)

// if not using sockets
app.listen(8000, function() {
    console.log("listening on port 8000");
})