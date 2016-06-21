(function () {
  'use strict';

  angular
    .module('courses')
    .directive('validator', validator);


  function validator() {

    var regexes = {
      date: /^\d{2}\.\d{2}\.\d{4}$/
    };

    function getPart(len, part) {
      if(len > part.length) {
        return part;
      }
      var chars = 0;
      for (var i = 0; i < part.length && chars < len; i++) {
        if (part[i] === '\\') {
          continue;
        }
        chars++;
      }
      return part.substr(0,  i);
    }

    function link(scope, elem, attrs, ngModelCtrl) {

      var validationType = attrs.validator,
          regex = new RegExp(regexes[validationType]);

      //Model to the View
      ngModelCtrl.$formatters.unshift(function (value) {
        setErrorIfInvalid(value);
        return value;
      });
      // View to the model
      ngModelCtrl.$parsers.unshift(filterString, formatDate);

      function filterString(value) {
        var part,
            regex,
            pass,
            viewVal;

        part =  getPart(value.length, attrs.check);
        regex = new RegExp(part);
        pass = regex.exec(value);

        viewVal = pass ? pass.shift() : ngModelCtrl.$modelValue;

        ngModelCtrl.$setViewValue(viewVal);
        ngModelCtrl.$render();
        return viewVal;
      }

      function formatDate(value) {
        setErrorIfInvalid(value);
        return value;
      }

      function setErrorIfInvalid(value) {
        var isValid = regex.test(value);
        if(isValid){
          var date = value.split('.');
          if(parseInt(date[1]) > 12 || parseInt(date[0]) > 32){
            isValid = false;
          }
        }
        ngModelCtrl.$setValidity('invalid', isValid);
        return isValid;
      }

    }

    return {
      restrict: 'A',
      require: 'ngModel',
      link: link
    }

  }

})();
