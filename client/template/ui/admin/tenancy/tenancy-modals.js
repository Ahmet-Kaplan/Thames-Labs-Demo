Template.updateTenantSettings.helpers({
  settings: function() {
    var ret = [];

    for (var property in this.settings) {
      var o = {
        name: property,
        value: this.settings[property]
      };
      ret.push(o);
    }

    return ret;
  }
});

Template.updateTenantSettings.events({
  'click #btnSubmitSettings': function() {

    var o = {};
    for (var p in this.settings) {
      o[p] = $('#val-' + p).val();
    }

    Tenants.update(this._id, {
      $set: {
        settings: o
      }
    });

    Modal.hide();
    toastr.success("Settings saved.");
  }
});

Template.setPayingTenant.helpers({
  hasStripeAccount: function() {
    return (this.stripeId !== undefined);
  },
  stripeId: function() {
    return (this.stripeId !== undefined) ? this.stripeId : '';
  }
});

Template.setPayingTenant.events({
  'keyup #stripeAccountNumber': function() {
    if($('#stripeAccountNumber').val() != '') {
      $('#showSubsNumberForm').show();
    } else {
      $('#showSubsNumberForm').hide();
    }
  },

  'click #btnSaveStripeAccount': function() {
    var tenantId = this._id;
    var stripeId = $('#stripeAccountNumber').val();
    bootbox.confirm({
      message: '<div class="bg-warning"><i class="fa fa-exclamation fa-3x pull-left text-warning"></i>'
             + 'The account number will be saved directly to the database. '
             + 'No verification will be made with Stripe. '
             + 'Are you sure you wish to save this account number?</div>',
      callback: function(result) {
        if(result === true) {
          Tenants.update(tenantId, {
            $set: {
              stripeId: stripeId
            }
          }, function(error, nUpdated) {
            if(error || nUpdated === false) {
              bootbox.alert({
              title: 'Error',
              message: '<div class="bg-danger"><i class="fa fa-times fa-3x pull-left text-danger"></i>Unable to update record.<br />Check connexion with database.</div>'
              });
            } else {
              toastr.success('Account Number has been set successfully. You may now enter Subscription details.')
            }
          });
        }
      }
    })
  },

  'click #btnSaveStripeSubs': function() {
    var newStripeSubs = $('#stripeSubsNumber').val();
    Tenants.update(this._id, {
      $set: {
        paying: true,
        stripeSubs: newStripeSubs
      }
    }, function(error, nUpdated) {
      Modal.hide();
      if(error || nUpdated === false) {
        bootbox.alert({
        title: 'Error',
        message: '<div class="bg-danger"><i class="fa fa-times fa-3x pull-left text-danger"></i>Unable to update record.<br />Error: ' + error + '</div>'
        });
        return false;
      } else {
        toastr.success('Subscription has been successful.<br />Switched to Paying Scheme.');
      }
    });
  },

  'click #btnCreateStripeSubs': function() {
    var stripeId = $('#stripeAccountNumber').val();
    toastr.info('Processing subscription');
    $('#btnSaveStripeSubs').prop('disabled', true);
    $('#btnCreateStripeSubs').prop('disabled', true);
    Meteor.call('createStripeSubscription', stripeId, this._id, function(error, response) {
      if(error) {
        Modal.hide();
        toastr.error('Unable to create subscription. Check that the customer has a card set up.');
        return false;
      }
      Modal.hide();
      toastr.success('Subscription has been successful.<br />Switched to Paying Scheme.');
    })
  }
})