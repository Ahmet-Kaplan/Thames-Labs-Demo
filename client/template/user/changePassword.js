
Template.changePassword.events({
  'click #btnPasswordChange': function() {
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
        toastr.error("Error changing password.");
      }

      Modal.hide();
      toast.success('Password changed successfully.');
    });
  }
});
