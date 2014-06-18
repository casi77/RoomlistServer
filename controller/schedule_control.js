/**
 * @fileOverview Controller for the Projects Model 
 */
var Schedule = require('../models/models.js').Schedule;
var moment = require('moment');
var _ = require('underscore');

/**
 * GET list Schedule for a beacon_id from Database
 * @param {Object} req Request-Data
 * @param {Object} res Response-Data
 * @return {function} res.send Send Response
 */

exports.getRoomSchedule = function(req, res){


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
           //Render JSON if viewModel is complete
           if (i === schedules.length && j === schedules.length && k === schedules.length) {

               //sort by start
               viewModel.schedules = _.sortBy(viewModel.schedules, function(o) { return o.start; });

               console.log(viewModel);
               return res.json(200, viewModel);
           }
       }

       if (schedules != undefined){
           if(schedules[0]!=undefined) {
               viewModel.room_id = schedules[0].room_id;
           }
       }

       viewModel.beacon_id = req.params.id;
       viewModel.schedules = [];

       for(i = 0; i < schedules.length; i++) {


           var schedule = {};
           if(schedules[i].date != null) {
               schedule.date = moment(schedules[i].date).format('YYYY-MM-DD');

           }
           else{

               schedule.date = null;
           }


           if(schedules[i].day != null) {
               schedule.day = schedules[i].day;
           }
           else{

               schedule.day = null;
           }

           schedule.title = schedules[i].title;

           viewModel.schedules.push(schedule);

           getUser(schedules[i], i);
           getBlock(schedules[i], i);


       }

       if (schedule === undefined){

           viewModel =  {};
           doRender();

       }

   });
};