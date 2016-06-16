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
    Video.find({}).sort("viewsCount DESC").exec(function (err, res) {
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
    Video.find({}).sort("uploadedAt DESC").exec(function (err, res) {
      if (err)
        return response.serverError(err);

      return response.ok(res);
    })
  },

  // DOVRSI!!!!
  freshUsersVideos: function (request, response) {
    Video.find({});
  },

  /**
   * Upload new video file
   * @param request
   * @param response
   * Important note: Not ready for production, because there's no file validation and compression!
   */
  uploadNewVideo: function (request, response) {
    var filename = "";

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
      filename = str.substr(n + 1, m-n - 1);

      return response.json({
        message: 'Successful uploaddd!',
        data: {
          filename : filename
        }
      });
    });
  },

  /**
   * "Inform" data base about new video
   * @param request
   * @param response
     */
  uploadNewVideoDB : function(request, response) {
    console.log("Title: " + request.param('title') + "\t\tDuration: " + request.param('duration'));

    Video.create({
      title: request.param('title'),
      duration: request.param('duration'),
      sourceName : "FlaVid",
      sourceUrl : '/assets/uploads/videos/' + request.param('filename'),
      url : request.param('filename')
    }).exec(function (err, created) {
      if (err)
        return response.serverError(err);
      return response.data;
    });
  }

};
