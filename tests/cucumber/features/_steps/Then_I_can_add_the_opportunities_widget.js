module.exports = function() {
  this.Then(/^I (can|can not) add the opportunities widget$/, function(option) {
    if (option === 'can') {
      browser.safeClick('#addWidgetButton');
      expect(browser.isVisible('li=Opportunities Overview')).toBe(true);
      browser.safeClick('li=Opportunities Overview');
      expect(browser.isExisting('#opportunityInformationBox')).toBe(true);
    } else if (option === 'can not') {
      browser.safeClick('#addWidgetButton');
      expect(browser.isVisible('li=Opportunities Overview')).toBe(false);
      browser.safeClick('#addWidgetButton');
    }
  });
};
