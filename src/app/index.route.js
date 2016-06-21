(function() {
  'use strict';

  angular
    .module('courses')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        views: {
          'header': {
            templateUrl: 'app/pages/header.html'
          },
          'footer': {
            templateUrl: 'app/pages/footer.html'
          },
          'content': {
            templateUrl: 'app/login/login.html',
            controller: 'LoginController',
            controllerAs: 'login'
          }
        },
        data: {
          noLogin: true
        }
      })
      .state('courses', {
        url: '/courses',
        views: {
          'header': {
            templateUrl: 'app/pages/header.html'
          },
          'user' : {
            templateUrl: 'app/user/user.html',
            controller: 'UserController',
            controllerAs: 'user'
          },
          'footer': {
            templateUrl: 'app/pages/footer.html'
          },
          'content': {
            templateUrl: 'app/courses/courses.html',
            controller: 'CoursesController',
            controllerAs: 'courses'
          }
        }
      })
      .state('course', {
        url: '/courses/:id',
        views: {
          'header': {
            templateUrl: 'app/pages/header.html'
          },
          'user': {
            templateUrl: 'app/user/user.html',
            controller: 'UserController',
            controllerAs: 'user'
          },
          'footer': {
            templateUrl: 'app/pages/footer.html'
          },
          'content': {
            templateUrl: 'app/course/course.html',
            controller: 'CourseController',
            controllerAs: 'course'
          }
        }
      });
      $urlRouterProvider.otherwise('/login');
  }

})();
