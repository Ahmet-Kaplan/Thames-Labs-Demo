module.exports = function() {

  var url = require('url');

  //Adding
  this.When(/^I navigate to an opportunity page$/, function() {
    browser.url(url.resolve(process.env.ROOT_URL, '/opportunities'));
    browser.waitForExist('.list-group-item:not(#moar)', 5000);
    browser.waitForVisible('.list-group-item:not(#moar)', 5000);
    browser.click('.list-group-item');
  });

  //Deleting
  this.Then(/^the opportunity should not exist$/, function() {
    browser.waitForExist('#mchNoOpportunityPlaceholder', 2000);
  });

  //Stages
  this.Then(/^I should see that the opportunity has been lost$/, function() {
    browser.waitForExist('h3*=lost', 2000);
    browser.getText('h3*=lost');
  });

  this.Then(/^I should see that an project has been created from the opportunity$/, function() {
    browser.waitForExist('.entity-title*=Project', 2000);
    browser.waitForExist('a*=opportunity', 2000);
    browser.getText('a*=opportunity');
  });

  //Line items
  this.Given(/^the opportunity has a line item$/, function() {
    browser
      .executeAsync(function(done) {
        Meteor.call('addOpportunityLineItem', function() {
          done();
        });
      });
  });

  this.Then(/^I should see a new line item in an opportunity$/, function() {
    browser.waitForExist(".edit-line-item");
    browser.getText('h4*=testItem1');
  });

  this.Then(/^I should see an updated line item in an opportunity$/, function() {
    browser.waitForExist(".edit-line-item");
    browser.getText('h4*=testItem2');
  });
};
