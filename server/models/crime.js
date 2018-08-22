var mongoose = require("mongoose");

module.exports = function() {
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

    mongoose.model("Crime", CrimeSchema);
}