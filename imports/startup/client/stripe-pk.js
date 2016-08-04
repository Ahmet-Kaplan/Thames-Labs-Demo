import { Meteor } from 'meteor/meteor';
//Retrieve the Stripe.js script used to handle data on client side and set up Public Key.
$.getScript('https://js.stripe.com/v2/').then(function() {
  Meteor.call('stripe.getPK', function(error, result) {
    if(error) {
      throw new Meteor.Error(error);
    }
    Stripe.setPublishableKey(result);
  });
});