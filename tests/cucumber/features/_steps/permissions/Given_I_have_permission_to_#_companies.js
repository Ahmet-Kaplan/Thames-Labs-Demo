module.exports = function() {

  this.Given(/^I have permission to ([^"]*) companies$/, function(action) {
    server.execute(function(userId, action) {
      if (action === 'view') Roles.addUsersToRoles(userId, 'CanReadCompanies');
      if (action === 'edit') Roles.addUsersToRoles(userId, 'CanEditCompanies');
    }, browser.userId(), action);
  });

};
