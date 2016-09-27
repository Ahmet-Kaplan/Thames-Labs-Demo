module.exports = function() {
  this.Then(/^I (can|can not) add the purchase orders widgets$/, function(option) {
    if (option === 'can') {
      browser.safeClick('#addWidgetButton');
      expect(browser.isVisible('li=Purchase Orders Overview')).toBe(true);
      // browser.click('li=Purchase Orders Overview');
      // browser.waitForVisible('#poInformationBox');
      // browser.click('#addWidgetButton');
      expect(browser.isVisible('li=Requested Purchase Orders')).toBe(true);
      browser.safeClick('li=Requested Purchase Orders');
      browser.waitForVisible('#openPoBox');
    } else if (option === 'can not') {
      browser.safeClick('#addWidgetButton');
      expect(browser.isVisible('li=Requested Purchase Orders')).toBe(false);
      expect(browser.isVisible('li=Purchase Orders Overview')).toBe(false);
      browser.safeClick('#addWidgetButton');
    }
  });
};
