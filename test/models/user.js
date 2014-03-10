var helper = require('../../support/spec_helper')
  , expect = require('chai').expect
  , models = require('../../models')
  , User   = models.User
;

describe("User model", function() {
  it("can be instantiated", function() {
    var user = new User();
  });

  it("can be saved", function(done) {
    var user = new User({
      email: 'e@example.com'
      , oauth_provider: 'firetaco oauth'
      , oauth_id: 'an oauth id'
    })

    user.save().exec(function(err,user){
      expect(err).to.not.exist;

      expect(user.id).to.be.a('number');

      expect(user.toJSON()).to.deep.equal({
        id: 1
        , email: 'e@example.com'
        , oauth_provider: 'firetaco oauth'
        , oauth_id: 'an oauth id'
      });

      done();
    });
  });

  it("gets its db cleared between runs", function(done) {
    User
      .forge()
      .fetch()
      .then(function(user){
        expect(user).to.not.exist;
        done();
      })
      .catch(done);
  });
});
