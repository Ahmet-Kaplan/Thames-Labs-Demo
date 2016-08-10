import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';

import { stripeCustomer, upcomingInvoice, lastInvoice } from '/imports/api/billing/helpers.js';

import './stripe-unsubscribe.html';

Template.stripeUnsubscribe.helpers({
  endDate: function() {
    const periodEnd = _.get(stripeCustomer.getData(), 'subscriptions.data[0].current_period_end');
    return moment(periodEnd * 1000).format('Do MMMM YYYY');
  }
});

Template.stripeUnsubscribe.events({
  'click #unsubscribe': function(event) {
    event.preventDefault();
    $('#unsubscribe').prop('disabled', true);
    toastr.info('Processing your changes...');
    Meteor.call('stripe.cancelSubscription', function(error, response) {
      if(error || response === false) {
        Modal.hide();
        bootbox.alert({
          title: 'Error',
          message: '<i class="fa fa-times fa-3x pull-left text-danger"></i>Unable to cancel subscription.<br />Please contact us if the problem remains.',
          className: 'bootbox-danger',
        });
        return false;
      }
      Modal.hide();
      toastr.clear();
      bootbox.alert({
        title: 'Subscription updated',
        message: '<i class="fa fa-check fa-3x pull-left text-success"></i>Your subscription has been cancelled successfully.<br />We welcome any feedback on RealTimeCRM.',
        backdrop: false,
        className: 'bootbox-success',
      });
      stripeCustomer.update();
      upcomingInvoice.update();
      lastInvoice.update();
    });
  }
});