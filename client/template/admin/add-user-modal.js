AutoForm.hooks({
    addNewUserForm: {
      onSuccess: function(formType, result) {
        Modal.hide();
        toastr.success('New user <strong>' + this.insertDoc.name + '</strong> created<br />An email containing a link to create the password has been sent.');
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
