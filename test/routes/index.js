var helper  = require('../../support/spec_helper')
  , request = require('supertest')
  , expect  = require('chai').expect
  , app     = helper.app
;

describe("Main routes", function() {
  describe("GET /", function() {
    context("when not logged in", function() {
      it("returns 200", function(done) {
        request(app)
          .get('/')
          .expect(200)
          .end(function(err, res) {
            expect(err).to.not.exist;

            done();
          });
      });

      it("has a link to log in", function(done) {
        request(app)
          .get('/')
          .expect(200)
          .end(function(err, res) {
            expect(err).to.not.exist;

            var $ = helper.$(res.text);

            var link = $('a.login-link');

            expect(link).to.have.length.above(0);
            expect(link.attr('href')).to.equal('/auth/google');
            expect(link.text()).to.match(/Log\W*in/i);

            done();
          });
      });
    });
  });
});
