
exports.up = function(knex, Promise) {
  return knex.schema.table('users', function(table){
    table.unique(['email']);
    table.unique(['oauth_provider', 'oauth_id']);
  });
};

exports.down = function(knex, Promise) {
  // this does not yet work.  :(
  //return knex.schema.table('users', function(table){
  //  table.dropUnique(['email']);
  //  table.dropUnique(['oauth_provider','oauth_id']);
  //});
};
