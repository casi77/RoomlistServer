/**
 * @fileOverview Models
 */

var config = require("../config.json");
var orm = require("orm");

//Connect to DB
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
    start: String, //Start time of block hh:mm:ss
    end: String     //End time of block hh:mm:ss
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
		date : Date,      //Reserved Date (only provided for reservation with unique date)
		day : Number      //Reserved Weekday (0 = Sunday; only provided for repeating reservations with no specific date)

});


//Constrains of Objects
Schedule.hasOne('room', Room, {reverse: 'schedules'});
Schedule.hasOne('user', User);
Schedule.hasOne('block', Block);


exports.Schedule = Schedule;