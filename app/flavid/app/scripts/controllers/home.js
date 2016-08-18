'use strict';

app
  .controller('homepageCtrl', ['$scope', '$cookieStore', '$state', '$http', 'videoFactory', function ($scope, $cookieStore, $state, $http, videoFactory) {
    if ($cookieStore.get('uid') == null) {
      $state.go('core.login');
    }

    $scope.freshUsersVideos = [];
    $scope.popularOnNetworkVideos = [];
    $scope.freshLimit = 3;
    $scope.popularLimit = 3;
    $scope.editorsPickLimit = 3;

    $scope.$watch('popularOnNetworkVideos', function () {
      if ($scope.popularOnNetworkVideos != []) {
        $scope.popularOnNetworkVideos.forEach(function (video) {
          var categories = [];
          video.categories.forEach(function (category) {
            categories.push(category.name);
          });

          video.categoriesStr = categories.join(', ');
        });
      }
    });

    $scope.$watch('freshUsersVideos', function () {
      if ($scope.freshUsersVideos != []) {
        $scope.freshUsersVideos.forEach(function (video) {
          var categories = [];
          video.categories.forEach(function (category) {
            categories.push(category.name);
          });

          video.categoriesStr = categories.join(', ');
        });
      }
    });

    videoFactory.freshUsersVideos($scope, $http);
    videoFactory.popularOnNetworkVideos($scope, $http);

    $scope.incrementFreshLimit = function () {
      try {
        $scope.freshLimit += 3;
        if ($scope.freshLimit > $scope.freshUsersVideos.length)
          $scope.freshLimit = $scope.freshUsersVideos.length;
      } catch (exception) {
      }
    };

    $scope.incrementPopularLimit = function () {
      try {
        $scope.popularLimit += 3;
        if ($scope.popularLimit > $scope.freshUsersVideos.length)
          $scope.popularLimit = $scope.freshUsersVideos.length;
      } catch (exception) {
      }
    };

    $scope.incrementEditorsPickLimit = function () {
      try {
        $scope.editorsPickLimit += 3;
        if ($scope.editorsPickLimit > $scope.freshUsersVideos.length)
          $scope.editorsPickLimit = $scope.freshUsersVideos.length;
      } catch (exception) {
      }
    };

  }]);

