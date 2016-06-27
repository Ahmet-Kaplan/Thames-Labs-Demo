module.exports = function() {
  this.Then(/^I (can|can not) add the products widget$/, function(option) {
    browser.refresh();
    if (option === 'can') {
      browser.safeClick('#addWidgetButton');
      expect(browser.isVisible('li=Products Overview')).toBe(true);
      browser.safeClick('li=Products Overview');
      expect(browser.isExisting('#productInformationBox')).toBe(true);
    } else if (option === 'can not') {
      browser.safeClick('#addWidgetButton');
      expect(browser.isVisible('li=Product Overview')).toBe(false);
      browser.safeClick('#addWidgetButton');
    }
  });
};
