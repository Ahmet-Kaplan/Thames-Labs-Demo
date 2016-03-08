Template.tenantListItem.helpers({
  userCount: function() {
    return Meteor.users.find({
      group: this.__originalId
    }).count();
  },
  showDemoDataButton: function() {
    if (Meteor.isDevelopment) return true;
    if (Meteor.users.find({
        group: this.__originalId
      }).count() > 0) return false;
    return true;
  },
  isPayingTenant: function() {
    return this.plan === "pro" && this.stripe.stripeSubs;
  },
  isFreePlusTenant: function() {
    return this.plan === "pro" && !this.stripe.stripeSubs;
  },
  generationInProgress: function() {
    return ServerSession.get('populatingDemoData');
  },
  users: function() {
    return Meteor.users.find({
      group: this.__originalId
    });
  },
});

Template.tenantListItem.events({
  "click #btnAddNewTenantUser": function(event, template) {
    event.preventDefault();
    Modal.show('addTenantUser', this);
  },
  "click #btnDeleteTenant": function(event, template) {
    event.preventDefault();
    var tenantId = this.__originalId;
    var name = this.name;

    bootbox.confirm("Are you sure you wish to delete this tenant?", function(result) {
      if (result === true) {
        Meteor.call('tenant.remove', tenantId, function(err, res) {
          if (err) {
            toastr.error(err);
            return false;
          }
          if (res === true) {
            toastr.success('Tenant "' + name + '" removed');
          }
        });
      }
    });
  },
  "click #btnEditSettings": function(event, template) {
    event.preventDefault();
    Modal.show('updateTenantSettings', this);
  },
  'click #btnDemoData': function() {
    Meteor.call('generateDemoData', this.__originalId);
  },
  'click #btnSwitchToFree': function(event) {
    event.preventDefault();
    var tenantId = this._id;

    bootbox.confirm("Are you sure you wish to set this tenant to the <strong>Free Scheme</strong><br />This will cancel any ongoing subscription?", function(result) {
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
  },
  'click #btnSwitchToPaying': function(event) {
    event.preventDefault();
    Modal.show('setPayingTenant', this);
  }
});