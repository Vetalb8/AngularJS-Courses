(function () {
  'use strict'

  angular
    .module('courses')
    .service('AuthService', AuthService);

  /** @ngInject */
  function AuthService($rootScope, LocalStore) {

    this.checkAccess = function (event, toState) {

      if (toState.data === 'undefined') {
        // Enter with Auth
        if (LocalStore.get('courseUser')) {
          $rootScope.user = LocalStore.get('courseUser');
        } else {
          // Redirect to login
          event.preventDefault();
          $rootScope.$state.go('login');
          $rootScope.breadcrumbs = [];
        }
      }
    };
  }


})();