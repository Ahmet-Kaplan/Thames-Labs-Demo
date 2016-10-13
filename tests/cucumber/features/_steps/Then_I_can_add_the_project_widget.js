module.exports = function() {
  this.Then(/^I (can|can not) add the job widget$/, function(option) {
    if (option === 'can') {
      browser.safeClick('#addWidgetButton');
      expect(browser.isVisible('li=Jobs Overview')).toBe(true);
      browser.safeClick('li=Jobs Overview');
      expect(browser.isExisting('#jobInformationBox')).toBe(true);
    } else if (option === 'can not') {
      browser.safeClick('#addWidgetButton');
      expect(browser.isVisible('li=Jobs Overview')).toBe(false);
      browser.safeClick('#addWidgetButton');
    }
  });
};
