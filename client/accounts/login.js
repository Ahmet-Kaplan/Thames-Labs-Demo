Template.login.events({

  'submit #login': function(event, template) {

    event.preventDefault();

    var username = template.find('#login-username').value,
        password = template.find('#login-password').value;

    Meteor.loginWithElite(username, password, function(error) {
      if (error) {
        Materialize.toast('Login unsuccessful', 2000, 'red');
      } else {
        Materialize.toast('Login successful', 2000);
        Router.go('/');
      }
    });

  },

});
