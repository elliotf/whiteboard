var chai    = require('chai')
  , mocha   = require('mocha')
  , cheerio = require('cheerio')
  , app     = require('../app')
  , knex    = require('knex')
  , config  = require('../config')
  , models  = require('../models')
  , _       = require('lodash')
  , async   = require('async')
;

chai.Assertion.includeStack = true;
chai.use(require('sinon-chai')); // spy assertions
require('mocha-sinon'); // to allow for this.sinon in tests

exports.$   = cheerio.load;
exports.app = app;

before(function(done) {
  models.db.knex.migrate.latest(config.database).then(function() {
    done();
  }).catch(function(e){
    done(e);
  });
});

beforeEach(function(done) {
  var toClear = _.extend({}, models);

  delete toClear['db'];

  var todo = [];

  _.each(toClear, function(model, key){
    todo.push(function(done){
      model.forge().query().where('1', '=', '1').del().exec(done);
    });
  });

  async.parallel(todo, done);
});
