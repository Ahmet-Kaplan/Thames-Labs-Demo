import { permissionHelpers } from '/imports/api/permissions/permission-helpers.js';
import { Tenants } from '/imports/api/collections.js';
import './statistics.html';

Template.adminStatistics.onCreated(function() {
  // Redirect if not superadmin
  this.autorun(function() {
    permissionHelpers.superAdminOnly(Meteor.userId());
  });
});

Template.adminStatistics.helpers({
  totalUsers: function() {
    return Meteor.users.find({
      group: {
        $exists: true
      }
    }).count();
  },
  totalTenants: function() {
    return Tenants.find({}).count();
  },
  freeTenants: function() {
    return Tenants.find({
      'stripe.stripeSubs': {
        $exists: false
      }
    }).count();
  },
  payingTenants: function() {
    return Tenants.find({
      'stripe.stripeSubs': {
        $exists: true
      }
    }).count();
  },
  activeTenants: function() {
    var currentDate = new Date();
    var dateWeekAgo = new Date();
    dateWeekAgo.setDate(currentDate.getDate() - 7);

    var tenantIDs = [];
    var users = Meteor.users.find({
      "profile.lastLogin": {
        $gte: dateWeekAgo,
        $lt: currentDate
      }
    }).fetch();

    _.each(users, function(user) {
      if (user.group) {
        var tenantId = user.group;
        if (tenantIDs.indexOf(tenantId) === -1) {
          tenantIDs.push(tenantId);
        }
      }
    });

    return tenantIDs.length;
  },
  loggedInThisWeek: function() {
    var currentDate = new Date();
    var dateWeekAgo = new Date();
    dateWeekAgo.setDate(currentDate.getDate() - 7);

    return Meteor.users.find({
      "profile.lastLogin": {
        $gte: dateWeekAgo,
        $lt: currentDate
      }
    }).count();
  },
  loggedInTwoWeek: function() {
    var currentDate = new Date();
    var dateWeekAgo = new Date();
    dateWeekAgo.setDate(currentDate.getDate() - 14);

    return Meteor.users.find({
      "profile.lastLogin": {
        $gte: dateWeekAgo,
        $lt: currentDate
      }
    }).count();
  },
  loggedInMonth: function() {
    var currentDate = new Date();
    var dateWeekAgo = new Date();
    dateWeekAgo.setDate(currentDate.getDate() - 28);

    return Meteor.users.find({
      "profile.lastLogin": {
        $gte: dateWeekAgo,
        $lt: currentDate
      }
    }).count();
  },
  freeUsers: function() {
    const tenants = Tenants.find({}).fetch();

    let userCount = 0;
    _.each(tenants, function(t) {
      const tenantUserCount = Meteor.users.find({
        group: t._id
      }).fetch().length;

      if (tenantUserCount <= t.stripe.maxFreeUsers) userCount += tenantUserCount;
      else userCount += t.stripe.maxFreeUsers;
    });

    return userCount;
  },
  payingUsers: function() {
    const tenants = Tenants.find({
      'stripe.stripeSubs': {
        $exists: true
      }
    }).fetch();

    let userCount = 0;
    _.each(tenants, function(t) {
      const tenantUserCount = Meteor.users.find({
        group: t._id
      }).fetch().length;
      userCount += tenantUserCount - t.stripe.maxFreeUsers;
    });

    return userCount;
  },
});