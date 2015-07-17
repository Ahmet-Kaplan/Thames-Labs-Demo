Meteor.methods({
  'reset': function() {
    ServerSession.set('maintenance', false);
    Partitioner.directOperation(function() {
      Tasks.remove({});
      Companies.remove({});
      Meteor.tags.remove({});
    });
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

  var superadminId = Accounts.createUser({
    username: 'superadmin',
    email: 'admin@cambridgesoftware.co.uk',
    password: 'admin',
    profile: {
      name: 'superadmin'
    },
    admin: true
  });
  Roles.addUsersToRoles(superadminId, 'superadmin');

});
