(function() {
  'use strict';

  angular
    .module('courses')
    .run(backEend);

  /** @ngInject */
  function backEend($httpBackend, Server, $rootScope, $state, $stateParams, AuthService) {
    $httpBackend
      .whenPOST('/login')
      .respond(function login(method, url, data) {
        var serverUser = Server.getUser();
        var clientUser = angular.fromJson(data);
        var response = false;
        // Check user
        if (serverUser.name === clientUser.name && serverUser.password === clientUser.password) {
          response = true;
        }
        return [200, response, {}];
      });

    $httpBackend
      .whenGET('/courses')
      .respond(function getCourses() {
        var courses = Server.findAll();
        return [200, courses, {}];
      });

    $httpBackend
      .whenGET('/authors')
      .respond(function getAuthors() {
        var authors = Server.getAuthors();
        return [200, authors, {}];
      });

    $httpBackend
      .whenGET(/\/courses\/\d+/)
      .respond(function getCourse(method, url) {
        // parse the matching URL to pull out the id (/courses/:id)
        var courseid = url.split('/')[2];
        var course = Server.findOne(courseid);
        return [200, course, {}];
    });

    $httpBackend
      .whenDELETE(/\/courses\/\d+/)
      .respond(function(method, url) {
        var courseid = url.split('/')[2];
        Server.deleteOne(courseid);
        return [204, {}, {}];
    });

    $httpBackend
      .whenPOST(/\/courses\/\d+/)
      .respond(function (method, url, data) {
        // get params
        var params = angular.fromJson(data);
        // get id
        var courseid = url.split('/')[2];
        // update course
        var course = Server.updateOne(courseid, params);
        //var result = [201, JSON.stringify(course), {Location: '/courses/' + courseid}];
        return [201, course, {Location: '/courses/' + courseid}];
    });

    $httpBackend
      .whenPOST('/courses')
      .respond(function(method, url, data) {
        var params = angular.fromJson(data);
        var course = Server.addOne(params);
        // get the id of the new resource to populate the Location field
        var courseid = course.courseid;
        return [201, course, { Location: '/games/' + courseid }];
    });

    $httpBackend
      .whenGET(/\/courses\/new/)
      .respond(function getCourse() {
        return [200, {}, {}];
      });

    $httpBackend
     .whenGET(/.*/)
     .passThrough();

    // Auth
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.breadcrumbs = [];
    $rootScope.user = null;

    // Check Auth
    var unregister = $rootScope.$on('$stateChangeStart',
      function (event, toState, toParams, fromState, fromParams) {
        AuthService.checkAccess(event, toState, toParams, fromState, fromParams);
      }
    );
    $rootScope.$on('$destroy', unregister)
  }

})();
