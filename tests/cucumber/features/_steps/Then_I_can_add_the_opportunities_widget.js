module.exports = function() {
  this.Then(/^I (can|can not) add the opportunities widget$/, function(option) {
    if (option === 'can') {
      browser.click('#addWidgetButton');
      expect(browser.isVisible('#opportunityInformation')).toBe(true);
      browser.click('#opportunityInformation');
      expect(browser.isExisting('#opportunityInformationBox')).toBe(true);
    } else if (option === 'can not') {
      browser.click('#addWidgetButton');
      expect(browser.isVisible('#opportunityInformation')).toBe(false);
      browser.click('#addWidgetButton');
    }
  });
};
