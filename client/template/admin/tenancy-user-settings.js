Template.editTenantUserGeneralSettings.onRendered(function() {
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
