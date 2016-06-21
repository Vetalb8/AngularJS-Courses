(function(){
  'use strict';

  angular
    .module('courses.Filters', [])
    .filter('sortCourseTitle', function() {
      return function (items, criterion) {
        if(angular.isUndefined(criterion.title) || criterion.title === '') {
          return items;
        }
        var result = [];
        for (var i = 0; i < items.length; i++) {
          var item = items[i];
          if(item.title.toLowerCase() == criterion.title.toLowerCase()){
            result.push(item);
          }
        }
        return result;
      }
    })
    .filter('viewCourseTime', function () {
      return function (str) {
        if (angular.isUndefined(str) && isNaN(parseInt(str))) {
          return str;
        }
        var min = parseInt(str);
        var textHour = ['час', 'часа', 'часов'];
        var textMinute = ['минута', 'минуты', 'минут'];
        var hours = Math.floor(min / 60);
        var time = hours !== 0 ? min % 60 : min;
        var output = '';

        if(hours) {
          output = num(hours, textHour);
          if(time){
            output += ' ' + num(time, textMinute);
          }
        } else {
          output += ' ' + num(time, textMinute);
        }

        function num(val, array) {
          var result = '';
          var rest = val % 10;

          if(val >= 10 && val <= 20){
            return result = val + ' ' + array[2];
          }

          if (rest > 1 && rest < 5) {
            result = val + ' ' + array[1];
          } else if(rest === 1){
            result = val + ' ' + array[0];
          } else if(rest === 0){
            result = '';
          } else {
            result = val + ' ' + array[2];
          }
          return result;
        }

        return output;
      }
    })

})();

