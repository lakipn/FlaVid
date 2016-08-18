'use strict';

/**
 * @ngdoc function
 * @name flavidApp.controller:PagesLoginCtrl
 * @description
 * # PagesLoginCtrl
 * Controller of the flavidApp
 */
app
  .controller('LoginCtrl', ['sharedData', 'loginFactory', '$scope', '$rootScope', '$state', '$http', '$cookieStore', function (sharedData, loginFactory, $scope, $rootScope, $state, $http, $cookieStore) {

    $scope.prosao = false;
    $scope.getted = {};

    if($cookieStore.get('uid') != null)
    {
      $state.go('app.home');
    }

    $scope.$watch('getted', function() {
      if($scope.prosao && $scope.getted !== {} && $scope.getted != "") {
        sharedData.setUser($scope.getted);
        $rootScope.uid = $scope.getted;
        $cookieStore.put('uid', $scope.getted.id);
        //$state.go('testcookie');
        $state.go('app.home');
      }
    });

    $scope.login = function (form) {
      loginFactory.checkLogin($scope, $http, form.username, form.password);
      //$state.go('app.dashboard');
    };
  }]);
