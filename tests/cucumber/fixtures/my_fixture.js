Meteor.methods({
  'reset' : function() {
    // you can do some resetting of your app here
    // fixture code will only execute inside mirrors neither runs
    // inside the main app nor gets bundled to production.
  }
});

Meteor.startup(function() {
  Meteor.users.remove({});
  Accounts.createUser({
    username: "test user",
    email: "test@domain.com",
    password: "goodpassword",
    profile: {
      name: "test user"
    }
  });
});
