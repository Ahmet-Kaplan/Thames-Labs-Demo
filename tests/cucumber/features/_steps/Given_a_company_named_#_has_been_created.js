module.exports = function() {

  this.Given(/^a company named "([^"]*)" has been created$/, function(name) {
    server.execute(function(userId, name) {
      Partitioner.bindUserGroup(userId, function() {
        Companies.insert({
          name: name,
          createdBy: userId,
          sequencedIdentifier: 1
        });
      });
    }, browser.userId(), name);
  });

};
