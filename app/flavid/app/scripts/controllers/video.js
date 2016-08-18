'use strict';

app
  .controller('videoCtrl', ['$scope', '$http', '$cookieStore', '$state', '$stateParams', '$sce', 'videoFactory', function ($scope, $http, $cookieStore, $state, $stateParams, $sce, videoFactory) {
    if ($cookieStore.get('uid') == null) {
      $state.go('core.login');
    }

    if ($stateParams.videoUrl == null || $stateParams.videoUrl.length != 36)
      $state.go('app.home');
    else {

      $scope.vidUrl = $stateParams.videoUrl;

      $scope.url = "http://localhost:1337/uploads/videos/" + $scope.vidUrl + ".mp4";

      videoFactory.getVideo($scope, $http, $scope.vidUrl);

      $scope.$watch('video', function () {
        if ($scope.video != null && $scope.video.viewsCount != null) {
          //console.log(JSON.stringify($scope.video));
          videoFactory.incrementViews($scope, $http, $scope.video.id);
        }
      });

      $scope.trustSrc = function (src) {
        return $sce.trustAsResourceUrl(src);
      }
    }

  }]);
