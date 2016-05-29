module.exports = {
  /**
   * Get list of fresh videos in certain category
   * @param request
   * @param response
     */
  fresh : function(request, response) {
    var catID = request.params['catId'];

    var projection = { _id : 0, categories : { $elemMatch : { catId : catID } } };
    Video.find({}, projection).sort("createdAt DESC").exec(function(err, res) {
      if(err)
        return response.serverError(err);
      return response.ok(res);
    });
  },

  /**
   * Get list of most popular videos in certain category
   * @param request
   * @param response
     */
  popular : function(request, response) {
    var catID = request.params['catId'];

    var projection = { _id : 0, categories : { $elemMatch : { catId : catID } } };
    Video.find({}, projection).sort("viewsCount DESC").exec(function(err, res) {
      if(err)
        return response.serverError(err);
      return response.ok(res);
    });
  }
};
