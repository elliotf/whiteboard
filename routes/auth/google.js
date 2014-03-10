var passport       = require('passport')
  , GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
  , config         = require('../../config')
  , User           = require('../../models').User
;

function register(app) {
  var secret      = process.env.GOOGLE_OAUTH_SECRET || config('auth.google.secret');
  var clientId    = process.env.GOOGLE_OAUTH_ID     || config('auth.google.id');
  var callbackUrl = process.env.GOOGLE_OAUTH_FQDN   || config('auth.google.fqdn');
  callbackUrl = callbackUrl + '/auth/google/callback'

  passport.use(
    new GoogleStrategy(
      {
        clientSecret:  secret
        , clientID:    clientId
        , callbackURL: callbackUrl
      }
      , function(accessToken, refreshToken, profile, done) {
        User.findOrCreateFromOAUTH(profile, done);
      }
    )
  );

  app.namespace('/auth', function(){
    app.namespace('/google', function(){
      app.get(
        '/'
        , passport.authenticate(
          'google'
          , {
            scope: [
              'https://www.googleapis.com/auth/userinfo.profile'
              , 'https://www.googleapis.com/auth/userinfo.email'
            ]
          }
        )
      );

      app.get(
        '/callback'
        , passport.authenticate(
          'google'
          , {
            failureRedirect: '/login'
          }
        ),
        function(req, res) {
          res.redirect('/');
        }
      );
    });
  });
};

module.exports = register;
