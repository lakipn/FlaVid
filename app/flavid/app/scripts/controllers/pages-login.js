'use strict';

/**
 * @ngdoc function
 * @name minovateApp.controller:PagesLoginCtrl
 * @description
 * # PagesLoginCtrl
 * Controller of the minovateApp
 */
app
  .controller('LoginCtrl', ['sharedData', 'loginFactory', '$scope', '$rootScope', '$state', '$http', '$cookieStore', function (sharedData, loginFactory, $scope, $rootScope, $state, $http, $cookieStore) {

    $scope.prosao = false;
    $scope.getted = {};

    if($cookieStore.get('uid') != null)
    {
      $state.go('testcookie');
    }

    $scope.$watch('getted', function() {
      if($scope.prosao && $scope.getted !== {} && $scope.getted != "") {
        sharedData.setUser($scope.getted);
        $rootScope.uid = $scope.getted;
        $cookieStore.put('uid', $scope.getted._id);
        $state.go('testcookie');
      }
    });

    $scope.login = function (form) {
      loginFactory.testGet($scope, $http, form.username, form.password);
      //$state.go('app.dashboard');
    };
  }]);
