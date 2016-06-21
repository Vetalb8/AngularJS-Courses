(function () {
  'use strict'

  angular
    .module('courses')
    .factory('AuthorsService', AuthorsService);

  /** @ngInject */
  function AuthorsService($resource) {
    return $resource('/authors');
  }


})();