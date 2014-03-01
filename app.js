var express  = require('express')
  , passport = require('passport')
  , app
;

require('express-namespace');

app = express();

app.configure(function() {
  app.set('view engine', 'jade');
  app.use(express.cookieParser(process.env.APP_SECRET));

  var day = 86400 * 1000;
  app.use(express.cookieSession({
    key: 'sess'
    , cookie: {
      maxAge: 90 * day
    }
  }));

  app.use(express.bodyParser());
  app.use(express.methodOverride());

  require('./middleware/passport')(app);

  require('./routes/auth/google')(app);
  require('./routes')(app);

  app.use(app.router);
});

module.exports = app;
