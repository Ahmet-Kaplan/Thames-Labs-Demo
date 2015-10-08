Meteor.startup(function() {
  Meteor.call('getStripePK', function(error, result) {
    if(error) {
      throw new Meteor.Error(error);
    }
    Stripe.setPublishableKey(result);
  });
});
