Template.updateTenantSettings.helpers({
  coupon: function() {
    return this.stripe.coupon;
  },
  companyName: function() {
    return this.name;
  }
});

Template.updateTenantSettings.events({
  'click #btnSubmitSettings': function() {

    var coupon = $('#coupon').val();
    var tenantCompanyName = $('#tenantCompanyName').val();

    Tenants.update(this.__originalId, {
      $set: {
        name: tenantCompanyName,
        "stripe.coupon": coupon,
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
    var tenantId = this.__originalId;
    var tenant = Tenants.findOne(tenantId);

    if (tenant.plan) {
      if (tenant.plan === "pro" && tenant.stripe.stripeSubs) {
        Modal.hide();
        toastr.info('This tenant is on the pro plan, and thus cannot be set to Free Unlimited.');
        return;
      }
    }

    var set = (tenant.plan && tenant.plan === 'pro') ? 'free' : 'pro';

    bootbox.confirm({
      message: 'Are you really really sure you want to do that? I mean, come on, that\'s a big deal!',
      callback: function(result) {
        if (result === true) {
          Tenants.update(tenantId, {
            $set: {
              "plan": set
            }
          }, function(error, nUpdated) {
            if (error || nUpdated === false) {
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
      } else {
        toastr.success('Subscription has been successful.<br />Switched to Paying Scheme.');
      }
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

Template.generatingDemoData.helpers({
  totalStep: function() {
    return ServerSession.get('demoDataProgress').total;
  },
  currentStep: function() {
    var demoData = ServerSession.get('demoDataProgress');
    return demoData.completed / demoData.total * 100;
  }
});
