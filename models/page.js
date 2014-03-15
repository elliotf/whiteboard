var db      = require('./base')
  , _       = require('lodash')
  , page
;

Page = db.Model.extend({
  tableName: 'pages'
  //, hasTimestamps: ['created_at', 'updated_at']
});

module.exports = {
  Page: Page
}
