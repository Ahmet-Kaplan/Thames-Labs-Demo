import './add-user.html';

AutoForm.hooks({
  addUser: {
    onSuccess: function(formType, result) {
      Modal.hide();

      var tenantId = Meteor.user().group;

      if (Tenants.findOne({
        _id: tenantId
      }).plan === 'pro') {
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

Template.addUser.helpers({
  isProTenant: function() {
    const tenantId = Meteor.user().group;
    return isProTenant(tenantId);
  }
});

Template.addUser.events({
  'click #close': function() {
    hopscotch.endTour(true);
  }
});
