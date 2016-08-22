import './insert-user.html';
import bootbox from 'bootbox';

AutoForm.hooks({
  insertUser: {
    beginSubmit: function() {
      toastr.info('Adding new user...');
      $('#createUser').prop('disabled', true);
    },
    onSuccess: function(formType, result) {
      toastr.clear();
      Modal.hide();

      const tenantId = Meteor.user().group;

      Modal.hide();
      if (isProTenant(tenantId)) {
        bootbox.alert({
          title: 'New user added',
          message: `<i class="fa fa-check fa-3x pull-left text-success"></i>New user <strong>${this.insertDoc.name}</strong> created<br />An email containing a link to create the password has been sent.<br />Please note that your subscription will be updated accordingly.`,
          className: 'bootbox-success'
        });
      } else {
        toastr.success(`New user <strong>${this.insertDoc.name}</strong> created<br />An email containing a link to create the password has been sent.`);
      }
    },
    onError: function(formType, error) {
      $('#createUser').prop('disabled', false);
      toastr.clear();
      if (error.reason === "Email already exists.") {
        toastr.error('A user with this email already exists.');
      } else if(error.reason === "Users limit reached") {
        showUpgradeToastr('To add more users');
      } else {
        toastr.error(`Unable to create user: ${error.reason}`);
      }
    }
  }
});

Template.insertUser.helpers({
  isProTenant: function() {
    const tenantId = Meteor.user().group;
    return isProTenant(tenantId);
  }
});