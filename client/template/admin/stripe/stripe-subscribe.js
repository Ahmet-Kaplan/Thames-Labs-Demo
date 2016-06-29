import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';

import { displayLocale } from './imports/helpers.js';

import './stripe-subscribe.html';
// import './stripe-subscribe.css';

Template.stripeSubscribe.onCreated(function() {
  this.planDetails = new ReactiveVar({});
  var defaultCurrency = Tenants.findOne(Meteor.user().group).settings.currency || 'gbp';
  this.paymentCurrency = new ReactiveVar(defaultCurrency);
});

Template.stripeSubscribe.onRendered(function() {
  var getPlan = (planId) => {
    if (!_.includes(['premierGBP', 'premierEUR', 'premierUSD'], planId)) {
      planId = 'premierGBP';
    }
    Meteor.call('stripe.getPlan', planId, (error, result) => {
      if (error || result === false) {
        toastr.error('Unable to retrieve scheme details.');
        return false;
      }
      var planDetails = _.cloneDeep(result);
      planDetails.quantity = Meteor.users.find({
        group: Meteor.user().group
      }).count();
      planDetails.amount /= 100;
      planDetails.total = planDetails.quantity * planDetails.amount;
      planDetails.amount = displayLocale(planDetails.amount, planDetails.currency);

      const tenant = Tenants.findOne({
        _id: Meteor.user().group
      });
      if (tenant.stripe.coupon) {
        Meteor.call('stripe.getCoupon', tenant.stripe.coupon, (error, response) => {
          if (error || response === false) {
            planDetails.couponName = 'invalid: The coupon you have registered is invalid or has been cancelled and will not be applied.';
            this.planDetails.set(planDetails);
          } else {
            planDetails.couponName = response.id;
            planDetails.couponDetails = (response.percent_off) ? response.percent_off + ' % off' : displayLocale(response.amount_off / 100, planDetails.currency) + ' off';
            var percentCorrection = (response.percent_off) ? 1 - (response.percent_off / 100) : 1;
            var amountCorrection = (response.amount_off) ? -response.amount_off / 100 : 0;
            planDetails.total = planDetails.total * percentCorrection + amountCorrection * planDetails.quantity;
            planDetails.total = displayLocale(planDetails.total, planDetails.currency);
            this.planDetails.set(planDetails);
          }
        });
      } else {
        planDetails.total = displayLocale(planDetails.total, planDetails.currency);
        this.planDetails.set(planDetails);
      }
    });
  };

  //watch for updates on the plan currency
  this.autorun(() => {
    var paymentCurrency = (_.includes(['gbp', 'eur', 'usd'], this.paymentCurrency.get())) ? this.paymentCurrency.get() : 'gbp';
    var plans = {
      gpb: 'premierGBP',
      eur: 'premierEUR',
      usd: 'premierUSD',
    };
    getPlan(plans[paymentCurrency]);
  });
});

Template.stripeSubscribe.helpers({
  planDetails: function() {
    return Template.instance().planDetails.get();
  },
  paymentCurrency: function() {
    return Template.instance().paymentCurrency.get();
  },
  hasCoupon: function() {
    return !!Tenants.findOne({
      _id: Meteor.user().group
    }).stripe.coupon;
  }
});

Template.stripeSubscribe.events({
  'change input[name=selectCurrency]': function(event) {
    event.preventDefault();
    Template.instance().planDetails.set({});
    var newCurrency = $(event.target).val();
    Template.instance().paymentCurrency.set(newCurrency);
  },
  'submit #subscribe': function() {
    event.preventDefault();
    var tenantDetails = Tenants.findOne({
      _id: Meteor.user().group
    });
    var planId = Template.instance().planDetails.get().id || 'premierGBP';
    var currentUserCurrency = Template.currentData().userCurrency;
    var newPlanCurrency = Template.instance().paymentCurrency.get();
    var cardDetails = Template.currentData().cardDetails;

    //Disable the submit button to prevent repeated clicks
    $('#submit').prop('disabled', true);

    var emailRegex = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
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

      //Return card details to parent template to display
      cardDetails.set(response.card);

      toastr.clear();
      toastr.info('Please wait while we process your subscription...');

      /*If has stripeId, check if the new plan's currency is the same as before.
          Stripe only allows one currency per account. If tenant wants to use a different currency,
          we need to create a new stripeId (new Customer Object on Stripe).
          Otherwise, update card details and call subscription method*/
      if (tenantDetails.stripe.stripeId && newPlanCurrency === currentUserCurrency) {
        Meteor.call('stripe.updateCard', response.id, function(error, response) {
          if (error || response === false) {
            Modal.hide();
            toastr.clear();
            bootbox.alert({
              title: 'Error',
              message: '<i class="fa fa-times fa-3x pull-left text-danger"></i>Unable to validate your card details.<br />Please contact us if the problem remains.',
              className: 'bootbox-danger',
            });
            return false;
          }
          Meteor.call('stripe.createSubscription', planId, function(error, response) {
            if (error || response === false) {
              Modal.hide();
              bootbox.alert({
                title: 'Error',
                message: '<i class="fa fa-times fa-3x pull-left text-danger"></i>Unable to create subscription.<br />Please contact us if the problem remains.',
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
          });
        });

        //If doesn't have stripeId, creates it and proceed subscription
      } else {
        var userEmail = $('#email').val();
        Meteor.call('stripe.createCustomer', response.id, userEmail, planId, function(error, result) {
          if (error || result === false) {
            Modal.hide();
            bootbox.alert({
              title: 'Error',
              message: '<i class="fa fa-times fa-3x pull-left text-danger"></i>Unable to create subscription.<br>' + error.message,
              className: "bootbox-danger",
            });
            return false;
          }

          toastr.clear();
          Modal.hide();
          var noCoupon = (result === 'CouponNotApplied') ? '<br />However there has been an issue applying your coupon. Please contact us to correct this.' : '';
          bootbox.alert({
            title: 'Subscription complete',
            message: '<i class="fa fa-check fa-3x pull-left text-success"></i>Your subscription has been successful.' + noCoupon + '<br />Thank you for using RealtimeCRM!',
            backdrop: false,
            className: 'bootbox-success',
          });
        });
      }
    });
  }
});