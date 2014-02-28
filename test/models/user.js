var helper = require('../../support/spec_helper')
  , expect = require('chai').expect
  , User   = require('../../models/user')
;

describe("User model", function() {
  it("can be instantiated", function() {
    var user = new User();
  });
});
