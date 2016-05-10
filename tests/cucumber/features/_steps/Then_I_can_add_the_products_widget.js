module.exports = function() {
  this.Then(/^I (can|can not) add the products widget$/, function(option) {
    if (option === 'can') {
      browser.click('#addWidgetButton');
      expect(browser.isVisible('li=Products Overview')).toBe(true);
      browser.click('li=Products Overview');
      expect(browser.isExisting('#productInformationBox')).toBe(true);
    } else if (option === 'can not') {
      browser.click('#addWidgetButton');
      expect(browser.isVisible('li=Product Overview')).toBe(false);
      browser.click('#addWidgetButton');
    }
  });
};
