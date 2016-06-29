module.exports = function() {
  this.Then(/^"([^"]*)" should be disabled$/, function(selector) {
    expect(browser.getAttribute(selector, 'disabled')).toEqual('true');
  });
};
