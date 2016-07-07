import { assert } from 'meteor/practicalmeteor:chai';
import { generateData } from './generate-data.app-test.js';
import denodeifyDefault from 'es6-denodeify';

const denodeify = denodeifyDefault(Promise);

// Utilities
const afterFlushPromise = denodeify(Tracker.afterFlush);

if (Meteor.isClient) {
  describe("login", () => {

    beforeEach( () => {
      Meteor.logout();
      generateData();
      FlowRouter.go('/');
    });

    it("should display the login screen to a logged out user", () => {
      afterFlushPromise()
        .then( () => {
          assert.equal($('h3').html(), 'Sign In');
          assert.equal(document.title, 'RealTimeCRM - Login');
        });
    });

    it("should allow login with good credentials", () => {
      afterFlushPromise()
        .then( () => {
          $('#at-field-email').val('test@domain.com');
          $('#at-field-password').val('goodpassword');
          $('#at-pwd-form').submit();
        });
      afterFlushPromise()
        .then( () => {
          assert.isNotNull(Meteor.userId());
        });
    });

    it("should prevent login with bad credentials", () => {
      afterFlushPromise()
        .then( () => {
          $('#at-field-email').val('test@domain.com');
          $('#at-field-password').val('badpassword');
          $('#at-pwd-form').submit();
        });
      afterFlushPromise()
        .then( () => {
          assert.isNull(Meteor.userId());
        });
    });

    it("should allow logout with the menu button", () => {
      afterFlushPromise()
        .then( () => {
          Meteor.loginWithPassword('test@domain.com', 'goodpassword');
        });
      afterFlushPromise()
        .then( () => {
          assert.isNotNull(Meteor.userId());
          $('#at-nav-button').click();
        });
      afterFlushPromise()
        .then( () => {
          assert.isNull(Meteor.userId());
        });
    });

  });
}
