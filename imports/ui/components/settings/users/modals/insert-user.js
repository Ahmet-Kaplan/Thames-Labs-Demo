import { isTenantOverFreeUserLimit } from '/imports/api/tenants/helpers.js';
import { stripePlan, stripeCustomer, displayLocale } from '/imports/api/billing/helpers.js';
import bootbox from 'bootbox';

import './insert-user.html';

AutoForm.hooks({
  insertUser: {
    beginSubmit: function() {
      toastr.info('Adding new user...');
      $('#createUser').prop('disabled', true);
    },
    onSuccess: function(formType, result) {
      toastr.clear();
      Modal.hide();
      bootbox.alert({
        title: 'New user added',
        message: `<i class="fa fa-check fa-3x pull-left text-success"></i>New user <strong>${this.insertDoc.name}</strong> created<br />An email containing a link to create the password has been sent.<br />Please note that your subscription will be updated accordingly.`,
        className: 'bootbox-success'
      });
    },
    onError: function(formType, error) {
      $('#createUser').prop('disabled', false);
      toastr.clear();
      if (error.reason === "Email already exists.") {
        toastr.error('A user with this email already exists.');
      } else {
        toastr.error(`Unable to create user: ${error.reason}`);
      }
    }
  }
});

Template.insertUser.onRendered(function() {
  stripeCustomer.update();
  //watch for updates on the plan currency
  this.autorun(() => {
    stripePlan.update(_.get(stripeCustomer.getData(), 'subscriptions.data[0].plan.id'), stripeCustomer.getCoupon());
  });
});

Template.insertUser.helpers({
  isOverFreeLimit: function() {
    return isTenantOverFreeUserLimit(Meteor.user().group);
  },
  planDetails: function() {
    return stripePlan.getData();
  },
  freeUsers: function() {
    const tenant = Tenants.findOne({
      _id: Meteor.user().group
    });
    return _.get(tenant, 'stripe.maxFreeUsers', MAX_FREE_USERS);
  },
  additionalUsers: function() {
    const tenant = Tenants.findOne({
      _id: Meteor.user().group
    });
    const freeUsers = _.get(tenant, 'stripe.maxFreeUsers', MAX_FREE_USERS);
    const totalUsers = Meteor.users.find({
      group: tenant._id
    }).count();
    return totalUsers - freeUsers + 1;
  },
  priceAfterNewUser: function() {
    const tenant = Tenants.findOne({
      _id: Meteor.user().group
    });
    const freeUsers = _.get(tenant, 'stripe.maxFreeUsers', MAX_FREE_USERS);
    const totalUsers = Meteor.users.find({
      group: tenant._id
    }).count();
    const additionalUsers = totalUsers - freeUsers + 1;
    const planDetails = stripePlan.getData();

    return displayLocale(planDetails.rawCorrectedAmount * additionalUsers, planDetails.currency);
  }
});