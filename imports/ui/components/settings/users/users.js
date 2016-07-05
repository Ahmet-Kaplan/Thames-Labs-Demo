import './user-details-link.js';
import './add-user/add-user.js';
import './users.html';

Template.users.helpers({
  tenantUsers: function() {
    return Meteor.users.find({});
  },
  tenantName: function() {
    return Tenants.findOne({_id: Partitioner.group()}).name;
  },
  tenantUserCount: function() {
    return Meteor.users.find({}).count();
  },
  tenantHasMultipleUsers: function() {
    return (Meteor.users.find({}).count() > 1);
  },
  tenantPlan: function() {
    return 'Flaming Octo Sansa';
  }
});

Template.users.events({
  'click #add-user': function(event) {
    event.preventDefault();

    var tenantId = Meteor.user().group;
    if (!isProTenant(tenantId) && isTenantOverFreeUserLimit(tenantId)) {
      showUpgradeToastr('To add more users');
      return;
    }
    Modal.show('addUser', this);
  }
});