module.exports = function() {
  this.Then(/^I can give feedback$/, function() {
    browser.safeClick('#feedback-link');
    browser.waitForModal();
    expect(browser.isExisting('h4=Feedback')).toBe(true);
    browser.execute(function() {
      Modal.hide();
    });
  });
};
