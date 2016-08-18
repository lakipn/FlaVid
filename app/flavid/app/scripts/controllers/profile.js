'use strict';

/**
 * Created by Werew on 29/05/2016.
 */

app
  .controller('profileCtrl', ['profileFactory', 'categoryFactory', 'videoFactory', '$scope', '$state', '$stateParams', '$http', '$cookieStore', 'Upload', '$timeout',
    function (profileFactory, categoryFactory, videoFactory, $scope, $state, $stateParams, $http, $cookieStore, Upload, $timeout) {
      $scope.uid = "";
      if ($cookieStore.get('uid') == null) {
        $state.go('core.login');
      }
      else {
        $scope.uid = $cookieStore.get('uid');
      }

      $scope.user = {
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        profilePictureUrl: "",
        coverPictureUrl: "",
        birthday: "",
        gender: "",
        relationshipStatus: "",
        interestedIn: "",
        personalWebsite: "",
        hometown: "",
        currentCity: "",
        country: "",
        workOccupation: "",
        workCompany: "",
        educationSchool: "",
        aboutMe: "",
        interestsAndHobbies: "",
        favoriteMoviesAndHobbies: "",
        favoriteMusic: "",
        favoriteBooks: "",
        id: ""
      };
      $scope.gettedProfileInfo = false;

      var visited = false;

      if(typeof($stateParams.username) !== 'undefined' && $stateParams.username.length > 0)
      {
        visited = true;
        $scope.userId = profileFactory.getUserIdByUsername($scope, $http, $stateParams.username);
      }

      $scope.user = profileFactory.getUserProfileInfo($scope, $http, visited);
      categoryFactory.getCategories($scope, $http);

      $scope.uploadVideos = function (file, errFiles) {
        var tmpfile;
        $scope.f = file;
        $scope.ff = file;
        $scope.errFile = errFiles && errFiles[0];
        if (file) {
          file.upload = Upload.upload({
            url: 'http://localhost:1337/video/uploadNewVideo',
            data: {video: file}
          });

          file.upload.then(function (response) {
            tmpfile = file;
            $timeout(function () {
              //file.result = response.data;
              $scope.f.result = response.data;
              //console.log("REZULTAT: " + JSON.stringify($scope.f.result));
              var data2send = {
                title: $scope.video.title,
                description: $scope.video.description,
                sourceName: "FlaVid",
                sourceUrl: "/assets/uploads/videos/" + $scope.f.result.data.filename.substr(0),
                url: $scope.f.result.data.filename.substr(0, $scope.f.result.data.filename.lastIndexOf('.')),
                duration: 180,
                userId: $cookieStore.get('uid')
              };
              //console.log(JSON.stringify(data2send));
              /*$scope.f.result.updatedDB = */
              profileFactory.uploadNewVideoDB($scope, $http, data2send);
              $timeout(function () {
                while ($scope.f.result.updatedDB == null) {
                }
                //console.log("UpdatedDB : " + JSON.stringify($scope.f.result.updatedDB));
                for (var i = 0; i < $scope.category.length; i++) {
                  var catId = $.grep($scope.categories, function (e) {
                    return e.name = $scope.category[i];
                  });
                  //console.log("i = " + i + "\t\tNasao: " + JSON.stringify(catId));
                  var bc2vd = {
                    catId: catId[0].id,
                    name: $scope.category[i],
                    video: $scope.f.result.updatedDB.id
                  };
                  $scope.f.result.categoriesBinded = categoryFactory.bindCategoryToVideo($scope, $http, bc2vd);
                }

                //console.log($scope.ff.type);

                //profileFactory.setThumbnail($scope, $http, { vidId: $scope.f.result.data.id, file : $scope.ff });

                // refresh page
                $state.reload();
              }, 100);
            });
          }, function (response) {
            if (response.status > 0)
              $scope.errorMsg = response.status + ': ' + response.data;
          }, function (evt) {
            $scope.f.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
          });
        }
      };

      $scope.myFreshVideos = [];
      $scope.myPopularVideos = [];

      $scope.$watch('user', function() {
        if($scope.user != null) {
          videoFactory.myFreshVideos($scope, $http, $scope.user.id);
          videoFactory.myPopularVideos($scope, $http, $scope.user.id);
        }
      });

      if($scope.user != null) {
        videoFactory.myFreshVideos($scope, $http, $scope.user.id);
        videoFactory.myPopularVideos($scope, $http, $scope.user.id);
      }

      $scope.freshLimit = 3;
      $scope.popularLimit = 3;

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

      $scope.$watch('myFreshVideos', function () {
        if ($scope.myFreshVideos != []) {
          $scope.myFreshVideos.forEach(function (video) {
            var categories = [];
            video.categories.forEach(function (category) {
              categories.push(category.name);
            });

            video.categoriesStr = categories.join(', ');
          });
        }
      });

      $scope.$watch('myPopularVideos', function () {
        if ($scope.myPopularVideos != []) {
          $scope.myPopularVideos.forEach(function (video) {
            var categories = [];
            video.categories.forEach(function (category) {
              categories.push(category.name);
            });

            video.categoriesStr = categories.join(', ');
          });
        }
      });


    }]);
