// Add superuser if none exists
if (!Meteor.users.findOne({roles: 'superadmin'})) {
  console.log('No superuser found, creating one');
  var userId = Accounts.createUser({
    email: 'admin@cambridgesoftware.co.uk',
    password: 'admin'
  });
  Roles.addUsersToRoles(userId, 'superadmin');
  // This is necessary for partitioner - it doesn't use the roles package
  Meteor.users.update(userId, {
    $set: {admin: 'true'}
  });
}
