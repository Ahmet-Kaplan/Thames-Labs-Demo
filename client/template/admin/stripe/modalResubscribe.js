var planDetailsDep = new Tracker.Dependency();
var planDetails = {};

var cardDetailsDep = new Tracker.Dependency();
var cardDetails = {};

Template.stripeResubscribe.onRendered(function() {
    var stripeId = Tenants.findOne({}).stripeId;
    if(!stripeId) {
      throw new Meteor.Error(400, 'No stripe account could be found.');
    }

    Meteor.call('getStripeCardDetails', function(error, response) {
      cardDetails = response;
      cardDetailsDep.changed();
    });

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

Template.stripeResubscribe.helpers({
  planDetails: function() {
    planDetailsDep.depend();
    return planDetails;
  },
  cardDetails: function() {
    cardDetailsDep.depend();
    return cardDetails;
  }
});

Template.stripeResubscribe.events({
  'click #resubscribe': function() {
    event.preventDefault();
    toastr.info('Processing your subscription.');
    stripeId = Tenants.findOne({}).stripeId;
    if(!stripeId) {
      toastr.error('Missing stripe account.');
      Modal.hide();
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
  },

  'click #updateCardDetails': function() {
    event.preventDefault();
    $('#cardDetails').empty();
    $('.modal-footer').hide();
    $('#plan-details').hide();
    Blaze.renderWithData(Template.cardForm, {buttonText: 'Update'}, document.getElementById('cardDetails'));
  },

  'submit #subscribe': function() {
    event.preventDefault();

    //Disable the submit button to prevent repeated clicks
    $('#submit').prop('disabled', true);

    toastr.info('Validating your card details...');
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
          Meteor.call('updateStripeCard', response.id, function(error, response) {
            if(error) {
              Modal.hide();
              toastr.error('Unable to update card details');
              return false;
            }
            toastr.clear();
            toastr.success('Your card details have been updated.');
            $('#cardDetails').empty();
            $('.modal-footer').show();
            $('#plan-details').show();
            Blaze.renderWithData(Template.cardDetailsTemplate, response, document.getElementById('cardDetails'));
          });
        }
    });
  }
});
