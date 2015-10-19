module.exports = function() {

  var url = require('url');

  this.When(/^I navigate to a company page$/, function() {
    client.url(url.resolve(process.env.ROOT_URL, '/companies'));
    client.waitForExist('.list-group-item', 2000);
    client.click('.list-group-item');
  });

};
