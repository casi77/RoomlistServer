/**
 * @fileOverview Controller for the Projects Model 
 */
var Schedule = require('../models/schedule.js').Schedule;

/**
 * GET list Schedule from Database
 * @param {Object} req Request-Data
 * @param {Object} res Response-Data
 * @return {function} res.send Send Response
 */
exports.getRoomSchedule = function(req, res){
    console.log(req.params.id);

    var filter = {beacon_id: req.params.id};

   Schedule.findByRoom(filter, function(err, schedules){

       var viewModel = {};
       var i = 0;
       var k = 0;
       var j = 0;

       var getUser = function(schedule, n){

           var user ={};

           schedule.getUser(function(err, res) {

               if(err) {
                   console.log(err);
               }

               if (res != undefined) {
                   user.id = res.id;
                   user.firstname = res.firstname;
                   user.lastname = res.lastname;
                   user.email = res.email;
               }

               viewModel.schedules[n].user = user;

               k++

               doRender();
           });

       };

       var getBlock = function(schedule, n){

           schedule.getBlock(function(err, block){

               if(res!=undefined) {
                   viewModel.schedules[n].start = block.start;
                   viewModel.schedules[n].end = block.end;

               };

               j++;

               doRender();

           });
       }

       var doRender = function(){

           if (i === schedules.length && j === schedules.length && k === schedules.length) {
               return res.json(200, viewModel);
           }
       }

       if (schedules != undefined){
           viewModel.room = schedules[0].room_id;
       }

       viewModel.schedules = [];

       for(i = 0; i < schedules.length; i++) {


           var schedule = {};
           schedule.date = schedules[i].date;
           schedule.day = schedules[i].day;

           viewModel.schedules.push(schedule);

           getUser(schedules[i], i);
           getBlock(schedules[i], i);

       }

   });
};