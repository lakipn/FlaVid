/**
 * Created by lazar on 8/13/16.
 */
app.factory('videoFactory', function() {
  var videoFactory = {};

  /**
   * Get social network's fresh videos
   * @param $scope
   * @param $http
     */
  videoFactory.freshUsersVideos = function($scope, $http) {
    $http.get('http://localhost:1337/video/freshUsersVideos').then(function(response) {
      $scope.freshUsersVideos = response.data;
    });
  };

  /**
   * Get social network's popular viddeos
   * @param $scope
   * @param $http
     */
  videoFactory.popularOnNetworkVideos = function($scope, $http) {
    $http.get('http://localhost:1337/video/popularOnNetwork').then(function(response) {
      $scope.popularOnNetworkVideos = response.data;
    });
  };

  /**
   * Get video by it's URL
   * @param $scope
   * @param $http
   * @param url
     */
  videoFactory.getVideo = function($scope, $http, url) {
    $http.get('http://localhost:1337/video/getVideoIdByUrl?url=' + url).then(function(res) {
      $http.get('http://localhost:1337/video/' + res.data[0].id).then(function(response) {
        $scope.video = response.data;
        $scope.video.description = $scope.video.description.replace(/(?:\r\n|\r|\n)/g, '&nbsp;');
      });
    });
  };

  /**
   * Increment video's views count whenever video's being watched
   * @param $scope
   * @param $http
   * @param vidId
     */
  videoFactory.incrementViews = function($scope, $http, vidId) {
    $http.post('http://localhost:1337/video/incrementViewsCount', {
      vidId : vidId
    }).then(function(response) {
      $scope.video.viewsCount++;
    });
  };

  /**
   * Get specific user's fresh videos
   * @param $scope
   * @param $http
   * @param uid
     */
  videoFactory.myFreshVideos = function($scope, $http, uid) {
    $http.post('http://localhost:1337/video/myFreshVideos', {
      userId: uid
    }).then(function(response) {
      $scope.myFreshVideos = response.data;
    });
  };

  /**
   * Get specific user's popular videos
   * @param $scope
   * @param $http
   * @param uid
     */
  videoFactory.myPopularVideos = function($scope, $http, uid) {
    $http.post('http://localhost:1337/video/myPopularVideos', {
      userId: uid
    }).then(function(response) {
      $scope.myPopularVideos = response.data;
    });
  };

  return videoFactory;
});
