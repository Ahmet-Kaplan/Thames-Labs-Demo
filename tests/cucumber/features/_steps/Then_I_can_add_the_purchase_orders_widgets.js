module.exports = function() {
  this.Then(/^I (can|can not) add the purchase orders widgets$/, function(option) {
    if (option === 'can') {
      browser.click('#addWidgetButton');
      expect(browser.isVisible('#poInformation')).toBe(true);
      // browser.click('li=Purchase Orders Overview');
      // browser.waitForVisible('#poInformationBox');
      // browser.click('#addWidgetButton');
      expect(browser.isVisible('#openPo')).toBe(true);
      browser.click('#openPo');
      browser.waitForVisible('#openPoBox');
    } else if (option === 'can not') {
      browser.click('#addWidgetButton');
      expect(browser.isVisible('#poInformation')).toBe(false);
      expect(browser.isVisible('openPo')).toBe(false);
      browser.click('#addWidgetButton');
    }
  });
};
