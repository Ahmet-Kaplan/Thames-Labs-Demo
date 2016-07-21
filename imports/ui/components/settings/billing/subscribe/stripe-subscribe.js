import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';

import { stripeCustomer, stripePlan } from '../helpers.js';

import './stripe-subscribe.html';

Template.stripeSubscribe.onCreated(function() {
  const defaultCurrency = _.get(Tenants.findOne(Meteor.user().group), 'settings.currency', 'gbp');
  this.paymentCurrency = new ReactiveVar(defaultCurrency);
});

Template.stripeSubscribe.onRendered(function() {
  //watch for updates on the plan currency
  this.autorun(() => {
    const paymentCurrency = _.includes(['gbp', 'eur', 'usd'], this.paymentCurrency.get()) ? this.paymentCurrency.get() : 'gbp';
    const plans = {
      gpb: 'premierGBP',
      eur: 'premierEUR',
      usd: 'premierUSD',
    };
    stripePlan.update(plans[paymentCurrency], stripeCustomer.getCoupon());
  });
});

Template.stripeSubscribe.helpers({
  planDetails: function() {
    return stripePlan.getData();
  },
  paymentCurrency: function() {
    return Template.instance().paymentCurrency.get();
  },
  hasCoupon: function() {
    return stripeCustomer.getCoupon();
  }
});

Template.stripeSubscribe.events({
  'change input[name=selectCurrency]': function(event) {
    event.preventDefault();
    stripePlan.data.set(false);
    const newCurrency = $(event.target).val();
    Template.instance().paymentCurrency.set(newCurrency);
  },
  'submit #subscribe': function() {
    event.preventDefault();
    const tenantDetails = Tenants.findOne({
      _id: Meteor.user().group
    });
    const planId = _.get(stripePlan.getData(), 'id', 'premierGBP');
    // Previous currency used by the customer. Needed to define if new cus_ object is required
    const currentUserCurrency = _.get(stripeCustomer.getData(), 'currency');
    const newPlanCurrency = Template.instance().paymentCurrency.get();

    //Disable the submit button to prevent repeated clicks
    $('#submit').prop('disabled', true);

    const emailRegex = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
    if (!emailRegex.test($('#email').val())) {
      toastr.error('Please enter a valid email address.');
      $('#submit').prop('disabled', false);
      return false;
    }

    toastr.info('Validating your card details...');
    Stripe.card.createToken({
      number: $('[data-stripe=number]').val(),
      exp_month: $('[data-stripe=exp-month]').val(),
      exp_year: $('[data-stripe=exp-year]').val(),
      cvc: $('[data-stripe=cvc]').val(),
      name: $('[data-stripe=name]').val()
    }, function(status, response) {
      if (response.error) {
        toastr.error(response.error.message);
        $('#submit').prop('disabled', false);
        return;
      }

      toastr.clear();
      toastr.info('Please wait while we process your subscription...');

      /*If has stripeId, check if the new plan's currency is the same as before.
          Stripe only allows one currency per account. If tenant wants to use a different currency,
          we need to create a new stripeId (new Customer Object on Stripe).
          Otherwise, update card details and call subscription method*/
      if (_.get(tenantDetails, 'stripe.stripeId') && newPlanCurrency === currentUserCurrency) {
        Meteor.call('stripe.updateCard', response.id, function(error2, response2) {
          if (error2 || response2 === false) {
            Modal.hide();
            toastr.clear();
            bootbox.alert({
              title: 'Error',
              message: `<i class="fa fa-times fa-3x pull-left text-danger"></i>Unable to validate your card details: ${error2.reason}<br />Please contact us if the problem remains.`,
              className: 'bootbox-danger',
            });
            return false;
          }
          Meteor.call('stripe.createSubscription', planId, function(error3, response3) {
            if (error3 || response3 === false) {
              Modal.hide();
              bootbox.alert({
                title: 'Error',
                message: `<i class="fa fa-times fa-3x pull-left text-danger"></i>Unable to create subscription: ${error3.reason}<br />Please contact us if the problem remains.`,
                className: 'bootbox-danger',
              });
              return false;
            }
            Modal.hide();
            toastr.clear();
            bootbox.alert({
              title: 'Subscription complete',
              message: '<i class="fa fa-check fa-3x pull-left text-success"></i>Your subscription has been successful.<br />Thank you for using RealtimeCRM!',
              backdrop: false,
              className: 'bootbox-success',
            });
            stripeCustomer.update();
          });
        });

        //If doesn't have stripeId, creates it and proceed subscription
      } else {
        const userEmail = $('#email').val();
        Meteor.call('stripe.createCustomer', response.id, userEmail, planId, function(error2, result2) {
          if (error2 || result2 === false) {
            Modal.hide();
            bootbox.alert({
              title: 'Error',
              message: `<i class="fa fa-times fa-3x pull-left text-danger"></i>Unable to create subscription.<br> ${error2.reason}`,
              className: "bootbox-danger",
            });
            return false;
          }

          toastr.clear();
          Modal.hide();
          const noCoupon = (result2 === 'CouponNotApplied') ? '<br />However there has been an issue applying your coupon. Please contact us to correct this.' : '';
          bootbox.alert({
            title: 'Subscription complete',
            message: `<i class="fa fa-check fa-3x pull-left text-success"></i>Your subscription has been successful.${noCoupon}<br />Thank you for using RealtimeCRM!`,
            backdrop: false,
            className: 'bootbox-success',
          });
          stripeCustomer.update();
        });
      }
    });
  }
});