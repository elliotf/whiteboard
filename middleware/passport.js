var passport = require('passport')
  , User     = require('../models').User
;

module.exports = function(app) {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.forge({id: id}).fetch().exec(done);
  });

  app.use(passport.initialize());
  app.use(passport.session());
};
