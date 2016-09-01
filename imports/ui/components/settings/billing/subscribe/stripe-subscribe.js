import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import bootbox from 'bootbox';
import { stripeCustomer, stripePlan, upcomingInvoice } from '/imports/api/billing/helpers.js';
import { AutoForm } from "meteor/aldeed:autoform";

import '../card/card-form.js';

import './stripe-subscribe.html';

Template.stripeSubscribe.onCreated(function() {
  const defaultCurrency = _.get(Tenants.findOne(Meteor.user().group), 'settings.currency', 'gbp');
  this.paymentCurrency = new ReactiveVar(defaultCurrency);
});

Template.stripeSubscribe.onRendered(function() {
  stripeCustomer.update();
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
  },
  userEmail: function() {
    return Meteor.user().emails[0].address;
  },
  freeUsers: function() {
    const tenant = Tenants.findOne({
      _id: Meteor.user().group
    });
    return _.get(tenant, 'stripe.maxFreeUsers', MAX_FREE_USERS);
  },
});

Template.stripeSubscribe.events({
  'change input[name=selectCurrency]': function(event) {
    event.preventDefault();
    stripePlan.data.set(false);
    const newCurrency = $(event.target).val();
    Template.instance().paymentCurrency.set(newCurrency);
  },
  'click #submit': function() {
    event.preventDefault();
    const tenantDetails = Tenants.findOne({
      _id: Meteor.user().group
    });
    const planId = _.get(stripePlan.getData(), 'id', 'premierGBP');
    // Previous currency used by the customer. Needed to define if new cus_ object is required
    const currentUserCurrency = _.get(stripeCustomer.getData(), 'currency');
    const newPlanCurrency = Template.instance().paymentCurrency.get();

    if(!AutoForm.validateForm('insertUser')) {
      return;
    }

    const newUserDetails = AutoForm.getFormValues('insertUser');

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
      toastr.info('Please wait while we process your card details...');

      /*If has stripeId, check if the new plan's currency is the same as before.
          Stripe only allows one currency per account. If tenant wants to use a different currency,
          we need to create a new stripeId (new Customer Object on Stripe).
          Otherwise, simply call customer creation method*/
      let methodName = 'createCustomer';
      if (_.get(tenantDetails, 'stripe.stripeId') && newPlanCurrency === currentUserCurrency) {
        methodName = 'createSubscription';
      }

      const userEmail = $('#email').val();
      Meteor.call(`stripe.${methodName}`, response.id, planId, userEmail, function(error2, result2) {
        if (error2 || !result2) {
          Modal.hide();
          bootbox.alert({
            title: 'Error',
            message: `<i class="fa fa-times fa-3x pull-left text-danger"></i>Unable to create account.<br> ${_.get(error2, 'reason', '')}`,
            className: "bootbox-danger",
          });
          return false;
        }

        Meteor.call('addTenantUser', _.get(newUserDetails, 'insertDoc'), function(error3, result3) {
          if(error3 || result3 === false) {
            Modal.hide();
            bootbox.alert({
              title: 'Error',
              message: `<i class="fa fa-times fa-3x pull-left text-warning"></i>Your card details have been accepted but we were unable to add your new user.<br> ${_.get(error3, 'reason', '')}`,
              className: "bootbox-warning",
            });
            return false;
          }
          toastr.clear();
          Modal.hide();
          bootbox.alert({
            title: 'Card details accepted',
            message: `<i class="fa fa-check fa-3x pull-left text-success"></i>Your card details have been accepted. You can now add more users.<br>Your first payment for the upcoming month will be taken shortly.<br>Thank you for using RealTimeCRM!`,
            className: 'bootbox-success'
          });
          stripeCustomer.update();
          upcomingInvoice.update();
        });
      });
    });
  }
});