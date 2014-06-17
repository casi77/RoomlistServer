/**
 * @fileOverview Schedule Model
 */
var config = require("../config.json");
var orm = require("orm");
var db = orm.connect(config.database);


/**
 * User Model
 * @class User
 */
var User = db.define('users', {
    id : Number,
    firstname: String,
    lastname: String,
    email: String
});


/**
 * Block Model
 * @class Block
 */
var Block = db.define('blocks', {
    id: Number,
    start: String,
    end: String
});

/**
 * Room Model
 * @class Project
 */
var Room = db.define('rooms', {
    id : Number,
    beacon_id: String
});

/**
 * Schedule Model
 * @class Project
 */
var Schedule = db.define('schedules', {
		id : Number,
		date : Date,
		day : Number
});

Schedule.hasOne('room', Room, {reverse: 'schedules'});
Schedule.hasOne('user', User);
Schedule.hasOne('block', Block);


exports.Schedule = Schedule;

