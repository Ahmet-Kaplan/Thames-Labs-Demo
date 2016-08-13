import { chai } from 'meteor/practicalmeteor:chai';
import { redirectWithoutPermission, superAdminOnly } from './permission-helpers.js';

describe("permission helpers", () => {
  beforeEach(function() {
    Roles.userIsInRole = (userId, permissions) => {
      if (userId == "normaluser") {
        if (permissions == "normalpermission") return true;
      } else if (userId == "superuser") {
        if (permissions == "superadmin") return true;
      }
      return false;
    };
  });

  it("redirects user without permission", function(done) {
    FlowRouter.go = (route) => {
      chai.assert.equal(route, 'dashboard');
      done();
    };
    redirectWithoutPermission("normaluser", "invalidpermission");
  });

  it("permits user with permission", function() {
  });

  it("redirects superuser without permission", function(done) {
    FlowRouter.go = (route) => {
      chai.assert.equal(route, 'tenants');
      done();
    };
    redirectWithoutPermission("superuser", "superadmin");
  });

  it("redirects normal user without superadmin permission", function(done) {
    FlowRouter.go = (route) => {
      chai.assert.equal(route, 'dashboard');
      done();
    };
    superAdminOnly("normaluser");
  });

  it("permits superadmin with permission", function() {
  });
});