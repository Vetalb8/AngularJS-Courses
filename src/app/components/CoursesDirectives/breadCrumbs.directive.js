(function(){
  'use strict';

  angular
    .module('courses')
    .directive('breadCrumbs', breadCrumbs);

  /** @ngInject */
  function breadCrumbs($location) {

    function link(scope) {
      scope.activeAddres = $location.path();
      scope.$on('$locationChangeSuccess', function() {
        scope.activeAddres = $location.path();
      });
    }
    return {
      link: link,
      scope: {
        data: '='
      },
      templateUrl: 'app/components/CoursesDirectives/bread.html'
    };
  }

})();
