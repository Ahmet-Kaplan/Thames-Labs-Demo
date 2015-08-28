module.exports = function() {

  this.When(/^I search for Cowley Road$/, function(callback) {
    this.client
    .waitForVisible('#geo', 2000)
    .setValue('#geo', 'Cowley Road, Cambridge')
    .waitForVisible('.pac-item')
    .click('.pac-item')
    .call(callback);
  });

  this.Then(/^the field "([^"]*)" should contain "([^"]*)"$/, function(fieldName, fieldValue, callback) {
    this.client
      .waitForVisible('input[name=' + fieldName +']', 2000)
      .timeoutsImplicitWait(2000)
      .getValue('input[name=' + fieldName +']').then(function(text) {
        expect(text).to.contain(fieldValue);
      })
      .call(callback);
  });

  this.Then(/^I should see a map$/, function(callback) {
    this.client
      .waitForVisible('.gm-style', 2000)
      .waitForVisible('.gm-style-mtc', 2000)
      .call(callback);
  });

  this.When(/^I navigate to a contact page$/, function(callback) {
    this.client
      .url(url.resolve(process.env.ROOT_URL, '/contacts'))
      .waitForExist('.list-group-item', 2000)
      .click('.list-group-item')
      .call(callback);
  });

};
