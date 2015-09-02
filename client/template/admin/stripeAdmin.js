Meteor.startup(function() {
  Stripe.setPublishableKey('pk_test_W7Cx4LDFStOIaJ2g5DufAIaE');
});

Template.stripeSubscribe.helpers({
  hasStripeId: function() {
  return !!Tenants.findOne({}).stripeId;
  }
})

Template.stripeSubscribe.events({
  'submit #subscribe': function() {
    event.preventDefault();
    console.log('submitting...')

    //Disable the submit button to prevent repeated clicks
    $('#submit').prop('disabled', true);

    Stripe.card.createToken({
      number: $('[data-stripe=number]').val(),
      exp_month: $('[data-stripe=exp-month]').val(),
      exp_year: $('[data-stripe=exp-year]').val(),
      cvc: $('[data-stripe=cvc]').val()
    }, function(status, response) {
      if (response.error) {
          toastr.error(response.error.message);
          $('#submit').prop('disabled', false);
          return;
        } else {
          toastr.info('Please waite while we validate your details...');
          Meteor.call('createStripeCustomer', response.id, function(error, result) {
            if(error) {
              Modal.hide();
              toastr.error('Unable to create subscription');
              throw new Meteor.Error('Undefined', 'Unable to create stripe customer');
            }

            Meteor.call('createStripeSubscription', result, function(error, response) {
              if(error) {
                Modal.hide();
                toastr.error('Unable to create subscription');
                throw new Meteor.Error('Undefined', 'Unable to create stripe subscription');
              }
              Modal.hide();
              toastr.success('Your subscription has been successful.');
            });
          });
        }
    });
  }
});