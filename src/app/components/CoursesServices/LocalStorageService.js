(function () {
  'use strict';

  angular
    .module('courses')
    .factory('LocalStore', LocalStore);

  /** @ngInject */
  function LocalStore(localStorageService) {
      return {
        save: function (val) {
          return localStorageService.set('courseUser', val);
        },
        get: function (key) {
          return localStorageService.get(key);
        },
        delete: function (key) {
          return localStorageService.remove(key);
        }
      }
  }

})();