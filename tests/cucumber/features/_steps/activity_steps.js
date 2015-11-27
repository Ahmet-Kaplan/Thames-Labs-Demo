module.exports = function() {
  this.Then(/^I see a "([^"]*)" activity with the notes "([^"]*)" in the list "([^"]*)"$/, function(type, notes, listName) {
    browser.waitForExist(listName, 2000);
    browser.waitForVisible(listName, 2000);
    expect(browser.getText('#' + type + 'ActivityDisplayItemNotes', 2000)).toContain(notes);
  });

  this.Then(/^I do not see activities from "([^"]*)" in the list "([^"]*)"$/, function(type, listName) {
    browser.waitForExist(listName, 2000);
    browser.waitForVisible(listName, 2000);
    browser.waitForExist('#' + type + 'ActivityDisplayItemNotes', 2000, true);
  });

  this.Given(/^the company has an activity$/, function() {
    browser
      .executeAsync(function(done) {
        Meteor.call('addCompanyActivity', done);
      });
  });
};
