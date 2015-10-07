module.exports = function() {

  var url = require('url');

  //Adding
  this.Given(/^opportunity stages have been created$/, function() {
    client
      .executeAsync(function(done) {
        Meteor.call('addOpportunityStages', function() {
          done();
        });
      })
  });

  this.When(/^I navigate to an opportunity page$/, function() {
    client.url(url.resolve(process.env.ROOT_URL, '/opportunities'));
    client.waitForExist('.list-group-item', 2000);
    client.click('.list-group-item');
  });

  //Deleting
  this.Then(/^the opportunity should not exist$/, function() {
    client.waitForVisible('#mchNoOpportunityPlaceholder', 2000);
  });

  //Stages
  this.Then(/^I should see that the opportunity has been lost$/, function() {
    client.waitForVisible('h3*=lost', 2000);
    client.getText('h3*=lost');
  });

  this.Then(/^I should see that an project has been created from the opportunity$/, function() {
    client.waitForVisible('.entity-title*=Project', 2000);
    client.waitForVisible('a*=opportunity', 2000)
    client.getText('a*=opportunity');
  });

  //Line items
  this.Given(/^the opportunity has a line item$/, function() {
    client
      .executeAsync(function(done) {
        Meteor.call('addOpportunityLineItem', function() {
          done();
        });
      });
  });

  this.Then(/^I should see a new line item in an opportunity$/, function() {
    client.waitForVisible(".edit-line-item");
    client.getText('h4*=testItem1');
  });

  this.Then(/^I should see an updated line item in an opportunity$/, function() {
    client.waitForVisible(".edit-line-item");
    client.getText('h4*=testItem2');
  });
};
