'use strict';

app.factory('loginFactory', function() {
  var loginFactory = {};
  var data = [];

  loginFactory.testGet = function($scope, $http, username, password) {
    $http.get('http://localhost:1337/user/checkLogin', {
        params : {
          username : username,
          password : password
        }
      })
      .then(function(response) {
        data = response.data;
        $scope.prosao = true;
        $scope.getted = response.data;
        return response.data;
      });
  };

  loginFactory.testPost = function($scope, $http, user) {
    var body = JSON.stringify(user);
    $http.post('http://localhost:1337/user', body)
      .then(function(response) {
        data = response.data;
        $scope.prosao = true;
        $scope.posted = response.data;
      }, function(response) {
        $scope.posted = response.data;
      });
  };

  return loginFactory;
});
