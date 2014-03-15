
exports.up = function(knex, Promise) {
  return knex.schema.table('pages', function (table) {
    table.text('content');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('pages', function (table) {
    table.dropColumn('content');
  });
};
