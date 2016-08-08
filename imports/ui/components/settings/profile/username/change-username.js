import './change-username.html';

Template.changeUsername.helpers({
  userName: function() {
    return Meteor.user().profile.name;
  }
});

Template.changeUsername.events({
  'click #btnUsernameChange': function(e) {
    e.preventDefault();

    if ($('#objNewUsername').val() === "") {
      toastr.warning("Please enter your new name.");
      return;
    }
    Meteor.call("user.changeUsername", $('#objNewUsername').val(), function(err, res) {
      if (err) {
        toastr.error("Error updating name: " + err);
        return;
      }

      $('#objNewUsername').val("");

      if(!res) {
        toastr.error('The name you have chosen is already in use. Please choose a different name.');
        return;
      }

      toastr.success('Your name was updated successfully.');
    });
  }
});
