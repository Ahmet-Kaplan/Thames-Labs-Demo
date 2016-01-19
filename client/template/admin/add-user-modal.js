AutoForm.hooks({
    addNewUserForm: {
      onSuccess: function(formType, result) {
        Modal.hide();
        if(Tenants.findOne({}).stripe.paying) {
            bootbox.alert({
              title: 'New user added',
              message: '<div class="bg-success"><i class="fa fa-check fa-3x pull-left text-success"></i>New user <strong>' + this.insertDoc.name + '</strong> created<br />An email containing a link to create the password has been sent.<br />Please note that your subscription has been updated accordingly.</div>'
            });
        } else {
          toastr.success('New user <strong>' + this.insertDoc.name + '</strong> created<br />An email containing a link to create the password has been sent.');
        }
      },
      onError: function(formType, error) {
        if(error.reason === "Email already exists.") {
          toastr.error('A user with this email already exists.');
        } else {
          toastr.error('Unable to create user.');
        }
      }
    }
});

Template.addNewUser.events({
  'click #close': function() {
    Session.set(sessionVar);
    hopscotch.endTour(true);
  }
});
