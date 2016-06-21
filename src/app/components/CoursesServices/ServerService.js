(function () {
  'use strict';

  angular
    .module('courses')
    .service('Server', Server);

    function Server() {
      // Get User
      this.getUser = function () {
        return this.user;
      };
      // Get courses
      this.getData = function () {
        return this.data;
      };
      // Get authors
      this.getAuthors = function () {
        return this.authors;
      }
      // Find all
      this.findAll = function () {
        return this.getData();
      };
      // Find one
      this.findOne = function (courseid) {
        // find the course
        /* global $ */
        var list = $.grep(this.getData(), function (element) {
          return (element.courseid == courseid);
        });
        if (list.length === 0) {
          return {};
        }
        return list[0];
      };
      // Delete Course
      this.deleteOne = function(courseid) {
        var courses = this.getData();
        var match = false;
        for(var i = 0; i < courses.length; i++){
          if(courses[i].courseid == courseid) {
            match = true;
            courses.splice(i, 1);
            break;
          }
        }
        return match;
      };
      // Update Course
      this.updateOne = function(courseid, dataCourse) {
        // find the course that matches that id
        var courses = this.getData();
        var match = null;
        for (var i=0; i < courses.length; i++) {
          if(courses[i].courseid == courseid) {
            match = courses[i];
            break;
          }
        }
        if(!angular.isObject(match)) {
          return {};
        }
        angular.extend(match, dataCourse);
        return match;
      };
      // Add course
      this.addOne = function(dataCourse) {
        var newId = this.newId();
        dataCourse.courseid = newId;
        this.data.push(dataCourse);
        return dataCourse;
      };
      // New id
      this.newId = function() {
        // find all ids
        var Ids = $.map(this.getData(), function(dataCourse) { return dataCourse.courseid; });
        var maxId = Math.max.apply(Math, Ids);
        // increment by one
        return maxId + 1;
      };

      // Courses data
      this.data = [
        {
          courseid: 1,
          title: 'Angular',
          date: '10.12.2014',
          duration: '70',
          description: 'Sollicitudin urna fermentum ut fusce varius nisl ac ipsum gravida vel pretium tellus tincidunt integer eu augue.',
          authors: [
            {name: 'John Smith'},
            {name: 'Vasya Gorov'}
          ]
        },
        {
          courseid: 2,
          title: 'JavaScript',
          date: '15.03.2015',
          duration: '64',
          description: 'Sollicitudin urna fermentum ut fusce varius nisl ac ipsum gravida vel pretium tellus tincidunt integer eu augue.',
          authors: [
            {name:'Kirill Potov'},
            {name:'Dima Repin'},
            {name:'Kolya Dronov'}
          ]
        },
        {
          courseid: 3,
          title: 'Jquery',
          date: '25.02.2016',
          duration: '121',
          description: 'Sollicitudin urna fermentum ut fusce varius nisl ac ipsum gravida vel pretium tellus tincidunt integer eu augue.',
          authors: [
            {name: 'Ford Tron'}
          ]
        }
      ];
      // Authors data
      this.authors = [
        { name: "Kirill Potov" },
        { name: "Dima Repin" },
        { name: "Kolya Dronov" },
        { name: 'John Smith' },
        { name: 'Vasya Gorov' },
        { name: 'Ford Tron' }
      ];
      // User data
      this.user = {
        name: 'admin',
        password: 'admin'
      }
  }

})();
