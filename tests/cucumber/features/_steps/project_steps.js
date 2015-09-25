module.exports = function() {

  var url = require('url');

  this.When(/^I navigate to a project page$/, function(callback) {
    this.client
      .url(url.resolve(process.env.ROOT_URL, '/projects'))
      .waitForExist('.list-group-item', 2000)
      .click('.list-group-item')
      .call(callback);
  });
};
