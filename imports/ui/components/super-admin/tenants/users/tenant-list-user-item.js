import bootbox from 'bootbox';
import './tenant-list-user-item.html';
import './modals/update-tenant-user.js';

Template.tenantListUserItem.helpers({
  friendlyLastLogin: function() {
    if (this.profile.lastLogin === null) {
      return "Never logged in.";
    }
    return "Last logged in " + moment(this.profile.lastLogin).fromNow();
  },
  emailAddress: function() {
    return this.emails[0].address;
  }
});

Template.tenantListUserItem.events({
  "click #btnDeleteTenantUser": function(event, template) {
    const userId = this._id;
    const userName = this.profile.name;
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
    Modal.show('updateTenantUser', this);
  }
});
