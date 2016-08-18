'use strict';

/**
 * @ngdoc function
 * @name flavidApp.controller:PagesForgotPasswordCtrl
 * @description
 * # PagesForgotPasswordCtrl
 * Controller of the flavidApp
 */
app
  .controller('ForgotPasswordCtrl', function ($scope) {
    if($cookieStore.get('uid') == null) {
      $state.go('core.login');
    }
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
