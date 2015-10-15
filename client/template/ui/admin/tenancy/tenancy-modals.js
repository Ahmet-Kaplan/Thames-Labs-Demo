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
  },

  coupon: function() {
    return this.stripe.coupon;
  }
});

Template.updateTenantSettings.events({
  'click #btnSubmitSettings': function() {

    var o = {};
    for (var p in this.settings) {
      o[p] = $('#val-' + p).val();
    }

    var coupon = $('#coupon').val();

    Tenants.update(this._id, {
      $set: {
        settings: o,
        "stripe.coupon": coupon
      }
    });

    Modal.hide();
    toastr.success("Settings saved.");
  }
});

Template.setPayingTenant.helpers({
  hasStripeAccount: function() {
    return (this.stripe.stripeId !== undefined && this.stripe.stripeId !== '');
  },
  stripeId: function() {
    return (this.stripe.stripeId !== undefined) ? this.stripe.stripeId : '';
  },
  stripeSubs: function() {
    return this.stripe.stripeSubs;
  }
});

Template.setPayingTenant.events({
  'click #setFreeUnlimited': function() {
    var tenantId = this._id;
    var setTo = !Tenants.findOne(tenantId).stripe.freeUnlimited;
    bootbox.confirm({
      message: 'Are you really really sure you want to do that? I mean, come on, that\'s a big deal!',
      callback: function(result) {
        if(result === true) {
          Tenants.update(tenantId, {
            $set: {
              "stripe.freeUnlimited": setTo
            }
          }, function(error, nUpdated) {
            if(error || nUpdated === false) {
              Modal.hide();
              bootbox.alert({
              title: 'Error',
              message: '<div class="bg-danger"><i class="fa fa-times fa-3x pull-left text-danger"></i>Unable to update record.<br />Check connexion with database.</div>'
              });
            } else {
              Modal.hide();
              toastr.success('Tenant status updated.');
            }
          });
        }
      }
    })
  },

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
      message: '<div class="bg-warning"><i class="fa fa-exclamation fa-3x pull-left text-warning"></i>' +
               'The account number will be saved directly to the database. ' +
               'No verification will be made with Stripe. ' +
               'Are you sure you wish to save this account number?</div>',
      callback: function(result) {
        if(result === true) {
          Tenants.update(tenantId, {
            $set: {
              "stripe.stripeId": stripeId
            }
          }, function(error, nUpdated) {
            if(error || nUpdated === false) {
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
    Meteor.call('resumeStripeSubscription', this._id, function(error, response) {
      if(error) {
        Modal.hide();
        toastr.error('Unable to resume subscription.');
        return false;
      }
      toastr.clear();
      Modal.hide();
      toastr.success('Subscription has been resumed.<br />Switched to Paying Scheme.');
    });
  },

  'click #btnSaveStripeSubs': function() {
    var newStripeSubs = $('#stripeSubsNumber').val();
    Tenants.update(this._id, {
      $set: {
        "stripe.paying": true,
        "stripe.stripeSubs": newStripeSubs
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
    toastr.info('Processing subscription');
    $('#btnSaveStripeSubs').prop('disabled', true);
    $('#btnCreateStripeSubs').prop('disabled', true);
    Meteor.call('createStripeSubscription', this._id, function(error, response) {
      if(error) {
        Modal.hide();
        toastr.error('Unable to create subscription. Check that the customer has a card set up.');
        return false;
      }
      Modal.hide();
      toastr.success('Subscription has been successful.<br />Switched to Paying Scheme.');
    });
  }
});
