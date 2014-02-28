var express = require('express')
  , app
;

app = express();

app.configure(function() {
  app.set('view engine', 'jade');
});

require('./routes')(app);

module.exports = app;
