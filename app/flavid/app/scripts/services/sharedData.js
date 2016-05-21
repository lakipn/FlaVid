/**
 * Created by lazar on 5/20/16.
 */
'use strict';

app.factory('sharedData', function() {
  var user = {};

  return {
    getUser : function() {
      return user;
    },
    setUser : function(nUser) {
      user = nUser;
    }
  }

});
