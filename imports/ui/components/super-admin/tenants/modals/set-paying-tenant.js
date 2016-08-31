import bootbox from 'bootbox';
import './set-paying-tenant.html';

Template.setPayingTenant.helpers({
  hasStripeAccount: function() {
    return (typeof this.stripe.stripeId !== "undefined" && this.stripe.stripeId !== '');
  },
  stripeId: function() {
    return (typeof this.stripe.stripeId !== "undefined") ? this.stripe.stripeId : '';
  },
  stripeSubs: function() {
    return this.stripe.stripeSubs;
  },
  freeUsers: function() {
    return Tenants.findOne({
      _id: this.__originalId
    }).stripe.maxFreeUsers;
  }
});

Template.setPayingTenant.events({
  'click #updateMaxFreeUsers': function(evt) {
    evt.preventDefault();
    toastr.info('Processing changes...');
    const freeUsers = parseInt($('#freeUsers').val(), 10);

    Tenants.update(this.__originalId, {
      $set: {
        "stripe.maxFreeUsers": freeUsers
      }
    }, function(err, res) {
      if (err || !res) {
        toastr.error('Unable to update the number of free users');
        return;
      }
      toastr.info('Free user limit updated...');
    });

    Meteor.call('stripe.updateQuantity', this.__originalId, function(err, res) {
      if(err || !res) {
        toastr.error('Unable to update subscription. The number of free users may still have been updated.');
        return;
      }
      toastr.clear();
      toastr.success(`Account updated. Free user accounts is now ${freeUsers}.`);
    });

  },
  'keyup #stripeAccountNumber': function() {
    if ($('#stripeAccountNumber').val() != '') {
      $('#showSubsNumberForm').show();
    } else {
      $('#showSubsNumberForm').hide();
    }
  },

  'click #btnSaveStripeAccount': function() {
    const tenantId = this.__originalId;
    const stripeId = $('#stripeAccountNumber').val();
    bootbox.confirm({
      backdrop: false,
      message: '<div class="bg-warning"><i class="fa fa-exclamation fa-3x pull-left text-warning"></i>' +
        'The account number will be saved directly to the database. ' +
        'No verification will be made with Stripe. ' +
        'Are you sure you wish to save this account number?</div>',
      callback: function(result) {
        if (result === true) {
          Tenants.update(tenantId, {
            $set: {
              "stripe.stripeId": stripeId
            }
          }, function(error, nUpdated) {
            if (error || nUpdated === false) {
              bootbox.alert({
                title: 'Error',
                message: '<div class="bg-danger"><i class="fa fa-times fa-3x pull-left text-danger"></i>Unable to update record.</div>',
                className: 'bootbox-danger'
              });
              return;
            }
            toastr.success('Account Number has been set successfully. You may now enter Subscription details.');
          });
        }
      }
    });
  },

  'click #btnRemoveSubsId': function() {
    toastr.info('Processing update...');
    Tenants.update(this.__originalId, {
      $unset: {
        "stripe.stripeSubs": ""
      }
    });
    toastr.clear();
    Modal.hide();
    toastr.success('Subscription ID has been removed.');
  },

  'click #btnSaveStripeSubs': function() {
    const newStripeSubs = $('#stripeSubsNumber').val();
    Tenants.update(this.__originalId, {
      $set: {
        "stripe.stripeSubs": newStripeSubs
      }
    }, function(error, nUpdated) {
      Modal.hide();
      if (error || nUpdated === false) {
        bootbox.alert({
          title: 'Error',
          message: `<i class="fa fa-times fa-3x pull-left text-danger"></i>Unable to update record.<br />Error: ${error}`
        });
        return false;
      }

      toastr.success('Subscription has been successful.<br />Switched to Paying Scheme.');
    });
  },

  'click #btnCreateStripeSubs': function() {
    toastr.info('Processing subscription');
    $('#btnSaveStripeSubs').prop('disabled', true);
    $('#btnCreateStripeSubs').prop('disabled', true);
    let planCurrency = $('#subsCurrency').val();
    if(!_.includes(['GBP', 'EUR', 'USD'], planCurrency)) {
      planCurrency = 'GBP';
    }
    Meteor.call('stripe.createSubscription', `premier${planCurrency}`, this.__originalId, function(error, response) {
      if (error) {
        toastr.error(`Unable to create subscription. Check that the customer has a card set up.<br>Error: ${error.reason}`);
        return false;
      }
      Modal.hide();
      toastr.clear();
      toastr.success('Subscription has been successful.');
    });
  }
});

