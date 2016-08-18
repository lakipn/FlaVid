'use strict';

app.factory('profileFactory', function() {
  var profileFactory = {};

  /**
   * Getting data about specified user, by it's ID
   * @param $scope
   * @param $http
   * @param id
     */
  profileFactory.getUserProfileInfo = function($scope, $http, specified) {
    if(specified) {
      $scope.$watch('userId', function () {
        if ($scope.userId != null) {
          profileFactory.getUserProfileInfoHelp($scope, $http, $scope.userId);
        }
      });
    }
    else
      profileFactory.getUserProfileInfoHelp($scope, $http, $scope.uid);
  };

  profileFactory.getUserProfileInfoHelp = function($scope, $http, id) {
    var data = {};

    $http.get('http://localhost:1337/user/' + id).then(function(response) {
      data = response.data;
      $scope.gettedProfileInfo = true;
      $scope.user = response.data;
      return data;
    });
  };

  /**
   * Call API's function for inserting document about new video into DB
   * @param $scope
   * @param $http
   * @param data
     */
  profileFactory.uploadNewVideoDB = function($scope, $http, data) {
    $http.post('http://localhost:1337/video/uploadNewVideoDB', JSON.stringify(data)).then(function(response) {
      //console.log("UploadNewVideoDB: " + JSON.stringify(response.data));
      $scope.f.result.updatedDB = response.data;
      return response.data;
    });
  };

  profileFactory.setThumbnail = function($scope, $http, data) {
    $http.post('http://localhost:1337/video/populateThumbnail', data).then(function(response) {
      $scope.f.result.embededThumbnail = response.data;
      console.log($scope.f.result);
      return response.data;
    });
  };

  profileFactory.getUserIdByUsername = function($scope, $http, username) {
    $http.post('http://localhost:1337/user/getUserIdByUsername', {
      username: username
    }).then(function(response) {
      $scope.userId = response.data;
      return response.data;
    });
  };

  return profileFactory;
});
