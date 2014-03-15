var db      = require('./base')
  , _       = require('lodash')
  , Page  = require('./page').Page
  , User
;

User = db.Model.extend({
  tableName: 'users'
  , hasTimestamps: ['created_at', 'updated_at']
  , pages: function() {
    return this.hasMany(Page)
  }
}, {
  findOrCreateFromOAUTH: function(input, cb) {
    var data = {
      oauth_provider: input.provider
      , oauth_id:     input.id
      , email:        input.emails[0].value
    }
    var user = User.forge(data);

    user
      .fetch()
      .then(function(found){
        if (found) {
          return cb(null, found);
        }

        user.save().exec(cb);
      })
  }
});

module.exports = {
  User: User
}
