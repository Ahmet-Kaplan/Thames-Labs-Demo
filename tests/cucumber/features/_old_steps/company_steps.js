module.exports = function() {

  var url = require('url');

  this.When(/^I navigate to a company page$/, function() {
    browser.url(url.resolve(process.env.ROOT_URL, '/companies'));
    browser.safeClick('#mchCompany');
  });

};