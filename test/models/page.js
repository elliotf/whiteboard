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
      , user_id: 7
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

        var data = page.toJSON();

        expect(data.content).to.equal('page content');
        expect(data.user_id).to.equal(7);

        done();
      });
  });

  describe("relations", function() {
    it(".belongsTo(User)", function() {
      expect(Page).to.belongTo(User);
    });
  });
});
