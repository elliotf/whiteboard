var passport       = require('passport')
  , GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
  , config         = require('../../config')
;

function register(app) {
  var secret      = process.env.GOOGLE_OAUTH_SECRET || 'no secret';
  var clientId    = process.env.GOOGLE_OAUTH_ID     || 'no client';
  var callbackUrl = process.env.GOOGLE_OAUTH_FQDN   || 'no url';
  callbackUrl = callbackUrl + '/auth/google/callback'

  passport.use(
    new GoogleStrategy(
      {
        clientSecret:  secret
        , clientID:    clientId
        , callbackURL: callbackUrl
      }
      , function(accessToken, refreshToken, profile, done) {
        done(null, {userid: 'userid', user: 'a user'});
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
