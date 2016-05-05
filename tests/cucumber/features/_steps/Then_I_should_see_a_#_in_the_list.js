module.exports = function() {
  this.Then(/^I should see an? ([^"]*) in the list$/, function() {
    browser.waitForExist('.list-group', 2000);
    browser.waitForExist('.list-item', 2000);
  });
}
