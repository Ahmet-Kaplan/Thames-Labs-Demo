Meteor.startup(function() {
  Meteor.call('getStripePK', function(error, result) {
    if(error) {
      console.log('Unable to retrieve Stripe Public Key.');
      return false;
    }
    Session.set('STRIPE_PK', result);
    Stripe.setPublishableKey(result);
  })
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
              toastr.error('Unable to create customer');
              return false;
            }

            Meteor.call('createStripeSubscription', result, function(error, response) {
              if(error) {
                Modal.hide();
                bootbox.alert({
                  title: 'Error',
                  message: '<div class="bg-danger"><i class="fa fa-times fa-3x pull-left text-danger"></i>Unable to create subscription.</div>'
                });
                return false;
              }
              toastr.clear();
              Modal.hide();
              bootbox.alert({
                title: 'Subscription complete',
                message: '<div class="bg-success"><i class="fa fa-check fa-3x pull-left text-success"></i>Your subscription has been successful.<br />Thank you for using RealtimeCRM!</div>'
              });
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
      displayCardDetails(response);
    });
});

Template.stripeResubscribe.events({
  'click #resubscribe': function() {
    event.preventDefault;
    toastr.info('Processing your subscription.');
    stripeId = Tenants.findOne({}).stripeId;
    if(!stripeId) {
      toastr.error('Missing stripe account.');
      Modal.hide();
      return false;
    }
    Meteor.call('createStripeSubscription', stripeId, function(error, response) {
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
    Meteor.call('cancelStripeSubscription', function(error, response) {
      if(error) {
        Modal.hide();
        bootbox.alert({
          title: 'Error',
          message: '<div class="bg-danger"><i class="fa fa-times fa-3x pull-left text-danger"></i>Unable to cancel subscription.<br />Please contact us if the problem remains.</div>'
        });
        return false;
      }
      Modal.hide();
      toastr.clear();
      bootbox.alert({
        title: 'Subscription updated',
        message: '<div class="bg-success"><i class="fa fa-check fa-3x pull-left text-success"></i>Your subscription has been cancelled successfully.<br />We welcome any feedback on RealtimeCRM.</div>'
      });
    });
  },

  sendErrorEmail: function(tenantName, tenantId, error) {
    Email.send({
      to: 'david.mcleary@cambridgesoftware.co.uk',
      from: 'RealtimeCRM admin <admin@realtimecrm.co.uk',
      subject: 'Error on updating subscription',
      text: "Error on updating the stripe subscription for tenant " + tenantName + ", id " + tenantId + ".\n"
            + "Error: " + error
    })
  }
});