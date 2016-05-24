module.exports = function() {
  this.Then(/^I see the default widgets$/, function() {
    browser.waitForVisible('#chatBox');
    browser.waitForVisible('#quotationWidget');
    browser.waitForVisible('#onlineWidget');
  });
};
