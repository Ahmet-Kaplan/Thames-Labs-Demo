module.exports = function() {
  this.Then(/^I should see the activity in the timeline$/, function() {
    browser.waitForExist('.timeline-panel', 5000);
  });

  this.Then(/^I see a "([^"]*)" activity with the notes "([^"]*)" in the list "([^"]*)"$/, function(type, notes, listName) {
    browser.waitForExist(listName, 5000);
    browser.waitForVisible(listName, 5000);
    expect(browser.getText('#' + type + 'ActivityDisplayItemNotes', 5000)).toContain(notes);
  });

  this.Then(/^I do not see activities from "([^"]*)" in the list "([^"]*)"$/, function(type, listName) {
    browser.waitForExist(listName, 5000);
    browser.waitForVisible(listName, 5000);
    browser.waitForExist('#' + type + 'ActivityDisplayItemNotes', 5000, true);
  });

  this.Given(/^the company has an activity$/, function() {
    browser
      .executeAsync(function(done) {
        Meteor.call('addCompanyActivity', done);
      });
  });
  this.Given(/^the contact has an activity$/, function() {
    browser
      .executeAsync(function(done) {
        Meteor.call('addContactActivity', done);
      });
  });
  this.Given(/^the opportunity has an activity$/, function() {
    browser
      .executeAsync(function(done) {
        Meteor.call('addOpportunityActivity', done);
      });
  });
  this.Given(/^the project has an activity$/, function() {
    browser
      .executeAsync(function(done) {
        Meteor.call('addProjectActivity', done);
      });
  });
  this.Given(/^the purchase order has an activity$/, function() {
    browser
      .executeAsync(function(done) {
        Meteor.call('addPurchaseOrderActivity', done);
      });
  });
  this.Given(/^the task has an activity$/, function() {
    browser
      .executeAsync(function(done) {
        Meteor.call('addTaskActivity', done);
      });
  });
};
