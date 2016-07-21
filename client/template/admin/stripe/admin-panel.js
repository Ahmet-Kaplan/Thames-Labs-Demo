import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';

//Import helpers function from external file
import { displayLocale, updateStripeCustomer, updateUpcomingInvoice, updateLastInvoice } from './imports/helpers.js';

//Import html files
import './admin-panel.html';

Template.stripeAdmin.onCreated(function() {
  this.stripeCustomer = new ReactiveVar('loading');
  this.couponDetails = new ReactiveVar('loading');
  this.cardDetails = new ReactiveVar({});
  this.lastInvoice = new ReactiveVar({});
  this.upcomingInvoice = new ReactiveVar({});
  var self = this;

  this.autorun(function() {
    var tenant = Tenants.findOne({
      _id: Meteor.user().group
    });
    if (!tenant) return;
    var numberOfUsers = Meteor.users.find({group: tenant._id}).count();

    if(tenant.stripe.stripeId && numberOfUsers) {
      updateStripeCustomer(self);
      updateLastInvoice(self);
      updateUpcomingInvoice(self);
    }
  });
});

Template.stripeAdmin.onRendered(function() {
  var tenant = Tenants.findOne({
    _id: Meteor.user().group
  });

  //Get coupon info
  if(tenant.stripe.coupon) {
    Meteor.call('stripe.getCoupon', tenant.stripe.coupon, (error, response) => {
      if(!this.couponDetails.get() || error) {
        this.couponDetails.set({});
      } else {
        this.couponDetails.set(response);
      }
    });
  } else {
    this.couponDetails.set({});
  }

  //Get card info
  if(tenant.stripe.stripeId) {
    Meteor.call('stripe.getCardDetails', (error, response) => {
      this.cardDetails.set(response);
    });
  }

});

Template.stripeAdmin.helpers({
  payingScheme: function() {
    return Tenants.findOne({
      _id: Meteor.user().group
    }).plan === 'pro';
  },
  subsLoaded: function() {
    var stripeSubs = Tenants.findOne({
      _id: Meteor.user().group
    }).stripe.stripeSubs;
    if (!!stripeSubs) {
      return Template.instance().stripeCustomer.get() !== 'loading';
    }
    return true;
  },
  currentSubscription: function() {
    var stripeCustomer = Template.instance().stripeCustomer.get();
    return (stripeCustomer.id) ? ((stripeCustomer.subscriptions.total_count && !stripeCustomer.subscriptions.data[0].cancel_at_period_end) ? stripeCustomer.subscriptions.data[0].plan.name : "Free Plan") : "Free Plan";
  },
  hasStripeAccount: function() {
    const tenant = Tenants.findOne({
      _id: Meteor.user().group
    });
    return !(typeof tenant.stripe.stripeId === "undefined" || tenant.stripe.stripeId === '');
  },
  hasStripeSubs: function() {
    //Note that this helper is called only after the customer details have been retrieved from the api
    var stripeCustomer = Template.instance().stripeCustomer.get();
    if(!stripeCustomer || !stripeCustomer.subscriptions) return false;
    return stripeCustomer.subscriptions.total_count !== 0;
  },
  subscriptionCancelled: function() {
    var stripeCustomer = Template.instance().stripeCustomer.get();
    if(stripeCustomer.id && stripeCustomer.subscriptions.total_count) {
      return stripeCustomer.subscriptions.data[0].cancel_at_period_end;
    }
    return false;
  },
  stripeCustomer: function() {
    var stripeCustomer = Template.instance().stripeCustomer.get();
    return stripeCustomer;
  },
  totalUsers: function() {
    if (!Meteor.user()) return;
    return Meteor.users.find({group: Meteor.user().group}).count();
  },
  upcomingInvoice: function() {
    return Template.instance().upcomingInvoice.get();
  },
  hasUpcomingInvoice: function() {
    return !(Template.instance().upcomingInvoice.get() == false);
  },
  lastInvoice: function() {
    return Template.instance().lastInvoice.get();
  },
  hasLastInvoice: function() {
    return !(Template.instance().lastInvoice.get() == false);
  },
  couponLoaded: function() {
    var couponDetails = Template.instance().couponDetails.get();
    return !(couponDetails === "loading");
  },
  hasCoupon: function() {
    var couponDetails = Template.instance().couponDetails.get();
    var currency = couponDetails.currency || 'gbp';
    details = (!couponDetails || couponDetails.valid !== true) ? false : ((couponDetails.percent_off) ? couponDetails.id + ': ' + couponDetails.percent_off + ' % off' : couponDetails.id + ': ' + displayLocale(couponDetails.amount_off / 100, currency) + ' off');
    return details;
  },
  cardDetails: function() {
    return Template.instance().cardDetails.get();
  },
  tenantName: function() {
    return Tenants.findOne({
      _id: Meteor.user().group
    }).name;
  }
});

Template.stripeAdmin.events({

});