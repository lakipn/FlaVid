'use strict';

/**
 * @ngdoc function
 * @name flavidApp.controller:PagesSignupCtrl
 * @description
 * # PagesSignupCtrl
 * Controller of the flavidApp
 */
app
  .controller('SignupCtrl', ['loginFactory', '$scope', '$state', '$http', '$cookieStore', function (loginFactory, $scope, $state, $http, $cookieStore) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.prosao = false;
    $scope.posted = {};

    if($cookieStore.get('uid') != null)
    {
      //$state.go('testcookie');
      $state.go('app.home');
    }

    $scope.$watch('posted', function() {
      if($scope.prosao && $scope.posted !== {} && $scope.posted !== "") {
        $cookieStore.put('uid', $scope.posted.id);
        //$state.go('testcookie');
        $state.go('app.home');
      }
    });

    $scope.register = function(form) {
      var user = {
        username: form.username,
        password: form.password,
        email: form.email,
        birthday: form.birthday,
        gender: form.gender,
        relationshipStatus: form.relationshipStatus,
        interestedIn: form.interestedIn };
      loginFactory.register($scope, $http, user);
    }
  }]);
