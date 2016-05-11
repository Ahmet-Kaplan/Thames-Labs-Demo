import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';

//Import helpers function from external file
import { displayLocale, updateStripeCustomer,updateUpcomingInvoice, updateLastInvoice } from './imports/helpers.js';

//Import html files
import './admin-panel.html';
import './stripe-how.html';

//Import sub-templates js
import './card-form-modal.js';
import './coupon-modal.js';
import './stripe-subscribe.js';
import './stripe-unsubscribe.js';

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

})

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
    if(!!stripeSubs) {
      return Template.instance().stripeCustomer.get() !== 'loading'
    } else {
      return true;
    }
  },
  currentSubscription: function() {
    var stripeCustomer = Template.instance().stripeCustomer.get();
    return (stripeCustomer.id) ? ((stripeCustomer.subscriptions.total_count && !stripeCustomer.subscriptions.data[0].cancel_at_period_end) ? stripeCustomer.subscriptions.data[0].plan.name : "Free Plan") : "Free Plan";
  },
  hasStripeAccount: function() {
    const tenant = Tenants.findOne({
      _id: Meteor.user().group
    })
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
    } else {
      return false;
    }
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
  lastInvoice: function() {
    return Template.instance().lastInvoice.get();
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
  }
});

Template.stripeAdmin.events({
  'click #upScheme': function(e) {
    e.preventDefault();
    Modal.show('stripeSubscribe', {
      userCurrency: Template.instance().stripeCustomer.get().currency,
      cardDetails: Template.instance().cardDetails,
    });
  },

  'click #downScheme': function(e) {
    e.preventDefault();
    Modal.show('stripeUnsubscribe', this);
  },

  'click #resumeSubs': function(e) {
    e.preventDefault();
    bootbox.confirm('Do you wish to resume your subscription to RealtimeCRM?', function(result) {
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
              message: '<i class="fa fa-times fa-3x pull-left text-danger"></i>Unable to resume your subscription.<br />Please contact us if the problem remains.',
              className: 'bootbox-danger',
            });
          } else {
            bootbox.alert({
              title: 'Subscription complete',
              message: '<i class="fa fa-check fa-3x pull-left text-success"></i>Your subscription has been successful.<br />We\'re glad to have you back!',
              backdrop: false,
              className: 'bootbox-success',
            });
          }
        });
      }
    });
  },

  'click #updateCardDetails': function(event) {
    event.preventDefault();
    Modal.show('cardFormModal', {
      cardDetails: Template.instance().cardDetails,
    });
  },

  'click #updateEmail': function(event) {
    event.preventDefault();

    var stripeCustomer = Template.instance().stripeCustomer;

    bootbox.prompt("Please enter the new email for your invoices.", (newEmail) => {
      if(!newEmail) {
        return true;
      }
      var emailRegex = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
      if(!emailRegex.test(newEmail)) {
        $('.bootbox-form').addClass('has-error');
        toastr.error('Please enter a valid email address');
        return false;
      } else {
        toastr.clear();
        toastr.info('Processing your email update');
        Meteor.call('stripe.updateEmail', newEmail, (error, updatedCustomer) => {
          if(error || updatedCustomer === false) {
            toastr.error('Unable to update email address');
            return false;
          } else {
            stripeCustomer.set(updatedCustomer)
            toastr.clear();
            toastr.success('Your email has been changed to: ' + newEmail);
          }
        });
      }
    });
  },

  'click #showStripeHow': function(event) {
    event.preventDefault();
    Modal.show('stripeHow');
  },

  'click #updateCoupon': function(event) {
    event.preventDefault();
    Modal.show('couponModal', {
      couponDetails: Template.instance().couponDetails,
    });
  },
});