/**
 * @fileOverview Room Model
 */
var config = require("../config.json");
var orm = require("orm");

var db = orm.connect(config.database);


/**
 * Room Model
 * @class Project
 */
var Room = db.define('rooms', {
		id : Number,
        beacon_id: String
});

exports.Room = Room;

