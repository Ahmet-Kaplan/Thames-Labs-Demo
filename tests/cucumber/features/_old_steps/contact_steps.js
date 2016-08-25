module.exports = function() {

  this.When(/^I navigate to a contact page$/, function() {
    browser.executeAsync(function(done) {
      FlowRouter.go("/contacts");
      done();
    });
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
