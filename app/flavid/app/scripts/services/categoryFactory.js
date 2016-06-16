'use strict';

app.factory('categoryFactory', function() {
  var categoryFactory = {};

  /**
   * Get list of all categories
   * @param $scope
   * @param $http
     */
  categoryFactory.getCategories = function($scope, $http) {
    $http.get('http://localhost:1337/category')
      .then(function(response) {
        console.log(JSON.stringify(response.data));
        $scope.categories = response.data;
        return response.data;
      });
  };

  /**
   * Binding categories to specified video
   * @param $scope
   * @param $http
   * @param data
     */
  categoryFactory.bindCategoryToVideo = function($scope, $http, data) {
    var body = JSON.stringify(data);
    $http.post('http://localhost:1337/videoscategory', data)
      .then(function(response) {
        return response.data;
      });
  };

  return categoryFactory;
});
