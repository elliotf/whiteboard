var helper = require('../../support/spec_helper')
  , expect = require('chai').expect
  , models = require('../../models')
  , User   = models.User
;

describe("User model", function() {
  it("can be instantiated", function() {
    var user = User.forge();
  });

  it("can be saved", function(done) {
    var user = User.forge({
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

  describe(".findOrCreateFromOAUTH", function() {
    beforeEach(function() {
      this.oauth_data = {
        emails:        [
          { value: 'focfo@example.com' }
        ]
        , provider:    'firetaco oauth'
        , id:          'an oauth id'
        , displayName: 'john doe'
      };
    });

    context("When the user exists", function() {
      beforeEach(function(done) {
        User.forge({
          email:            'focfo@example.com'
          , oauth_provider: 'firetaco oauth'
          , oauth_id:       'an oauth id'
        }).save().exec(done);
      });

      it("Returns the existing user", function(done) {
        this.sinon.spy(User.prototype, 'save');

        User
          .findOrCreateFromOAUTH(this.oauth_data, function(err, user){
            expect(err).to.not.exist;
            expect(User.prototype.save).to.not.have.been.called;
            expect(user.get('email')).to.equal('focfo@example.com');
            done();
          })
      });
    });

    context("When the user does not exist", function() {
      it("Creates the user", function(done) {
        this.sinon.spy(User.prototype, 'save');

        User
          .findOrCreateFromOAUTH(this.oauth_data, function(err, user){
            expect(err).to.not.exist;

            expect(User.prototype.save).to.have.been.called;
            expect(user.get('email')).to.equal('focfo@example.com');
            done();
          });
      });
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
