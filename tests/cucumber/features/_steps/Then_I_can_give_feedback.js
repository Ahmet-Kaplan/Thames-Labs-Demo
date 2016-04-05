module.exports = function() {
  this.Then(/^I can give feedback$/, function() {
    browser.click('#feedback-link');
    browser.waitForModal();
    expect(browser.isExisting('h4=Feedback')).toBe(true);
  });
};
