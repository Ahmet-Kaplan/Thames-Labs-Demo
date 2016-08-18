import { chai } from 'meteor/practicalmeteor:chai';
import sinon from 'sinon';
import { Roles } from 'meteor/alanning:roles';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { permissionHelpers } from './permission-helpers.js';

describe("permission helpers", () => {
  beforeEach(function() {
    sandbox = sinon.sandbox.create();
    sandbox.stub(Roles, 'userIsInRole', (userId, permissions) => {
      if (userId == "normaluser") {
        if (permissions == "normalpermission") return true;
      } else if (userId == "superuser") {
        if (permissions == "superadmin") return true;
      }
      return false;
    });

    sandbox.spy(permissionHelpers, "redirectWithoutPermission");
  });

  afterEach(function() {
    sandbox.restore();
  });


  //permissionHelpers.redirectWithoutPermission tests
  it("redirects user without permission", function(done) {
    sandbox.stub(FlowRouter, "go", (route) => {
      chai.assert.equal(route, 'dashboard');
      done();
    });
    permissionHelpers.redirectWithoutPermission("normaluser", "invalidpermission");
  });

  it("permits user with permission", function() {
    const routerSpy = sandbox.spy(FlowRouter, "go");
    permissionHelpers.redirectWithoutPermission("normaluser", "normalpermission");
    chai.assert.equal(routerSpy.called, false);
  });

  it("redirects superuser without permission", function(done) {
    sandbox.stub(FlowRouter, "go", (route) => {
      chai.assert.equal(route, 'tenants');
      done();
    });
    permissionHelpers.redirectWithoutPermission("superuser", "superadmin");
  });


  //permissionHelpers.superAdminOnly tests
  it("redirects normal user without superadmin permission", function(done) {
    sandbox.stub(FlowRouter, "go", (route) => {
      chai.assert.equal(route, 'dashboard');
      done();
    });
    permissionHelpers.superAdminOnly("normaluser");
  });

  it("permits superadmin with permission", function() {
    const routerSpy = sandbox.spy(FlowRouter, "go");
    permissionHelpers.superAdminOnly("superuser", "superadmin");
    chai.assert.equal(routerSpy.called, false);
  });
});