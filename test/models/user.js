var helper = require('../../support/spec_helper')
  , expect = require('chai').expect
  , models = require('../../models')
  , User   = models.User
;

describe("User model", function() {
  it("can be instantiated", function() {
    var user = new User();
  });
});
