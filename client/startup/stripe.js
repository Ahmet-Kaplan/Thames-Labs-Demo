Meteor.startup(function() {
  Meteor.call('getStripePK', function(error, result) {
    if(error) {
      if (Meteor.isDevelopment) toastr.error(error.reason);
      throw new Meteor.Error(error);
    }
    Stripe.setPublishableKey(result);
  });
});
