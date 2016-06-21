(function () {
    'use strict'

    angular
      .module('courses')
      .controller('UserController', UserController);

    /** @ngInject */
    function UserController(LocalStore, $location, $rootScope) {
        var vm = this;
        // Show user name
        vm.name = LocalStore.get('courseUser');
        // LogOff User
        vm.logOff = logOff;

        function logOff() {
            LocalStore.delete('courseUser');
            $rootScope.breadcrumbs = [];
            $location.path('/login');
        }

    }

})();
