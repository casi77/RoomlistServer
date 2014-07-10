/**
 * Module dependencies.
 */
var express = require('express');
var request = require('request');
var http = require('http');
var path = require('path');
var schedule = require('./controller/schedule_control');
var app = express();

/**
 * Express Configuration
 */
app.configure(function(req, res){
    //Listen Port
	app.set('port', process.env.PORT || 3000);
    app.use(express.logger('dev'));
	app.use(express.json());
	app.use(express.urlencoded());
	app.use(express.methodOverride());

    //public path
	app.use(express.static(path.join(__dirname, 'public')));
});


/**
 * Routes
 */

//GET schedule for provided BeaconID (:id)
app.get('/:id/schedule', schedule.getRoomSchedule);


//Create HTTP-Server 
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
