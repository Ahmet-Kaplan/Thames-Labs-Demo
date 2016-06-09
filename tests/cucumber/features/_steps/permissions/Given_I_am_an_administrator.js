module.exports = function() {

  this.Given(/^I am an administrator$/, function() {
    server.execute(function(userId) {
      Roles.addUsersToRoles(userId, 'Administrator');
    }, browser.userId());
  });

};
