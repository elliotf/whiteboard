var helper = require('../../support/spec_helper')
  , expect = require('chai').expect
  , models = require('../../models')
  , Page   = models.Page
;

describe("Page model", function() {
  it("can be instantiated", function() {
    var page = Page.forge();
  });
});

