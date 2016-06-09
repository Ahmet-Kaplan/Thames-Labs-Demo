module.exports = function() {
  this.Then(/^I see the default widgets$/, function() {
    browser.waitForVisible('#quotationWidget');
    browser.waitForVisible('#onlineWidget');
  });
};
