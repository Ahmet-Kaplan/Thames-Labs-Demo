module.exports = function() {
  this.Then(/^I (can|can not) add the opportunities widget$/, function(option) {
    browser.refresh();
    if (option === 'can') {
      browser.click('#addWidgetButton');
      expect(browser.isVisible('li=Opportunities Overview')).toBe(true);
      browser.click('li=Opportunities Overview');
      expect(browser.isExisting('#opportunityInformationBox')).toBe(true);
    } else if (option === 'can not') {
      browser.click('#addWidgetButton');
      expect(browser.isVisible('li=Opportunities Overview')).toBe(false);
      browser.click('#addWidgetButton');
    }
  });
};
