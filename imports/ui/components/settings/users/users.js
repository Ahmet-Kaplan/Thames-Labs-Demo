import './user-details-link.js';
import './modals/insert-user.js';
import './users.html';
import { Tenants } from '/imports/api/collections.js';

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
    return Tenants.findOne({
      _id: Meteor.user().group
    }).plan;
  },
  isProTenant: function() {
    var tenantId = Meteor.user().group;
    return isProTenant(tenantId);
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
    Modal.show('insertUser', this);
  },
  'click #upScheme': function(e) {
    e.preventDefault();
    Modal.show('stripeSubscribe');
  },
});