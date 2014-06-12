/**
 * @fileOverview Schedule Model
 */
var config = require("../config.json");
var orm = require("orm");
var db = orm.connect(config.database);

var Room = require("../models/room.js").Room;
var Block = require("../models/block.js").Block;
var User = require("../models/user.js").User;

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

