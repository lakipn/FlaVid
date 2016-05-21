/**
 * Created by lazar on 5/21/16.
 */
'use strict';

app
.controller('TestCookieCtrl', ['$scope', '$state', '$cookieStore',  function($scope, $state, $cookieStore) {

  $scope.uid = "";

  if($cookieStore.get('uid') == null) {
    $state.go('core.login');
  }
  else {
    $scope.uid = $cookieStore.get('uid');
  }

  $scope.logout = function() {
    $cookieStore.remove('uid');
    $state.go('core.login');
  }
}]);
