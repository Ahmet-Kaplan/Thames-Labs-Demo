module.exports = function() {

  const collectionMap = {
    'companies': 'companies',
    'contacts': 'contacts',
    'purchase orders': 'purchaseorders',
    'opportunities': 'opportunities',
    'projects': 'projects',
    'products': 'products',
    'event logs': 'eventLog',
    'tasks': 'tasks'
  };

  this.Given(/^I have permission to (\w+) ([^"]*)$/, function(action, friendlyEntityName) {
    expect(Object.keys(collectionMap)).toContain(friendlyEntityName);
    server.execute(function(userId, action, collectionName) {
      const requiredPermission = permissionGenerator(action, collectionName);
      Roles.addUsersToRoles(userId, requiredPermission);
    }, browser.userId(), action, collectionMap[friendlyEntityName]);
  });
}
