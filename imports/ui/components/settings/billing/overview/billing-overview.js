import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { stripeCustomer, displayLocale } from '/imports/api/billing/helpers.js';
import bootbox from 'bootbox';
import { Tenants } from '/imports/api/collections.js';

import '../coupon/coupon-modal.js';
import '../card/update-card-modal.js';

import './billing-overview.css';
import './billing-overview.html';

Template.billingOverview.helpers({
  isLoading: function() {
    return stripeCustomer.getData() === false;
  },
  stripeCustomer: function() {
    return stripeCustomer.getData();
  },
  totalUsers: function() {
    return Meteor.users.find({
      group: Meteor.user().group
    }).count();
  },
  hasCoupon: function() {
    const couponId = _.get(Tenants.findOne({
      _id: Meteor.user().group
    }), 'stripe.coupon');
    if(!couponId) {
      return false;
    }
    return _.get(stripeCustomer.getCoupon(), 'id', 'Loading...');
  },
  discount: function() {
    const coupon = stripeCustomer.getCoupon();
    return coupon.percent_off ? `${coupon.percent_off} % off` : `${displayLocale(coupon.amount_off / 100, coupon.currency)} off`;
  },
  hasStripeAccount: function() {
    return _.get(stripeCustomer.getData(), 'subscriptions.total_count') > 0;
  },
  cardDetails: function() {
    return _.get(stripeCustomer.getData(), 'sources.data[0]', false);
  },
  freeUserAccounts: function() {
    const tenant = Tenants.findOne({
      _id: Meteor.user().group
    });
    const maxFreeUsers = _.get(tenant, 'stripe.maxFreeUsers', MAX_FREE_USERS);
    const numberOfAccounts = Meteor.users.find({
      group: Meteor.user().group
    }).count();
    return _.min([numberOfAccounts, maxFreeUsers]);
  },
  payingUsers: function() {
    const tenant = Tenants.findOne({
      _id: Meteor.user().group
    });
    const maxFreeUsers = _.get(tenant, 'stripe.maxFreeUsers', MAX_FREE_USERS);
    const numberOfAccounts = Meteor.users.find({
      group: Meteor.user().group
    }).count();
    return numberOfAccounts - maxFreeUsers;
  }
});

Template.billingOverview.events({
  'click #updateCoupon': function(event) {
    event.preventDefault();
    Modal.show('couponModal');
  },

  'click #updateCardDetails': function(event) {
    event.preventDefault();
    Modal.show('updateCardModal');
  },

  'click #updateEmail': function(event) {
    event.preventDefault();

    bootbox.prompt("Please enter the new email for your invoices.", (newEmail) => {
      if(!newEmail) {
        return true;
      }
      const emailRegex = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
      if(!emailRegex.test(newEmail)) {
        toastr.error('Please enter a valid email address');
        return false;
      }
      toastr.clear();
      toastr.info('Processing your email update');
      Meteor.call('stripe.updateEmail', newEmail, (error, updatedCustomer) => {
        if(error || updatedCustomer === false) {
          toastr.error(`Unable to update email address: ${error.reason}`);
          return false;
        }
        stripeCustomer.update();
        toastr.clear();
        toastr.success(`Your email has been changed to: ${newEmail}`);
      });
    });
  },

  'click #showStripeHow': function(event) {
    event.preventDefault();
    Modal.show('stripeHow');
  },
});