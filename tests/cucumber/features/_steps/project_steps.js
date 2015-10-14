module.exports = function() {

  var url = require('url');

  this.When(/^I navigate to a project page$/, function() {
    client.url(url.resolve(process.env.ROOT_URL, '/projects'));
    client.waitForExist('.list-group-item', 2000);
    client.click('.list-group-item');
  });
};
