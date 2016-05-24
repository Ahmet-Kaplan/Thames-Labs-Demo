module.exports = function() {
  this.Then(/^I (can|can not) add the project widget$/, function(option) {
    browser.refresh();
    if (option === 'can') {
      browser.click('#addWidgetButton');
      expect(browser.isVisible('li=Projects Overview')).toBe(true);
      browser.click('li=Projects Overview');
      expect(browser.isExisting('#projectInformationBox')).toBe(true);
    } else if (option === 'can not') {
      browser.click('#addWidgetButton');
      expect(browser.isVisible('li=Projects Overview')).toBe(false);
      browser.click('#addWidgetButton');
    }
  });
};
