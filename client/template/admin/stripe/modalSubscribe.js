var planDetailsDep = new Tracker.Dependency();
var planDetails = {};

Template.stripeSubscribe.onRendered(function() {
  Meteor.call('getStripePlan', 'premier', function(error, result) {
    if(error) {
      toastr.error('Unable to retrieve scheme details.');
      return false;
    }
    planDetails = result;
    planDetails.quantity = Meteor.users.find({group: Meteor.user().group}).count();
    planDetails.amount /= 100;
    planDetails.total = planDetails.quantity * planDetails.amount;
    planDetails.amount = planDetails.amount.toString();
    planDetails.total = planDetails.total.toString();
    planDetailsDep.changed();
    });
});

Template.stripeSubscribe.helpers({
  planDetails: function() {
    planDetailsDep.depend();
    return planDetails;
  }
});

Template.stripeSubscribe.events({
  'submit #subscribe': function() {
    event.preventDefault();
    var tenantDetails = Tenants.findOne({});

    //Disable the submit button to prevent repeated clicks
    $('#submit').prop('disabled', true);

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
        } else {

          //If has stripeId, update card details and call subscription method
          if(tenantDetails.stripeId) {
            Meteor.call('updateStripeCard', response.id, function(error, response) {
              if(error) {
                Modal.hide();
                toastr.clear();
                bootbox.alert({
                  title: 'Error',
                  message: '<div class="bg-danger"><i class="fa fa-times fa-3x pull-left text-danger"></i>Unable to validate your card details.<br />Please contact us if the problem remains.</div>'
                });
                return false;
              }
              Meteor.call('createStripeSubscription', function(error, response) {
                if(error) {
                  Modal.hide();
                  bootbox.alert({
                    title: 'Error',
                    message: '<div class="bg-danger"><i class="fa fa-times fa-3x pull-left text-danger"></i>Unable to create subscription.<br />Please contact us if the problem remains.</div>'
                  });
                  return false;
                }
                Modal.hide();
                toastr.clear();
                bootbox.alert({
                  title: 'Subscription complete',
                  message: '<div class="bg-success"><i class="fa fa-check fa-3x pull-left text-success"></i>Your subscription has been successful.<br />We\'re glad to have you back!'
                });
                upcomingInvoiceDep.changed();
              });
            });

          //If doesn't have stripeId, creates it and proceed subscription
          } else {
            var userEmail = $('#email').val();
            toastr.info('Please wait while we process your subscription...');
            Meteor.call('createStripeCustomer', response.id, userEmail, function(error, result) {
              if(error || !result) {
                Modal.hide();
                bootbox.alert({
                  title: 'Error',
                  message: '<div class="bg-danger"><i class="fa fa-times fa-3x pull-left text-danger"></i>Unable to create subscription.</div>'
                });
                return false;
              }

              toastr.clear();
              Modal.hide();
              var noCoupon = (result === 'CouponNotApplied') ? '<br />There has been an issue applying your coupon. Please contact us to correct this.' : '';
              bootbox.alert({
                title: 'Subscription complete',
                message: '<div class="bg-success"><i class="fa fa-check fa-3x pull-left text-success"></i>Your subscription has been successful.' + noCoupon + '<br />Thank you for using RealtimeCRM!</div>'
              });
              upcomingInvoiceDep.changed();
            });
          }
        }
    });
  }
});
