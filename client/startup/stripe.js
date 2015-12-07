Meteor.startup(function() {
  Meteor.call('stripe.getPK', function(error, result) {
    if(error) {
      throw new Meteor.Error(error);
    }
    Stripe.setPublishableKey(result);
  });
});
