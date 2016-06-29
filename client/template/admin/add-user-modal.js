AutoForm.hooks({
  addNewUserForm: {
    beginSubmit: function() {
      toastr.info('Adding new user...');
      $('#createUser').prop('disabled', true);
    },
    onSuccess: function(formType, result) {
      toastr.clear();
      var tenantId = Meteor.user().group;
      if (!isProTenant(tenantId) && isTenantOverFreeUserLimit(tenantId)) {
        showUpgradeToastr('To add more users');
        return;
      }

      if (!isProTenant(tenantId)) {
        var userId = this.insertDoc._id;
        Roles.addUsersToRoles(userId, defaultPermissionsList);
        Roles.addUsersToRoles(userId, 'Administrator');
      }

      Modal.hide();
      if (isProTenant(tenantId)) {
        bootbox.alert({
          title: 'New user added',
          message: '<i class="fa fa-check fa-3x pull-left text-success"></i>New user <strong>' + this.insertDoc.name + '</strong> created<br />An email containing a link to create the password has been sent.<br />Please note that your subscription will be updated accordingly.',
          className: 'bootbox-success'
        });
      } else {
        toastr.success('New user <strong>' + this.insertDoc.name + '</strong> created<br />An email containing a link to create the password has been sent.');
      }
    },
    onError: function(formType, error) {
      $('#createUser').prop('disabled', false);
      toastr.clear();
      if (error.reason === "Email already exists.") {
        toastr.error('A user with this email already exists.');
      } else {
        toastr.error('Unable to create user: ' + error.reason);
      }
    }
  }
});

Template.addNewUser.events({
  'click #close': function() {
    hopscotch.endTour(true);
  }
});
