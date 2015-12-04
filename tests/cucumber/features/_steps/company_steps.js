module.exports = function() {

  var url = require('url');

  this.When(/^I navigate to a company page$/, function() {
    browser.url(url.resolve(process.env.ROOT_URL, '/companies'));
    browser.waitForExist('.list-group-item:not(#moar)', 5000);
    browser.waitForVisible('.list-group-item:not(#moar)', 5000);
    browser.click('.list-group-item');
  });

};
