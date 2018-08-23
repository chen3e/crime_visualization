var mongoose = require("mongoose");

module.exports = function() {
    var CrimeSchema = new mongoose.Schema({
        address: {type: String, required: false},
        catcolor: {type: String, required: false},
        categoryid: {type: String, required: [true, "Type of crime is required. If unsure, please put Miscellaneous."]},
        catimage: {type: String, required: false},
        catname: {type: String, required: true},
        city: {type: String, required: true},
        date: {type: String, required: [true, "Date is required"]},
        description: {type: String, required: false},
        distance: {type: String, required: false},
        geoid: {type: String, required: false},
        id: {type: String, required: true, unique: true},
        latitude: {type: String, required: [true, "Position is required"]},
        longitude: {type: String, required: [true, "Position is required"]},
        name: {type: String, required: true},
        permalink: {type: String, required: false},
        state: {type: String, required: true}
    })

    mongoose.model("Crime", CrimeSchema);
}