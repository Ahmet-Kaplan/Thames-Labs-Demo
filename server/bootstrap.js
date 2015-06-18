if (!Meteor.users.findOne({
    roles: 'superadmin'
  })) {

  console.log('No superuser found, creating one');
  var email = 'admin@cambridgesoftware.co.uk',
    randomPassword = "admin"; //faker.internet.password();

  var userId = Accounts.createUser({
    email: email,
    password: randomPassword
  });

  console.log('User: ' + email);
  console.log('Password: ' + randomPassword);

  Roles.addUsersToRoles(userId, 'superadmin');
  Meteor.users.update(userId, {
    $set: {
      admin: 'true'
    }
  });
}
