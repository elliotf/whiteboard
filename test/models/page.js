var helper = require('../../support/spec_helper')
  , expect = require('chai').expect
  , models = require('../../models')
  , Page   = models.Page
;

describe("Page model", function() {
  beforeEach(function() {
    this.basic_attrs = {
      content: "page content"
    }
  });

  it("can be instantiated", function() {
    var page = Page.forge();
  });

  it("can be saved", function(done) {
    Page
      .forge(this.basic_attrs)
      .save()
      .exec(function(err, page){
        expect(err).to.not.exist;

        expect(page.get('content')).to.equal('page content');

        done();
      });
  });
});

