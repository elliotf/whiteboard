var db      = require('./base')
  , _       = require('lodash')
  , User    = require('./user').User
  , Page
;

Page = db.Model.extend({
  tableName: 'pages'
  //, hasTimestamps: ['created_at', 'updated_at']
  , user: function() {
    return this.belongsTo(User);
  }
});

module.exports = {
  Page: Page
}
