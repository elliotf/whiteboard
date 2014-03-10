var db      = require('./base')
  , _       = require('lodash')
  , User
;

User = db.Model.extend({
  tableName: 'users'
  , hasTimestamps: ['created_at', 'updated_at']
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
