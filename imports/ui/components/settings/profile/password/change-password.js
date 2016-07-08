import './change-password.html';

Template.changePassword.events({
  'click #btnPasswordChange': function(e) {
    e.preventDefault();
    if ($('#objOldPassword').val() === "") {
      toastr.warning("Please enter your current password.");
      return;
    }
    if ($('#objNewPassword').val() === "") {
      toastr.warning("Please enter your new password.");
      return;
    }
    if ($('#objRepPassword').val() === "") {
      toastr.warning("Please re-enter your new password.");
      return;
    }
    if ($('#objNewPassword').val() !== $('#objRepPassword').val()) {
      toastr.error("New passwords do not match.");
      return;
    }

    Accounts.changePassword($('#objOldPassword').val(), $('#objNewPassword').val(), function(err) {
      if (err) {
        if (err.reason == "Incorrect password") {
          toastr.error("Old password is incorrect.");
        } else {
          toastr.error("Error changing password.");
        }
        return;
      }

      $('#objOldPassword').val("");
      $('#objNewPassword').val("");
      $('#objRepPassword').val("");

      toastr.success('Password changed successfully.');
      Modal.hide();
    });
  }
});
