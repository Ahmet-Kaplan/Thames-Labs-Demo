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
    var tenantId = this._id;
    var stripeId = $('#stripeAccountNumber').val();
    bootbox.confirm({
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
                message: '<div class="bg-danger"><i class="fa fa-times fa-3x pull-left text-danger"></i>Unable to update record.<br />Check connexion with database.</div>'
              });
            } else {
              toastr.success('Account Number has been set successfully. You may now enter Subscription details.');
            }
          });
        }
      }
    });
  },

  'click #btnResumeStripeSubs': function() {
    toastr.info('Processing update...');
    Meteor.call('stripe.resumeSubscription', this._id, function(error, response) {
      if (error) {
        Modal.hide();
        toastr.error('Unable to resume subscription.');
        return false;
      }
      toastr.clear();
      Modal.hide();
      toastr.success('Subscription has been resumed.<br />Switched to Paying Scheme.');
    });
  },

  'click #btnRemoveSubsId': function() {
    toastr.info('Processing update...');
    Tenants.update(this._id, {
      $unset: {
        "stripe.stripeSubs": ""
      }
    });
    toastr.clear();
    Modal.hide();
    toastr.success('Subscription ID has been removed.');
  },

  'click #btnSaveStripeSubs': function() {
    var newStripeSubs = $('#stripeSubsNumber').val();
    Tenants.update(this._id, {
      $set: {
        "plan": 'pro',
        "stripe.stripeSubs": newStripeSubs
      }
    }, function(error, nUpdated) {
      Modal.hide();
      if (error || nUpdated === false) {
        bootbox.alert({
          title: 'Error',
          message: '<div class="bg-danger"><i class="fa fa-times fa-3x pull-left text-danger"></i>Unable to update record.<br />Error: ' + error + '</div>'
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
    Meteor.call('stripe.createSubscription', this._id, function(error, response) {
      if (error) {
        Modal.hide();
        toastr.error('Unable to create subscription. Check that the customer has a card set up.');
        return false;
      }
      Modal.hide();
      toastr.success('Subscription has been successful.<br />Switched to Paying Scheme.');
    });
  }
});

