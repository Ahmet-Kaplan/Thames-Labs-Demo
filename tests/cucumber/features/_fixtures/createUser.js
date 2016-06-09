export function createUser(tenantId, name, email) {
  // T-O-D-O: make this use our actual user creation method for better accuracy
  const userId = Accounts.createUser({
    username: name,
    email: email,
    password: "goodpassword",
    profile: {
      name: name
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
