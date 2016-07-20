import { stripeCustomer } from './helpers.js';

import './overview/billing-overview.js';
import './stripe-how.html';
import './subscribe/stripe-subscribe.js';

import './billing.css';
import './billing.html';

Template.billing.onRendered(function() {
  this.autorun(() => {
    const tenant = Tenants.findOne({
      _id: Meteor.user().group
    });

    if(_.get(tenant, 'stripe')) {
      stripeCustomer.update();
    }
  });
});

Template.billing.helpers({
  isFreeProTenant: function() {
    console.log(stripeCustomer.getData());
    if (!Meteor.user() || !Meteor.user().group) return false;
    const tenant = Tenants.findOne(Meteor.user().group);
    return tenant.plan === 'pro' && !tenant.stripe.stripeSubs;
  },
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