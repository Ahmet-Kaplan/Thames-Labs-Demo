module.exports = function() {

var url = require('url');

//Reading
  this.When(/^I navigate to a contact page$/, function(callback) {
    this.client
      .url(url.resolve(process.env.ROOT_URL, '/contacts'))
      .waitForExist('.list-group-item', 2000)
      .click('.list-group-item')
      .call(callback);
  });

  this.Given(/^I create a new contact belonging to a company$/, function(callback) {
    this.server.call('addContactForCompany');
    this.client.call(callback);
  });

};
