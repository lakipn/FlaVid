module.exports = {
  /**
   * Method for checking user's credentials (LOGIN)
   * @param request
   * @param response
     */
  checkLogin : function(request, response) {
    User.native(function(err, collection) {
      if(err)
        return response.serverError(err);

      collection.find({
        "username" : request.param('username'),
        "password" : request.param('password')
      }, { "_id" : 1 }).toArray(function (err, results) {
        if (err)
          response.serverError(err);
        return response.ok(results[0]);
      });
    });
  }
};
