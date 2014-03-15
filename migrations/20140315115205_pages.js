
exports.up = function(knex, Promise) {
  return knex.schema.createTable('pages', function (table) {
    table.increments('id').primary();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('pages');
};
