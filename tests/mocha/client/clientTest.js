// jshint ignore: start
var expect = chai.expect;

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

          expect(userId).to.exist;
        }
      });
    });

  });

  describe('Companies', function() {
    beforeEach(function(done) {
      Meteor.logout(function(callback) {
        callback();
      });

      Meteor.loginWithPassword('demo@demo.co.uk', 'demo123', function() {

      });

      Router.go('/companies');
      done();
    });

    it('should show an empty list of companies', function(done) {

      expect($('#mchNoCompaniesPlaceholder')).to.exist;
      done();
    });

    it('should allow the new company modal to be loaded', function(done) {

      $('#mchShowAddCompanyModal').trigger("click");
      expect($('#afModal')).to.exist;
      done();
    });

    it('should prevent an empty form from being submitted', function(done) {

      $('#mchShowAddCompanyModal').trigger("click");
      expect($('#afModal')).to.exist;

      $('#afModal button').trigger("click");
      expect($('#afModal')).to.exist;
      done();
    });

    it('should prevent an incomplete form from being submitted', function(done) {

      $('#mchShowAddCompanyModal').trigger("click");
      expect($('#afModal')).to.exist;

      $('#afModal input[name=name]').val('Sample');

      $('#afModal button').trigger("click");
      expect($('#afModal')).to.exist;
      done();
    });

    it('should allow a complete form to be submitted', function(done) {

      $('#mchShowAddCompanyModal').trigger("click");
      expect($('#afModal')).to.exist;

      $('#afModal input[name=name]').val('Sample');
      $('#afModal input[name=address]').val('Sample');
      $('#afModal input[name=city]').val('Sample');
      $('#afModal input[name=postcode]').val('Sample');
      $('#afModal input[name=country]').val('Sample');

      $('#afModal button').trigger("click");
      expect($('#afModal')).to.exist;
      done();
    });

    it('shows an list of companies', function(done) {

      expect($('#mchCompanyList')).to.exist;
      done();
    });

    it('should allow a company\'s details page to be loaded', function(done) {

      expect($('#mchCompany')).to.exist;
      // var url = $('#mchCompany').eq(0).prop('href');

      $('#mchCompany').eq(0).trigger('click');

      expect(Router.current().url).to.not.equal("/companies");
      done();

    });
  });
});
