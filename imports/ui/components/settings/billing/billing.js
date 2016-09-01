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
  }
});
