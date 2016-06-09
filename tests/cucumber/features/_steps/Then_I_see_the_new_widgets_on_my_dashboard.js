module.exports = function() {
  this.Then(/^I see the new widgets on my dashboard$/, function() {
    browser.waitForVisible('#taskInformationBox');
    browser.waitForVisible('#companySummaryBox');
    browser.waitForVisible('#watchedEntityBox');
  });
};
