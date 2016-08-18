var passport = require('passport');

module.exports = {
  /**
   * Method for checking user's credentials (LOGIN)
   * @param request
   * @param response
     */
  checkLogin : function(request, response) {
    //User.native(function(err, collection) {
    //  if(err)
    //    return response.serverError(err);
    //
    //  collection.find({
    //    "username" : request.param('username'),
    //    "password" : request.param('password')
    //  }, { "_id" : 1 }).toArray(function (err, results) {
    //    if (err)
    //      response.serverError(err);
    //    return response.ok(results[0]);
    //  });
    //});

    passport.authenticate('local', function(err, user, info) {
      if((err) || (!user))
      {
        response.status(403);
        //return response.send({ message: info.message });
        response.serverError({message: info.message});
      }
      request.session.authenticated = true;
      return response.ok(user);
    })(request, response);
  },

  /**
   * Logout method
   * @param request
   * @param response
   * @returns {*}
     */
  logout : function(request, response) {
    request.session.authenticated = false;
    return response.ok({ logout : true });
  },

  getUserIdByUsername : function(request, response) {
    User.find({
      username: request.param('username')
    }).exec(function(err, res) {
      if(err)
        return response.serverError(err);

      return response.ok(res[0].id);
    });
  }
};
