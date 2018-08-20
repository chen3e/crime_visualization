// edit dependencies in package.json before npm installing
var express = require("express");
var app = express();

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
app.use(bodyParser.urlencoded({ extended: true }));

// if using sockets
// const server = app.listen(8000);
// const io = require("socket.io")(server);

require("./server/config/routes")(app)

// if not using sockets
app.listen(8000, function() {
    console.log("listening on port 8000");
})