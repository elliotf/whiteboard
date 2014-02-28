var express = require('express')
  , app
;

app = express();

require('./routes')(app);

module.exports = app;
