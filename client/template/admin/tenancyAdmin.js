Template.tenancyAdminPage.helpers({
  tenantUsers: function() {
    return Meteor.users.find({});
  }
});

Template.tenancyAdminPage.events({
  'click #btnEditTenantUserPermissions': function() {
    Modal.show('editTenantUserPermissions', this);
  }
});
