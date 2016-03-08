Template.tenantList.onCreated(function() {
  Meteor.call('setDemoDataFlag', false);
  // Redirect if not superadmin
  this.autorun(function() {
    superAdminOnly(Meteor.userId());
  });
});

Template.tenantList.helpers({
  tenants: function(paying) {
    var plan = (paying === "true") ? 'pro' : 'free';
    return Tenants.find({
      "plan": plan
    }, {
      sort: {
        name: 1
      }
    });
  },
  tenantCount: function() {
    return Tenants.find({}).count();
  },
  users: function() {
    return Meteor.users.find({
      group: this._id
    });
  },
  userCount: function() {
    return Meteor.users.find({
      group: {
        $ne: undefined
      }
    }).count();
  }
});


Template.tenant.helpers({
  freePaying: function() {
    return this.plan === 'pro' && !this.stripe.stripeSubs;
  },
  userCount: function() {
    return Meteor.users.find({
      group: this._id
    }).count();
  },
  showDemoDataButton: function() {
    if (Meteor.isDevelopment) return true;
    if (Meteor.users.find({
        group: this._id
      }).count() > 0) return false;
    return true;
  },
  isPayingTenant: function() {
    return this.plan === 'pro';
  },
  generationInProgress: function() {
    return ServerSession.get('populatingDemoData');
  }
});

Template.tenantList.events({
  "click #btnAddNewTenant": function(event, template) {
    event.preventDefault();
    Modal.show('addTenant');
  }
});

Template.tenant.events({
  "click #btnAddNewTenantUser": function(event, template) {
    event.preventDefault();

    var tenantId = this._id;

    if (!isProTenant(tenantId) && isTenantOverFreeUserLimit(tenantId)) {
      toastr.warning('To add more users, this tenant must first upgrade to the Pro plan.');
      return;
    }

    Modal.show('addTenantUser', this);
  },
  "click #btnDeleteTenant": function(event, template) {
    event.preventDefault();
    var tenantId = this._id;

    bootbox.confirm("Are you sure you wish to delete this tenant?", function(result) {
      if (result === true) {
        Meteor.call('deleteAllTenantUsers', tenantId, function(error, response) {
          if (error) {
            toastr.error('Unable to delete all the users for this tenant.');
            return false;
          }
          Tenants.remove(tenantId);
        });
      }
    });
  },
  "click #btnEditSettings": function(event, template) {
    event.preventDefault();
    Modal.show('updateTenantSettings', this);
  },
  'click #btnDemoData': function() {
    Meteor.call('generateDemoData', this._id);
  },
  'click #btnSwitchToFree': function(event) {
    event.preventDefault();
    var tenantId = this._id
        tenant = Tenants.findOne(tenantId);

    if (!tenant.stripe || !tenant.stripe.stripeId || !tenant.stripe.stripeSubs) {
      // No subscription, so must be Free Pro
      bootbox.confirm("Are you sure you wish to set this tenant to the <strong>Free Scheme</strong>?", function(result) {
        if (result) {
          Tenants.update(tenantId, {
            $set: { 'plan': 'free' }
          }, function(err, res) {
            if (err) {
              toastr.error(err);
              return;
            }
            toastr.success('Tenant downgraded to free plan');
          });
        } else {
          toastr.info('Tenant plan has not been changed');
        }
      });
    } else {
      // Has stripe subscription
      bootbox.confirm("Are you sure you wish to set this tenant to the <strong>Free Scheme</strong><br>This will cancel any ongoing subscription?", function(result) {
        if (result === true) {
          toastr.info('Processing the update...');
          Meteor.call('stripe.cancelSubscription', tenantId, function(error, response) {
            if (error) {
              bootbox.alert({
                title: 'Error',
                message: '<div class="bg-danger"><i class="fa fa-times fa-3x pull-left text-danger"></i>Unable to cancel subscription.<br />See Stripe dashboard to cancel manually.</div>'
              });
              return false;
            }
            toastr.success('The subscription has been cancelled successfully.<br />Switched to Free Scheme.');
          });
        }
      });
    }
  },
  'click #btnSwitchToPaying': function(event) {
    event.preventDefault();
    Modal.show('setPayingTenant', this);
  }
});

Template.user.helpers({
  friendlyLastLogin: function() {
    if (this.profile.lastLogin === null) {
      return "Never logged in.";
    } else {
      return "Last logged in " + moment(this.profile.lastLogin).fromNow();
    }
  },
  emailAddress: function() {
    return this.emails[0].address;
  }
});

Template.user.events({
  "click #btnDeleteTenantUser": function(event, template) {
    var userId = this._id;
    var userName = this.profile.name;
    event.preventDefault();

    bootbox.confirm("Are you sure you wish to delete the user " + userName + "?", function(result) {
      if (result === true) {
        Meteor.call('removeUser', userId, function(error, response) {
          if (error) {
            toastr.error('Unable to remove user.');
            return false;
          }
          toastr.success('User ' + userName + ' successfully removed.');
        });
      }
    });
  },
  "click #btnEditTenantUser": function(event, template) {
    event.preventDefault();
    Modal.show('editTenantUser', this);
  }
});
