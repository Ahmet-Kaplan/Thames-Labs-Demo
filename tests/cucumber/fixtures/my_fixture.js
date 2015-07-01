Meteor.methods({
  'reset' : function() {
    // you can do some resetting of your app here
    // fixture code will only execute inside mirrors neither runs
    // inside the main app nor gets bundled to production.
  }
});

Meteor.startup(function() {
  Meteor.users.remove({});

   var userId = Accounts.createUser({
    username: "test user",
    email: "test@domain.com",
    password: "goodpassword",
    profile: {
      name: "test user"
    }
  });

  // Important! Otherwise subs manager fails to load things and you get a lot of "loading..." screens
  Partitioner.setUserGroup(userId, 'tenant 1');

  var userId2 = Accounts.createUser({
    username: "test user 2",
    email: "test2@domain.com",
    password: "goodpassword",
    profile: {
      name: "test user 2"
    }
  });
  Partitioner.setUserGroup(userId2, 'tenant 2');
});
