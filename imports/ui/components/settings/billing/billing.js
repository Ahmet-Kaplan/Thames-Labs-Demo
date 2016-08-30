import { stripeCustomer, upcomingInvoice, lastInvoice } from '/imports/api/billing/helpers.js';

import './overview/billing-overview.js';
import './stripe-how.html';
import './subscribe/stripe-subscribe.js';
import './invoices/invoices.js';

import './billing.html';

Template.billing.onRendered(function() {
  this.autorun(() => {
    const tenantId = _.get(Meteor.user(), 'group');
    if(!tenantId) return;
    const tenant = Tenants.findOne({
      _id: tenantId
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
  isTrialPeriod: function() {
    const subsStatus = _.get(stripeCustomer.getData(), 'subscriptions.data[0].status', false);
    return subsStatus === 'trialing';
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
});
