import './free-plan.html';

Template.freePlan.helpers({
  tenantName: function() {
    return Tenants.findOne({
      _id: Meteor.user().group
    }).name;
  },
  tenantUserCount: function() {
    return Meteor.users.find({}).count();
  },
});