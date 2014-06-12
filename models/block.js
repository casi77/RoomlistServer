/**
 * @fileOverview Block Model
 */

var config = require("../config.json");
var orm = require("orm");
var db = orm.connect(config.database);

/**
 * Block Model
 * @class Block
 */
var Block = db.define('blocks', {
		id: Number,
        start: String,
        end: String
});

exports.Block = Block;

