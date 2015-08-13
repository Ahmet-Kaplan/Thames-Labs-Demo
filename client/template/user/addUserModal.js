AutoForm.hooks({
    addNewUserForm: {
      onSuccess: function() {
        Modal.hide();
        toastr.success('New user created<br />An email containing the password has been sent.');
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