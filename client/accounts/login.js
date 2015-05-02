toastr.options = {
  positionClass: 'toast-bottom-right',
  progressBar: true,
  preventDuplicates: true
}

Template.login.events({

  'submit #login': function(event, template) {

    event.preventDefault();

    var username = template.find('#login-username').value,
        password = template.find('#login-password').value;

    Meteor.loginWithElite(username, password, function(error) {
      if (error)
        toastr.error('Login unsuccessful');
      else
        toastr.success('Login successful');
    });

  },

});
