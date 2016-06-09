module.exports = function() {

  this.Given(/^a company named "([^"]*)" has been created$/, function(name) {
    browser.execute(function(userId, companyName) {
      Companies.insert({
        name: companyName,
        createdBy: userId,
        sequencedIdentifier: 1
      });
    });
  });
};
