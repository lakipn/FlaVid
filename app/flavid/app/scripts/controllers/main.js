'use strict';

/**
 * @ngdoc function
 * @name flavidApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the flavidApp
 */
app
  .controller('MainCtrl', ['$scope', '$http', '$translate', '$cookieStore', '$state', 'loginFactory', function ($scope, $http, $translate, $cookieStore, $state, loginFactory) {

    $scope.main = {
      title: 'FlaVid',
      settings: {
        navbarHeaderColor: 'scheme-default',
        sidebarColor: 'scheme-default',
        brandingColor: 'scheme-default',
        activeColor: 'default-scheme-color',
        headerFixed: true,
        asideFixed: true,
        rightbarShow: false
      }
    };

    $scope.ajaxFaker = function(){
      $scope.data=[];
      var url = 'http://www.filltext.com/?rows=10&fname={firstName}&lname={lastName}&delay=5&callback=JSON_CALLBACK';

      $http.jsonp(url).success(function(data){
        $scope.data=data;
        angular.element('.tile.refreshing').removeClass('refreshing');
      });
    };

    $scope.changeLanguage = function (langKey) {
      $translate.use(langKey);
      $scope.currentLanguage = langKey;
    };
    $scope.currentLanguage = $translate.proposedLanguage() || $translate.use();

    $scope.logout = false;

    $scope.signout = function () {
      $scope.$watch('logout', function () {
        if ($scope.logout != false) {
          $cookieStore.remove('uid');
          $state.go('core.login');
        }
      });

      loginFactory.logout($scope, $http);
    };
  }]);
