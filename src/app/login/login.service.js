(function () {
  'use strict';

  angular
    .module('courses')
    .factory('LoginService', LoginService);

  /** @ngInject */
  function LoginService($http) {
    var service = {
      login: function(data) {
        return $http.post('/login', data);
      }
    };
    return service;
  }

})();