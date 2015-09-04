Meteor.startup(function() {
  Stripe.setPublishableKey('pk_test_W7Cx4LDFStOIaJ2g5DufAIaE');
});

Template.stripeSubscribe.events({
  'submit #subscribe': function() {
    event.preventDefault();

    //Disable the submit button to prevent repeated clicks
    $('#submit').prop('disabled', true);

    toastr.info('Validating your card details...')
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
          toastr.info('Please wait while we process your subscription...');
          Meteor.call('createStripeCustomer', response.id, function(error, result) {
            if(error) {
              Modal.hide();
              toastr.error('Unable to create subscription');
              throw new Meteor.Error('Undefined', 'Unable to create stripe customer, ' + error);
            }

            Meteor.call('createStripeSubscription', result, function(error, response) {
              if(error) {
                Modal.hide();
                toastr.error('Unable to create subscription');
                throw new Meteor.Error('Undefined', 'Unable to create stripe subscription, ' + error);
              }
              Modal.hide();
              toastr.clear();
              toastr.success('Your subscription has been successful.');
            });
          });
        }
    });
  }
});

function displayCardDetails(data) {
  $('#loadingCard').hide();
  $('#cardDetails').show();
  Blaze.renderWithData(Template.cardDetails, data, document.getElementById('cardDetails'))
}

Template.stripeResubscribe.onRendered(function() {
    var stripeId = Tenants.findOne({}).stripeId;
    if(!stripeId) {
      throw new Meteor.Error(400, 'No stripe account could be found.');
    }

    Meteor.call('getStripeCardDetails', stripeId, function(error, response) {
      Session.set('cardDetails', response);
      displayCardDetails(response);
    });
});

Template.stripeResubscribe.events({
  'click #resubscribe': function() {
    event.preventDefault;
    stripeId = Tenants.findOne({}).stripeId;
    if(!stripeId) {
      toastr.error('Missing stripe account.');
      Modal.hide();
      throw new Meteor.Error(400, 'No stripe account could be found.');
    }
    Meteor.call('createStripeSubscription', stripeId, function(error, response) {
      if(error) {
        Modal.hide();
        toastr.error('Unable to create subscription');
        throw new Meteor.Error('Undefined', 'Unable to create stripe subscription, ' + error);
      }
      Modal.hide();
      toastr.clear();
      toastr.success('Your subscription has been successful.');
    });
  },

  'click #updateCardDetails': function() {
    event.preventDefault;
    $('#cardDetails').empty();
    $('.modal-footer').hide();
    Blaze.renderWithData(Template.cardForm, {buttonText: 'Update'}, document.getElementById('cardDetails'));
  },

  'submit #subscribe': function() {
    event.preventDefault();
    var oldCardId = Session.get('cardDetails').id;

    //Disable the submit button to prevent repeated clicks
    $('#submit').prop('disabled', true);

    toastr.info('Validating your card details...')
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
          toastr.info('Please wait while we process your subscription...');
          Meteor.call('updateStripeCard', oldCardId, response.id, function(error, response) {
            if(error) {
              Modal.hide();
              toastr.error('Unable to update card details');
              throw new Meteor.Error('Card error', 'Unable to update card details.')
            }
            toastr.clear();
            toastr.success('Your card details have been updated.');
            $('#cardDetails').empty();
            $('.modal-footer').show();
            Blaze.renderWithData(Template.cardDetails, response, document.getElementById('cardDetails'));
          });
        }
    });
  }
})

Template.stripeUnsubscribe.helpers({
  limitReached: function() {
  return Tenants.findOne({}).totalRecords > MAX_RECORDS;
  }
});

Template.stripeUnsubscribe.events({
  'click #unsubscribe': function() {
    event.preventDefault();
    $('#unsubscribe').prop('disabled', true);
    toastr.info('Processing your changes...');
    Meteor.call('cancelStripeSubscription', Tenants.findOne({})._id, function(error, response) {
      if(error) {
        Modal.hide();
        toastr.error('Unable to cancel subscription');
        throw new Meteor.Error('Undefined', 'Unable to cancel stripe subscription, ' + error);
      }
      Modal.hide();
      toastr.clear();
      toastr.success('Your subscription has successfully been cancelled.');
    });
  }
});