import bootbox from 'bootbox';
import { isTenantOverFreeUserLimit } from '/imports/api/tenants/helpers.js';

import './users/tenant-list-user-item.js';
import './users/modals/insert-tenant-user.js';
import './modals/update-tenant.js';
import './modals/set-paying-tenant.js';
import './tenant-list-item.html';

Template.tenantListItem.helpers({
  toBeDeleted: function() {
    return this.settings.toBeDeleted === true;
  },
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
  deletionInProgress: function() {
    return ServerSession.get('deletingTenant');
  },
  users: function() {
    return Meteor.users.find({
      group: this.__originalId
    });
  }
});

Template.tenantListItem.events({
  "click #btnCancelDeletion": function(event, template) {
    event.preventDefault();
    const tenantId = this.__originalId;


    bootbox.confirm("Cancel deletion request?", function(result) {
      if (result === true) {
        Meteor.call('tenant.cancelDeletion', tenantId);
      }
    });

  },
  "click #btnAddNewTenantUser": function(event, template) {
    event.preventDefault();
    const tenantId = this.__originalId;

    if (tenantId) {
      if (!isProTenant(tenantId) && isTenantOverFreeUserLimit(tenantId)) {
        toastr.warning('To add more users, this tenant must first upgrade to the Pro plan.');
        return false;
      }
    }

    Modal.show('insertTenantUser', this);
  },
  "click #btnDeleteTenant": function(event, template) {
    event.preventDefault();
    const tenantId = this.__originalId;
    const name = this.name;

    bootbox.confirm("Are you sure you wish to delete this tenant?", function(result) {
      if (result === true) {
        bootbox.prompt("A bold decision! You can still back out of it if you want to. If you're sure, type 'delete' into the box below and press OK.", function(result) {
          if (result === 'delete') {
            Meteor.call('setTenantDeletionFlag', true);

            Meteor.call('tenant.remove', tenantId, function(err, res) {
              if (err) {
                toastr.error(err);
                Meteor.call('setTenantDeletionFlag', false);
                return false;
              }
              if (res === true) {
                toastr.success(`Tenant "${name}" removed`);
                Meteor.call('setTenantDeletionFlag', false);
                return true;
              }
            });
          }
        });
      }
    });
  },
  "click #btnEditSettings": function(event, template) {
    event.preventDefault();
    Modal.show('updateTenant', this);
  },
  'click #btnDemoData': function(event, template) {
    event.preventDefault();
    Modal.show('demoDataGeneratorModal', this);
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
