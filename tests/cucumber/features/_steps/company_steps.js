module.exports = function() {

var url = require('url');

//Reading
  this.When(/^I navigate to a company page$/, function(callback) {
    this.client
      .url(url.resolve(process.env.ROOT_URL, '/companies'))
      .waitForExist('.list-group-item', 2000)
      .click('.list-group-item')
      .pause(200)
      .refresh()
      .call(callback);
  });

//Deleting
  this.Then(/^the company should not exist$/, function(callback) {
    this.client
      .getText('h4*=No companies')
      .call(callback);
  });

};
