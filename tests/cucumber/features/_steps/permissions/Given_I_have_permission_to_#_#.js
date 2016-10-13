module.exports = function() {

  const collectionMap = {
    'companies': 'companies',
    'contacts': 'contacts',
    'purchase orders': 'purchaseorders',
    'opportunities': 'opportunities',
    'jobs': 'jobs',
    'products': 'products',
    'event logs': 'eventLog',
    'tasks': 'tasks'
  };

  this.Given(/^I have permission to (\w+) ([^"]*)$/, function(action, friendlyEntityName) {
    expect(Object.keys(collectionMap)).toContain(friendlyEntityName);

    const getUserId = () => Meteor.userId();
    const user = browser.execute(getUserId).value;

    server.execute(function(userId, innerAction, collectionName) {
      const requiredPermission = permissionGenerator(innerAction, collectionName);
      Roles.addUsersToRoles(userId, requiredPermission);
    }, user, action, collectionMap[friendlyEntityName]);
  });
};
