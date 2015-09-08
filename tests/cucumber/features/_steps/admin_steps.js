module.exports = function() {

  this.When(/^I should an global field with the name "([^"]*)" in the list "([^"]*)"$/, function(gfName, listName, callback) {
    this.client
      .waitForExist(listName, 2000)
      .getText('.list-group-item', 2000).then(function(text) {
        expect(text).to.equal(gfName);
      })
      .call(callback);
  });
};
