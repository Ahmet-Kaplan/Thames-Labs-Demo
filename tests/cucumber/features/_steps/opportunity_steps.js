module.exports = function() {

  var url = require('url');

  //Adding
  this.Given(/^opportunity stages have been created$/, function(callback) {
    this.client
      .executeAsync(function(done) {
        Meteor.call('addOpportunityStages', function(err, data) {
          done(data);
        });
      })
      .then(function(data) {
        expect(data.value).to.exist;
      })
      .call(callback);
  });

  this.When(/^I navigate to an opportunity page$/, function(callback) {
    this.client
      .url(url.resolve(process.env.ROOT_URL, '/opportunities'))
      .waitForExist('.list-group-item', 2000)
      .click('.list-group-item')
      .call(callback);
  });

  //Deleting
  this.Then(/^the opportunity should not exist$/, function(callback) {
    this.client
      .waitForVisible('#mchNoOpportunityPlaceholder', 2000)
      .call(callback);
  });

  //Stages
  this.Then(/^I should see that the opportunity has been lost$/, function(callback) {
    this.client
      .waitForVisible('h3*=lost', 2000)
      .getText('h3*=lost')
      .call(callback);
  });

  this.Then(/^I should see that an project has been created from the opportunity$/, function(callback) {
    this.client
      .waitForVisible('.entity-title*=Project', 2000)
      .waitForVisible('a*=opportunity', 2000)
      .getText('a*=opportunity')
      .call(callback);
  });

  //Line items
  this.Given(/^the opportunity has a line item$/, function(callback) {
    this.client
      .executeAsync(function(done) {
        Meteor.call('addOpportunityLineItem', function(err, data) {
          done(data);
        });
      })
      .then(function(data) {
        expect(data.value).to.exist;
      })
      .call(callback);
  });

  this.Then(/^I should see a new line item in an opportunity$/, function(callback) {
    this.client
      .waitForVisible(".edit-line-item")
      .getText('h4*=testItem1')
      .call(callback);
  });

  this.Then(/^I should see an updated line item in an opportunity$/, function(callback) {
    this.client
      .waitForVisible(".edit-line-item")
      .getText('h4*=testItem2')
      .call(callback);
  });
};
