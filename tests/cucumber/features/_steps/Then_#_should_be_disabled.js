module.exports = function() {
  this.Then(/^"([^"]*)" should be disabled$/, function(selector) {
    browser.waitForExist(selector, 5000);
    expect(browser.getAttribute(selector, 'disabled')).toEqual('true');
  });
};
