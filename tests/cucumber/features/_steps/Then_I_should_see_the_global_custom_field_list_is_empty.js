module.exports = function() {
  this.Then(/^I should see the global custom field list is empty$/, function() {
    browser.waitForExist('#glob-cust-field-display', 2000, true);
  });
};
