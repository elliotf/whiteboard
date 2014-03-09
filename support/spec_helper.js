var chai    = require('chai')
  , mocha   = require('mocha')
  , cheerio = require('cheerio')
  , app     = require('../app')
  , knex    = require('knex')
  , config  = require('../config')
  , models  = require('../models')
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

beforeEach(function() {
});
