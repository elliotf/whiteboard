var Bookshelf = require('bookshelf')
  , config    = require('../config')
  , db
;

db
  = Bookshelf.boardBookshelf
  = Bookshelf.initialize(config('database'));

module.exports = db;

