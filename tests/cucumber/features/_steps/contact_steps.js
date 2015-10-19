module.exports = function() {

  var url = require('url');

  this.When(/^I navigate to a contact page$/, function() {
    client.url(url.resolve(process.env.ROOT_URL, '/contacts'));
    client.waitForExist('.list-group-item', 10000);
    client.waitForVisible('.list-group-item', 10000);
    client.click('.list-group-item');
  });

  this.Given(/^I create a new contact belonging to a company$/, function() {
    server.call('addContactForCompany');
  });

};
