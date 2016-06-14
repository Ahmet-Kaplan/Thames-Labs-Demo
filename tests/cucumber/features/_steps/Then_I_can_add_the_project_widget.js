module.exports = function() {
  this.Then(/^I (can|can not) add the project widget$/, function(option) {
    browser.refresh();
    if (option === 'can') {
      browser.safeClick('#addWidgetButton');
      expect(browser.isVisible('li=Projects Overview')).toBe(true);
      browser.safeClick('li=Projects Overview');
      expect(browser.isExisting('#projectInformationBox')).toBe(true);
    } else if (option === 'can not') {
      browser.safeClick('#addWidgetButton');
      expect(browser.isVisible('li=Projects Overview')).toBe(false);
      browser.safeClick('#addWidgetButton');
    }
  });
};
