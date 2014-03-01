var chai    = require('chai')
  , mocha   = require('mocha')
  , cheerio = require('cheerio')
  , app     = require('../app')
;

chai.Assertion.includeStack = true;
chai.use(require('sinon-chai')); // spy assertions
require('mocha-sinon'); // to allow for this.sinon in tests

exports.$   = cheerio.load;
exports.app = app;
