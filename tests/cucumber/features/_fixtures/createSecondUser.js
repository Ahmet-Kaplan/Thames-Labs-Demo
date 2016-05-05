export function createSecondUser(tenantId) {
  // TODO: make this use our actual user creation method for better accuracy
  const userId = Accounts.createUser({
    username: "second test user",
    email: "test2@domain.com",
    password: "goodpassword",
    profile: {
      name: "second test user"
    }
  });

  Partitioner.setUserGroup(userId, tenantId);

  Meteor.users.update({
    _id: userId
  }, {
    $set: {
      "emails.0.verified": true,
      "profile.welcomeTour": true
    }
  });

  Roles.addUsersToRoles(userId, 'Administrator');
  Roles.addUsersToRoles(userId, 'CanCreateCompanies');
  Roles.addUsersToRoles(userId, 'CanCreateContacts');
  Roles.addUsersToRoles(userId, 'CanCreateEventLog');
  Roles.addUsersToRoles(userId, 'CanReadEventLog');
  return userId;
}
