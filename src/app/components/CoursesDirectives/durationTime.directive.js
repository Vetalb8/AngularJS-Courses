(function () {
  'use strict';
  angular
    .module('courses')
    .directive('duration', duration);

  /** @ngInject */
  function duration($filter) {

    function link(scope, elem, attrs, ngModelCtrl) {
      var filterName = attrs.duration;
      var timeElem = angular.element('<span>');
      elem.parent().append(timeElem);

      var watcherFunction = function () {
        return ngModelCtrl.$modelValue;
      };

      scope.$watch(watcherFunction, function(newValue) {
        var time = parseInt(newValue) ? $filter(filterName)(newValue) : '';
        timeElem.text(time);
      });
    }

    return {
      restrict: 'A',
      require: 'ngModel',
      link: link
    }
  }
})();
