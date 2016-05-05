var planDetailsDep = new Tracker.Dependency();
var planDetails = {};

Template.stripeSubscribe.onRendered(function() {
  Meteor.call('stripe.getPlan', 'premier', function(error, result) {
    if (error) {
      toastr.error('Unable to retrieve scheme details.');
      return false;
    }
    planDetails = result;
    planDetails.quantity = Meteor.users.find({
      group: Meteor.user().group
    }).count();
    planDetails.amount /= 100;
    planDetails.total = planDetails.quantity * planDetails.amount;

    if (Tenants.findOne({
      _id: Meteor.user().group
    }).stripe.coupon) {
      Meteor.call('stripe.getCoupon', Tenants.findOne({
        _id: Meteor.user().group
      }).stripe.coupon, function(error, response) {
        if (error || !response) {
          planDetails.couponName = 'invalid: The coupon you have registered is invalid or has been cancelled and will not be applied.';
          planDetailsDep.changed();
        } else {
          planDetails.couponName = response.id;
          planDetails.couponDetails = (response.percent_off) ? response.percent_off + ' % off' : '£' + response.amount_off / 100 + ' off';
          var percentCorrection = (response.percent_off) ? 1 - (response.percent_off / 100) : 1;
          var amountCorrection = (response.amount_off) ? -response.amount_off / 100 : 0;
          planDetails.total = planDetails.total * percentCorrection + amountCorrection * planDetails.quantity;
          planDetailsDep.changed();
        }
      });
    } else {
      planDetailsDep.changed();
    }
  });

});

Template.stripeSubscribe.helpers({
  planDetails: function() {
    planDetailsDep.depend();
    return planDetails;
  },
  hasCoupon: function() {
    return !!Tenants.findOne({
      _id: Meteor.user().group
    }).stripe.coupon;
  }
});

Template.stripeSubscribe.events({
  'submit #subscribe': function() {
    event.preventDefault();
    var tenantDetails = Tenants.findOne({
      _id: Meteor.user().group
    });

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
      } else {
        toastr.info('Please wait while we process your subscription...');

        //If has stripeId, update card details and call subscription method
        if (tenantDetails.stripe.stripeId) {
          Meteor.call('stripe.updateCard', response.id, function(error, response) {
            if (error) {
              Modal.hide();
              toastr.clear();
              bootbox.alert({
                title: 'Error',
                message: '<div class="bg-danger"><i class="fa fa-times fa-3x pull-left text-danger"></i>Unable to validate your card details.<br />Please contact us if the problem remains.</div>'
              });
              return false;
            }
            Meteor.call('stripe.createSubscription', function(error, response) {
              if (error) {
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
                message: '<div class="bg-success"><i class="fa fa-check fa-3x pull-left text-success"></i>Your subscription has been successful.<br /><br />Thank you for using RealtimeCRM!</div>'
              });
              Session.set('stripeUpdateListener', Session.get('stripeUpdateListener') + 1);
            });
          });

          //If doesn't have stripeId, creates it and proceed subscription
        } else {
          var userEmail = $('#email').val();
          Meteor.call('stripe.createCustomer', response.id, userEmail, function(error, result) {
            if (error || !result) {
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
            Session.set('stripeUpdateListener', Session.get('stripeUpdateListener') + 1);
          });
        }
      }
    });
  }
});