// jshint ignore: start
var expect = chai.expect;

// if (!(typeof MochaWeb === 'undefined')) {
MochaWeb.testOnly(function() {

  describe('Login', function() {

    beforeEach(function(done) {
      Meteor.logout(function() {
        expect(Meteor.userId()).to.be.null;
        done();
      });
    });

    it('should not allow logins with invalid credentials', function() {
      Meteor.loginWithPassword('kfkgj', 'kuhauhfg', function(err) {
        expect(err).to.not.be.null;
      });
    });

    it('should allow logins with valid credentials', function() {
      Meteor.loginWithPassword('demo@demo.co.uk', 'demo123', function(err) {
        expect(err).to.be.null;
      });
    });

    it('should redirect to the dashboard on successful login', function() {
      Meteor.loginWithPassword('demo@demo.co.uk', 'demo123', function(err, comp) {
        expect(err).to.be.null;
        if (comp) {
          expect(Router.current().url).to.equal("/dashboard");
        }
      });
    });

    it('should redirect admins to the tenants on successful login', function() {
      Meteor.loginWithPassword('admin@cambridgesoftware.co.uk', 'admin', function(err, comp) {
        expect(err).to.be.null;
        if (comp) {
          expect(Router.current().url).to.equal("/tenants");
        }
      });
    });

    it('should allow admins to create tenants', function() {
      Meteor.loginWithPassword('admin@cambridgesoftware.co.uk', 'admin', function(err, comp) {
        expect(err).to.be.null;
        if (comp) {
          expect(Router.current().url).to.equal("/tenants");
          var tenantId = db.tenants.insert({
            name: "Mocha Velocity"
          });

          expect(tenantId).to.exist;
        }
      });
    });

    it('should allow admins to create a user ', function() {

      Meteor.loginWithPassword('admin@cambridgesoftware.co.uk', 'admin', function(err, comp) {
        expect(err).to.be.null;
        if (comp) {
          expect(Router.current().url).to.equal("/tenants");
          
          var userId = Accounts.createUser({
            email: doc.email,
            password: doc.password,
            profile: {
              name: doc.name
            }
          });
        }
      });
    });

  });
});
// }
