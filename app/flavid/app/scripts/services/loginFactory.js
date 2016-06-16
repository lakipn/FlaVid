'use strict';

app.factory('loginFactory', function () {
  var loginFactory = {};
  var data = [];

  /**
   * Checking if user with specified username and password exists
   * @param $scope
   * @param $http
   * @param username
   * @param password
   */
  loginFactory.checkLogin = function ($scope, $http, username, password) {
    $http.get('http://localhost:1337/user/checkLogin', {
        params: {
          username: username,
          password: password
        }
      })
      .then(function (response) {
        data = response.data;
        $scope.prosao = true;
        $scope.getted = response.data;
        return response.data;
      });
  };

  /**
   * User registration --- missing: validation, checking if username or email exists
   * @param $scope
   * @param $http
   * @param user
   */
  loginFactory.register = function ($scope, $http, user) {
    var body = JSON.stringify(user);
    $http.post('http://localhost:1337/user', body)
      .then(function (response) {
        data = response.data;
        $scope.prosao = true;
        $scope.posted = response.data;
      }, function (response) {
        $scope.posted = response.data;
      });
  };

  return loginFactory;
});
