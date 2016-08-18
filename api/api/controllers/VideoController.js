var FileUploadThumbnail = require('file-upload-thumbnail');

module.exports = {

  /**
   * Populate video's categories
   * @param request
   * @param response
   */
  populateCategories: function (request, response) {
    var vidID = request.param('vidId');

    Video.find(vidID).populate('categories').exec(function (err, res) {
      if (err)
        return response.serverError(err);
      return response.json(res);
    });
  },

  /**
   * Populate video with it's comments
   * @param request
   * @param response
   */
  populateComments: function (request, response) {
    var vidID = request.param('vidId');

    Video.find(vidID).populate('comments').exec(function (err, res) {
      if (err)
        return response.serverError(err);

      return response.json(res);
    });
  },

  /**
   * Populate video with it's likes
   * @param request
   * @param response
   */
  populateLikes: function (request, response) {
    var vidID = request.param('vidId');

    Video.find(vidID).populate('likes').exec(function (err, res) {
      if (err)
        return response.serverError(err);
      return response.json(res);
    });
  },

  /**
   * Get META data about video
   * @param request
   * @param response
   */
  getMETA: function (request, response) {
    var vidID = request.param('vidId');

    Video.findOne(vidID).exec(function (err, res) {
      if (err)
        return response.serverError(err);

      return response.ok(res);
    });
  },

  /**
   * Get statistical data about video
   * @param request
   * @param response
   */
  getStats: function (request, response) {
    var vidID = request.param('vidId');

    Video.findOne(vidID).exec(function (err, res) {
      if (err)
        return response.serverError(err);
      var retObj = {};
      retObj.views = res['viewsCount'];
      retObj.comments = res['commentsCount'];
      return response.json(retObj);
    })
  },

  /**
   * Increment video's view count (every time a user see the video)
   * @param request
   * @param response
   */
  incrementViewsCount: function (request, response) {
    var vidID = request.param('vidId');

    var currentCount;
    Video.findOne(vidID).exec(function (err, res) {
      if (err)
        return response.serverError(err);
      currentCount = parseInt(res['viewsCount'], 10);
      currentCount++;

      Video.update({"id": vidID}, {"viewsCount": currentCount}).exec(function (err, res) {
        if (err)
          return response.serverError(err);

        return response.ok(res);
      });
    });
  },

  /**
   * Get list of most popular videos on network
   * @param request
   * @param response
   */
  popularOnNetwork: function (request, response) {
    Video.find({}).populate('categories').sort("viewsCount DESC").exec(function (err, res) {
      if (err)
        return response.serverError(err);

      return response.ok(res);
    });
  },

  /**
   * Get list of fresh videos uploaded by followed users
   * @param request
   * @param response
   */
  freshFriends: function (request, response) {
    // NOT GOOD --- Should be: only videos uploaded by followed users
    Video.find({}).sort("createdAt DESC").exec(function (err, res) {
      if (err)
        return response.serverError(err);

      return response.ok(res);
    })
  },

  /**
   * Fresh videos on social network
   * @param request
   * @param response
   */
  freshUsersVideos: function (request, response) {
    Video.find({}).populate('categories').sort("createdAt DESC").exec(function (err, res) {
      if (err)
        return response.serverError(err);

      return response.ok(res);
    });
  },

  /**
   * Get specific user's fresh videos.
   * @param request
   * @param response
     */
  myFreshVideos: function (request, response) {
    Video.find({userId: request.param('userId')}).populate('categories').sort("createdAt DESC").exec(function (err, res) {
      if(err)
        return response.serverError(err);

      return response.ok(res);
    });
  },

  /**
   * Get specific user's popular videos.
   * @param request
   * @param response
     */
  myPopularVideos: function (request, response) {
    Video.find({userId: request.param('userId')}).populate('categories').sort("viewsCount DESC").exec(function (err, res) {
      if(err)
        return response.serverError(err);

      return response.ok(res);
    });
  },

  /**
   * Upload new video file
   * @param request
   * @param response
   * Important note: Not ready for production, because there's no file validation and compression!
   */
  uploadNewVideo: function (request, response) {
    var filename = "",
      filenamewext = "";

    request.file('video').upload({
      // total file size should not exceed 500MB
      maxBytes: 524288000,
      dirname: require('path').resolve(sails.config.appPath, sails.config.appPath + '/assets/uploads/videos')
    }, function (error, uploadedVideos) {
      if (error)
        return response.negotiate(error);

      var str = uploadedVideos[0].fd;
      var n = str.lastIndexOf("/");
      var m = str.lastIndexOf(".");
      filename = str.substr(n + 1, m - n - 1);
      filenamewext = str.substr(str.lastIndexOf("/") + 1);

      return response.json({
        message: 'Successful uploaddd!',
        data: {
          filename: filenamewext
        }
      });
    });
  },

  /**
   * Create and embed video's thumbnail to video
   * @param request -> vidId, file
   * @param response
   */
  populateThumbnail: function (request, response) {
    var thumbnailSource = "";
    console.log("sci parami: " + request.params);
    console.log("API: " + request.param('file').type);

    new FileUploadThumbnail({
      maxWidth: 360,
      maxHeight: 203,
      file: request.param('file'),
      onSuccess: function (src) {
        thumbnailSource = src;

        Video.updateOne(
          {"id": request.param('vidID')},
          {
            $set: {"thumbnail": thumbnailSource}
          },
          function (err, results) {
            if (err) {
              return response.serverError(err);
            }
            return response.ok(results);
          }
        );
      }
    }).createThumbnail();

    /*Video.findOne(request.vidId).exec(function (err, res) {
     if (err)
     return response.serverError(err);

     return response.ok(res);
     });*/

  },

  /**
   * "Inform" data base about new video
   * @param request
   * @param response
   */
  uploadNewVideoDB: function (request, response) {
    //console.log("Title: " + request.param('title') + "\t\tDuration: " + request.param('duration'));

    Video.create({
      title: request.param('title'),
      description: request.param('description'),
      duration: request.param('duration'),
      sourceName: "FlaVid",
      sourceUrl: request.param('sourceUrl'),
      url: request.param('url'),
      userId: request.param('userId')
    }).exec(function (err, created) {
      if (err)
        return response.serverError(err);
      //console.log(created);
      return response.ok(created);
    });
  },

  /**
   * Get video's id using its URL.
   * @param request
   * @param response
     */
  getVideoIdByUrl: function (request, response) {
    Video.find({url: request.query.url}).exec(function (err, res) {
      if (err)
        return response.serverError(err);
      return response.ok(JSON.stringify(res));
    });
  }

};
