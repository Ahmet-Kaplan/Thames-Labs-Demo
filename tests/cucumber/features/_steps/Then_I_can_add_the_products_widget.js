module.exports = function() {
  this.Then(/^I (can|can not) add the products widget$/, function(option) {
    if (option === 'can') {
      browser.click('#addWidgetButton');
      expect(browser.isVisible('#productsInformation')).toBe(true);
      browser.click('#productsInformation');
      expect(browser.isExisting('#productInformationBox')).toBe(true);
    } else if (option === 'can not') {
      browser.click('#addWidgetButton');
      expect(browser.isVisible('#productsInformation')).toBe(false);
      browser.click('#addWidgetButton');
    }
  });
};
