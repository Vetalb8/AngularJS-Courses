(function () {
  'use strict';

  angular
    .module('courses')
    .controller('CoursesController', CoursesController);

  /** @ngInject */
  function CoursesController(CoursesService, $uibModal, $log, $scope, $rootScope) {
    var vm = this;
    // Set empty search course
    vm.courseTitle = '';
    // Show Courses;
    vm.courses = CoursesService.query();
    // Search Course
    vm.searchCourse = searchCourse;
    // Delete Course
    $scope.deleteCourse = deleteCourse;
    // BreadCrumbs
    $rootScope.breadcrumbs = [{
      url: '#/courses',
      title: 'Courses'
    }];

    function deleteCourse(size, selectedCourse) {
      var modalInstanse = $uibModal.open({
        // Animation
        animation: false,
        // Template
        templateUrl: 'app/courses/modal.html',
        // Size modal window
        size: size,
        // Send Selected Course
        resolve: {
          course: function () {
            return selectedCourse;
          }
        },
        // Controller Modal Window
        controller: function ($scope, $uibModalInstance, course) {
          // Show course title
          $scope.courseTitle = course.title;
          // Confirm Delete Course
          $scope.chooseOk = function () {
            $uibModalInstance.close(course.courseid);
          };
          // Cancel Delete Course
          $scope.chooseCancel = function () {
            $uibModalInstance.dismiss('cancel');
          };
        }
      });
      // Get Course ID
      modalInstanse.result.then(function (courseid) {
        // Delete Course
        vm.deleteCourse = CoursesService.get({ courseid: courseid }, function(){
          if(angular.isUndefined(vm.deleteCourse.courseid)) {
            return;
          }
          vm.deleteCourse.$delete().then(function(){
            vm.courses = CoursesService.query();
          })
        });
        //console.log(vm.deleteCourse);
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });

    }

    function searchCourse(title){
      if(vm.courseTitle) {
        vm.searchCourseTitle = title;
      } else {
        vm.searchCourseTitle = '';
      }
    }

  }

})();
