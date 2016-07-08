import './change-email.html';

Template.changeEmail.helpers({
  userEmail: function() {
    return Meteor.user().emails[0].address;
  }
});

Template.changeEmail.events({
  'click #btnEmailChange': function(e) {
    e.preventDefault();

    if ($('#objNewEmail').val() === "") {
      toastr.warning("Please enter your new email address.");
      return;
    }
    if ($('#objRepEmail').val() === "") {
      toastr.warning("Please re-enter your new email address.");
      return;
    }
    if ($('#objNewEmail').val() !== $('#objRepEmail').val()) {
      toastr.error("Email addresses do not match.");
      return;
    }

    Meteor.call("user.changeEmail", $('#objNewEmail').val(), function(err, res) {
      if (err) {
        toastr.error("Error updating email address: " + err);
        return;
      }

      $('#objNewEmail').val("");
      $('#objRepEmail').val("");

      if(!res) {
        toastr.error('The email address you have chosen is already in use. Please choose a different email address.');
        return;
      }

      toastr.success('Your email address was updated successfully. You should login with your new email address in future.');
    });
  }
});
