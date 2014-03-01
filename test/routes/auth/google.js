var helper  = require('../../../support/spec_helper')
  , request = require('supertest')
  , expect  = require('chai').expect
  , app     = helper.app
;

describe("Auth routes", function() {
  describe("Google OAUTH", function() {
    describe("GET /auth/google", function() {
      it("is successful", function(done) {
        request(app)
          .get('/auth/google')
          .expect(302)
          .end(function(err, res){
            expect(err).to.not.exist;

            done();
          });
      });
    });

    describe("GET /auth/google/callback", function() {
      it("is successful", function(done) {
        request(app)
          .get('/auth/google/callback')
          .expect(302)
          .end(function(err, res){
            expect(err).to.not.exist;

            done();
          });
      });
    });
  });
});
