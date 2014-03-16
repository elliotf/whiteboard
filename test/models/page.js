var helper = require('../../support/spec_helper')
  , expect = require('chai').expect
  , models = require('../../models')
  , Page   = models.Page
  , User   = models.User
;

describe("Page model", function() {
  beforeEach(function() {
    this.ns.basic_attrs = {
      content: "page content"
    };

    this.user_attrs = {
      email: 'user@example.com'
      , oauth_provider: ''
      , oauth_id: ''
    };
  });

  it("can be instantiated", function() {
    var page = Page.forge();
  });

  it("can be saved", function(done) {
    Page
      .forge(this.ns.basic_attrs)
      .save()
      .exec(function(err, page){
        expect(err).to.not.exist;

        expect(page.get('content')).to.equal('page content');

        done();
      });
  });

  describe("relations", function() {
    beforeEach(function(done) {
      var self = this;

      User
        .forge(this.user_attrs)
        .save()
        .exec(function(err, user){
          expect(err).to.not.exist;

          self.user = user;

          done();
        });
    });

    it(".belongsTo(User)", function(done) {
      this.ns.basic_attrs.user_id = this.user.id;

      Page
        .forge(this.ns.basic_attrs)
        .save()
        .exec(function(err, page){
          expect(err).to.not.exist;

          done();
        });
    });
  });
});

