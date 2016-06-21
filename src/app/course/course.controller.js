(function () {
  'use strict';

  angular
    .module('courses')
    .controller('CourseController', CourseController);

  /** @ngInject */
  function CourseController($stateParams, CoursesService, $log, $location, $rootScope, $scope, AuthorsService) {
    var vm = this;
    // Edit=1 and Add = 0
    var check = 0;
    // Show course
    vm.course = {};
    // Save or Update Course
    vm.saveCourse = saveCourse;
    // Cancel
    vm.returnToCourses = returnToCourses;
    // Authors
    vm.getAuthors = AuthorsService.query();
    vm.getAuthors.$promise.then(function (data) {
      vm.authors = data;
    });
    // Patterns
    vm.titlePattern = /^[a-zA-Z0-9]+$/;

    var courseid = $stateParams.id;

    if (courseid !== 'new' || courseid !== 'undefined') {
      check = 1;
      vm.course = CoursesService.get({courseid: courseid});
      vm.course.$promise.then(function (data) {
        setCrumbs(data.title);
      })
    }

    $scope.$watch(angular.bind(vm, function () {
      return this.course.title;
    }), function (newVal) {
      var breadcrumb = newVal;
      setCrumbs(breadcrumb);
    });

    function saveCourse(course) {
      if (check) {
        course.$save().then(function () {
          vm.updateResults = CoursesService.query();
          $location.path('/courses');
        });
      } else {
        CoursesService.save(course);
      }
    }

    function returnToCourses() {
      $location.path('/courses');
    }

    function setCrumbs(url) {
      $rootScope.breadcrumbs = [{
        url: '#/courses',
        title: 'Course'
      }, {
        url: '#' + $location.path(),
        title: url ? url : 'NewCourse'
      }];
    }
  }

})();
