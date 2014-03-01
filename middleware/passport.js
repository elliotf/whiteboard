var passport = require('passport')
;

module.exports = function(app) {
  passport.serializeUser(function(user, done) {
    done(null, 'userid')
  });
  passport.deserializeUser(function(user, done) {
    done(null, {id: 'userid', user: 'a user'});
  });

  app.use(passport.initialize());
  app.use(passport.session());
}
