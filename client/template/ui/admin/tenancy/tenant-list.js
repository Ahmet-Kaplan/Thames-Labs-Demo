Template.tenantList.helpers({
  tenants: function(paying) {
    var payingTenant = (paying === "true") ? true : false;
    return Tenants.find({ paying: payingTenant });
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
    return Meteor.users.find({ group: {$ne: undefined} }).count();
  }
});


Template.tenant.helpers({
  userCount: function() {
    return Meteor.users.find({
      group: this._id
    }).count();
  },
  recordsCount: function() {
    return this.totalRecords;
  },
  isPayingTenant: function() {
    return this.paying;
  },
  isBlocked: function() {
    return this.blocked;
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
    Modal.show('addTenantUser', this);
  },
  "click #btnDeleteTenant": function(event, template) {
    event.preventDefault();
    var tenantId = this._id;

    bootbox.confirm("Are you sure you wish to delete this tenant?", function(result) {
      if (result === true) {
        Tenants.remove(tenantId);
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
    var tenantId = this._id;

    bootbox.confirm("Are you sure you wish to set this tenant to the <strong>Free Scheme</strong><br />This will cancel any ongoing subscription?", function(result) {
      if (result === true) {
        toastr.info('Processing the update...');
        Meteor.call('cancelStripeSubscription', tenantId, function(error, response) {
          if(error) {
            bootbox.alert({
              title: 'Error',
              message: '<div class="bg-danger"><i class="fa fa-times fa-3x pull-left text-danger"></i>Unable to cancel subscription.<br />See Stripe dashboard to cancel manually.</div>'
            });
            throw new Meteor.Error('Undefined', 'Unable to cancel stripe subscription, ' + error);
          }
          bootbox.alert({
            title: 'Subscription updated',
            message: '<div class="bg-success"><i class="fa fa-check fa-3x pull-left text-success"></i>The subscription has been cancelled successfully.<br />Switched to Free Scheme.</div>'
          });
        });
      }
    });
  },
  'click #btnSwitchToPaying': function(event) {
    event.preventDefault();
    var tenantId = this._id;
    if(this.stripeId) {
      bootbox.prompt({
        title: 'Enter Stripe Subscription Number',
        value: 'sub_',
        callback: function(result) {
          Tenants.update(tenantId, {
            $set: {
              paying: true,
              stripeSubs: result
            }
          }, function(error, nUpdated) {
            if(error) {
              bootbox.alert({
              title: 'Error' + nUpdated,
              message: '<div class="bg-danger"><i class="fa fa-times fa-3x pull-left text-danger"></i>Unable to update record.<br />Subscription number seems valid. Check connexion with database.</div>'
              });
            } else if(nUpdated === false) {
              bootbox.alert({
              title: 'Error' + nUpdated,
              message: '<div class="bg-danger"><i class="fa fa-times fa-3x pull-left text-danger"></i>Unable to update record.<br />Check the validity of the subscription number.</div>'
              });
            } else {
              bootbox.alert({
                title: 'Subscription complete ' + nUpdated,
                message: '<div class="bg-success"><i class="fa fa-check fa-3x pull-left text-success"></i>Your subscription has been successful.<br />Switched to Paying Scheme.'
              });
            }
          });
        }
      })
    } else {
      Modal.show('setPayingTenant', this);
    }
  },
  'click #btnBlockTenant': function(event) {
    event.preventDefault();
    var tenantId = this._id;
    var blocked = (this.blocked == true) ? 'un' : '';

    bootbox.confirm("Are you sure you wish to " + blocked + "block this tenant?", function(result) {
      if (result === true) {
        Tenants.update(tenantId, {
          $set: {
            blocked: !blocked
          }
        });
      }
    });
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
    event.preventDefault();

    bootbox.confirm("Are you sure you wish to delete this user?", function(result) {
      if (result === true) {
        Meteor.call('removeUser', userId);
      }
    });
  },
  "click #btnEditTenantUser": function(event, template) {
    event.preventDefault();
    Modal.show('editTenantUser', this);
  }
});

Template.setPayingTenant.helpers({
  hasStripeAccount: function() {
    return (this.stripeId !== undefined);
  }
});
