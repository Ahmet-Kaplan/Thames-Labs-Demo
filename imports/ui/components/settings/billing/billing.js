import { stripeCustomer, upcomingInvoice, lastInvoice } from '/imports/api/billing/helpers.js';

import './overview/billing-overview.js';
import './stripe-how.html';
import './subscribe/stripe-subscribe.js';
import './unsubscribe/stripe-unsubscribe.js';
import './invoices/invoices.js';

import './billing.html';

Template.billing.onRendered(function() {
  this.autorun(() => {
    const tenant = Tenants.findOne({
      _id: Meteor.user().group
    });

    if(tenant) {
      stripeCustomer.update();
      upcomingInvoice.update();
      lastInvoice.update();
    }
  });
});

Template.billing.helpers({
  isLoading: function() {
    return stripeCustomer.getData() === false;
  },
  isFreeProTenant: function() {
    if (!Meteor.user() || !Meteor.user().group) return false;
    const tenant = Tenants.findOne(Meteor.user().group);
    return tenant.plan === 'pro' && !tenant.stripe.stripeSubs;
  },
  subscriptionCancelled: function() {
    return _.get(stripeCustomer.getData(), 'subscriptions.data[0].cancel_at_period_end');
  },
  endDate: function() {
    const periodEnd = _.get(stripeCustomer.getData(), 'subscriptions.data[0].current_period_end');
    return moment(periodEnd * 1000).format('Do MMMM YYYY');
  },
  isTrialPeriod: function() {
    return _.get(stripeCustomer.getData(), 'subscriptions.data[0].trial_end', false);
  },
  trialPeriodEnd: function() {
    const trialPeriodEnd = _.get(stripeCustomer.getData(), 'subscriptions.data[0].trial_end', false);
    return moment(trialPeriodEnd * 1000).format('Do MMMM YYYY');
  }
});

Template.billing.events({
  'click #upScheme': function(evt) {
    evt.preventDefault();
    const tenant = Tenants.findOne({
      _id: Meteor.user().group
    });
    Modal.show('stripeSubscribe', {
      userCurrency: _.get(tenant, 'settings.currency', 'gbp')
    });
  },

  'click #downScheme': function(evt) {
    evt.preventDefault();
    Modal.show('stripeUnsubscribe');
  },

  'click #resumeSubs': function(evt) {
    evt.preventDefault();
    bootbox.confirm('Do you wish to resume your subscription to RealTimeCRM?', function(result) {
      if(result === true) {
        bootbox.dialog({
          message: 'Resuming your subscription...',
          closeButton: false,
          buttons: {},
        });
        Meteor.call('stripe.resumeSubscription', function(error, result) {
          bootbox.hideAll();
          if(error || result === false) {
            bootbox.alert({
              title: 'Error',
              message: `<i class="fa fa-times fa-3x pull-left text-danger"></i>Unable to resume your subscription: ${_.get(error, 'reason', '')}<br />Please contact us if the problem remains.`,
              className: 'bootbox-danger',
            });
          } else {
            bootbox.alert({
              title: 'Subscription complete',
              message: `<i class="fa fa-check fa-3x pull-left text-success"></i>Your subscription has been successful.<br />We're glad to have you back!`,
              backdrop: false,
              className: 'bootbox-success',
            });
          }
          stripeCustomer.update();
          upcomingInvoice.update();
          lastInvoice.update();
        });
      }
    });
  },
});
