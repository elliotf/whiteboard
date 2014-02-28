var helper  = require('../../support/spec_helper')
  , app     = require('../../app')
  , request = require('supertest')
  , expect  = require('chai').expect
;

describe("Landing page", function() {
  describe("GET /", function() {
    it("returns 200", function(done) {
      request(app)
        .get('/')
        .expect(200)
        .end(function(err, res) {
          expect(err).to.not.exist;

          done();
        });
    });
  });
});
