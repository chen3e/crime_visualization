// edit dependencies in package.json before npm installing
var express = require("express");
var app = express();

const path = require("path")
app.use(express.static(__dirname + "/public/dist/public"));

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

require("./server/config/routes")(app)

// if not using sockets
app.listen(8000, function() {
    console.log("listening on port 8000");
})