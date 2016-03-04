AutoForm.hooks({
  addNewUserForm: {
    onSuccess: function(formType, result) {
      var tenantId = Meteor.user().group;
      if (!IsTenantPro(tenantId) && TenantUserCount(tenantId) === MAX_FREE_USERS) {
        ShowUpgradeToastr('To add more users');
        return;
      }

      if (!IsTenantPro(tenantId)) {
        var userId = this.insertDoc._id;
        Roles.addUsersToRoles(userId, defaultPermissionsList);
        Roles.addUsersToRoles(userId, 'Administrator');
      }

      Modal.hide();
      if (Tenants.findOne({}).plan === 'pro') {
        bootbox.alert({
          title: 'New user added',
          message: '<div class="bg-success"><i class="fa fa-check fa-3x pull-left text-success"></i>New user <strong>' + this.insertDoc.name + '</strong> created<br />An email containing a link to create the password has been sent.<br />Please note that your subscription has been updated accordingly.</div>'
        });
      } else {
        toastr.success('New user <strong>' + this.insertDoc.name + '</strong> created<br />An email containing a link to create the password has been sent.');
      }
    },
    onError: function(formType, error) {
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