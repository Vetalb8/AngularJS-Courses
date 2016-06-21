(function () {
  'use strict';

  angular
    .module('courses')
    .factory('CoursesService', CoursesService);

  /** @ngInject */
  function CoursesService($resource) {
    return $resource('/courses/:courseid', { courseid: '@courseid' });
  }

})();