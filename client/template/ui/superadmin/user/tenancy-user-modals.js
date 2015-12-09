Template.addTenantUser.helpers({
  formId: function() {
    return 'form-' + this._id;
  }
});

Template.editTenantUser.onRendered(function() {
  var userRef = Meteor.users.findOne({
    _id: this.data._id
  });
  $('#cbUserIsVerified').prop('checked', userRef.emails[0].verified);
  $('#cbUserIsVerified').prop('disabled', true);

  Meteor.call('checkUserRole', this.data._id, 'Administrator', function(err, data) {
    if (err) {
      toastr.error('An error occurred whilst determining Administrator status: ' + err);
      return;
    }

    var isAdmin = data;
    $('#cbUserIsTenantAdministrator').prop('checked', isAdmin);
  });
});

Template.editTenantUser.events({
  'click #btnUpdateTenantUser': function() {
    var adminState = $('#cbUserIsTenantAdministrator').prop('checked');
    Meteor.call('setUserRole', this._id, 'Administrator', adminState);

    toastr.success('User updated.');
    Modal.hide('editTenantUser');
  }
});