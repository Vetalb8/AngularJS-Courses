(function () {
  'use strict';

  angular
    .module('courses')
    .factory('Auth', Auth);

  /** @ngInject */
  function Auth(LocalStore) {
    var user = LocalStore.get('courseUser') || 0;
    var publicUrl = ['login'];

    return {
      authorize: function(state) {
        return (this.isLoggedIn() && (publicUrl.indexOf(state) < 0)) || (!this.isLoggedIn() && (publicUrl.indexOf(state) >= 0))
      },
      isLoggedIn: function() {
        return !!user;
      }
    }
  }
})();
