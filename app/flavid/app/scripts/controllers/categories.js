'use strict';

app
  .controller('categoriesCtrl', ['$scope', '$cookieStore', function ($scope, $cookieStore) {
    if($cookieStore.get('uid') == null) {
      $state.go('core.login');
    }

  }]);

