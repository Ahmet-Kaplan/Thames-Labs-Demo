module.exports = function() {

  this.Then(/^I should see the (?:tour|tutorial)$/, function() {
    browser.waitForExist('.hopscotch-bubble-container', 5000);
    browser.waitForVisible('.hopscotch-bubble-container', 5000);
    expect(browser.isExisting('.hopscotch-bubble-container')).toEqual(true);
  });

};
