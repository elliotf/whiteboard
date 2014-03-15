var helper = require('../../support/spec_helper')
  , expect = require('chai').expect
  , models = require('../../models')
  , User   = models.User
;

describe("User model", function() {
  beforeEach(function() {
    this.basic_attrs = {
      email: 'e@example.com'
      , oauth_provider: 'firetaco oauth'
      , oauth_id: 'an oauth id'
    };
  });

  it("can be instantiated", function() {
    var user = User.forge();
  });

  it("can be saved", function(done) {
    User
      .forge(this.basic_attrs)
      .save()
      .exec(function(err, user){
        expect(err).to.not.exist;

        user = user.toJSON();

        expect(user.id).to.be.a('number');
        expect(user.email).to.equal('e@example.com');
        expect(user.oauth_provider).to.equal('firetaco oauth');
        expect(user.oauth_id).to.equal('an oauth id');

        done();
      });
  });

  it("has auto-generated timestamps", function(done) {
    User
      .forge(this.basic_attrs)
      .save()
      .exec(function(err,user){
        expect(err).to.not.exist;

        user = user.toJSON();

        expect(user.created_at).to.be.a('date');
        expect(user.updated_at).to.be.a('date');

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

  it("is cleaned up between tests", function(done) {
    User
      .collection()
      .fetch()
      .exec(function(err, users){
        expect(err).to.not.exist;

        expect(users).to.have.length(0);

        done();
      });
  });
});
