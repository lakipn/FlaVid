'use strict';

/**
 * Created by Werew on 29/05/2016.
 */

app
  .controller('profileCtrl', ['profileFactory', 'categoryFactory', '$scope', '$state', '$http', '$cookieStore', 'Upload', '$timeout', function (profileFactory, categoryFactory, $scope, $state, $http, $cookieStore, Upload, $timeout) {
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

    $scope.user = profileFactory.getUserProfileInfo($scope, $http, $scope.uid);
    categoryFactory.getCategories($scope, $http);

    $scope.uploadVideos = function (file, errFiles) {
      $scope.f = file;
      $scope.errFile = errFiles && errFiles[0];
      if (file) {
        file.upload = Upload.upload({
          url: 'http://localhost:1337/video/uploadNewVideo',
          data: {video: file}
        });

        file.upload.then(function (response) {
          $timeout(function () {
            //file.result = response.data;
            $scope.f.result = response.data;
            //console.log($scope.video.title);
            var data2send = {
              title: $scope.video.title,
              sourceName: "FlaVid",
              sourceUrl: "/assets/uploads/videos/" + response.data.data.filename,
              url: response.data.data.filename,
              duration: 180,
              userId : $cookieStore.get('uid')
            };
            $scope.f.result.updatedDB = profileFactory.uploadNewVideoDB($scope, $http, data2send);
            $timeout(function() {
              //console.log("UpdatedDB : " + JSON.stringify($scope.f.result.updatedDB));
              for(var i = 0; i < $scope.category.length; i++)
              {
                var catId = $.grep($scope.categories, function(e) { return e.name = $scope.category[i]; });
                //console.log("i = " + i + "\t\tNasao: " + JSON.stringify(catId));
                var bc2vd = {
                  catId : catId[0].id,
                  name : $scope.category[i],
                  video : $scope.f.result.updatedDB.id
                };
                $scope.f.result.categoriesBinded = categoryFactory.bindCategoryToVideo($scope, $http, bc2vd);
              }

              // refresh page
              $state.reload();
            }, 100);
          });
        }, function (response) {
          if (response.status > 0)
            $scope.errorMsg = response.status + ': ' + response.data;
        }, function (evt) {
          //file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
          $scope.f.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        });
      }
    };


  }]);
