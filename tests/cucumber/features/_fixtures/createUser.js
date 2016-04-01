export function createUser(tenantId) {
  // TODO: make this use our actual user creation method for better accuracy
  const userId = Accounts.createUser({
    username: "test user",
    email: "test@domain.com",
    password: "goodpassword",
    profile: {
      name: "test user"
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

  return userId;
}
