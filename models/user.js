var db = require('./base')
  , User
;

User = db.Model.extend({
  tableName: 'users'
});

module.exports = {
  User: User
}
