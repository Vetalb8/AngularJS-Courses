(function () {
  'use strict'

  angular
    .module('courses')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController($location, LocalStore, LoginService) {
    var vm = this;
    // Show error false
    vm.authenticationError = false;
    // Поле «Логин» может содержать, только латинские буквы
    vm.loginNamePattern = /^[A-Za-z]+$/;
    // Поле «Пароль» может содержать, латинские буквы и цифры
    vm.passPattern = /^[a-zA-Z0-9]+$/;
    // Enter in Courses
    vm.enterInCourses = enterInCourses;

    // Enter In Courses
    function enterInCourses(user) {
      LoginService.login({
        name: user.login,
        password: user.password
      }).then(function (response) {
        if (response.data) {
          LocalStore.save(vm.user.login);
          $location.path('/courses');
        } else {
          vm.authenticationError = true;
          $location.path('/login');
          vm.user.password = '';
        }
      })
    }
  }

})();
