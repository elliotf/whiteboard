var Bookshelf = require('bookshelf')
  , config    = require('../config')
  , db
;

db = Bookshelf.initialize(config.database);
db.plugin('registry');

module.exports = db;

