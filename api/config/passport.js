/**
 * Created by lazar on 8/12/16.
 */
var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  bcrypt = require('bcrypt-nodejs');

passport.use(new LocalStrategy(function(username, password, done) {
  User.findOne({
    username: username
  },
  function(err, user) {
    if(err)
      return done(err);

    if(!user)
      return done(null, false, { message: 'Credentials not recognized.' });

    if(bcrypt.compareSync(password, user.password)) {
      return done(null, user, 'Signin success.')
    }
    else {
      return done(null, false, { message: 'Credentials not recognized.' });
    }
  });
}));
