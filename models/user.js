/**
 * @fileOverview User Model
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

exports.User = User;

