'use strict';

app
  .controller('categoryCtrl', function ($scope) {
    if($cookieStore.get('uid') == null) {
      $state.go('core.login');
    }
  });

