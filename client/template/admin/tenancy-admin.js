Template.tenancyAdminPage.onCreated(function() {
  // Redirect if read permission changed - we also check the initial load in the router
  this.autorun(function() {
    redirectWithoutPermission(Meteor.userId(), 'Administrator');
  });
});

Template.tenancyAdminPage.helpers({
  tenantUsers: function() {
    return Meteor.users.find({
      _id: {
        $ne: Meteor.userId()
      }
    });
  }
});

Template.tenancyAdminPage.events({
  'click #btnEditTenantUserGeneralSettings': function() {
    Modal.show('editTenantUserGeneralSettings', this);
  },
  'click #btnEditTenantUserPermissions': function() {
    Modal.show('editTenantUserPermissions', this);
  },
  'click #addNewUserAccount': function() {
    Modal.show('addNewUser', this);
  },
  'click #tenantRemoveUser': function() {
    event.preventDefault();
    self = this;

    bootbox.confirm("Are you sure you wish to remove the user" + this.name + "?<br />This action is not reversible.", function(result) {
      if (result === true) {
        Meteor.call('removeUser', self._id);
      }
    });
  }
});
