import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { isTenantOverFreeUserLimit } from '/imports/api/tenants/helpers.js';

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
  overFreeLimit: function() {
    return isTenantOverFreeUserLimit(Meteor.user().group);
  },
  remainingFreeUsers: function() {
    const tenant = Tenants.findOne({
      _id: Meteor.user().group
    });
    return _.get(tenant, 'stripe.maxFreeUsers', MAX_FREE_USERS) - Meteor.users.find({
      group: tenant._id
    }).count();
  },
  freeUsers: function() {
    const tenant = Tenants.findOne({
      _id: Meteor.user().group
    });
    return _.get(tenant, 'stripe.maxFreeUsers', MAX_FREE_USERS);
  }
});

Template.users.events({
  'click #add-user': function(event) {
    event.preventDefault();
    const tenantId = Meteor.user().group;
    if (!isProTenant(tenantId) && isTenantOverFreeUserLimit(tenantId)) {
      Modal.show('stripeSubscribe', {
        showExplain: true
      });
      return;
    }
    Modal.show('insertUser', this);
  },
  'click #upScheme': function(e) {
    e.preventDefault();
    Modal.show('stripeSubscribe', {
      showExplain: true
    });
  },
});