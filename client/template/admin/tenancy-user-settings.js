Template.editTenantUserGeneralSettings.onRendered(function() {
  if(!Roles.userIsInRole(Meteor.userId(), ['Administrator'])) {
    toastr.warning("You do not have permission to edit user permissions");
    Modal.hide();
    return;
  }

  var user = this.data;

  $('#user-po-auth-level').val(user.profile.poAuthLevel);

});

Template.editTenantUserGeneralSettings.helpers({

});

Template.editTenantUserGeneralSettings.events({
  'click #btnUpdateTenantUserSettings': function() {
    var userId = this._id;
    var newAuthLevel = $('#user-po-auth-level').val();

    Meteor.call('setUserAuthLevel', userId, newAuthLevel);

    Modal.hide('editTenantUserGeneralSettings');
  }
});
