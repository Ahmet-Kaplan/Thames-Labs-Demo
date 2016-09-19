module.exports = function() {

  var url = require('url');

  this.When(/^I navigate to a contact page$/, function() {
    browser.url(url.resolve(process.env.ROOT_URL, '/contacts'));
    browser.waitForExist('.list-group-item:not(#moar)', 5000);
    browser.waitForVisible('.list-group-item:not(#moar)', 5000);
    browser.click('.list-group-item');
  });

  this.Given(/^I create a new contact belonging to a company$/, function() {
    browser.executeAsync(function(done) {
      Meteor.call('addContactForCompany', done);
    });
  });

};