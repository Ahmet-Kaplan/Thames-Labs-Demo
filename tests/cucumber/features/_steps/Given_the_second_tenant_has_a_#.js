module.exports = function() {
  this.Given(/^the second tenant has an? ([^"]*)$/, function(friendlyEntityName) {
    //Logout and login as second user
    browser.executeAsync(function(done) {
      Meteor.logout(done);
    });
    browser.executeAsync(function(done) {
      Meteor.loginWithPassword('test2@domain.com', 'goodpassword', done);
    });

    //Set second users permissions
    const collectionMap = {
      'Company': 'companies',
      'Contact': 'contacts',
      'Purchase order': 'purchaseorders',
      'Opportunity': 'opportunities',
      'Project': 'projects',
      'Product': 'products',
      'Event': 'eventLog',
      'Task': 'tasks'
    };
    var action = "create";
    expect(Object.keys(collectionMap)).toContain(friendlyEntityName);
    server.execute(function(userId, action, collectionName) {
      const requiredPermission = permissionGenerator(action, collectionName);
      Roles.addUsersToRoles(userId, requiredPermission);
    }, browser.userId(), action, collectionMap[friendlyEntityName]);

    //Add the entity
    browser.executeAsync(function(friendlyEntityName, done) {
      Meteor.call('add' + friendlyEntityName, function() {
        done();
      });
    }, friendlyEntityName);

    //Logout and login as first user
    browser.executeAsync(function(done) {
      Meteor.logout(done);
    });
    browser.executeAsync(function(done) {
      Meteor.loginWithPassword('test@domain.com', 'goodpassword', done);
    });
  });
}
